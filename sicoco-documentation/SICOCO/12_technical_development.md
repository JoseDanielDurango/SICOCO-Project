# Documentación Técnica: SICOCO (Sintetizador de Co-creación Colaborativa)

### 1. Objetivo del Sistema

El objetivo de **SICOCO** es servir como una herramienta digital de procesamiento de texto basada en **Inteligencia Artificial** diseñada para analizar, clasificar y resumir transcripciones de chats y foros de trabajo grupal. El sistema busca transformar la opacidad de las discusiones asíncronas en un proceso transparente de co-creación, permitiendo a los estudiantes visualizar cómo colaboran y facilitando el seguimiento docente bajo la metodología **MODESEC**.

---

### 2. Perfiles de Usuario

* **Estudiante (Usuario Principal):** Responsable de ingresar los historiales de chat, visualizar los resúmenes, gestionar sus tareas asignadas y evaluar la utilidad de la herramienta.
* **Docente / Evaluador:** Vinculado a asignaturas para supervisar los niveles de participación, validar consensos alcanzados por los equipos y calificar la fidelidad técnica del sistema.
* **Administrador:** Encargado de la gestión de roles, mantenimiento técnico y seguridad global de la infraestructura de datos.

---

### 3. Funcionalidades del Software (Arquitectura del MVP)

El despliegue final se compone de un frontend ligero (extensión de navegador Chromium) y un servidor backend modular (`sicoco-framework`):

#### A) Módulo de Captura y Frontend (Extensión Web)
* **Captura Directa e Ingreso de Historiales:** Capacidad para extraer mensajes directamente desde la interfaz web de plataformas de mensajería (WhatsApp Web, Discord Web, Teams Web) leyendo el DOM de la pestaña activa en el navegador. Asimismo, permite la carga de archivos de chat exportados (.txt, .csv, .json) de forma asíncrona.
* **Visualización y Dashboard (GUI):** Línea de tiempo interactiva de co-creación, identificación de autores por ideas, selección de estilo de resumen ("Serio" vs. "Rápido") y edición manual antes del guardado.

#### B) Backend y Motor de IA (`sicoco-framework`)
* **Framework:** Desarrollado sobre **NestJS 12**, **TypeScript** (ES Modules) y **MongoDB/Mongoose 9**.
* **Motor Inteligente:** Orquestación de peticiones a la API de **Google Gemini / OpenAI** mediante **Ingeniería de Prompts** orientada a competencias.
* **Procesamiento Asíncrono:** Recepción de solicitudes mediante colas de trabajo y emisión de `Job_ID` para mitigar caídas por *HTTP Timeout*.
* **Categorización Pedagógica (4 Pilares):**
  * **Acuerdos:** Puntos de consenso y decisiones tomadas.
  * **Desacuerdos:** Posturas encontradas y debates en curso.
  * **Dudas:** Interrogantes sin resolver al finalizar la sesión.
  * **Tareas (To-Do):** Compromisos, responsables y fechas límite.

---

### 4. Arquitectura de Datos (Modelo Relacional V2 y Persistencia NoSQL)

El sistema soporta una persistencia híbrida:
1. **Esquema Relacional Lógico (V2 - 19 Entidades):**
   * **Organización Académica:** `Estudiante`, `Profesor`, `Curso`, `Equipo`, `Miembro_Equipo`.
   * **Sesiones y Mensajería:** `Sesion_Trabajo`, `Registro_Chat` (con bandera `Es_Confidencial`), `Mensaje_Original`.
   * **Procesamiento IA:** `Configuracion_Prompt`, `Resumen_Generado` (con clave foránea hacia prompts).
   * **Pilares de Información:** `Acuerdo_Equipo`, `Desacuerdo`, `Duda_Abierta`, `Tarea_Asignada`.
   * **Mapeo de Co-creación:** `Momento_Clave_Chat` y la tabla recursiva `Conexion_Idea` (auto-relación).
   * **Evaluación y Calidad:** `Control_Calidad_Bot` (vinculada al docente evaluador), `Evaluacion_UX` y `Encuesta_Piloto`.
2. **Esquemas NoSQL Operativos (MongoDB/Mongoose):**
   * Colección `'users'` (`UserSchema` con `name`, `email` único, `age`).
   * Colección `'courses'` (`CourseSchema` con `code` único, `name`, `academicSemester`, `instructor`, `isActive`).

---

### 5. Flujos Críticos

1. **Captura e Ingesta:** El estudiante activa la extensión -> El scraper extrae mensajes del DOM -> La extensión realiza un `POST` al backend recibiendo un `Job_ID`.
2. **Procesamiento de IA Asíncrono:** El backend consume el LLM con la plantilla de prompt -> Estructura el resumen en los 4 pilares -> Almacena resultados en MongoDB/BD.
3. **Visualización y Consulta:** La extensión consulta el estado del trabajo -> Despliega el Dashboard interactivo con autoría, línea de tiempo y tareas.
4. **Seguimiento Docente:** El profesor ingresa al sistema -> Revisa consensos y tareas del equipo -> Califica la fidelidad técnica del bot.

---

### 6. Requisitos No Funcionales y Seguridad

* **Privacidad y Aislamiento:** Marcado de chats confidenciales (`Es_Confidencial`), acceso restringido a miembros del equipo y aprobación docente de grupos (`Requiere_Aprobacion_Profesor`).
* **Auditoría:** Campos obligatorios de `Created_At` y `Updated_At` en todas las entidades.
* **Integridad y Seguridad:** Identificadores protegidos (UUID / ObjectId) y almacenamiento de contraseñas mediante hash seguro.
* **Tolerancia a Fallos:** Manejo asíncrono de peticiones al LLM para prevenir fallos por saturación o tiempo de espera.

---

### 7. Roadmap de Desarrollo (Fases MODESEC)

1. **Diagnóstico:** Definición de competencias y problemas de sobrecarga informativa (*Completado*).
2. **Diseño Pedagógico y Planificación:** Estructuración de categorías, entrevistas e historias de usuario (*Completado*).
3. **Diseño Computacional y Técnico:** Validación técnica U1-01, Modelo Relacional V2 y arquitectura de persistencia (*Completado*).
4. **Producción y Desarrollo:** Implementación del backend base en NestJS 12 (*Completado*); construcción de ingesta de chat, integración con Gemini API y frontend Chromium (*En Desarrollo Activo*).
5. **Evaluación:** Pruebas de precisión técnica, usabilidad (UX) y utilidad formativa (*Planeado*).
6. **Implementación:** Programa piloto en cursos de la Universidad de Córdoba (*Planeado*).


---
---

# English Version

# Technical Documentation: SICOCO (Collaborative Co-Creation Synthesizer)

### 1. System Objective

The objective of **SICOCO** is to serve as an **Artificial Intelligence**-powered text processing platform engineered to analyze, categorize, and synthesize conversational transcripts from collaborative group chats and team forums. The platform transforms the obscurity of asynchronous student discussions into a transparent co-creation process, enabling students to visualize their collaborative dynamics while equipping instructors with objective monitoring tools under the **MODESEC** framework.

---

### 2. User Profiles

* **Student (Primary User):** Submits conversational transcripts, inspects AI-generated summaries, manages assigned action items, and evaluates system utility.
* **Instructor / Evaluator:** Linked to academic subjects to supervise team engagement, audit group consensus, and score system accuracy.
* **Administrator:** Manages system credentials, technical infrastructure maintenance, and data governance.

---

### 3. Software Architecture (MVP Specifications)

The complete deployment consists of a lightweight client frontend (Chromium browser extension) and a modular enterprise backend (`sicoco-framework`):

#### A) Ingestion Module and Frontend (Browser Extension)
* **DOM Scraping and File Uploads:** Directly extracts conversational streams from web messaging interfaces (WhatsApp Web, Discord Web, Teams Web) by querying active DOM nodes. Furthermore, supports asynchronous file uploads (.txt, .csv, .json).
* **Interactive Dashboard (GUI):** Interactive co-creation timeline, author attribution by idea node, dynamic synthesis profile toggling ("Formal" vs. "Rapid"), and pre-save manual editing capabilities.

#### B) Backend and AI Inference Engine (`sicoco-framework`)
* **Technology Framework:** Built upon **NestJS 12**, **TypeScript** (ES Modules), and **MongoDB/Mongoose 9**.
* **Intelligent Synthesis Engine:** Orchestrates requests to the **Google Gemini / OpenAI** API utilizing competency-aligned **Prompt Engineering**.
* **Asynchronous Queue Processing:** Ingests long payloads via worker queues, issuing a `Job_ID` to eradicate HTTP connection timeout failures.
* **Pedagogical Structuring (The 4 Pillars):**
  * **Agreements:** Points of consensus and solidified team decisions.
  * **Disagreements:** Competing viewpoints and active debates.
  * **Unresolved Doubts:** Open questions requiring clarification at session close.
  * **Tasks (To-Do):** Actionable commitments with assigned members and deadlines.

---

### 4. Data Architecture (Relational Model V2 & NoSQL Persistence)

The system supports a hybrid persistence model:
1. **Logical Relational Schema (V2 - 19 Entities):**
   * **Academic Organization:** `Estudiante`, `Profesor`, `Curso`, `Equipo`, `Miembro_Equipo`.
   * **Sessions and Messaging:** `Sesion_Trabajo`, `Registro_Chat` (with `Es_Confidencial` privacy flag), `Mensaje_Original`.
   * **AI Processing Domain:** `Configuracion_Prompt`, `Resumen_Generado` (foreign key linked to prompt versions).
   * **Information Pillars:** `Acuerdo_Equipo`, `Desacuerdo`, `Duda_Abierta`, `Tarea_Asignada`.
   * **Co-Creation Mapping:** `Momento_Clave_Chat` and recursive junction entity `Conexion_Idea` (self-relationship).
   * **Evaluation and QA:** `Control_Calidad_Bot` (bound to evaluating instructor), `Evaluacion_UX`, and `Encuesta_Piloto`.
2. **Operational NoSQL Schemas (MongoDB/Mongoose):**
   * Collection `'users'` (`UserSchema` with `name`, unique `email`, `role`, `age`, timestamps).
   * Collection `'courses'` (`CourseSchema` with unique `code`, `name`, `academicSemester`, `instructor`, `isActive`, timestamps).

---

### 5. Critical System Workflows

1. **Capture & Ingestion:** Student triggers extension -> Scraper parses active DOM nodes -> Extension dispatches `POST` to backend, receiving an asynchronous `Job_ID`.
2. **Asynchronous LLM Execution:** Backend queries LLM with prompt template -> Categorizes response into 4 pillars -> Persists structured entities in MongoDB/relational store.
3. **Visualization & Rendering:** Client polls job status -> Renders interactive Dashboard displaying attribution, timeline milestones, and task boards.
4. **Faculty Supervision:** Instructor logs in -> Audits team agreements and outstanding action items -> Submits quality scoring.

---

### 6. Non-Functional Requirements and Security

* **Privacy & Isolation:** Confidentiality flags (`Es_Confidencial`), strict team member RBAC, and instructor group moderation (`Requiere_Aprobacion_Profesor`).
* **Auditability:** Mandatory `Created_At` and `Updated_At` timestamps across all entities.
* **Integrity & Security:** Protected primary keys (UUID / ObjectId) and salted password hashing.
* **Fault Tolerance:** Asynchronous queue handling prevents server crashes from upstream LLM latency.

---

### 7. Development Roadmap (MODESEC Phases)

1. **Diagnosis:** Definition of competencies and information overload analysis (*Completed*).
2. **Pedagogical Design & Planning:** Specification of output pillars, architect interviews, and user stories (*Completed*).
3. **Computational & Technical Design:** Technical Validation U1-01, Relational Model V2, and hybrid persistence (*Completed*).
4. **Production & Development:** Core backend in NestJS 12 (*Completed*); DOM scraper extension and LLM queue integration (*In Active Development*).
5. **Evaluation:** Technical accuracy benchmarking, UX usability review, and formative surveys (*Planned*).
6. **Implementation:** Pilot deployments across active Universidad de Córdoba courses (*Planned*).
