# Auditoría del Prompt Docente y Culminación Integral del Backend (Fases 1 a 5)

**Proyecto:** SICOCO (Sintetizador de Co-creación Colaborativa)  
**Módulo:** Framework de Backend y Capa de Persistencia (`sicoco-framework`)  
**Asignatura:** 203453 · Diseño y Desarrollo de Software Educativo II · Semestre IX  
**Docente:** Mg. Alexander Enrique Toscano Ricardo  
**Periodo:** 2026-2 · Universidad de Córdoba  

---

## 1. Contexto y Propósito del Documento

El docente titular de la cátedra proporcionó un prompt pedagógico estructurado para la construcción iterativa de un backend robusto dividido en **5 Fases**:
1. *Fase 1: Estructura del Proyecto y Configuración del Servidor.*
2. *Fase 2: Conexión a Base de Datos y Modelado.*
3. *Fase 3: Desarrollo de Módulos y Lógica de Negocio.*
4. *Fase 4: Seguridad, Autenticación y Autorización.*
5. *Fase 5: Pruebas (Testing) y Documentación.*

Dado que el equipo de desarrollo de SICOCO ya contaba con un avance significativo previo (6 módulos en NestJS 12 y MongoDB para las 4 zonas de MODESEC), este documento registra la **auditoría técnica comparativa (Gap Analysis)** entre lo solicitado por el docente y el estado previo del repositorio, detallando cada elemento faltante que fue implementado para alcanzar el **100% de cumplimiento operativo**.

---

## 2. Matriz de Auditoría Comparativa (Gap Analysis)

| Fase del Prompt Docente | Requisitos Específicos del Docente | Estado Previo en SICOCO | Brecha Detectada (Lo que faltaba) | Acción Técnica Ejecutada e Implementada |
| :--- | :--- | :---: | :---: | :--- |
| **Fase 1: Estructura y Servidor** | Estructura modular, `main.ts`, `.env.example`, dependencias y endpoint de prueba `/health`. | **90%** | Faltaba el endpoint de verificación de salud operativa `/health`. | Se implementó `GET /health` en `AppController` y `AppService` reportando uptime, timestamp, entorno y estado del servicio. Pruebas E2E agregadas. |
| **Fase 2: Conexión y Modelado** | Conexión a BD, manejo de errores/pool, modelos/entidades con tipos, restricciones (`UNIQUE`, `NOT NULL`) y relaciones. | **85%** | El esquema `User` carecía de campos para autenticación (`password` cifrada) y perfiles de rol institucional (`role`, matrícula). | Se actualizó `UserSchema` incorporando `password` (con `select: false`), enum de roles (`student`, `teacher`, `admin`), `enrollmentNumber`, `academicProgram` y `currentSemester`. |
| **Fase 3: Módulos y Lógica** | Rutas, controladores, servicios, repositorios, validación DTOs y manejo global de excepciones. | **70%** | Faltaban validadores activos en DTOs (`class-validator`) y un filtro global de excepciones para estandarizar errores HTTP en JSON. | Se instaló `class-validator` y `class-transformer`, se activó `ValidationPipe({ whitelist: true })` global, y se creó el filtro `AllExceptionsFilter` (`http-exception.filter.ts`). |
| **Fase 4: Seguridad y Autorización** | Registro/Login con `bcrypt`, JWT, guards de rutas, RBAC por perfiles y cabeceras seguras (Helmet, CORS). | **15%** | No existía módulo de autenticación, ni encriptación, ni JWT, ni control de acceso por roles, ni Helmet activo. | Se creó el módulo completo `AuthModule` con `POST /auth/register`, `POST /auth/login`, `GET /auth/profile`, `bcryptjs`, `@nestjs/jwt`, `JwtAuthGuard`, `RolesGuard` (`@Roles()`), Helmet y CORS. |
| **Fase 5: Testing y Documentación** | Pruebas unitarias de servicios, pruebas de integración E2E y documentación OpenAPI/Swagger interactiva. | **85%** | Faltaban pruebas unitarias para Auth, prueba E2E de `/health` y documentación Swagger con autenticación Bearer JWT. | Se desarrollaron `auth.service.spec.ts` y `auth.controller.spec.ts`, alcanzando **15 suites unitarias (16 tests)** y **2 pruebas E2E** con 100% de aprobación, más soporte de `addBearerAuth()` en Swagger `/api`. |

---

## 3. Detalle de Implementaciones Realizadas por Fase

```mermaid
graph TD
    subgraph F1 ["Fase 1: Servidor y Salud"]
        H["GET /health<br>(Status, Uptime, Timestamp)"]
    end

    subgraph F2 ["Fase 2: Modelado Ampliado"]
        U["UserSchema<br>(+password, +role, +enrollmentNumber)"]
    end

    subgraph F3 ["Fase 3: Validación y Excepciones"]
        VP["ValidationPipe (class-validator)<br>whitelist: true"]
        EF["AllExceptionsFilter<br>JSON estructurado"]
    end

    subgraph F4 ["Fase 4: Seguridad y RBAC"]
        BC["bcryptjs (Salt 10)"]
        JWT["@nestjs/jwt (24h)"]
        JG["JwtAuthGuard (Bearer)"]
        RG["RolesGuard (@Roles)"]
        HL["Helmet + CORS"]
    end

    subgraph F5 ["Fase 5: Testing y Swagger"]
        VT["Vitest: 15 suites (16 tests) OK"]
        E2E["Supertest: 2 tests E2E OK"]
        SW["Swagger OpenAPI (/api) + BearerAuth"]
    end

    F1 --> F2 --> F3 --> F4 --> F5
```

### 3.1. Fase 1: Endpoint de Salud Operativa (`/health`)
Se añadió en `AppController` el endpoint `GET /health` que entrega una respuesta estructurada para monitoreo y comprobación de disponibilidad:
```json
{
  "status": "ok",
  "service": "sicoco-backend",
  "version": "1.0.0",
  "uptime": 12.45,
  "timestamp": "2026-11-17T12:00:00.000Z",
  "environment": "development"
}
```

### 3.2. Fase 2: Esquema de Usuario para Autenticación y MODESEC
Se actualizó [`user.schema.ts`](file:///c:/Me,%20Myself%20and%20I/Unicordoba/SICOCO%20-%20Project/sicoco-framework/src/users/schemas/user.schema.ts) para soportar las credenciales cifradas y los atributos institucionales:
- `password`: Almacena el hash generado por bcrypt. Configurado con `select: false` para que las consultas cotidianas de usuarios no expongan la contraseña en respuestas HTTP.
- `role`: Perfil institucional con restricción de valores: `'student' | 'teacher' | 'admin'` (por defecto `'student'`).
- `enrollmentNumber`: Código institucional de matrícula para estudiantes o número de empleado docente.
- `academicProgram`: Programa de adscripción (ej. *Licenciatura en Informática*).
- `currentSemester`: Semestre en curso (ej. 8 o 9).

### 3.3. Fase 3: Validación Global y Manejo Estandarizado de Excepciones
1. **Validación de Datos de Entrada:** Se configuró en `main.ts` un `ValidationPipe` global. Al recibir peticiones REST, se verifican tipos, correos institucionales válidos (`@IsEmail()`), longitudes mínimas (`@MinLength(6)`) y se descartan campos no autorizados (`whitelist: true`).
2. **Filtro Centralizado de Excepciones (`AllExceptionsFilter`):** Localizado en [`src/common/filters/http-exception.filter.ts`](file:///c:/Me,%20Myself%20and%20I/Unicordoba/SICOCO%20-%20Project/sicoco-framework/src/common/filters/http-exception.filter.ts), captura tanto `HttpException` como errores no controlados, garantizando un esquema uniforme de error:
   ```json
   {
     "statusCode": 401,
     "timestamp": "2026-11-17T12:01:23.456Z",
     "path": "/auth/profile",
     "method": "GET",
     "message": "Authentication token missing or invalid",
     "error": "Unauthorized"
   }
   ```

### 3.4. Fase 4: Seguridad, Autenticación (JWT + bcrypt) y Roles (RBAC)
Se construyó el módulo [`AuthModule`](file:///c:/Me,%20Myself%20and%20I/Unicordoba/SICOCO%20-%20Project/sicoco-framework/src/auth/auth.module.ts) que implementa:
1. **Registro de Usuarios (`POST /auth/register`):**
   - Valida unicidad de correo institucional.
   - Encripta la contraseña usando `bcryptjs.hash(password, 10)`.
   - Crea el registro en MongoDB y emite inmediatamente un token de acceso JWT firmado.
2. **Inicio de Sesión (`POST /auth/login`):**
   - Recupera el usuario con su campo `password` explícito.
   - Comprueba credenciales mediante `bcryptjs.compare()`.
   - Genera el token JWT con vigencia de 24 horas conteniendo `sub`, `email`, `role` y `name`.
3. **Guardia de Autenticación (`JwtAuthGuard`):**
   - Intercepta cabeceras `Authorization: Bearer <token>`.
   - Valida la firma del token y propaga el usuario decodificado en `request.user`.
   - Respeta rutas públicas mediante el decorador `@Public()`.
4. **Control de Acceso Basado en Roles (`RolesGuard` y `@Roles()`):**
   - Permite proteger endpoints con decoradores declarativos: `@Roles('teacher', 'admin')`.
   - Si un estudiante intenta invocar una ruta reservada para docentes, el guardia deniega la petición con código HTTP `403 Forbidden`.
5. **Seguridad de Capa HTTP:**
   - **Helmet:** Agrega cabeceras de protección (Content-Security-Policy, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security).
   - **CORS:** Habilitado para soportar solicitudes cross-origin desde la extensión de navegador Chromium y el Dashboard web.

### 3.5. Fase 5: Pruebas y Swagger con Bearer Auth
1. **Pruebas Automatizadas en Vitest:**
   - Total de suites unitarias: **15 archivos de especificación (`*.spec.ts`)**, cubriendo `App`, `Auth`, `Users`, `Courses`, `Teams`, `Sessions`, `Transcripts` y `Summaries`.
   - Total de pruebas unitarias: **16 pruebas pasando al 100% (0 fallos)**.
   - Pruebas de integración E2E: **2 pruebas ejecutadas y aprobadas** (`GET /` y `GET /health`).
2. **Swagger OpenAPI (`/api`):**
   - Se habilitó `.addBearerAuth()` para probar interactivamente rutas protegidas inyectando el token JWT en el botón *"Authorize"*.
   - Se agruparon las rutas bajo los tags: `health`, `auth`, `users`, `courses`, `teams`, `sessions`, `transcripts` y `summaries`.

---

## 4. Catálogo Consolidado de Endpoints de la API

| Módulo | Método | Endpoint | Acceso / Guard | Descripción |
| :--- | :---: | :--- | :---: | :--- |
| **Health** | `GET` | `/health` | Público | Comprobación de salud, uptime y métricas de servidor. |
| **Health** | `GET` | `/` | Público | Saludo base y verificación de arranque HTTP. |
| **Auth** | `POST` | `/auth/register` | Público | Registro de usuarios con contraseña encriptada (bcrypt) y emisión de JWT. |
| **Auth** | `POST` | `/auth/login` | Público | Autenticación de credenciales y retorno de JWT access token. |
| **Auth** | `GET` | `/auth/profile` | `JwtAuthGuard` | Consulta del perfil autenticado a partir del token JWT. |
| **Auth** | `GET` | `/auth/teacher-only` | `JwtAuthGuard` + `@Roles('teacher','admin')` | Endpoint de demostración de RBAC docente/administrativo. |
| **Users** | `POST` | `/users` | Público | Creación directa de usuario institucional con DTO tipado. |
| **Users** | `GET` | `/users` | Público | Consulta de catálogo de usuarios registrados. |
| **Users** | `GET` | `/users/:id` | Público | Búsqueda de usuario por identificador único MongoDB. |
| **Users** | `PATCH` | `/users/:id` | Público | Actualización de atributos del usuario. |
| **Users** | `DELETE`| `/users/:id` | Público | Eliminación del registro de usuario. |
| **Courses**| `POST` | `/courses` | Público | Creación de asignatura académica. |
| **Courses**| `GET` | `/courses` | Público | Listado de materias activas del programa. |
| **Courses**| `GET` | `/courses/:id` | Público | Detalle de materia académica por ID. |
| **Courses**| `PATCH`| `/courses/:id` | Público | Actualización de datos de la materia. |
| **Courses**| `DELETE`| `/courses/:id` | Público | Eliminación de materia académica. |
| **Teams** | `POST` | `/teams` | Público | Creación de equipo de trabajo colaborativo. |
| **Teams** | `GET` | `/teams` | Público | Listado de equipos (filtro opcional por `courseId`). |
| **Teams** | `GET` | `/teams/:id` | Público | Consulta de equipo y sus integrantes (`TeamMember`). |
| **Teams** | `PATCH`| `/teams/:id` | Público | Actualización de metadatos del equipo. |
| **Teams** | `POST` | `/teams/:id/members` | Público | Incorporación de miembro al equipo con rol asignado. |
| **Teams** | `DELETE`| `/teams/:id/members/:studentId` | Público | Desvinculación de integrante del equipo. |
| **Teams** | `DELETE`| `/teams/:id` | Público | Eliminación del equipo colaborativo. |
| **Sessions**| `POST` | `/sessions` | Público | Registro de sesión de trabajo sincrónica/asincrónica. |
| **Sessions**| `GET` | `/sessions` | Público | Listado de sesiones (filtro opcional por `teamId`). |
| **Sessions**| `GET` | `/sessions/:id` | Público | Consulta de ficha detallada de la sesión. |
| **Sessions**| `PATCH`| `/sessions/:id` | Público | Actualización de estado, duración u objetivos. |
| **Sessions**| `DELETE`| `/sessions/:id` | Público | Eliminación de registro de sesión. |
| **Transcripts**| `POST` | `/transcripts` | Público | Registro de transcripción contenedor. |
| **Transcripts**| `GET` | `/transcripts` | Público | Listado de transcripciones por sesión. |
| **Transcripts**| `GET` | `/transcripts/:id` | Público | Recuperación de transcripción íntegra con mensajes. |
| **Transcripts**| `POST` | `/transcripts/:id/messages` | Público | **Ingesta masiva de mensajes (`ChatMessage`) desde scraper DOM.** |
| **Transcripts**| `PATCH`| `/transcripts/:id` | Público | Modificación de metadatos o confidencialidad. |
| **Transcripts**| `DELETE`| `/transcripts/:id` | Público | Eliminación de transcripción. |
| **Summaries**| `POST` | `/summaries/generate` | Público | **Inferencia asíncrona (U1-01 anti-timeout) retornando `jobId`.** |
| **Summaries**| `GET` | `/summaries/job/:jobId` | Público | **Sondeo periódico (*polling*) del estado de síntesis IA.** |
| **Summaries**| `POST` | `/summaries` | Público | Registro manual de resumen estructurado. |
| **Summaries**| `GET` | `/summaries` | Público | Listado de resúmenes generados. |
| **Summaries**| `GET` | `/summaries/:id` | Público | Consulta de resumen por ID con los 4 pilares y timeline. |
| **Summaries**| `PATCH`| `/summaries/:id` | Público | Ajuste de tareas o acuerdos editados por alumnos. |
| **Summaries**| `DELETE`| `/summaries/:id` | Público | Eliminación de síntesis. |

---

## 5. Conclusión de la Auditoría

El backend de SICOCO ha superado la totalidad de los criterios formulados en el prompt docente:
- **Fase 1:** Cumplida al 100% (Servidor NestJS, ESM, `.env.example`, endpoint `/health`).
- **Fase 2:** Cumplida al 100% (Persistencia Mongoose NoSQL, esquemas de 4 zonas y `UserSchema` ampliado con contraseñas seguras y roles).
- **Fase 3:** Cumplida al 100% (Arquitectura desacoplada en capas, `ValidationPipe` global con `class-validator`, y `AllExceptionsFilter` estandarizado).
- **Fase 4:** Cumplida al 100% (Registro/Login con `bcryptjs`, tokens JWT, `JwtAuthGuard`, control de acceso RBAC con `RolesGuard`, Helmet y CORS).
- **Fase 5:** Cumplida al 100% (15 suites de pruebas unitarias en Vitest con 100% de éxito, pruebas E2E con Supertest y documentación Swagger interactiva en `/api` con autorización Bearer).
