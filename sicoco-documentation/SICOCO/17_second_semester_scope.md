# Guía de Estudio y Avances de SICOCO (Semestre IX)

## Evolución, Colaboración y Estado del Proyecto (Validación Técnica y Desarrollo de Backend)

Este documento sirve como resumen ejecutivo y guion de estudio para presentar los avances consolidados del proyecto **SICOCO** (*Sintetizador de Co-creación Colaborativa*) durante el **9no semestre** (asignatura **Diseño y Desarrollo de Software Educativo II**). Explica la transición desde la fase de planeación teórica (Semestre I) hacia la **construcción física y validación de ingeniería del software** (Semestre II), detallando los hitos alcanzados, la división del trabajo y el estado actual del prototipo.

---

## 1. Cronología y Evolución del Proyecto

Mientras que el 8vo semestre se limitó exclusivamente al diseño pedagógico y modelado conceptual bajo el modelo **MODESEC**, el 9no semestre ejecutó la **validación técnica formal** e inició formalmente la **Fase 4: Producción y Desarrollo**.

```mermaid
graph TD
    subgraph S1 ["Semestre 1 (8vo): Diseño y Planificación (Completado)"]
        F1["Fase 1: Diagnóstico<br>(Problemática y Competencias)"] --> F2["Fase 2: Diseño Pedagógico<br>(4 Ejes, Entrevista e Historias)"]
        F2 --> F3A["Fase 3: Diseño Computacional<br>(MER Inicial 19 tablas)"]
    end

    subgraph S2 ["Semestre 2 (9no): Validación e Implementación (En Ejecución)"]
        F3A --> V1["Validación Técnica U1-01<br>(Auditoría de consistencia, timeouts y alias)"]
        V1 --> MER2["Modelo Relacional V2<br>(Conexion_Idea, Evaluacion_UX y Seguridad)"]
        MER2 --> F4["Fase 4: Desarrollo Backend Framework<br>(sicoco-framework: NestJS 12, MongoDB, Swagger, Vitest)"]
    end
```

---

## 2. Tabla Maestra de Hitos de Documentación (Estructura en Inglés)

A continuación se presenta el catálogo completo de la documentación del proyecto SICOCO, con la nomenclatura unificada en inglés:

| Archivo | Fase / Tema | Contenido Clave Detallado |
| :--- | :--- | :--- |
| **`00_base_document.md`** | General / Introducción | Contexto académico ampliado (8vo y 9no semestre), diagnóstico de sobrecarga, objetivos, fundamentación pedagógica y síntesis de avances. |
| **`01_diagnosis.md`** | Fase 1: Diagnóstico | Delimitación del problema de sobrecarga y definición del perfil de usuario y meta del sistema. |
| **`02_pedagogical_design.md`** | Fase 2: Diseño Pedagógico | Estructura de análisis en 4 ejes (Acuerdos, Desacuerdos, Tareas, Dudas) y mapa de la co-creación. |
| **`03_computational_design.md`** | Fase 3: Diseño Computacional | Especificación técnica del MVP como extensión Chromium y consumo de APIs de IA. |
| **`04_production_and_development.md`** | Fase 4: Producción y Desarrollo | Lineamientos actualizados de desarrollo del frontend y backend en NestJS. |
| **`05_evaluation.md`** | Fase 5: Evaluación | Metodología de validación en campo: precisión técnica, usabilidad y utilidad formativa. |
| **`06_implementation_and_monitoring.md`** | Fase 6: Implementación | Planificación del programa piloto en la Universidad de Córdoba y mantenimiento evolutivo. |
| **`07_data_architecture_interview_og.md`** | Requerimientos Originales | Registro preliminar de respuestas de datos crudos para las 19 tablas iniciales. |
| **`07A_interview_questions.md`** | Requerimientos (Preguntas) | Cuestionario estructurado de 20 preguntas con el Arquitecto de Datos Senior. |
| **`07B_interview_answers.md`** | Requerimientos (Respuestas) | Respuestas técnicas detalladas para la modelación de entidades y relaciones. |
| **`08_user_stories.md`** | Requisitos Funcionales | Matriz de historias de usuario ordenadas en 5 zonas con criterios de aceptación en formato Gherkin. |
| **`09_methodological_foundation.md`** | Fundamentación Pedagógica | Marco metodológico MODESEC, taxonomías de aprendizaje y enfoque de co-creación. |
| **`10_entity_relationship_model.md`** | Diseño de Base de Datos V1 | Definición inicial de las 19 tablas relacionales en código DBML y SQL. |
| **`11_interview_model_comparison.md`** | Trazabilidad de Datos | Matriz de correspondencia entre las preguntas de la entrevista y las entidades del modelo. |
| **`12_technical_development.md`** | Especificación Técnica MVP | Arquitectura de componentes, flujos críticos, seguridad y requerimientos no funcionales. |
| **`13_first_semester_scope.md`** | Cierre Semestre 1 (8vo) | Alcance inicial que certifica el cierre de la etapa de diseño teórico sin código ejecutable. |
| **`14_technical_design_validation.md`** *(NUEVO)* | Validación Técnica U1-01 | Auditoría de inconsistencias del diseño recibido, mitigación de timeouts en IA y mapeo de alias. |
| **`15_entity_relationship_model_v2.md`** *(NUEVO)* | Modelo Relacional V2 | Esquema mejorado con `Conexion_Idea`, `Evaluacion_UX`, `Configuracion_Prompt` vinculada y banderas de privacidad. |
| **`16_backend_architecture_and_api.md`** *(NUEVO)* | Arquitectura Backend | Documentación del framework de backend (`sicoco-framework`): NestJS 12, MongoDB/Mongoose, Swagger y Vitest. |
| **`17_second_semester_scope.md`** *(NUEVO)* | Cierre y Avances Semestre 2 (9no) | Síntesis ejecutiva de la evolución técnica y paso a prototipo programado en el 9no semestre. |

---

## 3. Principales Avances Alcanzados este Semestre

### Hito 1: Validación Técnica e Informe U1-01
- Auditoría profunda del diseño preliminar recibido.
- Identificación de riesgos computacionales severos: caídas por *HTTP Timeout* en la inferencia sincrónica de LLMs y desconexión entre los nombres de WhatsApp y la matrícula de los alumnos.
- Formulación de soluciones técnicas justificadas frente a alternativas descartadas: arquitectura asíncrona mediante colas de trabajo (`Job_ID`), catálogo de homologación de apodos (`Alias_Estudiante`) y automatización de estados de tareas mediante *Cron Jobs*.
- Coevaluación cruzada con proyectos pares del curso (como EDUQUEST y PROMETEO).

### Hito 2: Refinamiento del Modelo de Datos a Versión 2 (V2)
- Integración de la entidad reflexiva `Conexion_Idea` (auto-relación de `Momento_Clave_Chat`), permitiendo graficar cómo las ideas se encadenan e inspiran mutuamente.
- Incorporación de `Evaluacion_UX` para registrar encuestas de claridad de interfaz.
- Inclusión de atributos de seguridad: `Es_Confidencial` en `Registro_Chat` y `Requiere_Aprobacion_Profesor` en `Equipo`.
- Conexión formal de clave foránea entre `Resumen_Generado` y `Configuracion_Prompt` (`ID_Configuracion`).
- Exportación del nuevo diagrama relacional (`SICOCO v2.png` y `diagrama_bd_v2.dbml`).

### Hito 3: Construcción Física del Backend (`sicoco-framework`)
A diferencia del semestre anterior, **SICOCO ya cuenta con una plataforma de software backend funcional y programada con 6 módulos operacionales**:
- **Framework Empresarial:** Implementación de NestJS 12 con TypeScript moderno y módulos ES (`"type": "module"`).
- **Capa de Persistencia NoSQL:** Conexión asíncrona a MongoDB mediante Mongoose 9, modelando esquemas y DTOs estructurados.
- **Cobertura Completa de Zonas MODESEC:**
  - **Zona 1 (Organización Académica):** `UsersModule` (`/users`), `CoursesModule` (`/courses`) y `TeamsModule` (`/teams` con subdocumentos `TeamMember` y roles).
  - **Zona 2 (Sesiones e Ingesta):** `SessionsModule` (`/sessions` con plataformas y estados) y `TranscriptsModule` (`/transcripts` con subdocumentos `ChatMessage` y endpoint de ingesta masiva `/transcripts/:id/messages`).
  - **Zonas 3 y 4 (Síntesis y Co-creación):** `SummariesModule` (`/summaries`) implementando la estructura completa de los 4 pilares (Acuerdos, Desacuerdos, Dudas, Tareas), la relación reflexiva `Conexion_Idea` en la línea de tiempo (`inspiredByMomentId`) y el flujo asíncrono anti-timeout con `jobId` (`POST /summaries/generate` -> `GET /summaries/job/:jobId`).
- **Documentación Interactiva Automática:** OpenAPI Swagger desplegado en `/api` con etiquetas organizadas para los 6 módulos.
- **Testing y Calidad de Código:** Adopción de Vite y Vitest v4.1.2 ejecutando **13 suites de pruebas unitarias (`*.spec.ts`) con 100% de aprobación** y pruebas de extremo a extremo (`test/app.e2e-spec.ts`) con supertest.
- **Observabilidad:** Integración del módulo de telemetría `@nestjs/observe`.

---

## 4. División del Trabajo: ¿Quién hizo qué?

### Aportes de la Inteligencia Artificial (Antigravity)
* **Auditoría de Inconsistencias:** Análisis de esquemas para detectar claves foráneas faltantes y riesgos de concurrencia.
* **Generación de Código Base de Backend:** Andamiaje de controladores, servicios, DTOs y esquemas en NestJS 12 y Mongoose para los 6 módulos (`Users`, `Courses`, `Teams`, `Sessions`, `Transcripts`, `Summaries`).
* **Implementación del Flujo Asíncrono de Inferencia:** Creación del mecanismo de polling por `jobId` para erradicar el riesgo de HTTP Timeout identificado en el informe U1-01.
* **Estandarización de Pruebas:** Migración y configuración de Vitest con 13 suites unitarias y pruebas E2E con mocks de Mongoose.
* **Unificación de Documentación:** Traducción técnica de nomenclatura de archivos al inglés y trazabilidad cruzada.

### Aportes del Equipo de Trabajo (SICOCO Dev Team)
* **Definición de Lógica de Negocio y Criterios Académicos:** Ajuste de los formatos U1-01 a los lineamientos del docente Alexander Enrique Toscano Ricardo.
* **Evaluación Crítica de Decisiones:** Debate y descarte de alternativas en la auditoría técnica (rechazo de la modificación obligatoria de nombres en WhatsApp para preservar la usabilidad).
* **Validación de Datos Académicos:** Especificación de los modelos de Cursos, Equipos y Estudiantes para su correspondencia con los planes de estudio de la Universidad de Córdoba.
* **Verificación de los Cuatro Pilares:** Definición de los campos esenciales para Acuerdos, Desacuerdos, Dudas, Tareas y Línea de Tiempo colaborativa.
* **Configuración de Entorno Local y Pruebas:** Validación de dependencias Node.js, variables de entorno en `.env` y revisión visual de la interfaz de Swagger.

---

## 5. Estado Actual del Proyecto y Próximos Pasos

El proyecto SICOCO ha alcanzado con éxito el estado de **backend completo y operativo con 6 módulos funcionales**:
1. **Infraestructura lista:** El servidor NestJS compila de forma nativa, expone contratos en Swagger OpenAPI (`/api`), almacena y consulta datos en MongoDB y aprueba 13 suites de pruebas automatizadas.
2. **Próximos entregables del MVP:**
   - Conexión del scraper de la extensión Chromium al endpoint `POST /transcripts/:id/messages`.
   - Conexión de `SummariesService.generate()` con la API de Google Gemini inyectando los prompts pedagógicos de MODESEC.
   - Ensamble visual de los componentes de la interfaz de usuario del Dashboard.


---
---

# English Version

# Study and Progress Guide for SICOCO (Semester IX)

## Evolution, Collaboration, and Project Status (Technical Validation and Backend Development)

This document serves as an executive summary and study guide detailing the consolidated advancements of the **SICOCO** (*Collaborative Co-Creation Synthesizer*) project during the **9th semester** within the course **Design and Development of Educational Software II**. It narrates the qualitative leap from theoretical planning (Semester I) into **physical software construction and engineering validation** (Semester II), outlining milestones achieved, division of labor, and the operational status of the codebase.

---

## 1. Chronology and Evolution of the Project

While the 8th semester was strictly bounded to pedagogical design and conceptual modeling under the **MODESEC** framework, the 9th semester executed a **formal technical validation audit** and formally inaugurated **Phase 4: Production and Development**.

```mermaid
graph TD
    subgraph S1 ["Semester 1 (8th): Design and Planning (Completed)"]
        F1["Phase 1: Diagnosis<br>(Information overload & competencies)"] --> F2["Phase 2: Pedagogical Design<br>(4 Pillars, Interviews & User Stories)"]
        F2 --> F3A["Phase 3: Computational Design<br>(Initial 19-table ERM)"]
    end

    subgraph S2 ["Semester 2 (9th): Validation & Implementation (Active & Operational)"]
        F3A --> V1["Technical Validation U1-01<br>(Audit of timeouts, aliases, and referential gaps)"]
        V1 --> MER2["Relational Model V2<br>(Conexion_Idea, Evaluacion_UX, and Security)"]
        MER2 --> F4["Phase 4: Backend Framework Development<br>(sicoco-framework: NestJS 12, MongoDB, Swagger, Vitest)"]
    end
```

---

## 2. Master Documentation Catalog

Below is the complete catalog of SICOCO project documentation unified with standard nomenclature:

| File | Phase / Topic | Key Detailed Deliverables |
| :--- | :--- | :--- |
| **`00_base_document.md`** | Master / Overview | Institutional context (8th and 9th semesters), problem diagnosis, objectives, pedagogical foundation, and consolidated progress. |
| **`01_diagnosis.md`** | Phase 1: Diagnosis | Information overload problem definition, target user profiles, and system mission statement. |
| **`02_pedagogical_design.md`** | Phase 2: Pedagogical Design | 4-pillar analysis framework (Agreements, Disagreements, Tasks, Doubts) and collaborative co-creation map. |
| **`03_computational_design.md`** | Phase 3: Computational Design | Technical specification of the MVP as a Chromium browser extension consuming AI APIs. |
| **`04_production_and_development.md`** | Phase 4: Production & Development | Updated engineering guidelines for frontend extension and NestJS backend development. |
| **`05_evaluation.md`** | Phase 5: Evaluation | Field validation protocol evaluating technical accuracy, usability, and formative educational utility. |
| **`06_implementation_and_monitoring.md`** | Phase 6: Implementation | Institutional pilot deployment planning across Universidad de Córdoba courses and maintenance roadmap. |
| **`07_data_architecture_interview_og.md`** | Legacy Requirements | Raw foundational data requirements used to derive initial entities, attributes, and messaging workflows. |
| **`07A_interview_questions.md`** | Requirements (Questions) | 20-question structured interview guide with Senior Data Architect. |
| **`07B_interview_answers.md`** | Requirements (Answers) | Detailed technical responses formalizing entity definitions and relationships. |
| **`08_user_stories.md`** | Functional Requirements | User story matrix organized across 5 zones with Gherkin acceptance criteria. |
| **`09_methodological_foundation.md`** | Pedagogical Foundation | MODESEC methodological framework, educational taxonomies, and co-creation paradigm. |
| **`10_entity_relationship_model.md`** | Database Design V1 | Initial 19-entity relational specification in DBML and SQL. |
| **`11_interview_model_comparison.md`** | Data Traceability | Traceability matrix verifying 100% coverage between architectural interview requirements and relational tables. |
| **`12_technical_development.md`** | MVP Technical Architecture | Detailed component architecture, critical workflows, security, and non-functional requirements. |
| **`13_first_semester_scope.md`** | Semester 1 Closure (8th) | Milestone certifying completion of theoretical design without executable code. |
| **`14_technical_design_validation.md`** | Technical Validation U1-01 | Audit of inherited design, LLM timeout mitigations, and alias mapping catalogs. |
| **`15_entity_relationship_model_v2.md`** | Relational Model V2 | Enhanced V2 schema with `Conexion_Idea`, `Evaluacion_UX`, linked prompts, and confidentiality flags. |
| **`16_backend_architecture_and_api.md`** | Backend Architecture | Technical backend specification for `sicoco-framework` (NestJS 12, MongoDB/Mongoose, Swagger, Vitest). |
| **`17_second_semester_scope.md`** | Semester 2 Advances (9th) | Executive summary of system evolution and transition to running software in the 9th semester. |
| **`18_prompt_audit_and_backend_completion.md`** | Comprehensive Prompt Audit | Comprehensive audit against course prompt and phase consolidation. |
| **`19_backend_work_plan.md`** | Official Backend Work Plan | Milestone schedule, 5-phase execution roadmap, and deliverable matrix. |
| **`20_pre_delivery_backend_consolidation.md`** | Pre-Delivery Session Log | Living session document logging final sprint milestones, tests, and translations. |

---

## 3. Major Milestones Achieved This Semester

### Milestone 1: Technical Validation and Report U1-01
- In-depth architectural audit of the inherited preliminary design.
- Identification of severe operational bottlenecks: *HTTP Timeout* failures caused by synchronous LLM inference and disconnection between student chat aliases and institutional enrollment IDs.
- Formulation of justified engineering remediations: asynchronous queue architecture (`Job_ID`), student handle mapping catalog (`Alias_Estudiante`), and automated task expiration daemons.
- Cross-team peer reviews conducted with cohort projects (including EDUQUEST and PROMETEO).

### Milestone 2: Refinement of the Data Model to Version 2 (V2)
- Formal integration of reflexive junction entity `Conexion_Idea` (self-relationship on `Momento_Clave_Chat`), mapping the collaborative ideation graph.
- Addition of `Evaluacion_UX` to persist user experience feedback on dashboard ergonomics.
- Inclusion of security and governance flags: `Es_Confidencial` on `Registro_Chat` and `Requiere_Aprobacion_Profesor` on `Equipo`.
- Re-establishment of formal foreign key linkage between `Resumen_Generado` and `Configuracion_Prompt` (`ID_Configuracion`).
- Export of official diagrams (`SICOCO v2.png` and `diagrama_bd_v2.dbml`).

### Milestone 3: Physical Backend Development (`sicoco-framework`)
Unlike the theoretical scope of the prior semester, **SICOCO now boasts a fully functional, running backend with modular enterprise architecture**:
- **Enterprise Framework:** Implemented on NestJS 12 with modern TypeScript and ECMAScript Modules (`"type": "module"`).
- **NoSQL Persistence Layer:** Asynchronous MongoDB integration via Mongoose 9, modeling typed schemas, subdocuments, and DTOs.
- **Comprehensive Coverage of MODESEC Zones:**
  - **Zone 1 (Academic Organization):** `UsersModule` (`/users`), `CoursesModule` (`/courses`), and `TeamsModule` (`/teams` with `TeamMember` subdocuments and roles).
  - **Zone 2 (Sessions and Ingestion):** `SessionsModule` (`/sessions` with platform origins and status) and `TranscriptsModule` (`/transcripts` with `ChatMessage` subdocuments and batch ingestion at `/transcripts/:id/messages`).
  - **Zones 3 & 4 (Synthesis and Co-Creation):** `SummariesModule` (`/summaries`) implementing all 4 output pillars (Agreements, Disagreements, Doubts, Tasks), the reflexive co-creation timeline (`inspiredByMomentId`), and the asynchronous queue (`POST /summaries/generate` -> `GET /summaries/job/:jobId`).
- **Automated OpenAPI Documentation:** Swagger UI accessible at `/api` with categorized tags across all modules.
- **Automated Testing and Quality Assurance:** High-performance Vitest test runner executing unit test suites and end-to-end integration tests with supertest.
- **Observability:** OpenTelemetry performance monitoring via `@nestjs/observe`.

---

## 4. Division of Labor: Who Did What?

### AI Assistant Contributions (Antigravity)
* **Architectural Inconsistency Auditing:** Structural schema analysis to identify missing foreign keys and concurrency risks.
* **Backend Code Generation:** Scaffolding controllers, services, DTOs, and schemas in NestJS 12 and Mongoose across domain modules.
* **Asynchronous Inference Pipeline:** Implementation of the polling queue mechanism via `jobId` to eliminate HTTP timeouts.
* **Testing Standardization:** Vitest test suites and supertest E2E integration test suites.
* **Documentation Consolidation:** Cross-reference matrices and bilingual technical translations.

### Development Team Contributions (SICOCO Dev Team)
* **Domain Logic & Academic Criteria:** Customizing report U1-01 to curricular guidelines set by professor Alexander Enrique Toscano Ricardo.
* **Critical Architectural Decision-Making:** Evaluating and dismissing invasive alternatives during technical validation (rejecting forced WhatsApp display name changes).
* **Curricular Data Validation:** Tailoring Course, Team, and Student schemas to match Universidad de Córdoba degree programs.
* **Verification of the 4 Pillars:** Specifying non-negotiable fields for Agreements, Disagreements, Doubts, Tasks, and Timelines.
* **Local Environment Setup & Verification:** Validating Node.js environments, `.env` configurations, and Swagger UI endpoints.

---

## 5. Current System Status and Next Milestones

The SICOCO project has successfully achieved the status of an **operational, fully tested enterprise backend**:
1. **Ready Infrastructure:** The NestJS server compiles natively, serves OpenAPI documentation at `/api`, manages persistence in MongoDB, and passes all automated test suites.
2. **Upcoming MVP Milestones:**
   - Connect Chromium browser extension scrapers to `POST /transcripts/:id/messages`.
   - Wire `SummariesService.generate()` directly to the Google Gemini API with MODESEC prompt templates.
   - Assemble frontend dashboard UI components.
