# SICOCO: Sintetizador de Co-creación Colaborativa

**Proyecto Educativo y Tecnológico basado en la Metodología MODESEC, NestJS 12, MongoDB y Modelos de Lenguaje de Gran Escala (LLMs).**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NestJS](https://img.shields.io/badge/NestJS-12.0-E0234E?logo=nestjs)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb)](https://mongoosejs.com)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203-85EA2D?logo=swagger)](https://swagger.io)
[![Vitest](https://img.shields.io/badge/Testing-Vitest%204-6E9F18?logo=vitest)](https://vitest.dev)

---

## 🏛️ Contexto Institucional y Académico

Este proyecto es desarrollado por estudiantes de la **Licenciatura en Informática con énfasis en Medios Audiovisuales** de la **Universidad de Córdoba** (Montería, Colombia), bajo la dirección y supervisión docente del **Mg. Alexander Enrique Toscano Ricardo**:
- **8vo Semestre (2026-1):** *Diseño y Desarrollo de Software Educativo I* (Código 203447) — Diagnóstico, diseño pedagógico, fundamentación metodológica MODESEC, historias de usuario y modelado relacional inicial.
- **9no Semestre (2026-2):** *Diseño y Desarrollo de Software Educativo II* (Código 203453) — Validación técnica formal (U1-01), Modelo Relacional V2 (19 entidades normalizadas) y construcción física del backend empresarial en NestJS 12 y MongoDB.

### 👥 Equipo de Desarrollo (SICOCO Dev Team)
- **José Daniel Durango Caballero**
- **Jefersson Ramírez Oviedo**
- **Jesús Daniel Ruiz Román**
- **Jeyson David López Gorrostola**

---

## 📖 Visión General del Proyecto

**SICOCO** resuelve la sobrecarga de información que sufren los estudiantes en entornos de mensajería asíncrona (WhatsApp, Discord, Teams) al realizar trabajos grupales. Más que un resumidor de texto convencional, es una plataforma de **co-creación** guiada por el modelo **MODESEC** que actúa como un espejo metacognitivo, extrayendo cuatro pilares esenciales:
1. **🤝 Acuerdos:** Consensos y decisiones adoptadas por el equipo.
2. **⚡ Desacuerdos:** Debates, objeciones y posturas encontradas.
3. **❓ Dudas Abiertas:** Interrogantes sin resolver que requieren seguimiento.
4. **✅ Tareas (To-Do):** Compromisos con asignación de responsables y fechas límite.

Además, modela la **evolución del pensamiento colectivo** mediante la relación recursiva `Conexion_Idea`, graficando cómo las propuestas iniciales de un integrante son complementadas o transformadas por sus compañeros.

---

## 📁 Estructura del Repositorio

El repositorio se organiza en dos componentes modulares:

```
SICOCO-Project/
├── README.md                      # Presentación global del proyecto
├── .gitignore                     # Configuración de exclusión para Git
├── sicoco-documentation/          # Documentación metodológica y técnica completa
│   ├── README.md                  # Índice maestro de documentación
│   ├── Resources/                 # Diagramas DBML, diagramas PNG, PDF y Technical Document (.docx)
│   │   ├── SICOCO_v2.png          # Diagrama ER V2 (Dark)
│   │   ├── SICOCO_v2_Light.png    # Diagrama ER V2 (Light)
│   │   ├── diagrama_bd_v2.dbml    # Código fuente DBML V2
│   │   ├── MER - SICOCO.pdf       # Especificación completa en PDF
│   │   └── Technical Document.docx # Documento Técnico en formato APA 7
│   └── SICOCO/                    # 18 Documentos formales en inglés (00 al 17)
│       ├── 00_base_document.md
│       ├── 01_diagnosis.md
│       ├── 02_pedagogical_design.md
│       ├── 03_computational_design.md
│       ├── 04_production_and_development.md
│       ├── 05_evaluation.md
│       ├── 06_implementation_and_monitoring.md
│       ├── 07_data_architecture_interview_og.md
│       ├── 07A_interview_questions.md
│       ├── 07B_interview_answers.md
│       ├── 08_user_stories.md
│       ├── 09_methodological_foundation.md
│       ├── 10_entity_relationship_model.md
│       ├── 11_interview_model_comparison.md
│       ├── 12_technical_development.md
│       ├── 13_first_semester_scope.md
│       ├── 14_technical_design_validation.md
│       ├── 15_entity_relationship_model_v2.md
│       ├── 16_backend_architecture_and_api.md
│       └── 17_second_semester_scope.md
└── sicoco-framework/              # Código fuente del Backend (NestJS + MongoDB)
    ├── package.json
    ├── nest-cli.json
    ├── tsconfig.json
    ├── vitest.config.ts           # Configuración de pruebas unitarias
    ├── vitest.config.e2e.ts       # Configuración de pruebas E2E
    ├── .env.example               # Plantilla de variables de entorno
    ├── src/
    │   ├── main.ts                # Bootstrap y Swagger UI (/api)
    │   ├── app.module.ts          # Módulo raíz y conexión MongoDB
    │   ├── users/                 # Módulo CRUD de Usuarios
    │   └── courses/               # Módulo CRUD de Cursos Académicos
    └── test/                      # Pruebas de integración E2E
```

---

## 🚀 Inicio Rápido (Backend Framework)

### Prerrequisitos
- **Node.js** v20 o superior (recomendado v24 LTS).
- **MongoDB** en ejecución local (puerto 27017) o una cadena de conexión a **MongoDB Atlas**.

### Instalación y Ejecución

```bash
# 1. Navegar a la carpeta del backend
cd sicoco-framework

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Instalar dependencias
npm install

# 4. Iniciar en modo desarrollo
npm run start:dev
```

### Documentación Interactiva (Swagger OpenAPI)
Una vez iniciado el servidor, acceda a la consola interactiva de Swagger en su navegador:
👉 **`http://localhost:3000/api`**

### Pruebas Automatizadas y Calidad
```bash
# Ejecutar suite de pruebas unitarias con Vitest
npm run test

# Ejecutar pruebas End-to-End
npm run test:e2e

# Ejecutar linter ultrarrápido
npm run lint

# Formatear código fuente con Prettier
npm run format
```

---

## 📑 Índice de Documentación MODESEC

Consulte los documentos clave en la carpeta [`sicoco-documentation/SICOCO/`](sicoco-documentation/SICOCO/):
- [**00_base_document.md**](sicoco-documentation/SICOCO/00_base_document.md): Documento base integral de SICOCO.
- [**14_technical_design_validation.md**](sicoco-documentation/SICOCO/14_technical_design_validation.md): Informe formal U1-01 de validación técnica.
- [**15_entity_relationship_model_v2.md**](sicoco-documentation/SICOCO/15_entity_relationship_model_v2.md): Modelo Relacional V2 con `Conexion_Idea` y 19 entidades.
- [**16_backend_architecture_and_api.md**](sicoco-documentation/SICOCO/16_backend_architecture_and_api.md): Especificación técnica de backend y API REST.
- [**17_second_semester_scope.md**](sicoco-documentation/SICOCO/17_second_semester_scope.md): Resumen de avances y hoja de ruta del 9no semestre.
