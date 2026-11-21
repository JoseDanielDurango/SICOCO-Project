# Fase 4: Producción y Desarrollo (Estado Activo)

En esta etapa se construye el prototipo funcional (**MVP**) de SICOCO, conectando la interfaz de la **extensión de navegador Chromium** con el backend empresarial y el motor de Inteligencia Artificial generativa.

---

## 1. Arquitectura de Implementación del Backend (`sicoco-framework`)

Para materializar la persistencia y la lógica de negocio validada en el informe U1-01, el equipo construyó el servidor base en el repositorio `sicoco-framework`:

- **Framework y Lenguaje:** Desarrollado sobre **NestJS 12** y **TypeScript** con arquitectura modular ES Modules (`"type": "module"`).
- **Capa de Persistencia Híbrida:** Uso de **MongoDB** a través de **Mongoose 9**, permitiendo esquemas flexibles para la ingesta de transcripciones semi-estructuradas y tipado estricto para entidades académicas.
- **Módulos Base Operativos:**
  - `UsersModule`: Controladores y servicios CRUD para la gestión de estudiantes y docentes, con esquemas de validación Mongoose y DTOs tipados.
  - `CoursesModule`: Controladores y servicios CRUD para asignaturas académicas (colección `'courses'`).
- **Contrato y Documentación:** Interfaz interactiva de **Swagger / OpenAPI** desplegada en tiempo real en `/api`.
- **Aseguramiento de Calidad:** Suite de pruebas automatizadas con **Vitest 4**, linter ultrarrápido **oxlint** y formateo consistente con Prettier.

---

## 2. Ingeniería de Prompts (Instrucciones a la IA)

**Esta es la parte más crítica de la programación del motor inteligente.**

Dado que no se entrenará un modelo desde cero (fine-tuning), el sistema aprovecha modelos fundacionales (Google Gemini / OpenAI) mediante una arquitectura de **prompts estructurados por competencias**:
- Las instrucciones obligan al modelo a retornar un esquema JSON rígido que alimenta directamente las entidades `Acuerdo_Equipo`, `Desacuerdo`, `Duda_Abierta` y `Tarea_Asignada`.
- Se incorpora mitigación de alucinaciones validando que cada tarea extraída tenga un responsable explícito o deducible del contexto.

---

## 3. Manejo de Diversidad de Textos Conversacionales

El backend está diseñado para procesar dos ritmos conversacionales radicalmente distintos:

1. **Chats rápidos y fragmentados (WhatsApp Web, Telegram):** Mensajes cortos, emojis, jerga estudiantil y pausas temporales. El scraper agrupa ráfagas continuas de un mismo remitente antes de enviarlas al LLM.
2. **Foros ordenados y formales (Teams, Moodle, Discord Threads):** Intervenciones extensas y argumentativas con debates conceptuales.

---

## 4. Estrategia de Procesamiento Asíncrono

Para evitar bloqueos o caídas por *HTTP Timeout* (hallazgo clave del informe U1-01):
- La extensión envía la transcripción mediante `POST /sessions/:id/process-chat`.
- El backend encola la petición y retorna de inmediato un identificador de tarea (`Job_ID`).
- La extensión consulta el avance mediante *Polling* periódico o WebSockets hasta recibir el resumen estructurado en el Dashboard.

---
---

# English Version

# Phase 4: Production and Development (Active Implementation)

This phase encompasses building the functional prototype (**MVP**) of SICOCO, bridging the **Chromium browser extension** user interface with the enterprise backend framework and generative AI inference engine.

---

## 1. Backend Implementation Architecture (`sicoco-framework`)

To realize the persistence and business logic validated in technical report U1-01, the team built the foundational server within the `sicoco-framework` repository:

- **Framework and Language:** Engineered with **NestJS 12** and **TypeScript**, leveraging a native ECMAScript Modules architecture (`"type": "module"`).
- **Hybrid Persistence Strategy:** Powered by **MongoDB** via **Mongoose 9**, providing flexible schema structures for semi-structured chat transcript ingestion while enforcing strict typing across academic entities.
- **Operational Core Modules:**
  - `UsersModule`: CRUD controllers and services for student and instructor management, equipped with Mongoose schemas and typed DTOs.
  - `CoursesModule`: CRUD operations for academic courses and subjects (MongoDB `'courses'` collection).
- **Interface Contract and Documentation:** Real-time **OpenAPI / Swagger** interactive UI deployed at `/api`.
- **Quality Assurance:** Automated test suite orchestrated with **Vitest 4**, high-performance linting with **oxlint**, and unified Prettier code formatting.

---

## 2. Prompt Engineering (Generative AI Orchestration)

**This represents the core intellectual component of the synthesis engine.**

Because foundational LLMs are utilized without full retraining (fine-tuning), the system engages models (Google Gemini / OpenAI) using a structured **competency-based prompt architecture**:
- System prompts require the model to return a strict JSON schema directly populating the `Team_Agreement`, `Disagreement`, `Open_Doubt`, and `Assigned_Task` entities.
- Hallucination mitigation protocols ensure every extracted task references an explicit or contextually verified team member.

---

## 3. Handling Heterogeneous Conversational Modalities

The backend is engineered to handle two fundamentally different conversational rhythms:

1. **Fast-Paced, Fragmented Chats (WhatsApp Web, Telegram):** Short burst messages, emojis, colloquial slang, and temporal pauses. The scraper buffers consecutive messages from the same sender prior to LLM submission.
2. **Structured, Formal Forums (Microsoft Teams, Moodle, Discord Threads):** Extended argumentative paragraphs and deep conceptual debates.

---

## 4. Asynchronous Ingestion Strategy (Anti-Timeout Architecture)

To resolve connection drops caused by HTTP timeouts (a critical finding of the U1-01 audit):
- The client extension submits conversation payloads via asynchronous processing endpoints.
- The backend queues the workload and immediately returns a unique tracking identifier (`Job_ID`).
- The extension queries job completion status via lightweight polling or WebSockets until the synthesized payload is rendered on the dashboard.
