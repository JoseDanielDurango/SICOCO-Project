# Fase de Validación Técnica: Informe U1-01 de Validación del Diseño Técnico (Semestre IX)

**Curso:** 203453 · Diseño y Desarrollo de Software Educativo II · Semestre IX  
**Institución:** Universidad de Córdoba · Facultad de Educación y Ciencias Humanas · Licenciatura en Informática  
**Docente Líder:** Alexander Enrique Toscano Ricardo  
**Equipo de Desarrollo:** SICOCO Dev Team (José Daniel Durango Caballero, Jefersson Ramírez Oviedo, Jesús Daniel Ruiz Román, Jeyson David López Gorrostola)  
**Equipo Coevaluador:** EDUQUEST (Jorge Mogollón Díaz, Jorge Guzmán Aguirre, Germán Rivera Rosario)  
**Repositorio Oficial:** `https://github.com/JoseDanielDurango/sicoco-documentation.git` / `sicoco-framework`  

---

## 1. Contexto de Recepción y Punto de Partida

Al iniciar el **9no semestre** en la asignatura **Diseño y Desarrollo de Software Educativo II**, el equipo asumió la tarea de auditar formalmente el diseño técnico y computacional elaborado durante el 8vo semestre en *Diseño y Desarrollo de Software Educativo I* (asignatura 203447).

El objetivo de esta fase de validación técnica no consistió en una simple revisión superficial, sino en verificar exhaustivamente si la especificación recibida era suficiente, coherente y viable para construir el software real (**MVP**), identificando inconsistencias, omisiones y ambigüedades antes de iniciar la programación del código fuente en la Fase 4 de MODESEC.

### Documentación Recibida vs. Documentación Faltante

- **Documentos Recibidos:** Documento Técnico de Diseño y Fundamentación Pedagógico-Computacional, Especificación de Historias de Usuario, Modelo Entidad-Relación inicial (19 tablas en DBDiagram).
- **Documentos Faltantes Identificados:**
  1. *Blueprint técnico de servicios backend:* Ausencia de contratos de servicios formales (definición de endpoints REST, esquemas de payload JSON y códigos de estado HTTP).
  2. *Diccionario de datos detallado:* Ausencia de longitudes máximas para atributos de texto (`VARCHAR(n)`), lo que generaba riesgo de desbordamiento de almacenamiento en transcripciones extensas.

---

## 2. Hallazgos Críticos sobre el Modelo de Datos

Durante la auditoría del Modelo de Datos recibido se detectaron cuatro aspectos estructurales que requerían corrección inmediata:

| N° | Hallazgo | Ubicación Original | Tipo de Falla | Efecto sobre la Implementación |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **Entidad Control de Calidad huérfana** | Capítulo VI, Dominio 6, Tabla `Control_Calidad_Bot` | **Omisión** | La tabla no contaba con clave foránea (`FK`) al evaluador. Las evaluaciones de fidelidad quedaban anónimas y se perdía la trazabilidad académica sobre qué docente calificó la precisión de la IA. |
| **2** | **Desconexión entre Alias de chat y Estudiante real** | Capítulo VI, Tablas `Mensaje_Original` y `Acuerdo_Equipo` | **Inconsistencia** | Al guardar el alias del remitente como texto libre (`VARCHAR`) sin una tabla de correspondencia al `ID_Estudiante`, el sistema no podía atribuir de forma automatizada las notas de participación ni asignar tareas a estudiantes matriculados. |
| **3** | **Encuestas desvinculadas de la sesión de trabajo** | Capítulo VI, Dominio 6, Tablas `Evaluacion_UX` y `Encuesta_Piloto` | **Omisión** | Las encuestas estaban enlazadas únicamente al estudiante pero no a la sesión de trabajo específica (`ID_Sesion`), impidiendo evaluar si un chat o dinámica grupal particular tuvo éxito pedagógico. |
| **4** | **Longitudes de datos ausentes** | Capítulo VI y Anexo B (DBDiagram) | **Omisión** | Los atributos `VARCHAR` y `TEXT` carecían de cotas numéricas. En bases de datos relacionales, esto genera errores de asignación de memoria e índices ineficientes ante transcripciones de miles de líneas. |

---

## 3. Hallazgos sobre el Contrato de Servicios y Backend

Al evaluar la arquitectura computacional del sistema para soportar el flujo del MVP, se identificaron fallas operativas severas:

### 3.1. Ausencia de Procesamiento Asíncrono para la IA (Riesgo Crítico de Timeout)
- **Problema:** En el diseño preliminar, el envío del chat a la API de Inteligencia Artificial (Gemini / OpenAI) se concebía como una petición HTTP sincrónica estándar (`Request -> Response`).
- **Efecto:** El procesamiento de transcripciones grupales con cientos de mensajes requiere entre 15 y 45 segundos de inferencia en el LLM. Los navegadores y servidores HTTP web cierran la conexión por `Timeout` a los 10 o 30 segundos, provocando que la extensión Chromium fallara de forma sistemática y degradara la experiencia del usuario.

### 3.2. Falta de Automatización en el Estado de Tareas
- **Problema:** La entidad `Tarea_Asignada` cuenta con el campo `Fecha_Limite`, pero el diseño no especificaba ningún mecanismo para actualizar su estado.
- **Efecto:** Las tareas permanecerían perpetuamente en estado `"Pendiente"`, ya que no existía un proceso de fondo que verificara las fechas de expiración para marcarlas como `"Vencida"`.

### 3.3. Contrato de Entrada del Scraper Web (DOM) Indefinido
- **Problema:** No se encontraba especificado el esquema de intercambio entre la extensión web (frontend) y el servidor backend para los nodos extraídos de WhatsApp Web, Discord o Teams.
- **Efecto:** Falta de desacoplamiento entre el script inyectado en el DOM y los controladores del backend.

---

## 4. Correcciones Propuestas y Alternativas Descartadas

Para alcanzar el nivel superior de madurez ingenieril, el equipo no solo propuso soluciones, sino que analizó las alternativas disponibles y justificó su descarte:

```mermaid
graph TD
    subgraph H1 ["Hallazgo 1: Calidad Huérfana"]
        S1["Solución: FK ID_Profesor en Control_Calidad_Bot"]
        A1["Alternativa: Evaluación comunitaria entre estudiantes"]
        S1 -.->|Elegida: Rol Docente es el evaluador institucional| S1
        A1 -.->|Descartada: Pierde rigor académico docente| A1
    end

    subgraph H2 ["Hallazgo 2: Desconexión de Alias"]
        S2["Solución: Tabla intermedia Alias_Estudiante"]
        A2["Alternativa: Obligar al estudiante a cambiar su alias en WhatsApp"]
        S2 -.->|Elegida: No invasiva, preserva usabilidad| S2
        A2 -.->|Descartada: Invasiva y arruina la experiencia de usuario| A2
    end

    subgraph H3 ["Hallazgo 3: Timeout en IA"]
        S3["Solución: Procesamiento asíncrono con Job_ID y Polling"]
        A3["Alternativa: Aumentar timeout del servidor a 10 minutos"]
        S3 -.->|Elegida: Escalable y no bloquea hilos del servidor| S3
        A3 -.->|Descartada: Agota hilos y colapsa el servidor| A3
    end
```

### Tabla Comparativa de Decisiones

| Hallazgo | Corrección Propuesta (Adoptada) | Alternativa Considerada | Motivo del Descarte de la Alternativa |
| :--- | :--- | :--- | :--- |
| **Control de Calidad Huérfana** | Incorporar `ID_Profesor` (FK) a la tabla `Control_Calidad_Bot`. | Permitir evaluación abierta vinculada a `ID_Estudiante`. | Descartada porque, según los perfiles pedagógicos de MODESEC, el docente es el tutor responsable de validar las métricas objetivas de aprendizaje. |
| **Desconexión de Alias** | Crear una relación o catálogo intermedio `Alias_Estudiante` (`ID_Alias`, `Alias_Texto`, `ID_Estudiante`) para homologar apodos de chat con la matrícula oficial. | Obligar por UX al estudiante a renombrar su perfil en WhatsApp/Discord antes de exportar el chat. | Descartada por ser altamente invasiva. WhatsApp y Discord son herramientas personales/académicas mixtas; obligar a modificar el perfil deteriora la adopción. |
| **Procesamiento de IA Sincrónico** | Implementar un servicio asíncrono en el backend: el cliente envía el chat mediante `POST`, el backend encola la tarea y responde inmediatamente con un `Job_ID`. Luego, el cliente consulta el estado (`Polling` o WebSockets). | Aumentar el límite de `Timeout` del servidor a 5 o 10 minutos. | Descartada porque bloquea hilos de conexión en el servidor web. Múltiples equipos enviando chats en paralelo colapsarían la memoria y los sockets del backend. |
| **Actualizador de Tareas** | Diseñar un servicio programado en backend (*Cron Job* o tarea periódica) que revise diariamente las fechas límites de las tareas activas. | Actualizar el estado únicamente cuando el estudiante abra la pantalla de tareas. | Descartada porque si el estudiante no ingresa al sistema, el docente vería tareas con fecha caducada aún marcadas como pendientes en los reportes globales. |

---

## 5. Efecto Conjunto sobre la Implementación de Fase 4

La interconexión de estos hallazgos demostró que la persistencia de datos y la arquitectura de backend debían desacoplarse y robustecerse:

1. **Definición de Arquitectura Backend:** Se resolvió construir un backend modular y desacoplado utilizando **NestJS** y **TypeScript**, permitiendo estructurar servicios REST limpios, controladores y módulos inyectables.
2. **Estrategia Híbrida de Persistencia:** Para resolver la complejidad de almacenar transcripciones desestructuradas de chats masivos (cientos de mensajes con metadatos volátiles) sin saturar un esquema relacional rígido, se introdujo **MongoDB** mediante **Mongoose** en el framework de backend (`sicoco-framework`), manteniendo la concordancia lógica con las entidades de negocio.
3. **Contratos Documentados mediante OpenAPI / Swagger:** Para erradicar la ambigüedad en los endpoints, se configuró Swagger (`@nestjs/swagger`) generando especificaciones interactivas en tiempo real en `/api`.

Este informe de validación técnica constituyó el insumo fundamental para evolucionar el **Modelo Entidad-Relación a la Versión 2 (V2)** y dar paso a la codificación activa del framework backend del proyecto SICOCO durante este semestre.


---
---

# English Version

# Technical Validation Phase: Report U1-01 on Technical Design Audit (Semester IX)

**Course:** 203453 · Design and Development of Educational Software II · Semester IX  
**Institution:** Universidad de Córdoba · Faculty of Education and Human Sciences · Bachelor's in Computer Science Education  
**Lead Faculty Instructor:** Alexander Enrique Toscano Ricardo  
**Development Team:** SICOCO Dev Team (José Daniel Durango Caballero, Jefersson Ramírez Oviedo, Jesús Daniel Ruiz Román, Jeyson David López Gorrostola)  
**Peer Review Team:** EDUQUEST (Jorge Mogollón Díaz, Jorge Guzmán Aguirre, Germán Rivera Rosario)  
**Official Repositories:** `https://github.com/JoseDanielDurango/sicoco-documentation.git` / `sicoco-framework`

---

## 1. Handover Context and Baseline Starting Point

At the start of the **9th semester** within the course **Design and Development of Educational Software II**, the engineering team undertook a formal technical audit of the theoretical and computational architecture developed during the 8th semester in *Design and Development of Educational Software I* (Course 203447).

The objective of this technical validation phase went beyond superficial review: it sought to rigorously verify whether the inherited specification was complete, coherent, and viable for physical software construction (**MVP**), identifying discrepancies, omissions, and operational bottlenecks prior to code development in MODESEC Phase 4.

### Inherited Documentation vs. Missing Documentation

- **Documentation Received:** Technical Design Document and Pedagogical-Computational Foundations, User Story Specifications, and Initial Entity-Relationship Model (19 tables in DBDiagram).
- **Missing Documentation Identified:**
  1. *Backend Services Technical Blueprint:* Complete absence of formal service contracts (REST endpoint definitions, request/response JSON schemas, and HTTP status code mappings).
  2. *Granular Data Dictionary:* Absence of character length bounds for text attributes (`VARCHAR(n)`), creating severe memory overflow risks when handling extensive chat transcripts.

---

## 2. Critical Findings in the Data Model

During the audit of the inherited data model, four structural flaws requiring immediate remediation were identified:

| No. | Finding | Original Location | Flaw Classification | Impact on Physical Implementation |
| :---: | :--- | :--- | :---: | :--- |
| **1** | **Orphan Quality Control Entity** | Chapter VI, Domain 6, Table `Control_Calidad_Bot` | **Omission** | The table lacked a foreign key (`FK`) referencing the evaluator. Accuracy evaluations remained anonymous, eliminating faculty accountability over model audits. |
| **2** | **Disconnection Between Chat Aliases and Real Students** | Chapter VI, Tables `Mensaje_Original` and `Acuerdo_Equipo` | **Inconsistency** | Storing sender aliases as unstructured text (`VARCHAR`) without a cross-reference table to `ID_Estudiante` prevented automated grading attribution and task assignment to enrolled students. |
| **3** | **Session-Agnostic Usability Surveys** | Chapter VI, Domain 6, Tables `Evaluacion_UX` and `Encuesta_Piloto` | **Omission** | Surveys were linked exclusively to individual students rather than specific work sessions (`ID_Sesion`), preventing instructors from assessing the pedagogical success of particular meetings. |
| **4** | **Unbounded Data Lengths** | Chapter VI & Appendix B (DBDiagram) | **Omission** | Attributes `VARCHAR` and `TEXT` lacked explicit bounds. In relational systems, this causes database buffer pool degradation and query performance drops when indexing thousand-line transcripts. |

---

## 3. Findings Concerning Backend Services and APIs

When evaluating computational architecture against MVP runtime demands, severe operational vulnerabilities emerged:

### 3.1. Synchronous AI Processing (Critical HTTP Timeout Risk)
- **Problem:** In the initial specification, transmitting transcripts to the AI API (Gemini / OpenAI) was conceived as a standard synchronous HTTP request (`Request -> Response`).
- **Impact:** Processing collaborative transcripts with hundreds of messages requires 15 to 45 seconds of LLM inference. Web browsers and HTTP reverse proxies close idle connections via `Timeout` after 10 to 30 seconds, causing browser extensions to fail systematically and ruining user experience.

### 3.2. Lack of Automated Task Lifecycle Governance
- **Problem:** Entity `Tarea_Asignada` includes a target deadline field `Fecha_Limite`, but the design omitted any automated status management mechanism.
- **Impact:** Tasks would remain perpetually marked as `"Pending"`, lacking a background daemon to evaluate expiration timestamps and transition them to `"Expired"`.

### 3.3. Undefined Web Scraper (DOM) Ingestion Contract
- **Problem:** The JSON interface between client browser extension scripts and backend ingestion endpoints remained unspecified for extracted WhatsApp Web, Discord, or Teams DOM nodes.
- **Impact:** Tight architectural coupling and fragility between client DOM scrapers and server controllers.

---

## 4. Proposed Remediations and Dismissed Alternatives

To demonstrate engineering rigor, the team designed remediations while formally analyzing and dismissing alternative proposals:

```mermaid
graph TD
    subgraph H1 ["Finding 1: Orphan Quality Control"]
        S1["Solution: FK ID_Profesor in Control_Calidad_Bot"]
        A1["Alternative: Open peer-to-peer student rating"]
        S1 -.->|Adopted: Faculty role is the accredited academic evaluator| S1
        A1 -.->|Dismissed: Lacks academic evaluation rigor| A1
    end

    subgraph H2 ["Finding 2: Alias Disconnection"]
        S2["Solution: Junction mapping table Alias_Estudiante"]
        A2["Alternative: Force students to alter WhatsApp display names"]
        S2 -.->|Adopted: Non-invasive, preserves student UX| S2
        A2 -.->|Dismissed: Invasive and degrades user adoption| A2
    end

    subgraph H3 ["Finding 3: AI Request Timeout"]
        S3["Solution: Asynchronous worker queue with Job_ID & Polling"]
        A3["Alternative: Increase server HTTP timeout to 10 minutes"]
        S3 -.->|Adopted: Scalable and non-blocking| S3
        A3 -.->|Dismissed: Exhausts server worker thread pools| A3
    end
```

### Comparative Architectural Decision Matrix

| Finding | Adopted Remediation | Considered Alternative | Reason for Dismissing Alternative |
| :--- | :--- | :--- | :--- |
| **Orphan Quality Control** | Add `ID_Profesor` (FK) to `Control_Calidad_Bot`. | Permit open evaluation linked to `ID_Estudiante`. | Dismissed because under MODESEC, faculty instructors are the responsible tutors tasked with certifying objective learning outcomes. |
| **Alias Disconnection** | Create an associative catalog `Alias_Estudiante` (`ID_Alias`, `Alias_Texto`, `ID_Estudiante`) to map chat handles to institutional student IDs. | Force students via UX prompt to change their profile names in WhatsApp/Discord before exporting chat logs. | Dismissed as highly invasive. Third-party messaging apps are dual-use (personal/academic); forcing profile modifications degrades student adoption. |
| **Synchronous AI Processing** | Implement asynchronous backend processing: client dispatches `POST`, backend queues the job and replies immediately with a `Job_ID`. Client polls or receives WebSockets updates. | Increase web server `Timeout` thresholds to 5 or 10 minutes. | Dismissed because holding HTTP connections open consumes server threads and sockets. Multiple concurrent teams would crash server memory. |
| **Task Status Governance** | Implement a scheduled background job (*Cron Job*) checking deadlines daily. | Update task status only when a student navigates to the task view. | Dismissed because if a student fails to log in, faculty dashboards would display expired tasks as active pending items. |

---

## 5. Unified Impact on Phase 4 Software Engineering

The convergence of these audit findings dictated that data persistence and backend architecture required decoupling and structural hardening:

1. **Enterprise Backend Architecture:** Selected **NestJS** and **TypeScript**, enabling clean REST service controllers, dependency injection, and scalable modularity.
2. **Hybrid Persistence Strategy:** To resolve the complexity of handling unstructured conversational streams (hundreds of messages with volatile metadata) without saturating a rigid relational schema, **MongoDB** via **Mongoose** was integrated into the backend framework (`sicoco-framework`), maintaining logical fidelity with domain entities.
3. **Documented Contracts via OpenAPI / Swagger:** Configured Swagger (`@nestjs/swagger`) to eliminate API ambiguity, generating interactive live documentation at `/api`.

This technical validation report provided the foundational input that evolved the **Entity-Relationship Model to Version 2 (V2)** and initiated the physical codebase development of the SICOCO platform.
