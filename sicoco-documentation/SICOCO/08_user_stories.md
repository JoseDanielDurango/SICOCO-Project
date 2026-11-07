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
