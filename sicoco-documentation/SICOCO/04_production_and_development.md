# Fase 4: Producción y Desarrollo (Estado Activo)

En esta etapa se construye el prototipo funcional (**MVP**) de SICOCO, conectando la interfaz de la **extensión de navegador Chromium** con el backend empresarial y el motor de Inteligencia Artificial generativa.

---

## 1. Arquitectura de Implementación del Backend (`sicoco-framework`)

Para materializar la persistencia y la lógica de negocio validada en el informe U1-01, el equipo construyó el servidor base en el repositorio `sicoco-framework`:

- **Framework y Lenguaje:** Desarrollado sobre **NestJS 12** y **TypeScript** con arquitectura modular ES Modules (`"type": "module"`).
- **Capa de Persistencia Híbrida:** Uso de **MongoDB** a través de **Mongoose 9**, permitiendo esquemas flexibles para la ingesta de transcripciones semi-estructuradas y tipado estricto para entidades académicas.
- **Módulos Base Operativos:**
  - `UsersModule`: Controladores y servicios CRUD para la gestión de estudiantes y docentes, con esquemas de validación Mongoose y DTOs tipados.
  - `CoursesModule`: Controladores y servicios CRUD para asignaturas académicas (colección `'courses'`).
- **Contrato y Documentación:** Interfaz interactiva de **Swagger / OpenAPI** desplegada en tiempo real en `/api`.
- **Aseguramiento de Calidad:** Suite de pruebas automatizadas con **Vitest 4**, linter ultrarrápido **oxlint** y formateo consistente con Prettier.

---

## 2. Ingeniería de Prompts (Instrucciones a la IA)

**Esta es la parte más crítica de la programación del motor inteligente.**

Dado que no se entrenará un modelo desde cero (fine-tuning), el sistema aprovecha modelos fundacionales (Google Gemini / OpenAI) mediante una arquitectura de **prompts estructurados por competencias**:
- Las instrucciones obligan al modelo a retornar un esquema JSON rígido que alimenta directamente las entidades `Acuerdo_Equipo`, `Desacuerdo`, `Duda_Abierta` y `Tarea_Asignada`.
- Se incorpora mitigación de alucinaciones validando que cada tarea extraída tenga un responsable explícito o deducible del contexto.

---

## 3. Manejo de Diversidad de Textos Conversacionales

El backend está diseñado para procesar dos ritmos conversacionales radicalmente distintos:

1. **Chats rápidos y fragmentados (WhatsApp Web, Telegram):** Mensajes cortos, emojis, jerga estudiantil y pausas temporales. El scraper agrupa ráfagas continuas de un mismo remitente antes de enviarlas al LLM.
2. **Foros ordenados y formales (Teams, Moodle, Discord Threads):** Intervenciones extensas y argumentativas con debates conceptuales.

---

## 4. Estrategia de Procesamiento Asíncrono

Para evitar bloqueos o caídas por *HTTP Timeout* (hallazgo clave del informe U1-01):
- La extensión envía la transcripción mediante `POST /sessions/:id/process-chat`.
- El backend encola la petición y retorna de inmediato un identificador de tarea (`Job_ID`).
- La extensión consulta el avance mediante *Polling* periódico o WebSockets hasta recibir el resumen estructurado en el Dashboard.
