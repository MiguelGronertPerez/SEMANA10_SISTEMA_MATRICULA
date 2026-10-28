# FORMATO F2: REGISTRO DE VERSIONES

**Curso:** Ingeniería de Software 2 - Semana 10  
**Proyecto:** Sistema de Matrículas  
**Universidad:** Universidad Católica Sedes Sapientiae (UCSS)  
**Estudiante:** Miguel Gronert Perez  
**Fecha:** 28/10/2026  

---

### Descripción
Registro de commits realizados en el repositorio local. Los identificadores corresponden a los hashes reales generados por Git.

---

| N.º | Fecha | Commit / hash | Autor | Mensaje del commit | Archivos afectados | Motivo del cambio | Prueba / verificación | Referencia relacionada |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | 28/10/2026 | f812c0f | Miguel | chore: registra estructura inicial del repositorio y configuracion | README.md; .gitignore; .env.example | Registrar la estructura inicial del proyecto | git status y revision de archivos | Versión inicial |
| 2 | 28/10/2026 | c538cc7 | Miguel | docs: incorpora problema, alcance y requisitos de calidad (A-01, A-02) | docs/01-problema-y-alcance.md; docs/02-requisitos-calidad.md | Definir objetivos, alcance, usuarios y requisitos de calidad | Revision de documentos y git status | Artefactos A-01 y A-02 |
| 3 | 28/10/2026 | 0b1413b | Miguel | docs: agrega arquitectura del sistema y casos de prueba (A-03, A-04) | docs/03-arquitectura.md; docs/04-casos-prueba.md; Diagrama_arquitectura.drawio.png | Documentar arquitectura y suite de casos de prueba | Verificacion de diagramas y rutas | Artefactos A-03 y A-04 |
| 4 | 28/10/2026 | 7ea8591 | Miguel | feat: añade codigo base de frontend y backend con reglas de negocio (A-05) | src/ | Incorporar codigo de la API y aplicacion web | Ejecucion de pruebas unitarias Jest (npm test) | Artefacto A-05 (RC-04, RC-07) |
| 5 | 28/10/2026 | ce50bfb | Miguel | fix(matricula): mejora detalle de error en limite de creditos y aclara RC-01 (CH-001) | src/backend/src/modules/matricula/rules.js; docs/02-requisitos-calidad.md | Detallar creditos excedidos y ajustar metrica de rendimiento | git diff HEAD~1 HEAD y pruebas Jest | Control de cambios CH-001 (RC-01, RC-04) |

---

### Comandos de verificación empleados

```text
git status
git log --oneline
git diff HEAD~1 HEAD
```
