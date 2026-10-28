# FORMATO F3: REGISTRO DE CAMBIOS

**Curso:** Ingeniería de Software 2 - Semana 10  
**Proyecto:** Sistema de Matrículas  
**Universidad:** Universidad Católica Sedes Sapientiae (UCSS)  
**Estudiante:** Miguel Gronert Perez  
**Fecha:** 28/10/2026  

---

### Descripción
Documentación del cambio realizado en el repositorio, justificando su motivo, impacto técnico, verificación y estado de aprobación.

---

| Campo | Detalle |
| :--- | :--- |
| **ID cambio** | CH-001 |
| **Fecha** | 28/10/2026 |
| **Solicitante** | Equipo de desarrollo / Registros Académicos |
| **Descripción del cambio** | 1. Modificar la función `validarMatricula` en `rules.js` para que el error `LIMITE_CREDITOS` especifique la cantidad de créditos que el estudiante intentó matricular frente al tope de 22 créditos.<br>2. Ajustar el criterio de aceptación del requisito de rendimiento RC-01 en `02-requisitos-calidad.md` indicando el percentil p99. |
| **Motivo / necesidad** | Aclarar el motivo de rechazo cuando el estudiante supera el límite de créditos y definir la métrica de rendimiento en periodos pico. |
| **Requisito relacionado** | RC-01 (Rendimiento) y RC-04 / RF-04 (Límite de créditos) |
| **Componentes / archivos afectados** | `src/backend/src/modules/matricula/rules.js`<br>`docs/02-requisitos-calidad.md` |
| **Impacto estimado** | Bajo. No modifica firmas de métodos ni esquemas de base de datos; compatible con las pruebas unitarias. |
| **Verificación realizada** | 1. Ejecución de pruebas unitarias Jest (`npm test`).<br>2. Comparación de diferencias con el comando `git diff HEAD~1 HEAD`. |
| **Estado** | Aprobado |
| **Decisión / responsable** | Aprobado por Miguel Gronert |
| **Commit asociado** | `ce50bfb` |

---

### Verificación con git diff

```diff
diff --git a/docs/02-requisitos-calidad.md b/docs/02-requisitos-calidad.md
--- a/docs/02-requisitos-calidad.md
+++ b/docs/02-requisitos-calidad.md
@@ -19,3 +19,3 @@
-| **RC-01** | Rendimiento | El sistema debe atender la carga del primer día de matrícula sin degradarse. | 2 000 usuarios concurrentes; 95 % de las operaciones en ≤ 3 s; confirmación de matrícula en ≤ 5 s; consulta de oferta en ≤ 1.5 s. |
+| **RC-01** | Rendimiento | El sistema debe atender la carga del primer día de matrícula sin degradarse. | 2 000 usuarios concurrentes; 95 % de las operaciones en ≤ 3 s; confirmación de matrícula en ≤ 5 s; consulta de oferta en ≤ 1.5 s; percentil p99 ≤ 4 s bajo carga pico. |
 
diff --git a/src/backend/src/modules/matricula/rules.js b/src/backend/src/modules/matricula/rules.js
--- a/src/backend/src/modules/matricula/rules.js
+++ b/src/backend/src/modules/matricula/rules.js
@@ -62,3 +62,7 @@
-    errores.push({ codigo: 'LIMITE_CREDITOS', mensaje: `Se supera el límite de ${limiteCreditos} créditos.` });
+    const totalSolicitado = estudiante.creditos + curso.creditos;
+    errores.push({
+      codigo: 'LIMITE_CREDITOS',
+      mensaje: `Se supera el límite de ${limiteCreditos} créditos (intentó matricular ${totalSolicitado} créditos).`,
+    });
```
