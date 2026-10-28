# FORMATO F3 · REGISTRO DE CAMBIOS

**Curso:** Ingeniería de Software 2 — Semana 10: Control de versiones y administración de artefactos  
**Institución:** Universidad Católica Sedes Sapientiae (UCSS)  
**Proyecto:** Sistema de Matrículas  
**Responsable:** Miguel  
**Fecha:** 28/10/2026  

---

### Propósito del formato
Documentar la modificación práctica realizada en el repositorio, sustentando su motivo, impacto técnico, verificación mediante Git y estado de aprobación, preparando la gestión formal de cambios de la Semana 11.

---

## Tabla de Registro de Cambios

| Campo | Detalle del Cambio CH-001 |
| :--- | :--- |
| **ID Cambio** | **CH-001** |
| **Fecha** | 28/10/2026 |
| **Solicitante** | Registros Académicos / Equipo de Desarrollo (Miguel) |
| **Descripción del cambio** | 1. Modificar la función `validarMatricula` en `rules.js` para que el error `LIMITE_CREDITOS` detalle tanto el límite permitido (22 créditos) como el total que el estudiante intentó acumular.<br>2. Ajustar el criterio de aceptación del requisito de rendimiento `RC-01` en `02-requisitos-calidad.md` incorporando la métrica percentil `p99 ≤ 4 s` bajo carga pico. |
| **Motivo / necesidad** | - En las pruebas de usuario se detectó que los estudiantes no entendían por qué se rechazaba su matrícula si solo elegían una materia adicional; detallar el total solicitado aclara de inmediato la causa del rechazo.<br>- En las pruebas no funcionales era necesario fijar un umbral estricto para los casos extremos de latencia (percentil 99) en días de alta concurrencia. |
| **Requisito relacionado** | **RC-01** (Rendimiento) y **RC-04** (Integridad de reglas de matrícula / Límite de créditos) |
| **Componentes / archivos afectados** | - `src/backend/src/modules/matricula/rules.js`<br>- `docs/02-requisitos-calidad.md` |
| **Impacto estimado** | **Bajo.** No altera firmas de métodos públicos, no modifica esquemas de base de datos y mantiene total retrocompatibilidad con las pruebas unitarias existentes en `rules.test.js`. |
| **Verificación realizada** | 1. Ejecución de pruebas unitarias Jest (`npm test`): 100 % superadas.<br>2. Auditoría visual de diferencias mediante comando `git diff HEAD~1 HEAD` en Git. |
| **Estado** | **Aprobado / Aplicado en el repositorio** |
| **Decisión / responsable** | Aprobado por Miguel (Líder técnico y Administrador de Configuración del proyecto). |
| **Commit asociado** | `ce50bfb` (`fix(matricula): mejora detalle de error en limite de creditos y aclara RC-01 (CH-001)`) |

---

## Evidencia Técnica del Cambio (`git diff`)

```diff
diff --git a/docs/02-requisitos-calidad.md b/docs/02-requisitos-calidad.md
--- a/docs/02-requisitos-calidad.md
+++ b/docs/02-requisitos-calidad.md
@@ -4,7 +4,7 @@
 **Universidad:** Universidad Católica Sedes Sapientiae (UCSS)  
 **Curso:** Ingeniería de Software 2 — Semana 10: Control de versiones y administración de artefactos  
 **Estudiante:** Miguel  
-**Fecha:** 28/10/2026  
+**Fecha:** 28/10/2026 (v1.1 - Cambio CH-001)  
 **Artefacto:** A-02 (tipo: Documento)  
 **Ruta en el repositorio:** `docs/02-requisitos-calidad.md`  
 
@@ -16,7 +16,7 @@
 | ID | Característica | Requisito | Criterio de aceptación / métrica |
 | :--- | :--- | :--- | :--- |
-| **RC-01** | Rendimiento | El sistema debe atender la carga del primer día de matrícula sin degradarse. | 2 000 usuarios concurrentes; 95 % de las operaciones en ≤ 3 s; confirmación de matrícula en ≤ 5 s; consulta de oferta en ≤ 1.5 s. |
+| **RC-01** | Rendimiento | El sistema debe atender la carga del primer día de matrícula sin degradarse. | 2 000 usuarios concurrentes; 95 % de las operaciones en ≤ 3 s; confirmación de matrícula en ≤ 5 s; consulta de oferta en ≤ 1.5 s; percentil p99 ≤ 4 s bajo carga pico. |
 
diff --git a/src/backend/src/modules/matricula/rules.js b/src/backend/src/modules/matricula/rules.js
--- a/src/backend/src/modules/matricula/rules.js
+++ b/src/backend/src/modules/matricula/rules.js
@@ -59,7 +59,11 @@ function validarMatricula({ estudiante, curso, seccion, seccionesMatriculadas, f
     errores.push({ codigo: 'CRUCE_HORARIO', mensaje: `Cruce de horario con: ${cruces.map((s) => s.codigo).join(', ')}.` });
   }
   if (superaCreditos(estudiante.creditos, curso.creditos, limiteCreditos)) {
-    errores.push({ codigo: 'LIMITE_CREDITOS', mensaje: `Se supera el límite de ${limiteCreditos} créditos.` });
+    const totalSolicitado = estudiante.creditos + curso.creditos;
+    errores.push({
+      codigo: 'LIMITE_CREDITOS',
+      mensaje: `Se supera el límite de ${limiteCreditos} créditos (intentó matricular ${totalSolicitado} créditos).`,
+    });
   }
 
   return { ok: errores.length === 0, errores };
```
