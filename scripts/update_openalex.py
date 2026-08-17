#!/usr/bin/env python3
"""Actualiza métricas de OpenAlex para publicaciones verificadas por DOI.

La identidad del autor se resuelve mediante ORCID, pero las métricas públicas del
sitio se calculan únicamente sobre una lista curada de DOI para evitar falsos
positivos de desambiguación en OpenAlex.
"""

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ORCID = "0000-0002-4897-8863"
OUTPUT = Path("_data/openalex.json")
VERIFIED_WORKS = Path("_data/openalex_verified_works.json")
API_BASE = "https://api.openalex.org"


def get_json(url: str, api_key: str) -> dict:
    separator = "&" if "?" in url else "?"
    request = urllib.request.Request(
        f"{url}{separator}api_key={urllib.parse.quote(api_key)}",
        headers={"User-Agent": "gsalgadoma.github.io OpenAlex updater"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def compact_work(work: dict, verified_title: str) -> dict:
    location = work.get("primary_location") or {}
    source = location.get("source") or {}
    oa = work.get("open_access") or {}
    return {
        "id": work.get("id"),
        "title": work.get("display_name") or verified_title,
        "verified_title": verified_title,
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


def load_verified_works() -> list[dict]:
    if not VERIFIED_WORKS.exists():
        raise RuntimeError(f"No existe {VERIFIED_WORKS}")
    data = json.loads(VERIFIED_WORKS.read_text(encoding="utf-8"))
    if not isinstance(data, list) or not data:
        raise RuntimeError("La lista de publicaciones verificadas está vacía o no es válida")
    return data


def get_verified_openalex_works(verified: list[dict], api_key: str) -> tuple[list[dict], list[dict]]:
    found = []
    missing = []
    for entry in verified:
        doi = (entry.get("doi") or "").strip()
        title = (entry.get("title") or "").strip()
        if not doi:
            continue
        external_id = urllib.parse.quote(f"doi:{doi}", safe=":/.-_()")
        try:
            work = get_json(f"{API_BASE}/works/{external_id}", api_key)
        except urllib.error.HTTPError as exc:
            if exc.code == 404:
                missing.append({"doi": doi, "title": title})
                continue
            raise
        found.append(compact_work(work, title))
    found.sort(key=lambda item: item.get("publication_date") or "", reverse=True)
    return found, missing


def main() -> int:
    api_key = os.environ.get("OPENALEX_API_KEY")
    if not api_key:
        print("Falta OPENALEX_API_KEY; no se modifica _data/openalex.json", file=sys.stderr)
        return 2

    verified = load_verified_works()
    author = get_json(f"{API_BASE}/authors/https://orcid.org/{ORCID}", api_key)
    author_id = (author.get("id") or "").rsplit("/", 1)[-1]
    if not author_id:
        raise RuntimeError("OpenAlex no devolvió un author ID para el ORCID configurado")

    works, missing = get_verified_openalex_works(verified, api_key)
    verified_citations = sum(int(work.get("cited_by_count") or 0) for work in works)
    open_access_count = sum(1 for work in works if work.get("is_open_access"))

    payload = {
        "status": "ok",
        "mode": "verified_doi",
        "orcid": ORCID,
        "author_id": author_id,
        "author_url": author.get("id"),
        "display_name": author.get("display_name"),
        "verified_dois_count": len(verified),
        "verified_works_found": len(works),
        "verified_citations": verified_citations,
        "open_access_count": open_access_count,
        "missing_in_openalex_count": len(missing),
        "missing_in_openalex": missing,
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "works": works,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        "OpenAlex actualizado con DOI verificados: "
        f"{len(works)}/{len(verified)} encontrados, {verified_citations} citas acumuladas"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
