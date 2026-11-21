# Arquitectura Técnica de Backend y API REST (sicoco-framework)

**Proyecto:** SICOCO (Sintetizador de Co-creación Colaborativa)  
**Módulo:** Framework de Backend y Capa de Persistencia (`sicoco-framework`)  
**Asignatura:** 203453 · Diseño y Desarrollo de Software Educativo II · Semestre IX  
**Periodo:** 2026-2 · Universidad de Córdoba  

---

## 1. Visión General del Framework de Backend

Durante el **9no semestre**, el proyecto SICOCO trascendió formalmente la fase de diseño y planificación teórica (Fases 1 a 3 de MODESEC) para dar inicio a la **Fase 4: Producción y Desarrollo**.

Para garantizar un backend robusto, escalable, tipado y mantenible, se estructuró la solución sobre el framework **NestJS** en su versión más moderna (v12), utilizando **TypeScript** con arquitectura nativa de módulos ECMAScript (`"type": "module"`). La persistencia de datos se apoya en **MongoDB** a través de **Mongoose**, implementando una arquitectura de capas con separación estricta de responsabilidades: Controladores, Servicios, Objetos de Transferencia de Datos (DTOs) y Esquemas de Datos.

El backend cuenta con **6 módulos funcionales y operativos** que cubren la totalidad de las 4 zonas del modelo relacional V2 de MODESEC:

```mermaid
graph TD
    Client["Extensión Chromium / Dashboard"] -->|HTTP REST JSON| Main["main.ts (Bootstrap + Swagger + Telemetría)"]
    Main --> AppMod["AppModule"]
    AppMod --> Config["ConfigModule (.env)"]
    AppMod --> Mongo["MongooseModule (MongoDB Connection)"]
    AppMod --> Obs["ObserveModule (@nestjs/observe)"]
    
    subgraph Z1 ["Zona 1: Organización Académica"]
        AppMod --> UsersMod["UsersModule (/users)"]
        AppMod --> CoursesMod["CoursesModule (/courses)"]
        AppMod --> TeamsMod["TeamsModule (/teams)"]
    end

    subgraph Z2 ["Zona 2: Sesiones e Ingesta"]
        AppMod --> SessionsMod["SessionsModule (/sessions)"]
        AppMod --> TranscriptsMod["TranscriptsModule (/transcripts)"]
    end

    subgraph Z3Z4 ["Zonas 3 y 4: Síntesis MODESEC y Co-creación"]
        AppMod --> SummariesMod["SummariesModule (/summaries)"]
    end

    UsersMod --> UsersCtrl["UsersController"] --> UsersSvc["UsersService"] --> UserSchema["UserSchema"]
    CoursesMod --> CoursesCtrl["CoursesController"] --> CoursesSvc["CoursesService"] --> CourseSchema["CourseSchema"]
    TeamsMod --> TeamsCtrl["TeamsController"] --> TeamsSvc["TeamsService"] --> TeamSchema["TeamSchema"]
    SessionsMod --> SessionsCtrl["SessionsController"] --> SessionsSvc["SessionsService"] --> SessionSchema["SessionSchema"]
    TranscriptsMod --> TranscriptsCtrl["TranscriptsController"] --> TranscriptsSvc["TranscriptsService"] --> TranscriptSchema["TranscriptSchema"]
    SummariesMod --> SummariesCtrl["SummariesController"] --> SummariesSvc["SummariesService"] --> SummarySchema["SummarySchema"]
```

---

## 2. Stack Tecnológico y Dependencias Principales

La arquitectura técnica se encuentra configurada en el archivo `package.json` de `sicoco-framework`:

| Categoría | Tecnología / Librería | Versión | Propósito en el Proyecto |
| :--- | :--- | :---: | :--- |
| **Framework Base** | `@nestjs/core`, `@nestjs/common` | `^12.0.1` | Arquitectura empresarial modular con inyección de dependencias e inversión de control. |
| **Plataforma HTTP** | `@nestjs/platform-express` | `^12.0.1` | Motor de enrutamiento y procesamiento de peticiones HTTP REST. |
| **Persistencia NoSQL** | `@nestjs/mongoose`, `mongoose` | `^12.0.0` / `^9.11.4` | Modelado y persistencia orientada a documentos para gestión flexible de entidades y mensajes. |
| **Configuración** | `@nestjs/config` | `^12.0.1` | Carga asíncrona de variables de entorno desde `.env` con soporte global. |
| **Documentación API** | `@nestjs/swagger` | `^12.1.0` | Generación automática de especificaciones OpenAPI y UI interactiva en tiempo real. |
| **Observabilidad** | `@nestjs/observe` | `^0.3.0` | Instrumentación, métricas y telemetría de rendimiento del servidor. |
| **Testing** | `vitest`, `@nestjs/testing` | `^4.1.2` / `^12.0.1` | Suite de pruebas unitarias ultrarrápida basada en Vite con soporte nativo de ESM. |
| **E2E Testing** | `supertest` | `^7.0.0` | Ejecución de pruebas de integración extremo a extremo contra los endpoints REST. |
| **Linting y Calidad** | `oxlint`, `oxlint-tsgolint` | `^1.58.0` | Linter de alto rendimiento basado en Rust con análisis de tipos TypeScript. |
| **Formateo de Código** | `prettier` | `^3.4.2` | Estandarización de estilo de código en todo el repositorio. |

---

## 3. Justificación de la Estrategia de Persistencia (MongoDB & Mongoose)

Si bien en el primer semestre se diseñó un Modelo Entidad-Relación relacional de 19 tablas, el equipo determinó en la **Validación Técnica U1-01** que las características operativas de SICOCO requerían un esquema híbrido y escalable:

1. **Naturaleza Jerárquica y Semi-estructurada de los Chats:** Las transcripciones de mensajería (WhatsApp, Discord, Teams) contienen una estructura arbórea con hilos de respuestas, reacciones, metadatos variables y textos de longitud impredecible. Los esquemas basados en documentos JSON/BSON de MongoDB permiten almacenar estos bloques de mensajes (`ChatMessage`) embebidos sin sobrecargar un motor SQL con cientos de miles de filas fragmentadas.
2. **Estructura Flexible de los Cuatro Pilares MODESEC:** La síntesis generada por el LLM produce listas de tamaño variable de acuerdos, desacuerdos, dudas abiertas y tareas asignadas. Almacenarlas como subdocumentos tipados en MongoDB agiliza las consultas en un único viaje de red (*single round-trip*) hacia el dashboard del estudiante.
3. **Velocidad de Iteración en Fase 4:** Mongoose proporciona validación estricta de esquemas, tipos y restricciones en tiempo de compilación y ejecución, facilitando adaptar los esquemas conforme evolucionan los requerimientos pedagógicos de MODESEC sin requerir migraciones complejas de base de datos relacional.
4. **Mapeo Limpio de Entidades Académicas:** Entidades como Usuarios, Cursos y Equipos se definen con decoradores `@Schema()` y `@Prop()`, garantizando unicidad en correos institucionales, códigos de materia y claves de sesión.

---

## 4. Estructura de Módulos y Código Fuente

El código se encuentra organizado dentro de la carpeta `src/` del repositorio `sicoco-framework`:

```
src/
├── app.controller.spec.ts          # Pruebas del controlador raíz
├── app.controller.ts               # Controlador base
├── app.module.ts                   # Módulo raíz que ensambla los 6 módulos funcionales
├── app.service.ts                  # Servicio base
├── main.ts                         # Punto de entrada y configuración de Swagger OpenAPI
├── users/                          # [Zona 1] Módulo de Gestión de Usuarios y Estudiantes
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── schemas/
│   │   └── user.schema.ts          # Colección 'users'
│   ├── users.controller.spec.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.spec.ts
│   └── users.service.ts
├── courses/                        # [Zona 1] Módulo de Gestión de Cursos Académicos
│   ├── dto/
│   │   ├── create-course.dto.ts
│   │   └── update-course.dto.ts
│   ├── schemas/
│   │   └── course.schema.ts        # Colección 'courses'
│   ├── courses.controller.spec.ts
│   ├── courses.controller.ts
│   ├── courses.module.ts
│   ├── courses.service.spec.ts
│   └── courses.service.ts
├── teams/                          # [Zona 1] Módulo de Equipos Colaborativos
│   ├── dto/
│   │   ├── create-team.dto.ts
│   │   └── update-team.dto.ts
│   ├── schemas/
│   │   └── team.schema.ts          # Colección 'teams' (subdocumentos TeamMember)
│   ├── teams.controller.spec.ts
│   ├── teams.controller.ts
│   ├── teams.module.ts
│   ├── teams.service.spec.ts
│   └── teams.service.ts
├── sessions/                       # [Zona 2] Módulo de Sesiones de Trabajo Colaborativo
│   ├── dto/
│   │   ├── create-session.dto.ts
│   │   └── update-session.dto.ts
│   ├── schemas/
│   │   └── session.schema.ts       # Colección 'sessions'
│   ├── sessions.controller.spec.ts
│   ├── sessions.controller.ts
│   ├── sessions.module.ts
│   ├── sessions.service.spec.ts
│   └── sessions.service.ts
├── transcripts/                    # [Zona 2] Módulo de Ingesta de Transcripciones y Mensajes
│   ├── dto/
│   │   ├── create-transcript.dto.ts
│   │   └── update-transcript.dto.ts
│   ├── schemas/
│   │   └── transcript.schema.ts    # Colección 'transcripts' (subdocumentos ChatMessage)
│   ├── transcripts.controller.spec.ts
│   ├── transcripts.controller.ts
│   ├── transcripts.module.ts
│   ├── transcripts.service.spec.ts
│   └── transcripts.service.ts
└── summaries/                      # [Zonas 3 y 4] Motor de Síntesis MODESEC y Línea de Tiempo
    ├── dto/
    │   ├── create-summary.dto.ts
    │   ├── update-summary.dto.ts
    │   └── generate-summary.dto.ts
    ├── schemas/
    │   └── summary.schema.ts       # Colección 'summaries' (Acuerdos, Desacuerdos, Dudas, Tareas, Timeline)
    ├── summaries.controller.spec.ts
    ├── summaries.controller.ts
    ├── summaries.module.ts
    ├── summaries.service.spec.ts
    └── summaries.service.ts
```

### 4.1. Configuración de Inicio y Swagger (`main.ts`)
El servidor inicializa la aplicación NestJS integrando el instrumento de telemetría `@nestjs/observe` y expone la documentación OpenAPI Swagger en la ruta `/api` con las etiquetas de los 6 módulos:

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const config = new DocumentBuilder()
    .setTitle('Sicoco API')
    .setDescription('API documentation for Sicoco - Collaborative Co-creation Synthesizer (MODESEC)')
    .setVersion('1.0')
    .addTag('users', 'Operaciones con usuarios y roles del sistema')
    .addTag('courses', 'Gestión de asignaturas y cursos académicos')
    .addTag('teams', 'Gestión de equipos colaborativos y asignación de miembros')
    .addTag('sessions', 'Sesiones de trabajo colaborativo y origen de plataforma')
    .addTag('transcripts', 'Ingesta de transcripciones y mensajes extraídos')
    .addTag('summaries', 'Motor de síntesis MODESEC (Acuerdos, Desacuerdos, Dudas, Tareas y Línea de Tiempo)')
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
```

---

### 4.2. Módulo de Usuarios (`UsersModule` - `/users`)
- **Propósito:** Gestión de identidades institucionales (estudiantes y docentes).
- **Esquema de Datos (`user.schema.ts`):** Define el usuario con campos `name` (requerido), `email` (requerido y único) y `age` (opcional), con marcas temporales automáticas (`timestamps: true`).
- **Operaciones REST (`users.controller.ts`):**
  - `POST /users`: Registra un nuevo usuario en la base de datos a partir del DTO.
  - `GET /users`: Consulta y retorna la lista completa de usuarios registrados.
  - `GET /users/:id`: Busca un usuario específico mediante su identificador único de MongoDB (`_id`).
  - `PATCH /users/:id`: Aplica modificaciones parciales a los datos del usuario.
  - `DELETE /users/:id`: Elimina el registro del usuario.

---

### 4.3. Módulo de Cursos (`CoursesModule` - `/courses`)
- **Propósito:** Gestión de materias académicas según los planes de estudio de la Universidad de Córdoba.
- **Esquema de Datos (`course.schema.ts`):** Vinculado a la colección `'courses'`, modela la asignatura con los atributos:
  - `code` (cadena única, requerida y limpia de espacios).
  - `name` (nombre de la materia, requerido).
  - `academicSemester` (semestre académico, ej. `"2026-2"`, requerido).
  - `instructor` (docente a cargo de la materia).
  - `description` (descripción u objetivos de la asignatura).
  - `isActive` (estado booleano, por defecto `true`).
  - `timestamps` automáticos de creación y actualización.
- **Operaciones REST (`courses.controller.ts`):**
  - `POST /courses`: Crea una nueva materia académica.
  - `GET /courses`: Lista todas las materias creadas.
  - `GET /courses/:id`: Obtiene la información detallada de una asignatura.
  - `PATCH /courses/:id`: Actualiza datos de la materia (docente, estado, etc.).
  - `DELETE /courses/:id`: Elimina la asignatura.

---

### 4.4. Módulo de Equipos Colaborativos (`TeamsModule` - `/teams`)
- **Propósito:** Representa los grupos de trabajo estudiantil conformados en el marco de una materia académica.
- **Esquema de Datos (`team.schema.ts`):**
  - `name`: Nombre del equipo colaborativo.
  - `courseId`: Referencia al curso académico contenedor.
  - `requiresTeacherApproval`: Bandera de seguridad (del modelo V2) para requerir autorización docente.
  - `members`: Lista de subdocumentos embebidos `TeamMember` con:
    - `studentId`: Identificador del estudiante.
    - `studentName`: Nombre del estudiante.
    - `role`: Rol en el equipo (`leader`, `member`, `guest`).
    - `joinedAt`: Fecha de incorporación.
  - `isActive`: Estado activo/inactivo del equipo.
- **Operaciones REST (`teams.controller.ts`):**
  - `POST /teams`: Crea un nuevo equipo con membresía inicial.
  - `GET /teams`: Lista los equipos registrados (con filtro opcional por `courseId`).
  - `GET /teams/:id`: Consulta la información detallada del equipo y sus miembros.
  - `PATCH /teams/:id`: Actualiza nombre o bandera de aprobación docente.
  - `POST /teams/:id/members`: Incorpora un nuevo estudiante al equipo con su respectivo rol.
  - `DELETE /teams/:id/members/:studentId`: Remueve a un estudiante del equipo colaborativo.
  - `DELETE /teams/:id`: Elimina el equipo.

---

### 4.5. Módulo de Sesiones de Trabajo (`SessionsModule` - `/sessions`)
- **Propósito:** Registro y seguimiento de reuniones sincrónicas y asincrónicas realizadas por los equipos en plataformas virtuales.
- **Esquema de Datos (`session.schema.ts`):**
  - `title`: Título representativo de la reunión.
  - `generalObjective`: Propósito pedagógico o meta de trabajo de la sesión.
  - `teamId`: Identificador del equipo titular de la reunión.
  - `meetingDate`: Fecha y hora de realización del encuentro.
  - `platformOrigin`: Plataforma de origen (`whatsapp`, `discord`, `teams`, `meet`, `slack`, `other`).
  - `estimatedDurationMinutes`: Duración aproximada en minutos.
  - `status`: Estado de la sesión (`scheduled`, `in_progress`, `completed`, `cancelled`).
- **Operaciones REST (`sessions.controller.ts`):**
  - `POST /sessions`: Registra una nueva sesión de trabajo colaborativo.
  - `GET /sessions`: Lista las sesiones (con filtro opcional por `teamId`).
  - `GET /sessions/:id`: Obtiene la ficha completa de una sesión.
  - `PATCH /sessions/:id`: Actualiza estado, objetivo o duración de la reunión.
  - `DELETE /sessions/:id`: Elimina el registro de la sesión.

---

### 4.6. Módulo de Ingesta de Transcripciones (`TranscriptsModule` - `/transcripts`)
- **Propósito:** Recepción, estructuración y almacenamiento persistente de los mensajes extraídos por la extensión Chromium desde el DOM de WhatsApp Web, Discord o Teams.
- **Esquema de Datos (`transcript.schema.ts`):**
  - `sessionId`: Identificador de la sesión vinculada.
  - `sourcePlatform`: Plataforma detectada por el scraper.
  - `format`: Formato de ingesta (`scraped_dom`, `exported_txt`, `json_api`).
  - `dataSize`: Número total de bytes o caracteres recibidos.
  - `isConfidential`: Bandera de privacidad (del modelo V2) para restringir accesos.
  - `messages`: Colección jerárquica de subdocumentos embebidos `ChatMessage`:
    - `senderName`: Nombre del participante visible en la interfaz.
    - `senderId`: Identificador de usuario (si está autenticado).
    - `senderAlias`: Apodo o número telefónico crudo (para mapeo posterior en `Alias_Estudiante`).
    - `timestamp`: Marca de tiempo original del mensaje.
    - `content`: Texto transcrito del mensaje.
    - `messageOrder`: Secuencia cronológica del mensaje dentro de la sesión.
    - `platformMetadata`: Metadatos variables (reacciones, menciones, citas).
- **Operaciones REST (`transcripts.controller.ts`):**
  - `POST /transcripts`: Crea el registro contenedor de transcripción con mensajes iniciales.
  - `GET /transcripts`: Lista transcripciones (con filtro opcional por `sessionId`).
  - `GET /transcripts/:id`: Recupera la transcripción íntegra con todos sus mensajes cronológicos.
  - `POST /transcripts/:id/messages`: Ingesta masiva o incremental de mensajes (`ChatMessageDto[]`) generados por el scraper web.
  - `PATCH /transcripts/:id`: Modifica banderas de privacidad o metadatos de la transcripción.
  - `DELETE /transcripts/:id`: Elimina la transcripción.

---

### 4.7. Módulo de Síntesis y Resúmenes MODESEC (`SummariesModule` - `/summaries`)
- **Propósito:** Núcleo inteligente de SICOCO. Estructura el resumen pedagógico bajo los 4 pilares de MODESEC y la línea de tiempo reflexiva de co-creación (`Conexion_Idea`), implementando el flujo asíncrono anti-timeout diseñado en el Informe U1-01.
- **Esquema de Datos (`summary.schema.ts`):**
  - **Identificación y Telemetría:** `sessionId`, `jobId` (UUID único del procesamiento asíncrono), `aiModelUsed`, `tokenUsage`, `executionTimeMs`, `status` (`queued`, `processing`, `completed`, `failed`), `errorMessage`.
  - **Pilar 1 - Acuerdos (`agreements`):** Lista de consensos (`title`, `description`, `consensusLevel`: `unanimous`/`majority`/`partial`, `participantsInvolved`).
  - **Pilar 2 - Desacuerdos (`disagreements`):** Registro de debates pedagógicos (`topic`, `opposingViews`, `unresolved`, `debateSnippet`).
  - **Pilar 3 - Dudas Abiertas (`doubts`):** Interrogantes no resueltos (`question`, `askedBy`, `category`: `conceptual`/`technical`/`organizational`, `urgencyLevel`: `low`/`medium`/`high`).
  - **Pilar 4 - Tareas Asignadas (`tasks`):** Compromisos con trazabilidad (`title`, `assignedTo`, `dueDate`, `priority`: `low`/`medium`/`high`, `status`: `pending`/`in_progress`/`completed`/`overdue`).
  - **Línea de Tiempo y Co-creación (`timeline`):** Momentos clave que implementan la relación reflexiva `Conexion_Idea`:
    - `minuteOrTimestamp`: Marca temporal del hito.
    - `momentType`: Tipo (`idea_proposal`, `idea_expansion`, `agreement_reached`, `decision_point`).
    - `description`: Resumen del aporte.
    - `keyIdea`: Idea sintetizada.
    - `inspiredByMomentId`: Enlace al momento previo que inspiró la idea (auto-relación de co-creación).
- **Flujo de Inferencia Asíncrona (Solución a Timeouts de IA):**
  - `POST /summaries/generate`: Recibe `GenerateSummaryDto` (`sessionId`, `aiModel`, `promptConfigId`). Genera de inmediato un `jobId` aleatorio y retorna código HTTP `202 Accepted` con estado `queued` en menos de 50 milisegundos, eliminando por completo el riesgo de HTTP Timeout. En segundo plano, se ejecuta el procesamiento con el LLM y se actualiza el estado a `completed`.
  - `GET /summaries/job/:jobId`: Endpoint de sondeo (*polling*) ligero que la extensión web o el dashboard consultan periódicamente hasta que el estado transicione a `completed` y entregue el resumen completo.
  - `GET /summaries`: Lista los resúmenes generados (con filtro opcional por `sessionId`).
  - `GET /summaries/:id`: Consulta un resumen por su identificador primario de MongoDB.
  - `POST /summaries`: Permite persistencia manual o inyección directa de síntesis estructuradas.
  - `PATCH /summaries/:id`: Actualiza tareas o acuerdos editados manualmente por los estudiantes.
  - `DELETE /summaries/:id`: Elimina la síntesis.

---

## 5. Estrategia de Pruebas Automatizadas y Calidad

Para superar las limitaciones de rendimiento del runner Jest tradicional, el proyecto implementó **Vitest v4.1.2** configurado con soporte nativo para ES Modules y TypeScript:

### 5.1. Pruebas Unitarias (`*.spec.ts`)
Cada uno de los 6 módulos dispone de suites completas de pruebas unitarias aisladas utilizando mocks de Mongoose mediante `@nestjs/testing` y `getModelToken()`:
1. `app.controller.spec.ts`
2. `users/users.controller.spec.ts`
3. `users/users.service.spec.ts`
4. `courses/courses.controller.spec.ts`
5. `courses/courses.service.spec.ts`
6. `teams/teams.controller.spec.ts`
7. `teams/teams.service.spec.ts`
8. `sessions/sessions.controller.spec.ts`
9. `sessions/sessions.service.spec.ts`
10. `transcripts/transcripts.controller.spec.ts`
11. `transcripts/transcripts.service.spec.ts`
12. `summaries/summaries.controller.spec.ts`
13. `summaries/summaries.service.spec.ts`

**Resultado:** 13 suites ejecutadas, **13 aprobadas al 100% (0 fallos)** en menos de 2.5 segundos.

### 5.2. Pruebas de Integración y E2E (`vitest.config.e2e.ts`)
Configurado para ejecutar pruebas de integración completas mediante `supertest`, validando que la aplicación responda a solicitudes HTTP reales en `test/app.e2e-spec.ts`.

### 5.3. Pipeline de Comandos
El equipo dispone de scripts automatizados en `package.json`:
- `npm run start:dev`: Levanta el servidor con recarga en caliente (`watch`) y variables desde `.env`.
- `npm run build`: Compila el proyecto TypeScript a la carpeta `dist/`.
- `npm run test`: Ejecuta la suite de 13 pruebas unitarias con Vitest.
- `npm run test:e2e`: Ejecuta las pruebas de extremo a extremo.
- `npm run lint`: Ejecuta el linter ultrarrápido `oxlint` con validación estricta de tipos.
- `npm run format`: Aplica formateo consistente con Prettier en `src/` y `test/`.

---

## 6. Integración y Próximos Pasos de Implementación

Con los **6 módulos operativos** integrados en el backend, la arquitectura cubre la totalidad de las 4 zonas de datos de SICOCO. Los siguientes pasos inmediatos comprenden:
1. **Conexión de la Extensión Chromium:** Consumir el endpoint `POST /transcripts/:id/messages` desde el content script inyectado en WhatsApp Web y Discord.
2. **Conexión del LLM en Tiempo Real:** Reemplazar el motor de simulación de `SummariesService.generate()` con llamadas directas a la API de **Google Gemini** (vía SDK `@google/genai` o REST API) inyectando la ingeniería de prompts de `Configuracion_Prompt`.
3. **Mecanismo de WebSockets (Opcional):** Implementar `@nestjs/websockets` con Socket.IO para notificaciones push en tiempo real en reemplazo o complemento del polling de `GET /summaries/job/:jobId`.


---
---

# English Version

# Technical Backend Architecture and REST API (sicoco-framework)

**Project:** SICOCO (Collaborative Co-Creation Synthesizer)  
**Module:** Backend Framework and Persistence Layer (`sicoco-framework`)  
**Course:** 203453 · Design and Development of Educational Software II · Semester IX  
**Term:** 2026-2 · Universidad de Córdoba

---

## 1. General Overview of the Backend Framework

During the **9th semester**, the SICOCO project formally transitioned from theoretical design and planning (MODESEC Phases 1 to 3) into physical execution within **Phase 4: Production and Development**.

To deliver a robust, scalable, typed, and maintainable backend, the solution was built on modern **NestJS** (v12), leveraging **TypeScript** with native ECMAScript Modules (`"type": "module"`). Data persistence relies on **MongoDB** orchestrated via **Mongoose**, implementing a layered architecture with strict separation of concerns: Controllers, Services, Data Transfer Objects (DTOs), and Schemas.

The backend features **operational modules and enterprise security** spanning all 4 zones of the MODESEC V2 relational architecture:

```mermaid
graph TD
    Client["Chromium Extension / Dashboard"] -->|HTTP REST JSON| Main["main.ts (Bootstrap + Swagger + Telemetry)"]
    Main --> AppMod["AppModule"]
    AppMod --> Config["ConfigModule (.env)"]
    AppMod --> Mongo["MongooseModule (MongoDB Connection)"]
    AppMod --> Obs["ObserveModule (@nestjs/observe)"]
    
    subgraph Z1 ["Zone 1: Academic Organization"]
        AppMod --> UsersMod["UsersModule (/users)"]
        AppMod --> CoursesMod["CoursesModule (/courses)"]
        AppMod --> TeamsMod["TeamsModule (/teams)"]
    end

    subgraph Z2 ["Zone 2: Sessions and Ingestion"]
        AppMod --> SessionsMod["SessionsModule (/sessions)"]
        AppMod --> TranscriptsMod["TranscriptsModule (/transcripts)"]
    end

    subgraph Z3Z4 ["Zones 3 & 4: MODESEC Synthesis & Co-Creation"]
        AppMod --> SummariesMod["SummariesModule (/summaries)"]
    end

    UsersMod --> UsersCtrl["UsersController"] --> UsersSvc["UsersService"] --> UserSchema["UserSchema"]
    CoursesMod --> CoursesCtrl["CoursesController"] --> CoursesSvc["CoursesService"] --> CourseSchema["CourseSchema"]
    TeamsMod --> TeamsCtrl["TeamsController"] --> TeamsSvc["TeamsService"] --> TeamSchema["TeamSchema"]
    SessionsMod --> SessionsCtrl["SessionsController"] --> SessionsSvc["SessionsService"] --> SessionSchema["SessionSchema"]
    TranscriptsMod --> TranscriptsCtrl["TranscriptsController"] --> TranscriptsSvc["TranscriptsService"] --> TranscriptSchema["TranscriptSchema"]
    SummariesMod --> SummariesCtrl["SummariesController"] --> SummariesSvc["SummariesService"] --> SummarySchema["SummarySchema"]
```

---

## 2. Technology Stack and Core Dependencies

The technical architecture is specified within `package.json` inside `sicoco-framework`:

| Category | Technology / Library | Version | Role in the Ecosystem |
| :--- | :--- | :---: | :--- |
| **Core Framework** | `@nestjs/core`, `@nestjs/common` | `^12.0.1` | Modular enterprise architecture with Dependency Injection and Inversion of Control. |
| **HTTP Platform** | `@nestjs/platform-express` | `^12.0.1` | Routing engine and REST request lifecycle dispatcher. |
| **NoSQL Persistence** | `@nestjs/mongoose`, `mongoose` | `^12.0.0` / `^9.11.4` | Document-oriented data modeling and persistence for messages and entities. |
| **Configuration** | `@nestjs/config` | `^12.0.1` | Global asynchronous environment variable resolution from `.env`. |
| **API Documentation** | `@nestjs/swagger` | `^12.1.0` | Automated OpenAPI specification generation and live Swagger UI at `/api`. |
| **Observability** | `@nestjs/observe` | `^0.3.0` | Server telemetry, instrumentation, and performance monitoring. |
| **Unit Testing** | `vitest`, `@nestjs/testing` | `^4.1.2` / `^12.0.1` | Blazing-fast Vite-powered unit test runner with native ESM execution. |
| **E2E Testing** | `supertest` | `^7.0.0` | End-to-end integration testing against running HTTP endpoints. |
| **Linting & Quality** | `oxlint`, `oxlint-tsgolint` | `^1.58.0` | High-performance Rust-based linter with strict TypeScript type-checking. |
| **Code Formatting** | `prettier` | `^3.4.2` | Uniform code standardization across all repository files. |

---

## 3. Justification of the Persistence Strategy (MongoDB & Mongoose)

Although an initial 19-table relational schema was modeled during Semester I, the team determined in **Technical Validation U1-01** that SICOCO's operational realities required a hybrid, scalable architecture:

1. **Hierarchical Semi-Structured Nature of Chat Logs:** Messaging transcripts (WhatsApp, Discord, Teams) feature tree-like structures with thread replies, reactions, variable metadata, and unbounded text lengths. MongoDB JSON/BSON document schemas store embedded message streams (`ChatMessage`) cleanly without exhausting SQL storage pools with millions of fragmented rows.
2. **Dynamic Structure of the 4 MODESEC Pillars:** AI-generated outputs produce variable-length arrays of agreements, disagreements, doubts, and assigned tasks. Storing these as typed Mongoose subdocuments delivers fast single round-trip queries to the client dashboard.
3. **Phase 4 Engineering Agility:** Mongoose provides strict compile-time and runtime type validation, allowing schemas to evolve with MODESEC pedagogical needs without requiring disruptive SQL migration scripts.
4. **Seamless Academic Entity Modeling:** Entities such as Users, Courses, and Teams utilize `@Schema()` and `@Prop()` decorators, enforcing constraints on institutional emails, course codes, and session keys.

---

## 4. Module Architecture and Source Code Organization

Application code is organized within the `src/` directory in `sicoco-framework`:

```
src/
├── app.controller.spec.ts          # Root controller unit tests
├── app.controller.ts               # Base controller (/health endpoint)
├── app.module.ts                   # Root module assembling functional domains
├── app.service.ts                  # Base application service
├── main.ts                         # Application bootstrap and Swagger configuration
├── users/                          # [Zone 1] Users and Identity Domain Module
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── schemas/
│   │   └── user.schema.ts          # Collection 'users'
│   ├── users.controller.spec.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.spec.ts
│   └── users.service.ts
├── courses/                        # [Zone 1] Academic Courses Domain Module
│   ├── dto/
│   │   ├── create-course.dto.ts
│   │   └── update-course.dto.ts
│   ├── schemas/
│   │   └── course.schema.ts        # Collection 'courses'
│   ├── courses.controller.spec.ts
│   ├── courses.controller.ts
│   ├── courses.module.ts
│   ├── courses.service.spec.ts
│   └── courses.service.ts
├── teams/                          # [Zone 1] Collaborative Teams Domain Module
│   ├── dto/
│   │   ├── create-team.dto.ts
│   │   └── update-team.dto.ts
│   ├── schemas/
│   │   └── team.schema.ts          # Collection 'teams' (subdocuments TeamMember)
│   ├── teams.controller.spec.ts
│   ├── teams.controller.ts
│   ├── teams.module.ts
│   ├── teams.service.spec.ts
│   └── teams.service.ts
├── sessions/                       # [Zone 2] Collaborative Work Sessions Domain Module
│   ├── dto/
│   │   ├── create-session.dto.ts
│   │   └── update-session.dto.ts
│   ├── schemas/
│   │   └── session.schema.ts       # Collection 'sessions'
│   ├── sessions.controller.spec.ts
│   ├── sessions.controller.ts
│   ├── sessions.module.ts
│   ├── sessions.service.spec.ts
│   └── sessions.service.ts
├── transcripts/                    # [Zone 2] Ingestion and Raw Messages Domain Module
│   ├── dto/
│   │   ├── create-transcript.dto.ts
│   │   └── update-transcript.dto.ts
│   ├── schemas/
│   │   └── transcript.schema.ts    # Collection 'transcripts' (subdocuments ChatMessage)
│   ├── transcripts.controller.spec.ts
│   ├── transcripts.controller.ts
│   ├── transcripts.module.ts
│   ├── transcripts.service.spec.ts
│   └── transcripts.service.ts
└── summaries/                      # [Zones 3 & 4] MODESEC Synthesis and Timeline Module
    ├── dto/
    │   ├── create-summary.dto.ts
    │   ├── update-summary.dto.ts
    │   └── generate-summary.dto.ts
    ├── schemas/
    │   └── summary.schema.ts       # Collection 'summaries' (Agreements, Disagreements, Doubts, Tasks, Timeline)
    ├── summaries.controller.spec.ts
    ├── summaries.controller.ts
    ├── summaries.module.ts
    ├── summaries.service.spec.ts
    └── summaries.service.ts
```

### 4.1. Application Entry Point and Swagger Configuration (`main.ts`)

The application boots NestJS with `@nestjs/observe` telemetry and publishes OpenAPI documentation at `/api`:

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const config = new DocumentBuilder()
    .setTitle('Sicoco API')
    .setDescription('API documentation for Sicoco - Collaborative Co-creation Synthesizer (MODESEC)')
    .setVersion('1.0')
    .addTag('users', 'Operations with system users and roles')
    .addTag('courses', 'Academic course and subject management')
    .addTag('teams', 'Collaborative team governance and member assignments')
    .addTag('sessions', 'Collaborative meetings and channel origins')
    .addTag('transcripts', 'Transcript ingestion and extracted messages')
    .addTag('summaries', 'MODESEC synthesis engine (Agreements, Disagreements, Doubts, Tasks, Timeline)')
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
```

---

### 4.2. Users Module (`UsersModule` - `/users`)
- **Objective:** Institutional identity administration (students, faculty, administrators).
- **Schema (`user.schema.ts`):** Models fields for `name` (required), `email` (unique, required), `role`, and `age`, with automatic `timestamps: true`.
- **REST Operations (`users.controller.ts`):**
  - `POST /users`: Registers a new user based on validated DTO.
  - `GET /users`: Retrieves all registered users.
  - `GET /users/:id`: Queries a user by primary identifier (`_id`).
  - `PATCH /users/:id`: Updates user attributes.
  - `DELETE /users/:id`: Removes a user record.

---

### 4.3. Courses Module (`CoursesModule` - `/courses`)
- **Objective:** Academic course management aligned with curriculum plans.
- **Schema (`course.schema.ts`):** Collection `'courses'` with attributes:
  - `code` (unique string, required).
  - `name` (subject name, required).
  - `academicSemester` (e.g., `"2026-2"`, required).
  - `instructor` (assigned faculty supervisor).
  - `description` (course goals and overview).
  - `isActive` (boolean state, default `true`).
  - Automatic audit timestamps.
- **REST Operations (`courses.controller.ts`):**
  - `POST /courses`: Creates an academic course offering.
  - `GET /courses`: Lists all registered courses.
  - `GET /courses/:id`: Retrieves full course metadata.
  - `PATCH /courses/:id`: Updates course fields.
  - `DELETE /courses/:id`: Deletes a course.

---

### 4.4. Collaborative Teams Module (`TeamsModule` - `/teams`)
- **Objective:** Collaborative student project teams.
- **Schema (`team.schema.ts`):**
  - `name`: Team title.
  - `courseId`: Parent academic course offering.
  - `requiresTeacherApproval`: Moderation governance flag from Model V2.
  - `members`: Embedded `TeamMember` subdocuments (`studentId`, `studentName`, `role`, `joinedAt`).
  - `isActive`: Team active lifecycle flag.
- **REST Operations (`teams.controller.ts`):**
  - `POST /teams`: Creates a new team with roster.
  - `GET /teams`: Lists teams (filterable by `courseId`).
  - `GET /teams/:id`: Retrieves team details and member list.
  - `PATCH /teams/:id`: Updates team name or moderation flags.
  - `POST /teams/:id/members`: Enrolls a student member.
  - `DELETE /teams/:id/members/:studentId`: Removes a member.
  - `DELETE /teams/:id`: Deletes a team.

---

### 4.5. Work Sessions Module (`SessionsModule` - `/sessions`)
- **Objective:** Tracking synchronous and asynchronous team meetings.
- **Schema (`session.schema.ts`):**
  - `title`: Meeting descriptive title.
  - `generalObjective`: Meeting goal.
  - `teamId`: Associated team.
  - `meetingDate`: Timestamp of the meeting.
  - `platformOrigin` (`whatsapp`, `discord`, `teams`, `meet`, `slack`, `other`).
  - `estimatedDurationMinutes`: Duration in minutes.
  - `status` (`scheduled`, `in_progress`, `completed`, `cancelled`).
- **REST Operations (`sessions.controller.ts`):**
  - `POST /sessions`: Schedules or records a collaborative session.
  - `GET /sessions`: Lists sessions (filterable by `teamId`).
  - `GET /sessions/:id`: Retrieves full session metadata.
  - `PATCH /sessions/:id`: Updates meeting status or agenda.
  - `DELETE /sessions/:id`: Deletes a session record.

---

### 4.6. Transcript Ingestion Module (`TranscriptsModule` - `/transcripts`)
- **Objective:** Structured persistence for scraped conversational messages.
- **Schema (`transcript.schema.ts`):**
  - `sessionId`: Parent work session ID.
  - `sourcePlatform`: Scraped messaging origin.
  - `format`: Ingestion format (`scraped_dom`, `exported_txt`, `json_api`).
  - `dataSize`: Total byte size or character count.
  - `isConfidential`: Confidentiality flag from Model V2.
  - `messages`: Embedded `ChatMessage` array (`senderName`, `senderId`, `senderAlias`, `timestamp`, `content`, `messageOrder`, `platformMetadata`).
- **REST Operations (`transcripts.controller.ts`):**
  - `POST /transcripts`: Creates a transcript record with initial message payload.
  - `GET /transcripts`: Lists transcripts (filterable by `sessionId`).
  - `GET /transcripts/:id`: Retrieves complete transcript with atomic messages.
  - `POST /transcripts/:id/messages`: Batch message ingestion endpoint from browser extension.
  - `PATCH /transcripts/:id`: Modifies transcript privacy flags or metadata.
  - `DELETE /transcripts/:id`: Deletes a transcript record.

---

### 4.7. MODESEC Summaries and Timeline Module (`SummariesModule` - `/summaries`)
- **Objective:** AI synthesis engine modeling the 4 MODESEC output pillars and co-creation timeline (`Conexion_Idea`), implementing the asynchronous anti-timeout architecture from Report U1-01.
- **Schema (`summary.schema.ts`):**
  - **Telemetry:** `sessionId`, `jobId` (unique UUID), `aiModelUsed`, `tokenUsage`, `executionTimeMs`, `status` (`queued`, `processing`, `completed`, `failed`), `errorMessage`.
  - **Pillar 1 - Agreements (`agreements`):** Consensus items (`title`, `description`, `consensusLevel`, `participantsInvolved`).
  - **Pillar 2 - Disagreements (`disagreements`):** Cognitive friction and debates (`topic`, `opposingViews`, `unresolved`, `debateSnippet`).
  - **Pillar 3 - Unresolved Doubts (`doubts`):** Open inquiries (`question`, `askedBy`, `category`, `urgencyLevel`).
  - **Pillar 4 - Action Items (`tasks`):** Commitments (`title`, `assignedTo`, `dueDate`, `priority`, `status`).
  - **Co-Creation Timeline (`timeline`):** Reflexive relationship `Conexion_Idea`:
    - `minuteOrTimestamp`: Event timestamp.
    - `momentType`: Classification (`idea_proposal`, `idea_expansion`, `agreement_reached`, `decision_point`).
    - `description`: Narrative summary.
    - `keyIdea`: Synthesized insight.
    - `inspiredByMomentId`: Link to precursor milestone (reflexive co-creation edge).
- **Asynchronous Execution Workflow:**
  - `POST /summaries/generate`: Ingests `GenerateSummaryDto`. Instantly issues a random `jobId` and responds with HTTP `202 Accepted` and status `queued` in under 50 ms, eradicating HTTP timeouts. Executes LLM inference asynchronously in the background.
  - `GET /summaries/job/:jobId`: Lightweight polling endpoint queried by client until transition to `completed`.
  - `GET /summaries`: Queries summaries (filterable by `sessionId`).
  - `GET /summaries/:id`: Retrieves full summary by MongoDB `_id`.
  - `POST /summaries`: Manual persistence of structured summaries.
  - `PATCH /summaries/:id`: Modifies summary tasks or agreements edited by students.
  - `DELETE /summaries/:id`: Deletes a summary.

---

## 5. Automated Quality and Testing Strategy

Replacing legacy Jest runners, the backend adopts **Vitest v4.1.2** with native TypeScript and ES Modules support:

### 5.1. Unit Testing Suites (`*.spec.ts`)
Each module maintains isolated unit tests leveraging Mongoose mocks via `@nestjs/testing` and `getModelToken()`:
1. `app.controller.spec.ts`
2. `users/users.controller.spec.ts`
3. `users/users.service.spec.ts`
4. `courses/courses.controller.spec.ts`
5. `courses/courses.service.spec.ts`
6. `teams/teams.controller.spec.ts`
7. `teams/teams.service.spec.ts`
8. `sessions/sessions.controller.spec.ts`
9. `sessions/sessions.service.spec.ts`
10. `transcripts/transcripts.controller.spec.ts`
11. `transcripts/transcripts.service.spec.ts`
12. `summaries/summaries.controller.spec.ts`
13. `summaries/summaries.service.spec.ts`

**Outcome:** 100% pass rate across all test suites in under 2.5 seconds.

### 5.2. Integration and E2E Testing (`vitest.config.e2e.ts`)
Executes integration testing via `supertest` validating HTTP routing, status codes, and JSON responses in `test/app.e2e-spec.ts` and `test/auth.e2e-spec.ts`.

### 5.3. Command Pipeline
- `npm run start:dev`: Launches development server with hot-reloading (`watch`) and `.env` support.
- `npm run build`: Compiles TypeScript codebase into `dist/`.
- `npm run test`: Executes unit test suites with Vitest.
- `npm run test:e2e`: Runs end-to-end integration tests.
- `npm run lint`: Runs next-generation `oxlint` linter with strict type checks.
- `npm run format`: Standardizes code formatting with Prettier across `src/` and `test/`.

---

## 6. Next Steps and Implementation Roadmap

With **operational modules** integrated into the backend, the architecture fully models all 4 SICOCO data zones. Immediate steps include:
1. **Chromium Extension Hookup:** Connect content scrapers to the `POST /transcripts/:id/messages` endpoint.
2. **Real-time LLM API Integration:** Bind `SummariesService.generate()` directly to the **Google Gemini API** injecting master prompt templates.
3. **WebSockets Push Layer:** Add `@nestjs/websockets` with Socket.IO for real-time status notifications alongside polling.
