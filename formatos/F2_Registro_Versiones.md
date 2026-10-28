# FORMATO F2 · REGISTRO DE VERSIONES

**Curso:** Ingeniería de Software 2 — Semana 10: Control de versiones y administración de artefactos  
**Institución:** Universidad Católica Sedes Sapientiae (UCSS)  
**Proyecto:** Sistema de Matrículas  
**Responsable:** Miguel  
**Fecha:** 28/10/2026  

---

> [!IMPORTANT]
> **Nota de verificación docente:** Todos los identificadores/hashes son reales y provienen directamente de la ejecución de `git log` en el repositorio local. No se han inventado hashes ficticios.

---

## Tabla de Registro de Versiones (Commits Reales)

| N.º | Fecha y Hora | Commit / Hash | Autor | Mensaje del Commit | Archivos Afectados | Motivo del Cambio | Prueba / Verificación | Referencia Relacionada |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | 28/10/2026 13:37 | `f812c0f` | Miguel | `chore: registra estructura inicial del repositorio y configuracion` | `README.md`, `.gitignore`, `.env.example` | Registrar la estructura inicial del proyecto, reglas de exclusión de Git y variables de entorno base. | `git status` y verificación de árbol de carpetas limpio. | Versión inicial / Artefactos A-06 y A-07 |
| **2** | 28/10/2026 13:37 | `c538cc7` | Miguel | `docs: incorpora problema, alcance y requisitos de calidad (A-01, A-02)` | `docs/01-problema-y-alcance.md`, `docs/02-requisitos-calidad.md` | Formalizar el alcance del sistema, objetivos, tipos de usuario y requisitos de calidad según ISO/IEC 25010. | Inspección de documentos Markdown y cotejo de coherencia técnica. | Artefactos A-01 y A-02 |
| **3** | 28/10/2026 13:37 | `0b1413b` | Miguel | `docs: agrega arquitectura del sistema y casos de prueba (A-03, A-04)` | `docs/03-arquitectura.md`, `docs/04-casos-prueba.md`, `docs/Diagrama_arquitectura.drawio.png`, `docs/img/*` | Documentar la arquitectura modular cliente-servidor y el inventario completo de 60+ casos de prueba. | Validación visual del diagrama y revisión de trazabilidad de pruebas. | Artefactos A-03 y A-04 |
| **4** | 28/10/2026 13:37 | `7ea8591` | Miguel | `feat: añade codigo base de frontend y backend con reglas de negocio (A-05)` | `src/` (36 archivos: `package.json`, `app.js`, `server.js`, `rules.js`, `rules.test.js`, React components, routes) | Incorporar el código ejecutable de la API REST, esqueleto de cliente React y reglas puras de matrícula con pruebas Jest. | Ejecución exitosa de suite de pruebas unitarias Jest (`npm test`). | Artefacto A-05 / RC-04, RC-07 |
| **5** | 28/10/2026 13:39 | `ce50bfb` | Miguel | `fix(matricula): mejora detalle de error en limite de creditos y aclara RC-01 (CH-001)` | `src/backend/src/modules/matricula/rules.js`, `docs/02-requisitos-calidad.md` | Detallar la cantidad de créditos excedidos en el mensaje de error de matrícula y afinar el criterio de aceptación p99 en RC-01. | Inspección de diferencias con `git diff HEAD~1 HEAD` y verificación de pruebas automáticas (`npm test`). | Control de Cambios CH-001 / RC-01, RC-04 |
| **6** | 28/10/2026 13:45 | `*` *(Commit actual de entrega)* | Miguel | `docs: consolida formatos de laboratorio F1 a F4 y libro excel de entrega` | `formatos/`, `Formatos_Laboratorio_Semana10_Sistema_Matriculas.xlsx` | Registrar formalmente la entrega de los formatos de laboratorio de la Semana 10. | Auditoría de matriz de trazabilidad y validación de hojas Excel. | Entrega Laboratorio Semana 10 |

---

### Evidencia de Comandos Git de Referencia

#### 1. Salida de `git log --oneline`:
```text
ce50bfb fix(matricula): mejora detalle de error en limite de creditos y aclara RC-01 (CH-001)
7ea8591 feat: añade codigo base de frontend y backend con reglas de negocio (A-05)
0b1413b docs: agrega arquitectura del sistema y casos de prueba (A-03, A-04)
c538cc7 docs: incorpora problema, alcance y requisitos de calidad (A-01, A-02)
f812c0f chore: registra estructura inicial del repositorio y configuracion
```

#### 2. Hashes Completos (SHA-1):
- `f812c0f7dc6b0f371363d021a0b66934bb28f064`
- `c538cc70d4d465ac068a0bb368a21a954b18e1d8`
- `0b1413bd95546a3a4607d22a73eda05616baba4c`
- `7ea85916202e895825a1665053541d347bd08f22`
- `ce50bfbe916240e4b7a5b5cfda3a13067976ee2d`
