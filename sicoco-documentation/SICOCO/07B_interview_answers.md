# Respuestas a la Entrevista Técnica (Modelo de Datos)

A continuación, se presentan las respuestas a la entrevista bajo la óptica de un Arquitecto de Datos para iniciar el modelado relacional del sistema Mínimo Viable (MVP).

---

**1. Sobre los datos de los estudiantes:**
> "Para este requerimiento, es necesario registrar como llave principal el número de identificación o matrícula universitaria de cada estudiante. Adicionalmente, debemos almacenar sus nombres y apellidos completos, un correo electrónico institucional válido y una contraseña encriptada para garantizar el acceso seguro al sistema. Sería fundamental incorporar también el semestre actual que cursa el estudiante, el programa académico o facultad a la que pertenece y, por supuesto, la fecha exacta de su registro en la plataforma."

**2. Sobre otros tipos de usuarios de la herramienta:**
> "Es correcto. El sistema debe estar diseñado para soportar múltiples roles. Por ejemplo, para el rol de 'Docente' o 'Profesor', sería necesario solicitar un número de empleado y el departamento académico al que pertenece. Asimismo, la arquitectura debe contemplar un perfil de 'Administrador', el cual contará con permisos superiores para gestionar el mantenimiento técnico interno."

**3. Sobre la organización de la vida académica:**
> "Dado que los proyectos se desarrollan en el contexto de una materia, la base del proyecto debe estar vinculada a una entidad de 'Asignatura' o 'Curso'. Debemos almacenar el código oficial de la materia, su nombre completo y el periodo o semestre académico correspondiente. Esta estructura nos permitirá vincular directamente cada curso con el docente responsable."

**4. Sobre la estructuración de los equipos de trabajo:**
> "La configuración requerirá una tabla independiente para los equipos. Se debe solicitar a los estudiantes que definan un nombre para su equipo, el cual estará vinculado obligatoriamente al curso pertinente. Registrar la fecha de creación del equipo también será un dato necesario para mantener un control temporal adecuado."

**5. Sobre la gestión de los integrantes por equipo:**
> "En un entorno académico real, un estudiante participa en varios equipos simultáneamente a lo largo del semestre. Por tanto, requerimos una tabla intermedia para gestionar estas relaciones. Debemos registrar la fecha en la que el estudiante se integra a un equipo en concreto y especificar claramente el rol que asume en dicho grupo, ya sea como líder del proyecto o como miembro colaborador."

**6. Sobre la composición formal de una sesión de trabajo:**
> "Cada vez que un equipo se reúna mediante una aplicación de mensajería, será pertinente capturar el objetivo central o tema discutido en dicha sesión. Posteriormente, el sistema debe registrar la fecha y hora de inicio de la reunión, así como identificar la plataforma de origen desde la cual se extrajo la conversación, tales como Discord, WhatsApp o Microsoft Teams."

**7. Sobre el registro de la información ingresada al sistema:**
> "Todo registro cargado a la plataforma, ya sea archivo de historial u otro método, debe ser debidamente auditado. Necesitamos registrar su origen, formato específico y metadatos para evitar inconsistencias de procesamiento. Por supuesto, debe quedar registrada la matrícula del estudiante responsable de ingresar el documento al sistema."

**8. Sobre la pertinencia de almacenar mensajes individuales:**
> "Almacenar mensajes de manera individual es altamente recomendable para mantener un nivel óptimo de precisión durante el análisis de IA. En este escenario, deberíamos registrar cada mensaje de manera separada, incluyendo su marca de tiempo exacta, el identificador o alias del usuario emisor dentro de la plataforma conversacional y el texto crudo del mensaje original correspondiente."

**9. Sobre la administración de las instrucciones (prompts) de la IA:**
> "Puesto que existirá flexibilidad para que los estudiantes seleccionen diferentes estilos de resumen, el sistema debe administrar estas instrucciones maestras. Será necesario registrar el nombre representativo del estilo, el texto exacto con el 'prompt' matriz que se enviará al modelo procesador y un parámetro booleano que nos indique si dicha instrucción se encuentra activa o en desuso."

**10. Sobre el resumen generado por el sistema:**
> "Una vez que la Inteligencia Artificial devuelve el análisis, es obligatorio capturar el bloque íntegro de texto resultante y asociarlo directamente a la sesión. Además de esto, resultará valioso auditar métricas operativas, tales como la fecha e instancia de su generación, el modelo subyacente que fue utilizado (ej. Gemini o Claude) y la cantidad de tokens totales consumidos durante la operación."

**11. Sobre recabar los 'Acuerdos' que se llegaron en grupo:**
> "Para esta entidad en particular, requerimos extraer una descripción clara de la decisión central consensuada. Sería importante incluir parámetros adicionales que cualifiquen el nivel de importancia o prioridad de dicho acuerdo, y aprovechar la herramienta generativa para etiquetar formalmente a los estudiantes que impulsaron o propusieron finalmente esa resolución."

**12. Sobre estructurar 'Desacuerdos o Posturas Encontradas':**
> "Para registrar pertinentemente debates prolongados, es fundamental almacenar un encabezado sobre el tema de discusión y una descripción del punto de oposición, salvaguardando los diferentes ángulos. Se requiere incorporar, lógicamente, un indicador de avance que permita clasificar el desacuerdo en desarrollo como 'Activo' o 'Resuelto'."

**13. Sobre procesar las dudas sin resolver:**
> "Bajo estas circunstancias, no basta con resguardar simplemente las interrogantes abstractas. Para maximizar la usabilidad, la base de datos deberá almacenar la cita textual de la duda y relacionarla contextualmente con el tema general en que se detuvo la conversación, orientando así adecuadamente al estudiante investigador o profesor a su consulta posterior."

**14. Sobre el registro de las Tareas (To-Do):**
> "Para procesar rigurosamente las responsabilidades extraídas, la base de datos deberá captar el título descriptivo de esta actividad pendiente de realizar. Este registro, además, exige estar directamente enlazado con la entidad del estudiante elegido responsable. Adicionaremos un sistema de estado rastreable compuesto de banderas como 'Pendiente' o 'Completado' y la estimación prudente de una fecha límite prevista."

**15. Sobre los eventos reflejados en la 'Línea de tiempo':**
> "Teniendo el propósito claro de graficar la cronología sobre el área de interfaz de usuario, necesitamos registrar eventos puntuales identificados a lo largo del log aportado. Cursaremos entonces un listado anexando marcas de tiempo, atribuyendo esta intervención explícitamente a un usuario del equipo en curso, y tipificando su naturaleza; por ejemplo: 'Surgimiento de Idea' o 'Cuestionamiento'."

**16. Sobre la relación causativa de estas ideas:**
> "Mapear un tejido de interacciones consecutivas requerirá un enfoque de relaciones algo más profundo sobre lo proyectado. De implementarse debidamente, nuestra base tendría la capacidad de generar conexiones cruzadas entre eventos independientes: sentando constancia, por citar una dinámica, de que la premisa elaborada en etapas muy tempranas por el Estudiante A desencadenó o aportó los fundamentos para la solución redactada minutos más tarde por el Estudiante B."

**17. Sobre los datos a recolectar durante el Test de Precisión:**
> "Ya transicionando a la validación propia de las funcionalidades del motor, es necesario poder auditar cualquier resumen aleatorio. Exigimos registrar variables objetivas como el número verificado de falsos positivos devueltos por el asistente en una medición, así como complementar un puntaje analítico (en una escala de 1 a 10) concerniente a la fidelidad integral hacia los textos provistos originalmente, con un área para detallar incidencias."

**18. Sobre la evaluación de Facilidad de Uso (UX):**
> "Frente al escrutinio del diseño de plataformas, almacenamos obligadamente respuestas provistas en las encuestas internas a usuarios de prueba. Registraremos métricas cualitativas relativas a la comodidad perceptiva de la arquitectura visual o la facilidad con la que identificaron módulos vitales, evaluables en escalas numéricas. De igual modo, dispondremos variables abiertas extensas para recopilar feedback o apreciaciones subjetivas operacionales."

**19. Sobre la prueba base formativa (Utilidad Educativa):**
> "Determinando con severidad la eficacia de esta metodología como software educacional, recopilamos atributos determinantes derivados de sondeos directos. Almacenamos el rastreo fundamental que nos indique la autopercepción de mejoramiento a través de un valor estructurado afirmativo o negativo, ponderando si la síntesis leída verdaderamente favoreció al grupo en clarificar o replantear el destino de sus colaboraciones escolares integrales."

**20. Sobre las medidas de auditoría, privacidad y seguridad:**
> "Tratando una matriz escalable y conteniendo propiedades del alumnado en grupos que dialogan sobre estrategias, las reglas más básicas demandan asentar el campo rastreable 'Hora de Creación' e historial de modificaciones en todas las filas principales correspondientes. Como seguridad adyacente consideraremos estricta la necesidad de un blindaje lógico de la relación permitida entre roles o accesos explícitos, de tal modo que estudiantes u ordenes de consulta anónimas fallen por completo en alcanzar vistas de material que atañe meramente a equipos restringidos circundantes."
