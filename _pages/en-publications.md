---
title: "Publications"
permalink: /en/publications/
lang: en
author_profile: true
---

My academic output spans speech-language pathology, rehabilitation, critical care, clinical epidemiology and public health.

[Google Scholar](https://scholar.google.com/citations?user=lUJ6RBoAAAAJ) · [ORCID](https://orcid.org/0000-0002-4897-8863)

## Recent journal publications

{% assign publications = site.publications | sort: 'date' | reverse %}
{% assign count = 0 %}
{% for post in publications %}
{% if post.category == 'manuscripts' and count < 4 %}
### {{ post.title }}
*{{ post.venue }}* · {{ post.date | date: "%Y" }}

{% if post.paperurl %}[Read publication]({{ post.paperurl }}){% else %}[Publication record]({{ post.url | relative_url }}){% endif %}
{% assign count = count | plus: 1 %}
{% endif %}
{% endfor %}

## Complete academic output

Titles and bibliographic references retain their original language.

{% for post in publications %}
### {{ post.title }}
{% if post.venue %}*{{ post.venue }}* · {% endif %}{{ post.date | date: "%Y" }}

{% if post.citation %}{{ post.citation }}{% endif %}

{% if post.paperurl %}[Read publication]({{ post.paperurl }}){% endif %} · [Publication record in its original language]({{ post.url | relative_url }})
{% endfor %}
