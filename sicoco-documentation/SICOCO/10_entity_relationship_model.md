# Modelo Entidad-Relación — SICOCO
**Sintetizador de Co-creación Colaborativa**
Universidad de Córdoba · Licenciatura en Informática · Metodología MODESEC

---

## 1. Introducción

El presente informe describe formalmente el Modelo Entidad-Relación (MER) del sistema SICOCO. La base de datos está organizada en seis dominios funcionales: gestión de usuarios y roles, organización académica, sesiones de trabajo colaborativo, procesamiento IA y generación de resúmenes, mapeo de co-creación, y evaluación/control de calidad. En total el modelo contempla **19 entidades**, con relaciones de cardinalidad N:1, N:M y 1:1.

---

## 2. Catálogo de Entidades y Atributos

### 2.1 `Estudiante`

Representa a cada usuario con rol de aprendiz registrado en el sistema.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Estudiante` | INTEGER (PK) | Identificador único del estudiante |
| `Numero_Identidad_Matricula` | VARCHAR | Código de matrícula institucional |
| `Nombres` | VARCHAR | Nombres del estudiante |
| `Apellidos` | VARCHAR | Apellidos del estudiante |
| `Correo_Institucional` | VARCHAR | Correo universitario (usado para acceso) |
| `Contraseña_Encriptada` | VARCHAR | Hash de la contraseña (nunca en texto plano) |
| `Semestre_Actual` | INTEGER | Semestre en curso al momento del registro |
| `Programa_Academico` | VARCHAR | Programa o carrera del estudiante |
| `Fecha_Registro` | TIMESTAMP | Fecha y hora de creación de la cuenta |

---

### 2.2 `Profesor`

Representa al docente o evaluador que supervisa cursos y grupos.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Profesor` | INTEGER (PK) | Identificador único del profesor |
| `Numero_Empleado` | VARCHAR | Código institucional del docente |
| `Nombres` | VARCHAR | Nombres del profesor |
| `Apellidos` | VARCHAR | Apellidos del profesor |
| `Departamento` | VARCHAR | Departamento académico al que pertenece |
| `Permiso_Sistema` | INTEGER | Nivel de acceso y permisos en la plataforma |

---

### 2.3 `Curso`

Representa una asignatura académica en un semestre específico.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Curso` | INTEGER (PK) | Identificador único del curso |
| `Codigo_Materia` | VARCHAR | Código oficial de la asignatura |
| `Nombre_Materia` | VARCHAR | Nombre descriptivo de la asignatura |
| `Semestre_Academico` | VARCHAR | Período académico (ej. "2025-I") |
| `ID_Profesor_Responsable` | INTEGER (FK) | Profesor asignado al curso |

---

### 2.4 `Equipo`

Agrupa a un conjunto de estudiantes dentro de un curso para trabajar colaborativamente.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Equipo` | INTEGER (PK) | Identificador único del equipo |
| `Nombre_Equipo` | VARCHAR | Nombre del equipo de trabajo |
| `ID_Curso` | INTEGER (FK) | Curso al que pertenece el equipo |
| `Fecha_Creacion` | TIMESTAMP | Fecha de conformación del equipo |

---

### 2.5 `Miembro_Equipo`

Tabla de intersección que resuelve la relación muchos a muchos entre `Estudiante` y `Equipo`, añadiendo atributos propios de la membresía.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Relacion` | INTEGER (PK) | Identificador único de la relación |
| `ID_Estudiante` | INTEGER (FK) | Estudiante miembro |
| `ID_Equipo` | INTEGER (FK) | Equipo al que pertenece |
| `Rol_En_Equipo` | VARCHAR | Rol desempeñado (líder, desarrollador, diseñador, etc.) |
| `Fecha_Union` | TIMESTAMP | Fecha en que el estudiante se unió al equipo |

---

### 2.6 `Sesion_Trabajo`

Registra cada reunión o sesión de trabajo colaborativo de un equipo.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Sesion` | INTEGER (PK) | Identificador único de la sesión |
| `ID_Equipo` | INTEGER (FK) | Equipo que realizó la sesión |
| `Fecha_Reunion` | TIMESTAMP | Fecha y hora de la reunión |
| `Objetivo_General` | TEXT | Descripción del propósito de la sesión |
| `Plataforma_Origen` | VARCHAR | Plataforma del chat (WhatsApp, Discord, Teams, etc.) |
| `Duracion_Estimada` | INTEGER | Duración estimada en minutos |

---

### 2.7 `Registro_Chat`

Representa la carga física o digital de un historial de conversación para su procesamiento.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Registro` | INTEGER (PK) | Identificador único del registro |
| `ID_Sesion` | INTEGER (FK) | Sesión de trabajo a la que pertenece |
| `Origen_Metadata` | VARCHAR | Origen del archivo (ruta, URL o metadato) |
| `Formato_Entrada` | VARCHAR | Formato del archivo (.txt, .json, .csv, etc.) |
| `Tamaño_Datos` | INTEGER | Tamaño del archivo en bytes |
| `ID_Estudiante_Ingresa` | INTEGER (FK) | Estudiante que realizó la carga |

---

### 2.8 `Mensaje_Original`

Almacena cada mensaje individual extraído del historial de chat cargado.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Mensaje` | INTEGER (PK) | Identificador único del mensaje |
| `ID_Registro` | INTEGER (FK) | Registro de chat al que pertenece |
| `Alias_Remitente` | VARCHAR | Nombre o alias del autor del mensaje |
| `Cuerpo_Del_Mensaje` | TEXT | Contenido completo del mensaje |
| `Fecha_Hora_Mensaje` | TIMESTAMP | Marca de tiempo original del mensaje |

---

### 2.9 `Configuracion_Prompt`

Almacena las instrucciones (prompts) predefinidas que guían el comportamiento del motor de IA.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Configuracion` | INTEGER (PK) | Identificador único de la configuración |
| `Nombre_Estilo` | VARCHAR | Etiqueta del estilo (ej. "Serio", "Rápido") |
| `Texto_Instruccion_IA` | TEXT | Texto completo del prompt enviado al modelo |
| `Estado_Activo` | BOOLEAN | Indica si la configuración está habilitada |

---

### 2.10 `Resumen_Generado`

Núcleo del procesamiento IA: almacena el resultado textual producido a partir de una sesión de trabajo.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Resumen` | INTEGER (PK) | Identificador único del resumen |
| `ID_Sesion` | INTEGER (FK) | Sesión analizada |
| `ID_Configuracion` | INTEGER (FK) | Configuración de prompt utilizada |
| `Texto_Final_Plano` | TEXT | Texto completo del resumen generado |
| `Modelo_IA_Usado` | VARCHAR | Identificador del modelo de IA empleado |
| `Consumo_Tokens` | INTEGER | Total de tokens consumidos en la generación |
| `Fecha_Generacion` | TIMESTAMP | Fecha y hora de producción del resumen |

---

### 2.11 `Acuerdo_Equipo`

Registra los puntos de consenso identificados por la IA dentro de un resumen.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Acuerdo` | INTEGER (PK) | Identificador único del acuerdo |
| `ID_Resumen` | INTEGER (FK) | Resumen del que proviene |
| `Descripcion_Solucion` | TEXT | Descripción del acuerdo alcanzado |
| `Nivel_Importancia` | VARCHAR | Prioridad del acuerdo (Alta, Media, Baja) |
| `Alias_Quien_Propone` | VARCHAR | Alias del participante que propuso el acuerdo |

---

### 2.12 `Desacuerdo`

Registra los puntos de debate u oposición detectados en el chat.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Desacuerdo` | INTEGER (PK) | Identificador único del desacuerdo |
| `ID_Resumen` | INTEGER (FK) | Resumen del que proviene |
| `Tema_Debate` | VARCHAR | Tema sobre el que se produjo el debate |
| `Descripcion_Oposicion` | TEXT | Descripción de las posiciones enfrentadas |
| `Estado_Resolucion` | VARCHAR | Estado del debate (Resuelto, Pendiente, Escalado) |

---

### 2.13 `Duda_Abierta`

Registra las preguntas o incógnitas que el equipo no resolvió durante la sesión.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Duda` | INTEGER (PK) | Identificador único de la duda |
| `ID_Resumen` | INTEGER (FK) | Resumen del que proviene |
| `Pregunta_Principal` | TEXT | Formulación textual de la duda |
| `Relacionado_Con_Tema` | VARCHAR | Tema o área al que pertenece la pregunta |

---

### 2.14 `Tarea_Asignada`

Registra los compromisos de trabajo (To-Do) extraídos del chat y asignados a estudiantes concretos.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Tarea` | INTEGER (PK) | Identificador único de la tarea |
| `ID_Resumen` | INTEGER (FK) | Resumen del que proviene |
| `Titulo_Actividad` | VARCHAR | Título o descripción corta de la tarea |
| `ID_Estudiante_Asignado` | INTEGER (FK) | Estudiante responsable de ejecutarla |
| `Estatus` | VARCHAR | Estado de la tarea (Pendiente, En Proceso, Hecha) |
| `Fecha_Limite` | TIMESTAMP | Fecha límite sugerida o acordada |

---

### 2.15 `Momento_Clave_Chat`

Registra los hitos cronológicos identificados en el chat para construir la línea de tiempo de co-creación.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Momento` | INTEGER (PK) | Identificador único del hito |
| `ID_Resumen` | INTEGER (FK) | Resumen del que proviene |
| `Marca_Tiempo_Aproximada` | TIMESTAMP | Marca temporal del evento en el chat |
| `ID_Mensaje_Relacionado` | INTEGER (FK) | Mensaje original que originó el hito |
| `Alias_Usuario` | VARCHAR | Alias del participante que protagonizó el evento |
| `Evento` | VARCHAR | Tipo de evento ("Idea Nueva", "Solución", "Pregunta") |

---

### 2.16 `Conexion_Idea`

Tabla de intersección reflexiva (auto-relación) que modela cómo unas ideas derivaron o alimentaron a otras dentro de la misma línea de tiempo.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Idea_Base` | INTEGER (FK) | Hito originador de la conexión |
| `ID_Aporte_Extra` | INTEGER (FK) | Hito que derivó o amplió la idea base |

> **Nota de diseño:** Ambas columnas son clave foránea hacia `Momento_Clave_Chat.ID_Momento`. La clave primaria compuesta `(ID_Idea_Base, ID_Aporte_Extra)` garantiza que no se dupliquen las conexiones.

---

### 2.17 `Control_Calidad_Bot`

Almacena las métricas técnicas de auditoría sobre la fidelidad de un resumen generado por IA.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Test` | INTEGER (PK) | Identificador único del test |
| `ID_Resumen` | INTEGER (FK) | Resumen evaluado |
| `Cantidad_Falsos_Positivos` | INTEGER | Número de elementos incorrectamente categorizados |
| `Calificacion_Fidelidad_texto` | INTEGER | Puntuación de fidelidad al texto original (1-10) |
| `Comentario_Tecnico` | TEXT | Observaciones técnicas del evaluador |

---

### 2.18 `Evaluacion_UX`

Recoge la percepción de usabilidad de un estudiante sobre la interfaz del sistema.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Eval_UX` | INTEGER (PK) | Identificador único de la evaluación |
| `ID_Estudiante` | INTEGER (FK) | Estudiante que evaluó |
| `Claridad_Visual` | INTEGER | Escala 1-5 sobre la claridad visual de la interfaz |
| `Separacion_Vista_Tareas` | BOOLEAN | ¿La separación por categorías fue clara? |
| `Sugerencias_Extra` | TEXT | Observaciones libres del usuario |

---

### 2.19 `Encuesta_Piloto`

Mide el impacto educativo percibido por el estudiante tras usar SICOCO.

| Atributo | Tipo | Descripción |
|---|---|---|
| `ID_Encuesta` | INTEGER (PK) | Identificador único de la encuesta |
| `ID_Estudiante` | INTEGER (FK) | Estudiante que respondió |
| `Mejor_Comprension_Objetivos` | BOOLEAN | ¿Mejoró la comprensión de los objetivos del grupo? |
| `Nivel_de_Apoyo_En_Grupo` | INTEGER | Escala Likert 1-5 de percepción de apoyo grupal |
| `Fecha_Respuesta` | TIMESTAMP | Fecha de respuesta a la encuesta |

---

## 3. Relaciones entre Entidades

### 3.1 Relaciones N:1 (Muchos a Uno)

Son el tipo de relación predominante en el modelo. Cada entidad del lado "muchos" referencia con FK a la entidad del lado "uno".

| Relación | Cardinalidad | Descripción |
|---|---|---|
| `Curso` → `Profesor` | N:1 | Varios cursos pueden ser responsabilidad del mismo profesor; cada curso tiene exactamente un profesor responsable. |
| `Equipo` → `Curso` | N:1 | Un curso puede contener múltiples equipos; cada equipo pertenece a un único curso. |
| `Sesion_Trabajo` → `Equipo` | N:1 | Un equipo puede registrar múltiples sesiones de trabajo a lo largo del tiempo; cada sesión pertenece a un único equipo. |
| `Registro_Chat` → `Sesion_Trabajo` | N:1 | Una sesión puede tener varios registros de chat cargados; cada registro de chat pertenece a una única sesión. |
| `Registro_Chat` → `Estudiante` | N:1 | Un estudiante puede haber cargado múltiples registros; cada registro fue ingresado por un único estudiante. |
| `Mensaje_Original` → `Registro_Chat` | N:1 | Un registro de chat contiene múltiples mensajes individuales; cada mensaje pertenece a un único registro. |
| `Resumen_Generado` → `Sesion_Trabajo` | N:1 | De una sesión pueden generarse varios resúmenes (con diferentes estilos); cada resumen está vinculado a una única sesión. |
| `Resumen_Generado` → `Configuracion_Prompt` | N:1 | Una configuración puede usarse para generar múltiples resúmenes; cada resumen usa exactamente una configuración de prompt. |
| `Acuerdo_Equipo` → `Resumen_Generado` | N:1 | Un resumen puede contener múltiples acuerdos; cada acuerdo pertenece a un único resumen. |
| `Desacuerdo` → `Resumen_Generado` | N:1 | Un resumen puede contener múltiples desacuerdos; cada desacuerdo pertenece a un único resumen. |
| `Duda_Abierta` → `Resumen_Generado` | N:1 | Un resumen puede contener múltiples dudas; cada duda pertenece a un único resumen. |
| `Tarea_Asignada` → `Resumen_Generado` | N:1 | Un resumen puede generar múltiples tareas; cada tarea se origina en un único resumen. |
| `Tarea_Asignada` → `Estudiante` | N:1 | Un estudiante puede tener asignadas múltiples tareas; cada tarea tiene un único responsable. |
| `Momento_Clave_Chat` → `Resumen_Generado` | N:1 | Un resumen contiene múltiples hitos cronológicos; cada hito pertenece a un único resumen. |
| `Momento_Clave_Chat` → `Mensaje_Original` | N:1 | Un mensaje puede originar múltiples hitos identificados por la IA; cada hito hace referencia a un único mensaje fuente. |
| `Control_Calidad_Bot` → `Resumen_Generado` | N:1 | Un resumen puede tener múltiples registros de auditoría técnica; cada test de calidad evalúa un único resumen. |
| `Evaluacion_UX` → `Estudiante` | N:1 | Un estudiante puede completar múltiples evaluaciones UX; cada evaluación fue respondida por un único estudiante. |
| `Encuesta_Piloto` → `Estudiante` | N:1 | Un estudiante puede responder múltiples encuestas piloto; cada encuesta es respondida por un único estudiante. |

---

### 3.2 Relaciones N:M (Muchos a Muchos)

Estas relaciones requieren una tabla de intersección que las materializa en el modelo relacional.

#### `Estudiante` ↔ `Equipo` (resuelta por `Miembro_Equipo`)

| Perspectiva | Cardinalidad | Descripción |
|---|---|---|
| Estudiante → Equipo | N:M | Un estudiante puede pertenecer a varios equipos (en diferentes cursos o periodos); un equipo está conformado por múltiples estudiantes. |

La tabla `Miembro_Equipo` resuelve esta relación y añade los atributos propios del vínculo: `Rol_En_Equipo` y `Fecha_Union`. Esto convierte la relación en una **entidad asociativa**, permitiendo registrar no solo quién pertenece a qué equipo, sino en qué calidad y desde cuándo.

---

#### `Momento_Clave_Chat` ↔ `Momento_Clave_Chat` (auto-relación resuelta por `Conexion_Idea`)

| Perspectiva | Cardinalidad | Descripción |
|---|---|---|
| Hito base → Hito derivado | N:M (reflexiva) | Un hito puede haber inspirado o derivado en múltiples otros hitos; a su vez, un hito puede haber sido alimentado por múltiples hitos anteriores. |

La tabla `Conexion_Idea` con columnas `ID_Idea_Base` e `ID_Aporte_Extra` (ambas FK hacia `Momento_Clave_Chat`) implementa este grafo de dependencias de ideas dentro de la línea de tiempo de co-creación. Es la representación de la red de pensamiento colaborativo del equipo.

---

### 3.3 Relaciones 1:1 (Uno a Uno)

En el modelo actual, las relaciones estrictamente 1:1 emergen por restricciones de negocio aplicadas sobre relaciones que estructuralmente son N:1.

| Relación | Cardinalidad | Descripción |
|---|---|---|
| `Resumen_Generado` ↔ `Control_Calidad_Bot` | 1:1 (por regla de negocio) | Aunque la FK en `Control_Calidad_Bot` permite N registros por resumen, la práctica del sistema establece que cada resumen recibe exactamente una evaluación técnica de calidad. Se recomienda reforzar esta restricción con una constraint `UNIQUE` sobre `ID_Resumen` en `Control_Calidad_Bot`. |
| `Sesion_Trabajo` ↔ `Resumen_Generado` | Potencialmente 1:1 | En el flujo base del MVP, cada sesión genera un único resumen con la configuración activa. A medida que el sistema escale (múltiples estilos), esta relación evolucionaría a N:1. |

---

## 4. Diagrama de Dominos Funcionales

El modelo se organiza en seis dominios que agrupan entidades por función:

```
┌─────────────────────────────────────────────────────────────────────┐
│  DOMINIO 1 · Gestión de Identidades y Roles                        │
│  Entidades: Estudiante · Profesor                                   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ 1:N
┌──────────────────────────────▼──────────────────────────────────────┐
│  DOMINIO 2 · Organización Académica                                 │
│  Entidades: Curso · Equipo · Miembro_Equipo                         │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ 1:N
┌──────────────────────────────▼──────────────────────────────────────┐
│  DOMINIO 3 · Sesiones y Carga de Datos                              │
│  Entidades: Sesion_Trabajo · Registro_Chat · Mensaje_Original       │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ 1:N
┌──────────────────────────────▼──────────────────────────────────────┐
│  DOMINIO 4 · Motor IA y Resúmenes                                   │
│  Entidades: Configuracion_Prompt · Resumen_Generado                 │
│             Acuerdo_Equipo · Desacuerdo · Duda_Abierta              │
│             Tarea_Asignada                                          │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ 1:N
┌──────────────────────────────▼──────────────────────────────────────┐
│  DOMINIO 5 · Mapeo de Co-Creación                                   │
│  Entidades: Momento_Clave_Chat · Conexion_Idea                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  DOMINIO 6 · Evaluación y Calidad                                   │
│  Entidades: Control_Calidad_Bot · Evaluacion_UX · Encuesta_Piloto  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Restricciones de Integridad y Notas de Diseño

### 5.1 Integridad referencial

Todas las FK definidas en el esquema deben implementarse con restricción `ON DELETE RESTRICT` o `ON DELETE CASCADE` según el dominio:

- Las tablas del Dominio 4 (`Acuerdo_Equipo`, `Desacuerdo`, `Duda_Abierta`, `Tarea_Asignada`) deben eliminarse en cascada si se borra el `Resumen_Generado` padre, ya que sin resumen pierden contexto semántico.
- `Mensaje_Original` debe eliminarse en cascada si se elimina `Registro_Chat`.
- `Miembro_Equipo` debe eliminarse en cascada si se elimina `Estudiante` o `Equipo`.

### 5.2 Atributos derivados recomendados

| Campo | Descripción |
|---|---|
| `Created_At` | Fecha de creación (todas las tablas) |
| `Updated_At` | Fecha de última modificación (tablas críticas) |
| `Es_Confidencial` (en `Registro_Chat`) | Bandera de privacidad sobre el historial de chat |
| `Requiere_Aprobacion_Profesor` (en `Equipo`) | Control de acceso al equipo |

### 5.3 Consideraciones de seguridad

- `Contraseña_Encriptada` en `Estudiante` nunca debe almacenarse en texto plano; se recomienda bcrypt o Argon2.
- Los `ID_*` de entidades sensibles deberían migrarse a formato UUID para prevenir enumeración y exposición de datos entre equipos competidores.
- El campo `Permiso_Sistema` en `Profesor` debe mapearse contra una tabla de roles si el sistema escala a más tipos de usuario (administrador, coordinador, etc.).

### 5.4 Atributo `Alias_Remitente` vs FK a `Estudiante`

En `Mensaje_Original` y en varias tablas derivadas (`Acuerdo_Equipo`, `Momento_Clave_Chat`) se almacena `Alias_Remitente` / `Alias_Quien_Propone` / `Alias_Usuario` como VARCHAR en lugar de una FK directa a `Estudiante`. Esto es una decisión de diseño deliberada: los chats externos (WhatsApp, Discord) no garantizan que cada participante esté registrado en SICOCO. El alias preserva la trazabilidad del autor sin romper la integridad referencial.

---

## 6. Resumen de Cardinalidades

| Entidad A | Cardinalidad | Entidad B | Tabla Intermedia |
|---|:---:|---|---|
| Profesor | 1 : N | Curso | — |
| Curso | 1 : N | Equipo | — |
| Estudiante | N : M | Equipo | `Miembro_Equipo` |
| Equipo | 1 : N | Sesion_Trabajo | — |
| Sesion_Trabajo | 1 : N | Registro_Chat | — |
| Estudiante | 1 : N | Registro_Chat | — |
| Registro_Chat | 1 : N | Mensaje_Original | — |
| Sesion_Trabajo | 1 : N | Resumen_Generado | — |
| Configuracion_Prompt | 1 : N | Resumen_Generado | — |
| Resumen_Generado | 1 : N | Acuerdo_Equipo | — |
| Resumen_Generado | 1 : N | Desacuerdo | — |
| Resumen_Generado | 1 : N | Duda_Abierta | — |
| Resumen_Generado | 1 : N | Tarea_Asignada | — |
| Estudiante | 1 : N | Tarea_Asignada | — |
| Resumen_Generado | 1 : N | Momento_Clave_Chat | — |
| Mensaje_Original | 1 : N | Momento_Clave_Chat | — |
| Momento_Clave_Chat | N : M | Momento_Clave_Chat | `Conexion_Idea` (reflexiva) |
| Resumen_Generado | 1 : 1 | Control_Calidad_Bot | — |
| Estudiante | 1 : N | Evaluacion_UX | — |
| Estudiante | 1 : N | Encuesta_Piloto | — |

---

*Documento generado como parte del diseño de base de datos del proyecto SICOCO · Universidad de Córdoba · 2026*

---
---

# English Version

# Entity-Relationship Model — SICOCO
**Collaborative Co-Creation Synthesizer**  
Universidad de Córdoba · Bachelor's in Computer Science Education · MODESEC Methodology

---

## 1. Introduction

This report formally outlines the Entity-Relationship Model (ERM) of the SICOCO system. The database architecture is structured across six functional domains: user and identity management, academic organization, collaborative work sessions, AI processing and synthesis generation, co-creation mapping, and quality assurance/evaluation. The complete model encompasses **19 entities**, bound by N:1, N:M, and 1:1 cardinality constraints.

---

## 2. Entity and Attribute Catalog

### 2.1 `Estudiante` (Student)

Represents each registered learner within the educational platform.

| Attribute | Type | Description |
|---|---|---|
| `ID_Estudiante` | INTEGER (PK) | Unique primary identifier of the student |
| `Numero_Identidad_Matricula` | VARCHAR | Institutional enrollment ID or national ID |
| `Nombres` | VARCHAR | Given names of the student |
| `Apellidos` | VARCHAR | Surnames of the student |
| `Correo_Institucional` | VARCHAR | Institutional email address (login credential) |
| `Contraseña_Encriptada` | VARCHAR | Secure password hash (never stored in plaintext) |
| `Semestre_Actual` | INTEGER | Active academic semester at registration |
| `Programa_Academico` | VARCHAR | Degree program / academic department |
| `Fecha_Registro` | TIMESTAMP | Account registration date and timestamp |

---

### 2.2 `Profesor` (Instructor)

Represents the faculty instructor or evaluator supervising courses and collaborative teams.

| Attribute | Type | Description |
|---|---|---|
| `ID_Profesor` | INTEGER (PK) | Unique identifier of the instructor |
| `Numero_Empleado` | VARCHAR | Faculty employee institutional identification |
| `Nombres` | VARCHAR | Given names of the instructor |
| `Apellidos` | VARCHAR | Surnames of the instructor |
| `Departamento` | VARCHAR | Academic faculty department |
| `Permiso_Sistema` | INTEGER | System authorization and privilege level |

---

### 2.3 `Curso` (Course)

Represents an academic subject offering within a designated academic semester.

| Attribute | Type | Description |
|---|---|---|
| `ID_Curso` | INTEGER (PK) | Unique primary identifier of the course |
| `Codigo_Materia` | VARCHAR | Official curricular subject code |
| `Nombre_Materia` | VARCHAR | Full descriptive name of the academic subject |
| `Semestre_Academico` | VARCHAR | Academic semester offering (e.g., "2026-I") |
| `ID_Profesor_Responsable` | INTEGER (FK) | Assigned supervising faculty instructor |

---

### 2.4 `Equipo` (Collaborative Team)

Groups a cohort of students enrolled in a specific course to execute group assignments.

| Attribute | Type | Description |
|---|---|---|
| `ID_Equipo` | INTEGER (PK) | Unique identifier of the collaborative team |
| `Nombre_Equipo` | VARCHAR | Designation name of the student team |
| `ID_Curso` | INTEGER (FK) | Academic course offering to which the team belongs |
| `Fecha_Creacion` | TIMESTAMP | Team creation timestamp |

---

### 2.5 `Miembro_Equipo` (Team Membership)

Junction entity resolving the many-to-many relationship between `Estudiante` and `Equipo`, adding membership metadata.

| Attribute | Type | Description |
|---|---|---|
| `ID_Relacion` | INTEGER (PK) | Unique identifier of the membership record |
| `ID_Estudiante` | INTEGER (FK) | Associated student member |
| `ID_Equipo` | INTEGER (FK) | Associated collaborative team |
| `Rol_En_Equipo` | VARCHAR | Role assumed (leader, developer, designer, etc.) |
| `Fecha_Union` | TIMESTAMP | Timestamp when the student joined the team |

---

### 2.6 `Sesion_Trabajo` (Work Session)

Logs each meeting or collaborative deliberation session conducted by a team.

| Attribute | Type | Description |
|---|---|---|
| `ID_Sesion` | INTEGER (PK) | Unique identifier of the work session |
| `ID_Equipo` | INTEGER (FK) | Team that conducted the session |
| `Fecha_Reunion` | TIMESTAMP | Meeting date and start timestamp |
| `Objetivo_General` | TEXT | Description of the session's core objective |
| `Plataforma_Origen` | VARCHAR | Messaging platform channel (WhatsApp, Discord, Teams) |
| `Duracion_Estimada` | INTEGER | Estimated session duration in minutes |

---

### 2.7 `Registro_Chat` (Chat Record)

Represents the physical or digital ingestion of a conversation transcript for AI processing.

| Attribute | Type | Description |
|---|---|---|
| `ID_Registro` | INTEGER (PK) | Unique identifier of the chat upload |
| `ID_Sesion` | INTEGER (FK) | Associated work session |
| `Origen_Metadata` | VARCHAR | File source path, URL, or payload metadata |
| `Formato_Entrada` | VARCHAR | File format extension (.txt, .json, .csv) |
| `Tamaño_Datos` | INTEGER | Payload size in bytes |
| `ID_Estudiante_Ingresa` | INTEGER (FK) | Student who submitted the chat transcript |

---

### 2.8 `Mensaje_Original` (Raw Message)

Stores each atomic message parsed from the ingested conversational transcript.

| Attribute | Type | Description |
|---|---|---|
| `ID_Mensaje` | INTEGER (PK) | Unique primary identifier of the atomic message |
| `ID_Registro` | INTEGER (FK) | Chat record to which the message belongs |
| `Alias_Remitente` | VARCHAR | Sender display handle within the chat app |
| `Cuerpo_Del_Mensaje` | TEXT | Full verbatim textual body of the message |
| `Fecha_Hora_Mensaje` | TIMESTAMP | Original message timestamp from chat log |

---

### 2.9 `Configuracion_Prompt` (Prompt Configuration)

Persists predefined prompt engineering templates that govern AI synthesis behaviors.

| Attribute | Type | Description |
|---|---|---|
| `ID_Configuracion` | INTEGER (PK) | Unique identifier of the prompt configuration |
| `Nombre_Estilo` | VARCHAR | Profile designation (e.g., "Formal", "Rapid") |
| `Texto_Instruccion_IA` | TEXT | Full master prompt template sent to the model |
| `Estado_Activo` | BOOLEAN | Boolean flag indicating whether the profile is active |

---

### 2.10 `Resumen_Generado` (Generated Summary)

Computational core of the AI pipeline: stores the structured output generated from a session.

| Attribute | Type | Description |
|---|---|---|
| `ID_Resumen` | INTEGER (PK) | Unique identifier of the generated summary |
| `ID_Sesion` | INTEGER (FK) | Work session analyzed |
| `ID_Configuracion` | INTEGER (FK) | Prompt configuration template applied |
| `Texto_Final_Plano` | TEXT | Complete plaintext fallback of the synthesis |
| `Modelo_IA_Usado` | VARCHAR | Underlying language model leveraged |
| `Consumo_Tokens` | INTEGER | Total tokens consumed during execution |
| `Fecha_Generacion` | TIMESTAMP | Timestamp when the summary was generated |

---

### 2.11 `Acuerdo_Equipo` (Team Agreement)

Records points of consensus identified by the AI pipeline within a summary.

| Attribute | Type | Description |
|---|---|---|
| `ID_Acuerdo` | INTEGER (PK) | Unique identifier of the agreement item |
| `ID_Resumen` | INTEGER (FK) | Parent summary from which it originated |
| `Descripcion_Solucion` | TEXT | Comprehensive description of the agreed consensus |
| `Nivel_Importancia` | VARCHAR | Priority level (High, Medium, Low) |
| `Alias_Quien_Propone` | VARCHAR | Alias of the student who championed the consensus |

---

### 2.12 `Desacuerdo` (Disagreement)

Captures cognitive friction, debates, or conflicting viewpoints identified in the chat.

| Attribute | Type | Description |
|---|---|---|
| `ID_Desacuerdo` | INTEGER (PK) | Unique identifier of the disagreement item |
| `ID_Resumen` | INTEGER (FK) | Parent summary from which it originated |
| `Tema_Debate` | VARCHAR | Overarching topic under active contention |
| `Descripcion_Oposicion` | TEXT | Detailed description of divergent arguments |
| `Estado_Resolucion` | VARCHAR | Status (Resolved, Pending, Escalated) |

---

### 2.13 `Duda_Abierta` (Unresolved Doubt)

Documents unanswered questions or technical uncertainties left unresolved during the session.

| Attribute | Type | Description |
|---|---|---|
| `ID_Duda` | INTEGER (PK) | Unique identifier of the open doubt |
| `ID_Resumen` | INTEGER (FK) | Parent summary from which it originated |
| `Pregunta_Principal` | TEXT | Verbatim phrasing of the unanswered question |
| `Relacionado_Con_Tema` | VARCHAR | Domain topic to which the inquiry pertains |

---

### 2.14 `Tarea_Asignada` (Assigned Action Item)

Tracks collaborative commitments (To-Do) extracted from the chat and assigned to specific students.

| Attribute | Type | Description |
|---|---|---|
| `ID_Tarea` | INTEGER (PK) | Unique identifier of the assigned task |
| `ID_Resumen` | INTEGER (FK) | Parent summary from which it originated |
| `Titulo_Actividad` | VARCHAR | Descriptive title or summary of the action item |
| `ID_Estudiante_Asignado` | INTEGER (FK) | Responsible student assigned to execute the task |
| `Estatus` | VARCHAR | Lifecycle status (Pending, In Progress, Completed) |
| `Fecha_Limite` | TIMESTAMP | Target delivery deadline |

---

### 2.15 `Momento_Clave_Chat` (Key Milestone)

Logs chronological milestones detected in the chat to render the co-creation timeline.

| Attribute | Type | Description |
|---|---|---|
| `ID_Momento` | INTEGER (PK) | Unique identifier of the timeline milestone |
| `ID_Resumen` | INTEGER (FK) | Parent summary from which it originated |
| `Marca_Tiempo_Aproximada` | TIMESTAMP | Approximate event timestamp within the chat |
| `ID_Mensaje_Relacionado` | INTEGER (FK) | Source message that triggered the milestone |
| `Alias_Usuario` | VARCHAR | Author alias who introduced the intervention |
| `Evento` | VARCHAR | Classification event ("New Idea", "Solution", "Inquiry") |

---

### 2.16 `Conexion_Idea` (Idea Connection)

Reflexive junction entity (self-relationship) that models how ideation nodes derived from or supported each other over time.

| Attribute | Type | Description |
|---|---|---|
| `ID_Idea_Base` | INTEGER (FK) | Root milestone initiating the ideation connection |
| `ID_Aporte_Extra` | INTEGER (FK) | Downstream milestone refining or expanding the base idea |

> **Architectural Note:** Both columns are foreign keys referencing `Momento_Clave_Chat.ID_Momento`. The composite primary key `(ID_Idea_Base, ID_Aporte_Extra)` prevents duplicate ideation linkages.

---

### 2.17 `Control_Calidad_Bot` (AI Quality Control)

Stores technical audit metrics evaluating the synthesis fidelity of AI-generated summaries.

| Attribute | Type | Description |
|---|---|---|
| `ID_Test` | INTEGER (PK) | Unique identifier of the quality benchmark test |
| `ID_Resumen` | INTEGER (FK) | Summary instance being evaluated |
| `Cantidad_Falsos_Positivos` | INTEGER | Count of misclassified or hallucinated elements |
| `Calificacion_Fidelidad_texto` | INTEGER | Textual fidelity score on a 1-to-10 scale |
| `Comentario_Tecnico` | TEXT | Technical notes and diagnostic commentary |

---

### 2.18 `Evaluacion_UX` (Usability Evaluation)

Captures student perception of user interface ergonomics, navigation, and usability.

| Attribute | Type | Description |
|---|---|---|
| `ID_Eval_UX` | INTEGER (PK) | Unique identifier of the UX evaluation survey |
| `ID_Estudiante` | INTEGER (FK) | Student responding to the evaluation |
| `Claridad_Visual` | INTEGER | 1-to-5 Likert scale rating visual ergonomics |
| `Separacion_Vista_Tareas` | BOOLEAN | Indicates whether category separation was intuitive |
| `Sugerencias_Extra` | TEXT | Open-ended feedback and qualitative suggestions |

---

### 2.19 `Encuesta_Piloto` (Pilot Survey)

Measures perceived educational utility and formative impact following SICOCO usage.

| Attribute | Type | Description |
|---|---|---|
| `ID_Encuesta` | INTEGER (PK) | Unique identifier of the educational survey |
| `ID_Estudiante` | INTEGER (FK) | Student submitting the survey |
| `Mejor_Comprension_Objetivos` | BOOLEAN | Indicates whether understanding of project goals improved |
| `Nivel_de_Apoyo_En_Grupo` | INTEGER | 1-to-5 Likert scale measuring perceived peer collaboration |
| `Fecha_Respuesta` | TIMESTAMP | Survey submission timestamp |

---

## 3. Relationships Between Entities

### 3.1 N:1 Relationships (Many to One)

The predominant cardinality pattern across the model. Each entity on the "many" side references the "one" side via Foreign Key.

| Relationship | Cardinality | Description |
|---|---|---|
| `Curso` → `Profesor` | N:1 | Multiple courses can be supervised by the same faculty instructor; each course has exactly one assigned instructor. |
| `Equipo` → `Curso` | N:1 | A course contains multiple student teams; each team belongs to exactly one course offering. |
| `Sesion_Trabajo` → `Equipo` | N:1 | A team conducts multiple collaborative sessions over time; each session belongs to a single team. |
| `Registro_Chat` → `Sesion_Trabajo` | N:1 | A session can ingest multiple chat logs; each log belongs to a single session. |
| `Registro_Chat` → `Estudiante` | N:1 | A student can upload multiple chat logs; each log was uploaded by a single student. |
| `Mensaje_Original` → `Registro_Chat` | N:1 | A chat log contains multiple individual messages; each message belongs to one chat record. |
| `Resumen_Generado` → `Sesion_Trabajo` | N:1 | Multiple summaries (different profiles) can be generated from one session; each summary belongs to one session. |
| `Resumen_Generado` → `Configuracion_Prompt` | N:1 | A prompt template can be used across multiple summaries; each summary applies exactly one template. |
| `Acuerdo_Equipo` → `Resumen_Generado` | N:1 | A summary contains multiple agreement items; each agreement originates from a single summary. |
| `Desacuerdo` → `Resumen_Generado` | N:1 | A summary contains multiple disagreements; each disagreement originates from a single summary. |
| `Duda_Abierta` → `Resumen_Generado` | N:1 | A summary contains multiple unresolved doubts; each doubt originates from a single summary. |
| `Tarea_Asignada` → `Resumen_Generado` | N:1 | A summary yields multiple action items; each task originates from a single summary. |
| `Tarea_Asignada` → `Estudiante` | N:1 | A student can be assigned multiple tasks; each task has a single responsible assignee. |
| `Momento_Clave_Chat` → `Resumen_Generado` | N:1 | A summary contains multiple milestones; each milestone belongs to a single summary. |
| `Momento_Clave_Chat` → `Mensaje_Original` | N:1 | A source message can trigger multiple milestones; each milestone references a single message. |
| `Control_Calidad_Bot` → `Resumen_Generado` | N:1 | A summary can undergo multiple technical audits; each test evaluates a single summary. |
| `Evaluacion_UX` → `Estudiante` | N:1 | A student can submit multiple UX evaluations; each evaluation belongs to a single student. |
| `Encuesta_Piloto` → `Estudiante` | N:1 | A student can submit multiple pilot surveys; each survey belongs to a single student. |

---

### 3.2 N:M Relationships (Many to Many)

#### `Estudiante` ↔ `Equipo` (Resolved via `Miembro_Equipo`)

| Perspective | Cardinality | Description |
|---|---|---|
| Student → Team | N:M | A student can belong to multiple teams (across different courses); each team comprises multiple students. |

The junction entity `Miembro_Equipo` resolves this relationship, encapsulating contextual metadata: `Rol_En_Equipo` and `Fecha_Union`.

---

#### `Momento_Clave_Chat` ↔ `Momento_Clave_Chat` (Reflexive Self-Relationship via `Conexion_Idea`)

| Perspective | Cardinality | Description |
|---|---|---|
| Root Milestone → Derived Milestone | N:M (Reflexive) | A milestone can inspire multiple subsequent contributions; conversely, a milestone can be underpinned by multiple preceding contributions. |

The `Conexion_Idea` table with columns `ID_Idea_Base` and `ID_Aporte_Extra` implements this ideation dependency graph, capturing the team's co-creation trajectory.

---

### 3.3 1:1 Relationships (One to One)

| Relationship | Cardinality | Description |
|---|---|---|
| `Resumen_Generado` ↔ `Control_Calidad_Bot` | 1:1 (Enforced by Business Rule) | While the foreign key structurally supports multiple audits, standard system operation establishes that each summary undergoes exactly one formal technical audit. |
| `Sesion_Trabajo` ↔ `Resumen_Generado` | Functionally 1:1 | In baseline MVP operations, each meeting generates a single default summary. |

---

## 4. Functional Domain Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│  DOMAIN 1 · Identity and Access Management                          │
│  Entities: Estudiante · Profesor                                   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ 1:N
┌──────────────────────────────▼──────────────────────────────────────┐
│  DOMAIN 2 · Academic Organization                                   │
│  Entities: Curso · Equipo · Miembro_Equipo                         │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ 1:N
┌──────────────────────────────▼──────────────────────────────────────┐
│  DOMAIN 3 · Work Sessions and Ingestion                             │
│  Entities: Sesion_Trabajo · Registro_Chat · Mensaje_Original       │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ 1:N
┌──────────────────────────────▼──────────────────────────────────────┐
│  DOMAIN 4 · AI Engine and Synthesis Output                          │
│  Entities: Configuracion_Prompt · Resumen_Generado                 │
│             Acuerdo_Equipo · Desacuerdo · Duda_Abierta              │
│             Tarea_Asignada                                          │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ 1:N
┌──────────────────────────────▼──────────────────────────────────────┐
│  DOMAIN 5 · Co-Creation Mapping                                     │
│  Entities: Momento_Clave_Chat · Conexion_Idea                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  DOMAIN 6 · Evaluation and Quality Assurance                        │
│  Entities: Control_Calidad_Bot · Evaluacion_UX · Encuesta_Piloto  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Integrity Constraints and Architectural Rules

### 5.1 Referential Integrity
- Domain 4 tables (`Acuerdo_Equipo`, `Desacuerdo`, `Duda_Abierta`, `Tarea_Asignada`) enforce `ON DELETE CASCADE` from parent `Resumen_Generado`.
- `Mensaje_Original` cascades on delete from `Registro_Chat`.
- `Miembro_Equipo` cascades on delete from `Estudiante` or `Equipo`.

### 5.2 Recommended Derived Attributes
- `Created_At`: Mandatory creation timestamp across all entities.
- `Updated_At`: Mandatory modification audit timestamp across critical operational tables.
- `Es_Confidencial` (in `Registro_Chat`): Transcript confidentiality privacy flag.
- `Requiere_Aprobacion_Profesor` (in `Equipo`): Team enrollment governance flag.

### 5.3 Security Considerations
- `Contraseña_Encriptada` in `Estudiante` must enforce secure salt-based hashing (bcrypt/Argon2).
- Sensitive primary keys should transition to UUID format to prevent enumeration attacks.
- `Alias_Remitente` vs. direct Student FK: Preserved as a string representation because external messaging exports (WhatsApp, Discord) contain student handles that do not strictly map to verified institutional accounts, preserving parsing fault tolerance.

---

## 6. Summary of Cardinalities

| Entity A | Cardinality | Entity B | Junction Entity |
|---|:---:|---|---|
| Profesor | 1 : N | Curso | — |
| Curso | 1 : N | Equipo | — |
| Estudiante | N : M | Equipo | `Miembro_Equipo` |
| Equipo | 1 : N | Sesion_Trabajo | — |
| Sesion_Trabajo | 1 : N | Registro_Chat | — |
| Estudiante | 1 : N | Registro_Chat | — |
| Registro_Chat | 1 : N | Mensaje_Original | — |
| Sesion_Trabajo | 1 : N | Resumen_Generado | — |
| Configuracion_Prompt | 1 : N | Resumen_Generado | — |
| Resumen_Generado | 1 : N | Acuerdo_Equipo | — |
| Resumen_Generado | 1 : N | Desacuerdo | — |
| Resumen_Generado | 1 : N | Duda_Abierta | — |
| Resumen_Generado | 1 : N | Tarea_Asignada | — |
| Estudiante | 1 : N | Tarea_Asignada | — |
| Resumen_Generado | 1 : N | Momento_Clave_Chat | — |
| Mensaje_Original | 1 : N | Momento_Clave_Chat | — |
| Momento_Clave_Chat | N : M | Momento_Clave_Chat | `Conexion_Idea` (Reflexive) |
| Resumen_Generado | 1 : 1 | Control_Calidad_Bot | — |
| Estudiante | 1 : N | Evaluacion_UX | — |
| Estudiante | 1 : N | Encuesta_Piloto | — |

---

*Document compiled as part of the core database design for the SICOCO project · Universidad de Córdoba · 2026*
