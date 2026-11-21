# Entrevista Técnica: Arquitectura de Datos de SICOCO (Cuestionario)

**Rol:** Arquitecto de Datos Senior  
**Objetivo:** Identificar los requerimientos para el modelado de la base de datos relacional del proyecto SICOCO, extrayendo estructuralmente todas las futuras necesidades a través de la siguiente guía de entrevista.

A continuación, se presentan 20 preguntas diseñadas para descubrir a fondo la estructura de información de este entorno.

---

## Bloque 1: Usuarios, Roles y Organización Académica

**1.** ¿Qué datos personales y académicos debemos registrar sobre cada estudiante que utilice SICOCO?  
**2.** ¿Existen otros tipos de usuarios en el sistema además de los estudiantes, como profesores o administradores?  
**3.** ¿Cómo organizamos a los estudiantes académicamente dentro del sistema?  
**4.** Ya que SICOCO se basa en proyectos grupales, ¿cómo estructuramos los equipos de trabajo?  
**5.** ¿Cómo gestionamos a los integrantes de los equipos? ¿Un estudiante puede estar en varios equipos a la vez?

---

## Bloque 2: Entradas de Datos (Chats y Sesiones de Trabajo)

**6.** Cuando un equipo se reúne a discutir un proyecto o tema, ¿qué datos guarda SICOCO de la propia reunión o sesión?  
**7.** Sabiendo que los usuarios proveerán el registro del chat al sistema. ¿Qué información administramos sobre este registro (físico o digital) que ingresa?  
**8.** Antes incluso de generar un resumen con IA, ¿es necesario guardar cada uno de los mensajes individuales del chat original por separado?

---

## Bloque 3: Procesamiento de IA (Ingeniería de Prompts y Motor)

**9.** SICOCO utiliza distintos "estilos" (rápido, serio) para decirle a la IA cómo hacer su trabajo. ¿Cómo guardamos estas "instrucciones maestras"?  
**10.** Y ahora bien, ¿qué detalles guardamos luego de que el sistema procesa el texto y emite el resumen general?

---

## Bloque 4: Pilares de Información (Los 4 Puntos Clave de Salida)

**11.** De todo el texto, sabemos que la IA rescata "Acuerdos". Viéndolo como en una tabla estructural, ¿qué detalles concretos de un acuerdo se deben almacenar?  
**12.** Al enfocarnos en los "Desacuerdos o Posturas Encontradas" rescatados, ¿qué tipo de reporte en datos nos exige dejarlo plasmado?  
**13.** En lo que respecta a las "Dudas sin Resolver" que se quedan al aire en las reuniones de los alumnos, ¿cómo lo guardaríamos?  
**14.** SICOCO también organiza tareas a seguir ("To-Do"). ¿Cuáles son las partes inquebrantables que conforman una "Tarea" en toda plataforma funcional?

---

## Bloque 5: Mapeo de Co-Creación (Línea de Tiempo)

**15.** Se mencionaba que la interfaz tiene una línea de tiempo para ver la evolución y el nacimiento de las ideas fuertes del grupo, ¿qué elementos formales la componen?  
**16.** ¿En nuestra estructura, vamos a almacenar la interconexión entre la contribución de alguien y la solución o respuesta que terminó apoyando en el tiempo?

---

## Bloque 6: Evaluación y Pruebas (Feedback de la Herramienta)

**17.** Cuando lleguemos a aplicarle el Test de Precisión Técnica (Fase 5) a la programación base, ¿qué datos formales se guardarán sobre el desempeño del resumen?  
**18.** Refiriéndonos explícitamente a la "Revisión de Uso", recogeremos datos de si los colores y tableros les fueron entendibles. ¿Qué valores son recolectados?  
**19.** Como el proyecto exige medir la "Utilidad Educativa Formativa", necesitamos evaluar si los alumnos se sintieron más enfocados gracias a SICOCO. ¿Qué recogeremos de aquí?

---

## Bloque 7: Escalabilidad, Privacidad y Seguridad

**20.** Conforme este sistema crezca almacenando mensajes estudiantiles para toda la universidad, ¿qué consideraciones elementales en cuanto a registro y privacidad exigen las bases de datos modernas?

---
---

# English Version

# Technical Interview: SICOCO Data Architecture (Questionnaire)

**Role:** Senior Data Architect  
**Objective:** Identify the core data modeling requirements for the relational and document database architecture of SICOCO, extracting structural specifications through the following structured questionnaire.

The following 20 questions are designed to systematically uncover the information architecture of the platform.

---

## Block 1: Users, Roles, and Academic Organization

**1.** What personal and academic attributes must be recorded for each student using SICOCO?  
**2.** Are there other user types within the system besides students, such as instructors or system administrators?  
**3.** How are students organized academically within the institutional hierarchy?  
**4.** Given that SICOCO focuses on collaborative team deliverables, how do we structure collaborative workgroups?  
**5.** How are team memberships managed? Can a single student belong to multiple teams concurrently?

---

## Block 2: Data Ingestion (Chat Logs and Work Sessions)

**6.** When a team meets to discuss a project, what attributes does SICOCO record regarding the meeting session itself?  
**7.** Given that users supply conversation transcripts, what metadata is tracked for each ingested chat payload?  
**8.** Prior to generating the AI synthesis, is it mandatory to preserve each individual chat message discretely?

---

## Block 3: AI Processing (Prompt Engineering and Inference Engine)

**9.** SICOCO supports multiple synthesis profiles (formal academic, rapid agile). How do we persist these master prompt instructions?  
**10.** What execution metadata and telemetries are captured once the AI model processes a transcript and outputs a summary?

---

## Block 4: Output Pillars (The 4 Pedagogical Takeaways)

**11.** Looking at "Agreements" structurally, what concrete attributes must be persisted for each recorded consensus?  
**12.** When capturing "Disagreements or Opposing Views", what data model schema best represents cognitive friction and unresolved debate?  
**13.** Regarding "Unresolved Doubts" left open during student sessions, what properties must be documented?  
**14.** SICOCO organizes commitments into action items ("To-Do"). What non-negotiable fields constitute an assigned task in a collaborative system?

---

## Block 5: Co-Creation Mapping (Interactive Timeline)

**15.** The user interface visualizes ideation evolution through a timeline; what formal entities and attributes comprise this structure?  
**16.** Does the data architecture capture recursive interconnections showing which prior student contribution inspired a subsequent solution?

---

## Block 6: Evaluation, UX, and Field Feedback

**17.** During technical accuracy benchmarking (Phase 5), what metrics are logged regarding synthesis precision and hallucination rates?  
**18.** Concerning usability reviews (UX), what metrics assess whether color palettes and board layouts were clear to students?  
**19.** To measure formative pedagogical utility, how do we record whether students felt more focused and supported by SICOCO?

---

## Block 7: Scalability, Privacy, and Security

**20.** As the system scales to accommodate student conversations across the university, what privacy flags, audit timestamps, and security constraints must modern databases enforce?
