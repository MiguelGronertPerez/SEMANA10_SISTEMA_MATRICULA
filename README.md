# Sistema de Matrículas — UCSS
## Ingeniería de Software 2 · Semana 10: Control de Versiones y Administración de Artefactos

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![React](https://img.shields.io/badge/React-v18-blue.svg)
![Jest](https://img.shields.io/badge/Pruebas-Jest-red.svg)
![Git](https://img.shields.io/badge/Control_de_Versiones-Git-orange.svg)

Este repositorio contiene los artefactos, documentación, casos de prueba y código fuente del **Sistema de Matrículas** de la Universidad Católica Sedes Sapientiae (UCSS), desarrollado como parte del laboratorio de la Semana 10 de Ingeniería de Software 2.

---

## 👥 Integrante(s)
- **Estudiante / Responsable:** Miguel
- **Institución:** Universidad Católica Sedes Sapientiae (UCSS)
- **Curso:** Ingeniería de Software 2 (Semana 10)
- **Tema:** Control de versiones, inventario de artefactos, registro de versiones, registro de cambios y matriz de trazabilidad.

---

## 📁 Estructura del Repositorio

```text
├── docs/                                # Documentación formal de artefactos
│   ├── 01-problema-y-alcance.md         # A-01: Problema, objetivos, usuarios y alcance
│   ├── 02-requisitos-calidad.md         # A-02: Requisitos de calidad (ISO/IEC 25010)
│   ├── 03-arquitectura.md               # A-03: Arquitectura modular cliente-servidor
│   ├── 04-casos-prueba.md               # A-04: Casos de prueba detallados (CP-AUT, CP-MAT, etc.)
│   └── Diagrama_arquitectura.drawio.png # Diagrama visual de componentes
├── src/                                 # A-05: Código fuente de la aplicación
│   ├── backend/                         # API REST en Node.js + Express (módulos, reglas, tests)
│   │   ├── src/modules/matricula/rules.js  # Reglas de negocio puras de matrícula
│   │   └── src/tests/rules.test.js      # Pruebas unitarias automatizadas con Jest
│   └── frontend/                        # Aplicación web responsive en React + Vite
├── formatos/                            # Entregables formales de laboratorio (F1 - F4)
│   ├── F1_Inventario_Artefactos.md      # F1: Inventario consolidado de artefactos
│   ├── F2_Registro_Versiones.md         # F2: Historial de commits reales y hashes de Git
│   ├── F3_Registro_Cambios.md           # F3: Registro del cambio CH-001 y verificación
│   └── F4_Matriz_Trazabilidad.md        # F4: Trazabilidad Requisitos ↔ Artefactos ↔ Pruebas ↔ Versiones
├── .env.example                         # A-06: Plantilla de variables de entorno
├── .gitignore                           # Exclusiones de Git
└── README.md                            # Guía general del proyecto y laboratorio
```

---

## 🚀 Cómo Ejecutar el Proyecto y las Pruebas

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd "Control de Versiones"
```

### 2. Ejecutar Pruebas Unitarias del Backend (Reglas de Matrícula)
```bash
cd src/backend
npm install
npm test
```

### 3. Iniciar el Servidor Backend (API)
```bash
npm run dev
# Servidor ejecutándose en http://localhost:3000
```

### 4. Iniciar el Cliente Frontend (React)
```bash
cd ../frontend
npm install
npm run dev
# Aplicación web disponible en http://localhost:5173
```

---

## 📋 Resumen de Formatos del Laboratorio (F1 a F4)

- **[F1 · Inventario de Artefactos](formatos/F1_Inventario_Artefactos.md):** Registra el estado real de los artefactos del sistema (A-01 a A-07).
- **[F2 · Registro de Versiones](formatos/F2_Registro_Versiones.md):** Historial verificado de commits reales en Git con sus hashes, autores, descripciones y verificaciones.
- **[F3 · Registro de Cambios](formatos/F3_Registro_Cambios.md):** Documentación formal del cambio `CH-001` aplicado en las reglas de crédito y requisitos de calidad, con evidencia `git diff`.
- **[F4 · Matriz de Trazabilidad](formatos/F4_Matriz_Trazabilidad.md):** Mapeo bidireccional entre Requisitos (RC / Funcionales) ↔ Artefactos ↔ Código ↔ Pruebas unitarias/sistema ↔ Commits de Git.
