# Comparativa: Modelo Entidad-Relación vs. Entrevista Técnica

**Metodología:** MODESEC | **Proyecto:** Sintetizador de Co-creación Colaborativa (SICOCO)
Universidad de Córdoba · Licenciatura en Informática · Diseño y Desarrollo de Software Educativo I

---

## 1. Introducción y Propósito

El presente documento realiza un análisis comparativo y de trazabilidad entre los requerimientos de información expresados en la **Entrevista Técnica (Respuestas al Cuestionario de Arquitectura de Datos)** y el **Modelo Entidad-Relación (MER)** formalizado para el sistema SICOCO. 

El objetivo es doble:
1. **Garantizar la cobertura total:** Asegurar que cada necesidad de negocio expresada por los stakeholders y estructurada en la entrevista haya sido traducida a tablas, columnas y relaciones específicas en el modelo físico/lógico de la base de datos.
2. **Explicar decisiones de ingeniería:** Justificar aquellas desviaciones o adiciones técnicas introducidas en el MER (tales como tablas intermedias de resolución, auto-relaciones recursivas y campos de auditoría) que, si bien no fueron detalladas de manera verbal en la entrevista, son indispensables para la integridad referencial, la seguridad y el rendimiento del sistema bajo el marco metodológico **MODESEC**.

---

## 2. Matriz de Trazabilidad de Requerimientos

La siguiente tabla detalla la correspondencia entre los 7 bloques de la entrevista (compuestos por 20 preguntas) y los elementos resultantes en el catálogo de entidades del Modelo Entidad-Relación:

| Bloque / Pregunta | Requerimiento de la Entrevista | Entidad(es) MER | Atributo(s) MER Clave | Estado y Observaciones |
| :--- | :--- | :--- | :--- | :--- |
| **Bloque 1: Usuarios y Académico** | | | | |
| **1. Estudiantes** | Registrar identificación, nombres, apellidos, correo institucional, contraseña encriptada, semestre, carrera y fecha de registro. | `Estudiante` | `Numero_Identidad_Matricula`, `Nombres`, `Apellidos`, `Correo_Institucional`, `Contraseña_Encriptada`, `Semestre_Actual`, `Programa_Academico`, `Fecha_Registro`. | **Alineado.** El modelo mapea uno a uno los atributos e introduce `Contraseña_Encriptada` para garantizar accesos seguros. |
| **2. Roles / Docentes** | Soportar roles. Para profesor: número de empleado y departamento. Administradores con permisos superiores. | `Profesor` | `Numero_Empleado`, `Departamento`, `Permiso_Sistema`. | **Alineado.** Se incluye `Permiso_Sistema` en `Profesor` para modelar niveles de acceso. Los administradores se asocian a este control de permisos. |
| **3. Cursos / Asignaturas** | Vincular proyectos a asignaturas/cursos. Registrar código de materia, nombre, periodo académico y docente responsable. | `Curso` | `Codigo_Materia`, `Nombre_Materia`, `Semestre_Academico`, `ID_Profesor_Responsable` (FK). | **Alineado.** Se establece la relación 1:N entre `Profesor` y `Curso` para reflejar la tutoría docente. |
| **4. Equipos** | Crear equipos con un nombre, asociados obligatoriamente al curso y registrando fecha de creación. | `Equipo` | `Nombre_Equipo`, `ID_Curso` (FK), `Fecha_Creacion`. | **Alineado.** Se establece relación N:1 hacia `Curso`. |
| **5. Integrantes** | Gestionar estudiantes que participan en múltiples equipos, indicando fecha de unión y rol en cada uno. | `Miembro_Equipo` | `ID_Estudiante` (FK), `ID_Equipo` (FK), `Rol_En_Equipo`, `Fecha_Union`. | **Alineado.** Se implementa una tabla de intersección para resolver la relación muchos a muchos (N:M). |
| **Bloque 2: Entradas de Datos** | | | | |
| **6. Sesiones de trabajo** | Registrar reuniones con objetivo, fecha/hora y plataforma origen (Discord, WhatsApp, Teams). | `Sesion_Trabajo` | `Objetivo_General`, `Fecha_Reunion`, `Plataforma_Origen`, `Duracion_Estimada`. | **Alineado.** Permite rastrear la sesión de co-creación grupal e introduce la duración como atributo analítico. |
| **7. Registros de chats** | Auditar archivos ingresados. Registrar origen, formato, metadatos y la matrícula del estudiante responsable. | `Registro_Chat` | `Origen_Metadata`, `Formato_Entrada`, `Tamaño_Datos`, `ID_Estudiante_Ingresa` (FK). | **Alineado.** Se crea una entidad independiente para auditar la carga física y desvincularla de la sesión lógica. |
| **8. Mensajes individuales** | Guardar mensajes independientes con marca de tiempo, texto crudo y alias del autor en la plataforma. | `Mensaje_Original` | `Alias_Remitente`, `Cuerpo_Del_Mensaje`, `Fecha_Hora_Mensaje`, `ID_Registro` (FK). | **Alineado.** Estructura el insumo de entrada para el procesamiento del motor de IA. |
| **Bloque 3: Procesamiento IA** | | | | |
| **9. Prompts de IA** | Administrar configuraciones de prompts. Guardar estilo, texto matriz y si está activo o no. | `Configuracion_Prompt` | `Nombre_Estilo`, `Texto_Instruccion_IA`, `Estado_Activo` (Boolean). | **Alineado.** Permite flexibilidad para alternar y configurar prompts (ej. estilos "Rápido" o "Serio"). |
| **10. Resumen generado** | Capturar el texto completo del resumen. Registrar fecha de generación, modelo de IA usado y consumo de tokens. | `Resumen_Generado` | `Texto_Final_Plano`, `Modelo_IA_Usado`, `Consumo_Tokens`, `Fecha_Generacion`, `ID_Sesion` (FK), `ID_Configuracion` (FK). | **Alineado.** Vincula el resultado de la IA con la sesión y la configuración del prompt. |
| **Bloque 4: Pilares de Información** | | | | |
| **11. Acuerdos** | Extraer descripción, nivel de importancia/prioridad y autor (estudiante) que lo propuso. | `Acuerdo_Equipo` | `Descripcion_Solucion`, `Nivel_Importancia`, `Alias_Quien_Propone`. | **Alineado.** Permite almacenar los consensos del grupo. |
| **12. Desacuerdos** | Registrar debates con tema de discusión, descripción de posturas opuestas y estado de resolución (Activo/Resuelto). | `Desacuerdo` | `Tema_Debate`, `Descripcion_Oposicion`, `Estado_Resolucion`. | **Alineado.** Representa los disensos del grupo. |
| **13. Dudas sin resolver** | Resguardar interrogantes con la cita textual y el tema general con el que se relaciona contextualmente. | `Duda_Abierta` | `Pregunta_Principal`, `Relacionado_Con_Tema`. | **Alineado.** Permite enfocar consultas posteriores. |
| **14. Tareas (To-Do)** | Capturar título de la tarea, estudiante responsable, estado (banderas de avance) y fecha límite. | `Tarea_Asignada` | `Titulo_Actividad`, `ID_Estudiante_Asignado` (FK), `Estatus`, `Fecha_Limite`. | **Alineado.** Vincula directamente el entregable con la entidad `Estudiante` registrada. |
| **Bloque 5: Mapeo de Co-Creación** | | | | |
| **15. Línea de tiempo** | Registrar hitos cronológicos con marca de tiempo, usuario autor y tipo de evento (Idea, Solución, Pregunta). | `Momento_Clave_Chat` | `Marca_Tiempo_Aproximada`, `Alias_Usuario`, `Evento`, `ID_Mensaje_Relacionado` (FK). | **Alineado.** Vincula cada hito al mensaje fuente que le dio origen. |
| **16. Red de ideas** | Mapear conexiones cruzadas entre eventos donde una idea influyó o dio paso a otra en el tiempo. | `Conexion_Idea` | `ID_Idea_Base` (FK), `ID_Aporte_Extra` (FK). | **Alineado.** Implementa una auto-relación reflexiva N:M para construir el grafo de co-creación. |
| **Bloque 6: Evaluación y Pruebas** | | | | |
| **17. Test de Precisión** | Auditar resúmenes registrando falsos positivos, fidelidad del texto (1 a 10) y comentarios de incidencias. | `Control_Calidad_Bot` | `Cantidad_Falsos_Positivos`, `Calificacion_Fidelidad_texto`, `Comentario_Tecnico`. | **Alineado.** Permite la auditoría técnica de los resultados del motor. |
| **18. Facilidad de Uso (UX)** | Recopilar métricas de confort visual, claridad en división de vistas y retroalimentación libre. | `Evaluacion_UX` | `Claridad_Visual`, `Separacion_Vista_Tareas`, `Sugerencias_Extra`, `ID_Estudiante` (FK). | **Alineado.** Se asocia al estudiante que provee el feedback. |
| **19. Utilidad Educativa** | Evaluar autopercepción de mejora de metas (Sí/No), nivel de apoyo percibido (escala 1-5) y fecha. | `Encuesta_Piloto` | `Mejor_Comprension_Objetivos`, `Nivel_de_Apoyo_En_Grupo`, `Fecha_Respuesta`, `ID_Estudiante` (FK). | **Alineado.** Permite cuantificar el impacto educativo según el marco MODESEC. |
| **Bloque 7: Infraestructura y Permisos** | | | | |
| **20. Auditoría y Privacidad** | Fechas de creación/cambio en tablas, confidencialidad, aprobación de equipos y blindaje lógico. | Varias tablas | `Created_At`, `Updated_At`, `Es_Confidencial` (en `Registro_Chat`), `Requiere_Aprobacion_Profesor` (en `Equipo`). | **Alineado.** Campos e indicadores añadidos para asegurar la seguridad y gobernanza de la información. |

---

## 3. Decisiones de Diseño y Ajustes de Ingeniería

El paso de requerimientos conceptuales (narrativa de la entrevista) a una estructura relacional rígida requirió la toma de decisiones críticas por parte de arquitectura de datos:

### A. Desacoplamiento de Remitentes de Chat (`Alias_Remitente` vs. `ID_Estudiante`)
* **El Reto:** La entrevista solicita identificar al autor original de cada idea, acuerdo y hito cronológico. Sin embargo, en un flujo real, los chats provienen de plataformas externas (WhatsApp, Discord) donde los participantes usan apodos, nombres de pila o números telefónicos no registrados en la base de datos de SICOCO.
* **La Solución:** En lugar de forzar claves foráneas estrictas hacia la tabla `Estudiante` en las entidades `Mensaje_Original`, `Acuerdo_Equipo` y `Momento_Clave_Chat`, se optó por almacenar el atributo `Alias_Remitente` / `Alias_Usuario` como un campo de texto (`VARCHAR`). Esto evita que el procesamiento del chat falle si hay un participante externo no registrado, preservando la trazabilidad textual. Solo en `Tarea_Asignada` y `Registro_Chat` (acciones internas del sistema) se exige una FK directa al `Estudiante` del sistema.

### B. Estructura de la Línea de Tiempo y Grafo de Ideas (`Conexion_Idea`)
* **El Reto:** Para evidenciar cómo co-crea el grupo, el sistema debe graficar qué idea inicial sirvió de base para otra posterior (ej. "La propuesta del Estudiante A disparó la solución final planteada por el Estudiante B"). Esto representa una estructura de datos de grafo en una base de datos relacional.
* **La Solución:** Se modeló una relación reflexiva muchos a muchos (auto-relación) sobre la entidad `Momento_Clave_Chat` mediante la tabla intermedia `Conexion_Idea`. Con las columnas `ID_Idea_Base` e `ID_Aporte_Extra`, el sistema puede reconstruir cadenas de razonamiento grupal completas sin importar el orden o el número de interacciones.

### C. Normalización y Auditoría de Cargas (`Registro_Chat` y `Mensaje_Original`)
* **El Reto:** Vincular el archivo de chat subido a la reunión de equipo.
* **La Solución:** Se separó la sesión lógica (`Sesion_Trabajo`) del archivo físico que se procesa (`Registro_Chat`). Esto permite que, si un equipo reanuda una sesión y carga múltiples fragmentos de chat, el sistema pueda auditar individualmente quién subió qué archivo, el tamaño del mismo y su formato, manteniendo el historial limpio y normalizado.

---

## 4. Conclusiones y Alineación con la Metodología MODESEC

El análisis comparativo confirma que el Modelo Entidad-Relación de SICOCO cumple plenamente con los objetivos del Producto Mínimo Viable (MVP). 

Desde la perspectiva del **modelo MODESEC**, el diseño relacional no es plano:
* **Garantiza la obtención de evidencias de aprendizaje:** Las tablas del Dominio 4 (`Acuerdo_Equipo`, `Desacuerdo`, `Duda_Abierta`, `Tarea_Asignada`) y Dominio 5 (`Momento_Clave_Chat`) estructuran los datos de tal forma que el docente puede medir de forma exacta el desempeño y el aporte cualitativo de cada estudiante.
* **Incorpora la validación formativa dentro del core de datos:** El Dominio 6 no es un módulo externo; las tablas de test técnico, usabilidad y encuesta piloto están integradas directamente en el esquema, garantizando que el impacto pedagógico pueda ser evaluado cuantitativamente de forma nativa en la plataforma.

En resumen, la arquitectura de datos se presenta robusta, normalizada en tercera forma normal (3FN) para la mayoría de sus procesos transaccionales, y adaptada a la flexibilidad que exige el consumo de servicios de Inteligencia Artificial.
