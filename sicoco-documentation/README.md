# SICOCO: Sintetizador de Co-creación Colaborativa

**Herramienta guiada bajo la metodología MODESEC, enfocada no solo como herramienta técnica de resumen, sino como recurso pedagógico para el aprendizaje colaborativo.**

---

## Contexto Académico e Institucional

Este proyecto es desarrollado por estudiantes de la **Licenciatura en Informática con énfasis en Medios Audiovisuales** de la **Universidad de Córdoba** (Montería, Colombia), bajo la dirección del docente **Alexander Enrique Toscano Ricardo**:
- **8vo Semestre (2026-1):** *Diseño y Desarrollo de Software Educativo I* (Código 203447) — Diagnóstico, fundamentación metodológica, historias de usuario y diseño conceptual de base de datos.
- **9no Semestre (2026-2):** *Diseño y Desarrollo de Software Educativo II* (Código 203453) — Validación técnica formal (U1-01), Modelo Relacional V2 y desarrollo del framework de backend (`sicoco-framework`) en NestJS 12 y MongoDB.

**Equipo de Desarrollo (SICOCO Dev Team):**
- José Daniel Durango Caballero
- Jefersson Ramírez Oviedo
- Jesús Daniel Ruiz Román
- Jeyson David López Gorrostola

---

## Visión General

La expansión de **SICOCO** utilizando la metodología **MODESEC** busca resolver un problema central en la educación y el trabajo colaborativo modernos:

> *La sobrecarga de información que provoca que valiosas ideas se pierdan en chats, foros y salas virtuales de trabajo en equipo.*

### ¿Cómo funciona?

SICOCO identifica de forma estructurada:
- **Qué se dice:** Acuerdos consolidados, desacuerdos y dudas abiertas.
- **Quién lo aporta:** Reconocimiento de autoría para validar participaciones individuales.
- **De qué manera colabora el grupo:** Línea de tiempo interactiva y grafo de co-creación (`Conexion_Idea`).
- **Qué compromisos se generan:** Extracción automatizada de tareas (To-Do) con responsables y fechas límite.

---

## Estructura de Documentación

Toda la documentación se encuentra organizada y estandarizada en inglés dentro de la carpeta `SICOCO/`:

### 1. Marco Base y Fases del Ciclo de Vida (MODESEC)

| N° | Tipo de Documento | Descripción / Enfoque | Enlace |
| :---: | :--- | :--- | :--- |
| **00** | **Base Document** | Documento maestro con el contexto institucional, fundamentación MODESEC, modelo relacional V2 y arquitectura backend. | [00_base_document.md](SICOCO/00_base_document.md) |
| **01** | **Diagnosis** | Fase 1: Delimitación del problema de sobrecarga informativa y perfiles de usuario. | [01_diagnosis.md](SICOCO/01_diagnosis.md) |
| **02** | **Pedagogical Design** | Fase 2: Estructuración pedagógica de los cuatro ejes de resumen y mapa de co-creación. | [02_pedagogical_design.md](SICOCO/02_pedagogical_design.md) |
| **03** | **Computational Design** | Fase 3: Especificaciones iniciales de arquitectura técnica y viabilidad del MVP. | [03_computational_design.md](SICOCO/03_computational_design.md) |
| **04** | **Production & Development** | Fase 4: Directrices de implementación activa para el backend en NestJS y la extensión web. | [04_production_and_development.md](SICOCO/04_production_and_development.md) |
| **05** | **Evaluation** | Fase 5: Metodología de validación en campo (precisión, usabilidad y valor formativo). | [05_evaluation.md](SICOCO/05_evaluation.md) |
| **06** | **Implementation & Monitoring** | Fase 6: Planificación del programa piloto institucional y mantenimiento evolutivo. | [06_implementation_and_monitoring.md](SICOCO/06_implementation_and_monitoring.md) |

### 2. Requerimientos, Diseño de Datos y Metodología (Semestre I)

| N° | Tipo de Documento | Descripción / Enfoque | Enlace |
| :---: | :--- | :--- | :--- |
| **07** | **Data Architecture Interview OG** | Respuestas originales del modelado físico de datos de las 19 tablas. | [07_data_architecture_interview_og.md](SICOCO/07_data_architecture_interview_og.md) |
| **07A** | **Interview Questions** | Cuestionario estructurado de 20 preguntas con el Arquitecto de Datos. | [07A_interview_questions.md](SICOCO/07A_interview_questions.md) |
| **07B** | **Interview Answers** | Respuestas técnicas estructuradas para el levantamiento de entidades y atributos. | [07B_interview_answers.md](SICOCO/07B_interview_answers.md) |
| **08** | **User Stories** | Matriz de historias de usuario y criterios de aceptación en formato Gherkin (5 zonas). | [08_user_stories.md](SICOCO/08_user_stories.md) |
| **09** | **Methodological Foundation** | Soporte pedagógico, enfoque de co-creación y alineación con taxonomías educativas. | [09_methodological_foundation.md](SICOCO/09_methodological_foundation.md) |
| **10** | **Entity Relationship Model** | Definición inicial de las 19 tablas relacionales en código DBML y SQL. | [10_entity_relationship_model.md](SICOCO/10_entity_relationship_model.md) |
| **11** | **Interview Model Comparison** | Matriz de trazabilidad que cruza los requerimientos con las entidades relacionales. | [11_interview_model_comparison.md](SICOCO/11_interview_model_comparison.md) |
| **12** | **Technical Development** | Especificación técnica de componentes, flujos críticos y seguridad del MVP. | [12_technical_development.md](SICOCO/12_technical_development.md) |
| **13** | **First Semester Scope** | Resumen ejecutivo del cierre del 8vo semestre (100% diseño y planificación). | [13_first_semester_scope.md](SICOCO/13_first_semester_scope.md) |

### 3. Avances Técnicos y Construcción de Software (Semestre II)

| N° | Tipo de Documento | Descripción / Enfoque | Enlace |
| :---: | :--- | :--- | :--- |
| **14** | **Technical Design Validation** | Auditoría formal U1-01 del diseño recibido, solución de timeouts en IA y catálogo de alias. | [14_technical_design_validation.md](SICOCO/14_technical_design_validation.md) |
| **15** | **Entity Relationship Model V2** | Esquema mejorado con `Conexion_Idea`, `Evaluacion_UX`, prompt linking y privacidad. | [15_entity_relationship_model_v2.md](SICOCO/15_entity_relationship_model_v2.md) |
| **16** | **Backend Architecture & API** | Especificación técnica del backend en `sicoco-framework` (NestJS 12, MongoDB, Swagger, Vitest). | [16_backend_architecture_and_api.md](SICOCO/16_backend_architecture_and_api.md) |
| **17** | **Second Semester Scope** | Resumen ejecutivo de los avances del 9no semestre y transición a software ejecutable. | [17_second_semester_scope.md](SICOCO/17_second_semester_scope.md) |

---

## Recursos Visuales y Modelos de Datos

En la carpeta [`Resources/`](Resources/):
- **Documento Técnico en Formato APA 7 (.docx):** [`Technical Document.docx`](Resources/Technical%20Document.docx)
- **Diagrama Entidad-Relación V2 (Dark):** [`SICOCO v2.png`](Resources/SICOCO_v2.png)
- **Diagrama Entidad-Relación V2 (Light):** [`SICOCO v2 (Light).png`](Resources/SICOCO_v2_Light.png)
- **Definición DBML V2:** [`diagrama_bd_v2.dbml`](Resources/diagrama_bd_v2.dbml)
- **Documento PDF del Modelo V2:** [`MER - SICOCO.pdf`](Resources/MER%20-%20SICOCO.pdf)
- **Diagrama Relacional V1:** [`DBDiagram.png`](Resources/DBDiagram.png) | [`Modelo Relacion - Entidad V2.png`](Resources/Modelo%20Relacion%20-%20Entidad%20V2.png)

---

## Repositorio del Framework Backend

La implementación de código fuente se encuentra en el proyecto adjunto **`sicoco-framework`**:
- **Stack:** NestJS 12, TypeScript, MongoDB / Mongoose, Swagger UI, Vite / Vitest.
- **Ruta de la API Swagger:** `http://localhost:3000/api`
- **Módulos Activos:** `UsersModule` (`/users`), `CoursesModule` (`/courses`).
