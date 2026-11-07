# Entrevista Técnica: Arquitectura de Datos de SICOCO

**Rol:** Arquitecto de Datos Senior  
**Objetivo:** Identificar los requerimientos para el modelado de la base de datos relacional del proyecto SICOCO, extrayendo las entidades, atributos y relaciones necesarias.

A continuación, se presentan 20 preguntas que deben realizarse durante la entrevista inicial. Las "Posibles Respuestas" están formuladas directamente para identificar los **tipos de datos y atributos (columnas)** que el sistema debe almacenar.

---

## Bloque 1: Usuarios, Roles y Organización Académica

**1. ¿Qué datos personales y académicos debemos registrar sobre cada estudiante que utilice SICOCO?**
> **Posible Respuesta (Datos):** Entidad `Estudiante` necesita almacenar: `ID_Estudiante` (Llave primaria), `Numero_Identidad_Matricula`, `Nombres`, `Apellidos`, `Correo_Institucional`, `Contraseña_Encriptada`, `Semestre_Actual`, `Programa_Academico` (Ej. Lic. en Informática), y `Fecha_Registro`.

**2. ¿Existen otros tipos de usuarios en el sistema además de los estudiantes, como profesores o administradores?**
> **Posible Respuesta (Datos):** Sí, necesitamos una entidad `Rol` o bien atributos extendidos para `Profesor`: `ID_Profesor`, `Numero_Empleado`, `Nombres`, `Apellidos`, `Departamento`, y nivel de `Permiso_Sistema`.

**3. ¿Cómo organizamos a los estudiantes académicamente dentro del sistema?**
> **Posible Respuesta (Datos):** A través de asignaturas o cursos. Entidad `Curso`: `ID_Curso`, `Codigo_Materia`, `Nombre_Materia` (Ej. Diseño de Software Educativo I), `Semestre_Academico` (Ej. 2026-1), y `ID_Profesor_Responsable`.

**4. Ya que SICOCO se basa en proyectos grupales, ¿cómo estructuramos los equipos de trabajo?**
> **Posible Respuesta (Datos):** Entidad `Equipo`: `ID_Equipo`, `Nombre_Equipo`, `ID_Curso` (asociado a qué curso pertenece), y `Fecha_Creacion`.

**5. ¿Cómo gestionamos a los integrantes de los equipos? ¿Un estudiante puede estar en varios equipos?**
> **Posible Respuesta (Datos):** Sí, se necesita una tabla intermedia `Miembro_Equipo`: `ID_Relacion`, `ID_Estudiante`, `ID_Equipo`, `Rol_En_Equipo` (Ej. Líder, Participante), y `Fecha_Union`.

---

## Bloque 2: Entradas de Datos (Chats y Sesiones de Trabajo)

**6. Cuando un equipo se reúne a discutir un proyecto, ¿qué datos guarda SICOCO de la propia reunión o sesión?**
> **Posible Respuesta (Datos):** Entidad `Sesion_Trabajo`: `ID_Sesion`, `ID_Equipo`, `Fecha_Reunion`, `Objetivo_General`, `Plataforma_Origen` (Ej. Discord, Teams, WhatsApp), y `Duracion_Estimada`.

**7. Los usuarios proveen el registro de su chat al sistema. ¿Qué información guardamos sobre este ingreso?**
> **Posible Respuesta (Datos):** Entidad `Registro_Chat`: `ID_Registro`, `ID_Sesion`, `Origen_Metadata` (URL, Path o Buffer), `Formato_Entrada` (txt, csv, JSON), `Tamaño_Datos`, y el `ID_Estudiante_Ingresa`. *(Nota: Entidad sujeta a la arquitectura de ingreso final).*

**8. Antes del resumen, ¿es necesario guardar cada mensaje individual del chat en la base de datos por separado?**
> **Posible Respuesta (Datos):** Serviría mucho para precisión. Entidad `Mensaje_Original`: `ID_Mensaje`, `ID_Registro`, `Alias_Remitente`, `Cuerpo_Del_Mensaje` (Texto), `Fecha_Hora_Mensaje` (Timestamp).

---

## Bloque 3: Procesamiento de IA (Ingeniería de Prompts y Motor)

**9. SICOCO utiliza distintos "tonos" o configuraciones para decirle a la IA cómo resumir. ¿Cómo guardamos estas instrucciones maestras (prompts)?**
> **Posible Respuesta (Datos):** Entidad `Configuracion_Prompt`: `ID_Configuracion`, `Nombre_Estilo` (Ej. Rápido, Serio/Formal), `Texto_Instruccion_IA`, y `Estado_Activo` (Booleano).

**10. ¿Qué detalles guardamos cuando el sistema finalmente produce un resumen del chat entero?**
> **Posible Respuesta (Datos):** Entidad `Resumen_Generado`: `ID_Resumen`, `ID_Sesion`, `ID_Configuracion` (FK a Configuracion_Prompt), `Texto_Final_Plano` (por si la vista falla), `Modelo_IA_Usado` (Ej. Gemini-1.5, OpenAI), `Consumo_Tokens`, y `Fecha_Generacion`.

---

## Bloque 4: Pilares de Información (Los 4 Puntos Clave de Salida)

**11. Del punto pedagógico, sabemos que debemos capturar "Acuerdos". ¿Qué atributos componen un "Acuerdo"?**
> **Posible Respuesta (Datos):** Entidad `Acuerdo_Equipo`: `ID_Acuerdo`, `ID_Resumen`, `Descripcion_Solucion`, `Nivel_Importancia` (Alto/Medio/Bajo), y el/los `Alias_Quien_Propone`.

**12. También el resumen separa "Desacuerdos o Posturas Encontradas". ¿Qué datos nos pide esto?**
> **Posible Respuesta (Datos):** Entidad `Desacuerdo`: `ID_Desacuerdo`, `ID_Resumen`, `Tema_Debate`, `Descripcion_Oposicion`, y `Estado_Resolucion` (Resuelto / Activo).

**13. Para las "Dudas sin Resolver" que quedan al final de la reunión, ¿qué debemos registrar?**
> **Posible Respuesta (Datos):** Entidad `Duda_Abierta`: `ID_Duda`, `ID_Resumen`, `Pregunta_Principal`, `Relacionado_Con_Tema` (Ej. Base de datos, Interfaz).

**14. SICOCO crea un "To-Do" (Tareas a hacer). ¿Cuáles son las columnas indispensables para la base de datos de las Tareas?**
> **Posible Respuesta (Datos):** Entidad `Tarea_Asignada`: `ID_Tarea`, `ID_Resumen`, `Titulo_Actividad`, `ID_Estudiante_Asignado` (FK al estudiante), `Estatus` (Pendiente, En Proceso, Hecha), y `Fecha_Limite` o sugerida.

---

## Bloque 5: Mapeo de Co-Creación (Línea de Tiempo)

**15. Mencionaste mostrar cómo evolucionan las ideas con una "Línea de tiempo". ¿Cómo guardaremos esta cronología de forma estructurada?**
> **Posible Respuesta (Datos):** Entidad `Momento_Clave_Chat`: `ID_Momento`, `ID_Resumen`, `Marca_Tiempo_Aproximada`, `ID_Mensaje_Relacionado`, `Alias_Usuario`, y `Evento` ("Idea Nueva", "Solución", "Pregunta").

**16. ¿La base de datos buscará relacionar u enlazar quién aportó a la solución final de qué otra persona?**
> **Posible Respuesta (Datos):** Puede requerir una Tabla de Relación Recursiva o intermedia `Conexion_Idea`: `ID_Idea_Base`, `ID_Aporte_Extra`, para dibujar cómo las ideas se alimentan mutuamente en la vista.

---

## Bloque 6: Evaluación y Pruebas (Feedback de la Herramienta)

**17. Si hacemos una prueba técnica al resumen (Fase 5), ¿qué información se audita sobre la calidad del resumen?**
> **Posible Respuesta (Datos):** Entidad `Control_Calidad_Bot`: `ID_Test`, `ID_Resumen`, `Cantidad_Falsos_Positivos`, `Calificacion_Fidelidad_texto` (Del 1 al 10), y `Comentario_Técnico`.

**18. En la "Prueba de Facilidad de Uso", recogeremos datos de experiencia del usuario (UX). ¿Qué se guardará aquí?**
> **Posible Respuesta (Datos):** Entidad `Evaluacion_UX`: `ID_Eval_UX`, `ID_Estudiante`, `Claridad_Visual` (1-5), `Separacion_Vista_Tareas` (Booleano: ¿Fue claro?), y `Sugerencias_Extra` (Texto grande).

**19. Queremos medir el impacto educativo en los estudiantes (si sienten que mejoró su trabajo). ¿Qué atributos forman esa encuesta de "Utilidad"?**
> **Posible Respuesta (Datos):** Entidad `Encuesta_Piloto`: `ID_Encuesta`, `ID_Estudiante`, `Mejor_Comprension_Objetivos_Si_No` (Booleano), `Nivel_de_Apoyo_En_Grupo` (Escala Likert 1 al 5), y `Fecha_Respuesta`.

---

## Bloque 7: Escalabilidad, Privacidad y Seguridad

**20. Como SICOCO alberga los chats de personas y puede escalar a un entorno universitario permanente, ¿qué campos de infraestructura y permisos tenemos para asegurar su privacidad?**
> **Posible Respuesta (Datos):** Cada tabla requerirá campos de `Created_At` (Fecha creación) y `Updated_At`. El registro del chat tendrá una bandera `Es_Confidencial` y los equipos de trabajo `Requiere_Aprobacion_Profesor`. Los IDs deben ser encriptados o en formato UUID para evitar fuga o que otros equipos miren los acuerdos de la competencia.
