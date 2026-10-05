---
title: "Gabriel Salgado Maldonado"
permalink: /en/
lang: en
author_profile: true
---

**Speech-Language Pathologist · Epidemiologist · Academic**

I integrate clinical practice, research, teaching and public health to support safe, timely and evidence-based care, particularly for people with complex communication, swallowing and airway needs.

My academic work at **Universidad de los Andes, Chile**, builds on experience in complex clinical care, health professional education, applied research and professional leadership.

## Areas of work

- **Swallowing and critical care:** adult dysphagia, artificial airways, airway protection, cough and rehabilitation in critically ill patients.
- **Clinical epidemiology:** observational research, health outcomes, evidence synthesis and intervention evaluation.
- **Public health and education:** access to care, health policy, university education and knowledge translation.

## Current roles

- President, Chilean Society of Swallowing and Feeding (SOCHIDA).
- Academic, Universidad de los Andes.
- Director, Diploma in Intensive Care Speech-Language Pathology.
- Director, Diploma in Adult Deglutology.

## Recent publications

{% assign recent = site.publications | sort: 'date' | reverse %}
{% assign count = 0 %}
{% for post in recent %}
{% if post.category == 'manuscripts' and count < 3 %}
- [{{ post.title }}]({{ post.paperurl }}) · *{{ post.venue }}* · {{ post.date | date: "%Y" }}
{% assign count = count | plus: 1 %}
{% endif %}
{% endfor %}

[All publications](/en/publications/) · [Research](/en/research/) · [Teaching](/en/teaching/) · [CV](/en/cv/) · [Contact](/en/contact/)
