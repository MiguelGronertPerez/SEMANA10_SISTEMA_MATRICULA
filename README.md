# Sistema de Matrículas - UCSS
**Curso:** Ingeniería de Software 2  
**Laboratorio:** Semana 10 - Control de versiones y administración de artefactos  
**Estudiante:** Miguel Gronert Perez  
**Universidad:** Universidad Católica Sedes Sapientiae (UCSS)  
**Fecha:** Octubre 2026  

---

## Descripción del Proyecto
Este repositorio contiene el control de versiones y la administración de artefactos del Sistema de Matrículas para la Universidad Católica Sedes Sapientiae. El proyecto abarca la definición del problema y alcance, requisitos de calidad (ISO/IEC 25010), diseño de arquitectura modular, casos de prueba y código fuente demostrativo con reglas de negocio.

---

## Estructura del Repositorio

- `docs/`: Documentación de los artefactos del sistema.
  - `01-problema-y-alcance.md`: Problema, objetivos, actores y alcance (A-01).
  - `02-requisitos-calidad.md`: Requisitos de calidad según ISO/IEC 25010 (A-02).
  - `03-arquitectura.md`: Componentes y arquitectura del sistema (A-03).
  - `04-casos-prueba.md`: Especificación de casos y datos de prueba (A-04).
  - `Diagrama_arquitectura.drawio.png`: Diagrama de la arquitectura.
- `src/`: Código fuente de la aplicación (A-05).
  - `backend/`: API REST en Node.js y Express con las reglas de negocio de matrícula y pruebas unitarias.
  - `frontend/`: Aplicación web desarrollada con React y Vite.
- `formatos/`: Formatos de evaluación del laboratorio (Semana 10).
  - `F1_Inventario_Artefactos.md`: Inventario y estado de los artefactos del proyecto.
  - `F2_Registro_Versiones.md`: Registro de versiones y commits realizados en Git.
  - `F3_Registro_Cambios.md`: Registro de control de cambios (CH-001).
  - `F4_Matriz_Trazabilidad.md`: Matriz de trazabilidad de requisitos, pruebas y código.
- `Formatos_Laboratorio_Semana10_Sistema_Matriculas.xlsx`: Libro de Excel con los formatos F1 a F4 completados.
- `.env.example`: Plantilla de variables de entorno (A-06).
- `.gitignore`: Archivos y carpetas excluidos del control de versiones.

---

## Instrucciones de Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- Git

### 1. Clonar el repositorio
```bash
git clone https://github.com/MiguelGronertPerez/SEMANA10_SISTEMA_MATRICULA.git
cd SEMANA10_SISTEMA_MATRICULA
```

### 2. Ejecutar las pruebas unitarias del backend
```bash
cd src/backend
npm install
npm test
```

### 3. Iniciar el servidor backend
```bash
npm run dev
```
El servicio estará disponible en `http://localhost:3000`.

### 4. Iniciar la aplicación frontend
```bash
cd ../frontend
npm install
npm run dev
```
La aplicación web se ejecutará en `http://localhost:5173`.
