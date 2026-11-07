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
