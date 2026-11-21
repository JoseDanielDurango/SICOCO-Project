# Fase 3: Diseño Computacional y Técnico (Arquitectura y Modelado)

Este es el plan básico para desarrollar el programa bajo un modelo **MVP (Producto Mínimo Viable)**. Esto asegura que el proyecto mantenga un alcance realista y se pueda culminar satisfactoriamente durante el semestre universitario.

---

## Entrada de Datos (Básica y Segura)

Para evitar la complejidad técnica de bots de Discord o APIs de mensajería empresarial en tiempo real, el sistema recibirá la información a través de la extensión:

- **Ingreso de Historiales (Extensión de Navegador):** Se proveerá una interfaz integrada en la extensión de navegador que permitirá a los estudiantes capturar la conversación directamente desde las pestañas web activas (WhatsApp Web, Discord Web, Teams Web) a través de la lectura del DOM, o bien cargar manualmente archivos de historial exportados (txt, csv, JSON).

> *(Nota: Esta restricción asegura la factibilidad del proyecto para el equipo de desarrollo, eludiendo el uso de APIs oficiales complejas o bots que requieran tokens de administrador).*

---

## El Motor de SICOCO (Procesamiento)

SICOCO funcionará consumiendo las APIs de Inteligencias Artificiales generativas comerciales de bajo costo o capa gratuita (como Gemini o OpenAI). 

- **Enfoque en Ingeniería de Prompts:** No se entrenará una IA desde cero (fine-tuning). Se utilizará un sistema robusto de instrucciones estructuradas.
- La instrucción principal dirigirá al modelo de lenguaje para que extraiga de forma precisa nuestros cuatro puntos clave: **acuerdos, tareas, desacuerdos y dudas.**

---

## Pantalla para el Usuario (UI)

Se construirá una interfaz gráfica (Dashboard) estructurada y clara, sin requerir elementos dinámicos excesivamente complejos. 

> Lo primordial es exponer de manera visual los elementos extraídos, como identificar al autor del acuerdo y enlistar las tareas pendientes, para que cualquier miembro del equipo comprenda el estatus general de un solo vistazo.

---
---

# English Version

# Phase 3: Computational and Technical Design (Architecture and Modeling)

This section establishes the technical baseline for developing the platform under an **MVP (Minimum Viable Product)** model. This guarantees that the scope remains feasible, robust, and achievable within the university semester timeline.

---

## Data Ingestion (Streamlined and Secure)

To circumvent the infrastructure complexity of Discord bots or real-time enterprise messaging APIs, SICOCO ingests conversation transcripts via the extension:

- **Transcript Ingestion (Browser Extension):** An interface integrated into the Chromium browser extension enables students to capture chat logs directly from active browser tabs (WhatsApp Web, Discord Web, Teams Web) through DOM scraping, or manually upload exported chat transcripts (.txt, .csv, .json).

> *(Note: This architectural constraint ensures technical feasibility for the undergraduate development team, avoiding reliance on restricted official bot APIs that require server administrative privileges).*

---

## SICOCO Processing Engine (Inference Layer)

SICOCO operates by consuming foundational commercial LLM APIs with low-latency and cost-effective tiers (such as Google Gemini or OpenAI).

- **Prompt Engineering Focus:** The architecture relies on rigorous prompt engineering rather than model fine-tuning.
- Systematic system instructions guide the language model to extract the four MODESEC pedagogical pillars: **agreements, assigned tasks, disagreements, and open doubts.**

---

## User Dashboard (UI Layer)

A clean, responsive dashboard interface presents the extracted data without unnecessary visual clutter.

> The core objective is to project extracted elements visually—attributing agreement authors and organizing pending tasks with assignees and due dates—enabling any team member to grasp project status at a single glance.
