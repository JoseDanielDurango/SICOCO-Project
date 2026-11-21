# Matriz de Historias de Usuario - Proyecto SICOCO

**Basado en Arquitectura de Datos y Metodología MODESEC**

---

## ZONA 1: Usuarios, Roles y Organización (PER)
**Entidades:** Estudiante, Profesor, Administrador, Curso y Equipo.

| ID | Historia (Como / Quiero / Para) | Valor | Prioridad | Dependencias | Criterios de aceptación |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **PER-01** | Como estudiante, quiero registrarme con mi ID, programa y semestre para ser identificado en el sistema. | Alta | Must | Ninguna | Dado que ingreso mis datos académicos.<br>Cuando guardo<br>Entonces se crea el registro en la entidad Estudiante. |
| **PER-02** | Como docente, quiero vincularme a una asignatura para supervisar los grupos de trabajo. | Alta | Must | PER-01 | Dado que el usuario tiene rol Docente.<br>Cuando selecciona una asignatura<br>Entonces queda asignado como mentor del curso. |
| **PER-03** | Como estudiante, quiero poder actualizar mi contraseña desde mi perfil para mantener mi cuenta segura sin depender de envíos de correo. | Media | Should | PER-01 | Dado que estoy logueado.<br>Cuando voy a mi perfil y edito la clave<br>Entonces se actualiza en la base de datos localmente. |
| **PER-04** | Como integrante de equipo, quiero ser vinculado a un ID_Equipo para trabajar colaborativamente. | Alta | Must | PER-01 | Dado un grupo creado.<br>Cuando el admin me añade<br>Entonces mi ID se relaciona con el ID_Equipo. |

---

## ZONA 2: Entradas y Sesiones de Trabajo (SES)
**Manejo de la entidad:** Reunión, Registro_Chat y Mensajes individuales.

| ID | Historia (Como / Quiero / Para) | Valor | Prioridad | Dependencias | Criterios de aceptación |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **SES-01** | Como estudiante, quiero crear una Sesión de Trabajo con fecha y hora para iniciar la co-creación. | Alta | Must | PER-04 | Dado un ID_Equipo.<br>Cuando se abre la sesión<br>Entonces se genera el registro en la entidad Sesion_Trabajo. |
| **SES-02** | Como estudiante, quiero ingresar el historial de chat para que el sistema administre el registro físico/digital. | Alta | Must | SES-01 | Dado un registro de chat.<br>Cuando se ingresa<br>Entonces se guarda la ruta, origen o metadata en la tabla Registro. |
| **SES-03** | Como sistema, quiero separar los mensajes individuales (Cuerpo y Autor) para analizarlos por separado. | Alta | Must | SES-02 | Dado un registro ingresado.<br>Cuando se procesa<br>Entonces cada línea se guarda con su ID_Autor y Marca_Tiempo. |
| **SES-04** | Como usuario, quiero ver el historial de registros ingresados por sesión para evitar duplicar información. | Media | Should | SES-02 | Dado una sesión activa.<br>Cuando consulto registros<br>Entonces el sistema lista las fechas y orígenes de carga. |

---

## ZONA 3: Motor de IA y Procesamiento (IA)
**Uso de:** Ingeniería de Prompts y categorización (Acuerdos, Tareas, Dudas).

| ID | Historia (Como / Quiero / Para) | Valor | Prioridad | Dependencias | Criterios de aceptación |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **IA-01** | Como sistema, quiero categorizar mensajes en Acuerdos, Dudas y Tareas para estructurar la síntesis. | Alta | Must | SES-03 | Dado el texto del chat.<br>Cuando la IA procesa<br>Entonces asigna una categoría a cada punto clave. |
| **IA-02** | Como sistema, quiero extraer tareas (To-Do) con descripción y responsable para organizar el trabajo. | Alta | Must | IA-01 | Dado un compromiso detectado.<br>Cuando la IA lo procesa<br>Entonces se crea una fila en la tabla Tarea con su Responsable. |
| **IA-03** | Como estudiante, quiero que la IA identifique dudas sin resolver para que el grupo las retome luego. | Media | Should | IA-01 | Dado una pregunta sin respuesta en el chat.<br>Cuando termina el análisis<br>Entonces se lista en Dudas_Pendientes. |
| **IA-04** | Como sistema, quiero identificar los temas más repetidos (palabras clave) para que el grupo sepa en qué se enfocaron más. | Baja | Could | IA-01 | Dado el texto del chat.<br>Cuando la IA procesa<br>Entonces genera una lista simple de los temas más frecuentes. |

---

## ZONA 4: Visualización y Línea de Tiempo (GUI)
**Entidades:** Mapeo de Co-creación y visualización de hitos.

| ID | Historia (Como / Quiero / Para) | Valor | Prioridad | Dependencias | Criterios de aceptación |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **GUI-01** | Como estudiante, quiero ver una línea de tiempo con los hitos del chat para entender la evolución de las ideas. | Alta | Should | IA-01 | Dado el resumen generado.<br>Cuando cargo la vista<br>Entonces se muestran los elementos de la tabla Hito_Cronologico. |
| **GUI-02** | Como usuario, quiero ver el nombre del autor original junto a cada acuerdo o idea para reconocer quién lo propuso. | Media | Should | GUI-01 | Dado un resumen generado.<br>Cuando leo los acuerdos<br>Entonces veo el alias del autor al lado en texto plano. |
| **GUI-03** | Como estudiante, quiero elegir entre un estilo de resumen Serio o Rápido según mi necesidad. | Media | Could | IA-04 | Dado el resumen finalizado.<br>Cuando selecciono estilo<br>Entonces la visualización cambia el nivel de detalle. |
| **GUI-04** | Como estudiante, quiero ver el resumen dividido por categorías para leer solo lo que me interesa. | Alta | Must | IA-01 | Dado el resumen generado.<br>Cuando se carga el dashboard<br>Entonces aparecen pestañas por cada categoría. |

---

## ZONA 5: Evaluación y Seguridad (EVA)
**Control de Calidad:** Auditoría y Privacidad (Created_At, Updated_At).

| ID | Historia (Como / Quiero / Para) | Valor | Prioridad | Dependencias | Criterios de aceptación |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **EVA-01** | Como docente, quiero calificar la fidelidad del resumen (1-10) para evaluar el desempeño técnico. | Media | Should | GUI-01 | Dado un resumen revisado.<br>Cuando el docente califica<br>Entonces se guarda en Control_Calidad_IA. |
| **EVA-02** | Como estudiante, quiero poder editar manualmente el resumen generado por la IA para corregir pequeños errores antes de guardarlo. | Alta | Must | GUI-01 | Dado un resumen en pantalla.<br>Cuando presiono "Editar"<br>Entonces se abre un campo de texto para corregirlo y guardarlo. |
| **EVA-03** | Como administrador, quiero un historial de modificaciones para auditar quién cambió un resumen. | Alta | Must | GUI-01 | Dado un cambio en los datos.<br>Cuando se guarda<br>Entonces se actualiza el campo Updated_At y el ID_Editor. |
| **EVA-04** | Como sistema, quiero restringir el acceso a usuarios no autorizados para proteger la privacidad del grupo. | Alta | Must | PER-04 | Dado un intento de consulta anónima.<br>Cuando se valida el rol<br>Entonces el sistema bloquea la vista si no pertenece al equipo. |


---
---

# English Version

# User Story Matrix - SICOCO Project

**Based on Data Architecture and the MODESEC Methodology**

---

## ZONE 1: Users, Roles, and Academic Organization (PER)
**Entities:** Student, Professor, Administrator, Course, and Team.

| ID | Story (As a / I want / So that) | Value | Priority | Dependencies | Acceptance Criteria |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **PER-01** | As a student, I want to register with my institutional ID, academic program, and semester to be identified within the system. | High | Must | None | Given that I enter my academic credentials.<br>When I save<br>Then a record is created in the Student entity. |
| **PER-02** | As an instructor, I want to link myself to an academic subject to supervise project teams. | High | Must | PER-01 | Given that the user possesses the Instructor role.<br>When they select a course<br>Then they are assigned as the course faculty supervisor. |
| **PER-03** | As a student, I want to update my password directly from my profile to maintain account security without relying on email recovery flows. | Medium | Should | PER-01 | Given that I am authenticated.<br>When I navigate to my profile and edit my password<br>Then it is updated locally in the database. |
| **PER-04** | As a team member, I want to be associated with a Team_ID to collaborate with my peers. | High | Must | PER-01 | Given an existing team.<br>When the administrator or team leader adds me<br>Then my student ID is linked to the Team_ID. |

---

## ZONE 2: Data Ingestion and Work Sessions (SES)
**Entities Handled:** Meeting, Chat_Record, and Atomic Messages.

| ID | Story (As a / I want / So that) | Value | Priority | Dependencies | Acceptance Criteria |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **SES-01** | As a student, I want to create a Work Session with date and timestamp to initiate collaborative co-creation. | High | Must | PER-04 | Given a valid Team_ID.<br>When the session is opened<br>Then a record is persisted in the Work_Session entity. |
| **SES-02** | As a student, I want to upload chat history so the platform can govern physical/digital transcripts. | High | Must | SES-01 | Given a chat export file.<br>When it is submitted<br>Then file path, origin platform, and metadata are saved in the Record table. |
| **SES-03** | As the system, I want to parse individual messages (Content and Sender) to analyze them atomically. | High | Must | SES-02 | Given an ingested chat log.<br>When it is processed<br>Then each line is stored with its Author_ID and Timestamp. |
| **SES-04** | As a user, I want to view the history of uploads per session to avoid submitting duplicate logs. | Medium | Should | SES-02 | Given an active session.<br>When I query transcripts<br>Then the system lists upload dates, sizes, and source channels. |

---

## ZONE 3: AI Engine and Processing (IA)
**Capabilities:** Prompt Engineering and Categorization (Agreements, Tasks, Doubts).

| ID | Story (As a / I want / So that) | Value | Priority | Dependencies | Acceptance Criteria |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **IA-01** | As the system, I want to classify messages into Agreements, Doubts, and Tasks to structure the synthesis. | High | Must | SES-03 | Given the raw conversational text.<br>When the AI pipeline executes<br>Then it assigns a pedagogical category to each key point. |
| **IA-02** | As the system, I want to extract Action Items (To-Do) with descriptions and assignees to organize collaborative commitments. | High | Must | IA-01 | Given an extracted commitment.<br>When the AI parses it<br>Then a row is generated in the Task table with its assigned member. |
| **IA-03** | As a student, I want the AI to capture unresolved doubts so the team can address them later. | Medium | Should | IA-01 | Given an unanswered question in the chat transcript.<br>When analysis completes<br>Then it is compiled in the Unresolved_Doubts registry. |
| **IA-04** | As the system, I want to identify high-frequency discussion topics (keywords) so the group recognizes where their focus was centered. | Low | Could | IA-01 | Given the chat transcript text.<br>When the AI executes<br>Then it produces a concise list of recurring topics. |

---

## ZONE 4: Visualization and Co-Creation Timeline (GUI)
**Entities:** Co-Creation Mapping and Chronological Milestones.

| ID | Story (As a / I want / So that) | Value | Priority | Dependencies | Acceptance Criteria |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **GUI-01** | As a student, I want to view an interactive timeline with chat milestones to trace the evolution of our ideas. | High | Should | IA-01 | Given a generated summary.<br>When the dashboard view renders<br>Then elements from the Chronological_Milestone table are displayed. |
| **GUI-02** | As a user, I want to see the original author's name alongside each agreement or idea to acknowledge individual attribution. | Medium | Should | GUI-01 | Given an AI-generated synthesis.<br>When I review agreements<br>Then the author's alias is explicitly displayed adjacent to the text. |
| **GUI-03** | As a student, I want to select between a Formal or Rapid summary style depending on our immediate need. | Medium | Could | IA-04 | Given completed synthesis results.<br>When I toggle styles<br>Then the rendered view dynamically adjusts its level of granularity. |
| **GUI-04** | As a student, I want to navigate the summary partitioned by tabs to read only the section relevant to me. | High | Must | IA-01 | Given a completed synthesis.<br>When the dashboard renders<br>Then distinct tabs appear for each pedagogical category. |

---

## ZONE 5: Evaluation and Security (EVA)
**Quality Assurance:** Auditability and Privacy (Created_At, Updated_At).

| ID | Story (As a / I want / So that) | Value | Priority | Dependencies | Acceptance Criteria |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **EVA-01** | As an instructor, I want to score summary fidelity (1-10 scale) to audit technical model performance. | Medium | Should | GUI-01 | Given a reviewed summary.<br>When the faculty member submits a score<br>Then it is recorded in the AI_Quality_Control table. |
| **EVA-02** | As a student, I want to manually edit the AI-generated summary to rectify minor discrepancies before persistence. | High | Must | GUI-01 | Given an on-screen summary.<br>When I select "Edit"<br>Then an editable text field allows corrections before final saving. |
| **EVA-03** | As an administrator, I want a modification history to audit who altered an existing summary. | High | Must | GUI-01 | Given a modification to summary data.<br>When saved<br>Then the system updates the Updated_At timestamp and Editor_ID. |
| **EVA-04** | As the system, I want to restrict access to unauthorized users to safeguard team privacy. | High | Must | PER-04 | Given an unauthenticated or unauthorized query attempt.<br>When user role and team membership are checked<br>Then access is denied if the user does not belong to the team. |
