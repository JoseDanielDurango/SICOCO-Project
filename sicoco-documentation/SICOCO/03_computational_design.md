# Fase 3: Diseño Computacional y Técnico (Arquitectura y Modelado)

Este es el plan básico para desarrollar el programa bajo un modelo **MVP (Producto Mínimo Viable)**. Esto asegura que el proyecto mantenga un alcance realista y se pueda culminar satisfactoriamente durante el semestre universitario.

---

## Entrada de Datos (Básica y Segura)

Para evitar la complejidad técnica de bots de Discord o APIs de mensajería empresarial en tiempo real, el sistema recibirá la información a través de la extensión:

- **Ingreso de Historiales (Extensión de Navegador):** Se proveerá una interfaz integrada en la extensión de navegador que permitirá a los estudiantes capturar la conversación directamente desde las pestañas web activas (WhatsApp Web, Discord Web, Teams Web) a través de la lectura del DOM, o bien cargar manualmente archivos de historial exportados (txt, csv, JSON).

> *(Nota: Esta restricción asegura la factibilidad del proyecto para el equipo de desarrollo, eludiendo el uso de APIs oficiales complejas o bots que requieran tokens de administrador).*

---

## El Motor de SICOCO (Procesamiento)

SICOCO funcionará consumiendo las APIs de Inteligencias Artificiales generativas comerciales de bajo costo o capa gratuita (como Gemini o OpenAI). 

- **Enfoque en Ingeniería de Prompts:** No se entrenará una IA desde cero (fine-tuning). Se utilizará un sistema robusto de instrucciones estructuradas.
- La instrucción principal dirigirá al modelo de lenguaje para que extraiga de forma precisa nuestros cuatro puntos clave: **acuerdos, tareas, desacuerdos y dudas.**

---

## Pantalla para el Usuario (UI)

Se construirá una interfaz gráfica (Dashboard) estructurada y clara, sin requerir elementos dinámicos excesivamente complejos. 

> Lo primordial es exponer de manera visual los elementos extraídos, como identificar al autor del acuerdo y enlistar las tareas pendientes, para que cualquier miembro del equipo comprenda el estatus general de un solo vistazo.
