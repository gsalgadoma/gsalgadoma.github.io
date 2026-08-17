#!/usr/bin/env python3
"""Actualiza datos bibliométricos públicos de OpenAlex usando ORCID.

La clave de OpenAlex se obtiene exclusivamente desde OPENALEX_API_KEY.
El archivo generado es estático y nunca contiene la clave.
"""

import json
import os
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ORCID = "0000-0002-4897-8863"
OUTPUT = Path("_data/openalex.json")
API_BASE = "https://api.openalex.org"


def get_json(url: str, api_key: str) -> dict:
    separator = "&" if "?" in url else "?"
    request = urllib.request.Request(
        f"{url}{separator}api_key={urllib.parse.quote(api_key)}",
        headers={"User-Agent": "gsalgadoma.github.io OpenAlex updater"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def compact_work(work: dict) -> dict:
    location = work.get("primary_location") or {}
    source = location.get("source") or {}
    oa = work.get("open_access") or {}
    return {
        "id": work.get("id"),
        "title": work.get("display_name"),
        "publication_year": work.get("publication_year"),
        "publication_date": work.get("publication_date"),
        "type": work.get("type"),
        "doi": work.get("doi"),
        "cited_by_count": work.get("cited_by_count", 0),
        "is_open_access": oa.get("is_oa", False),
        "oa_status": oa.get("oa_status"),
        "source": source.get("display_name"),
        "landing_page_url": location.get("landing_page_url"),
    }


def main() -> int:
    api_key = os.environ.get("OPENALEX_API_KEY")
    if not api_key:
        print("Falta OPENALEX_API_KEY; no se modifica _data/openalex.json", file=sys.stderr)
        return 2

    author = get_json(f"{API_BASE}/authors/https://orcid.org/{ORCID}", api_key)
    author_id = (author.get("id") or "").rsplit("/", 1)[-1]
    if not author_id:
        raise RuntimeError("OpenAlex no devolvió un author ID para el ORCID configurado")

    params = urllib.parse.urlencode(
        {
            "filter": f"author.id:{author_id}",
            "per-page": 200,
            "sort": "publication_date:desc",
            "select": "id,display_name,publication_year,publication_date,type,doi,cited_by_count,open_access,primary_location",
        }
    )
    works_response = get_json(f"{API_BASE}/works?{params}", api_key)
    works = [compact_work(work) for work in works_response.get("results", [])]

    payload = {
        "status": "ok",
        "orcid": ORCID,
        "author_id": author_id,
        "author_url": author.get("id"),
        "display_name": author.get("display_name"),
        "works_count": author.get("works_count"),
        "cited_by_count": author.get("cited_by_count"),
        "h_index": (author.get("summary_stats") or {}).get("h_index"),
        "i10_index": (author.get("summary_stats") or {}).get("i10_index"),
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "works": works,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"OpenAlex actualizado: {len(works)} trabajos recuperados para {author_id}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
