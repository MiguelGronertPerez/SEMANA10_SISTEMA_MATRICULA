# FORMATO F4: MATRIZ DE TRAZABILIDAD

**Curso:** Ingeniería de Software 2 - Semana 10  
**Proyecto:** Sistema de Matrículas  
**Universidad:** Universidad Católica Sedes Sapientiae (UCSS)  
**Estudiante:** Miguel Gronert Perez  
**Fecha:** 28/10/2026  

---

### Descripción
Matriz de trazabilidad que relaciona los requisitos con los artefactos de arquitectura, los archivos de código fuente, los casos de prueba y las versiones registradas en Git.

---

| ID Requisito | Tipo | Descripción del requisito | Artefacto de diseño / arquitectura | Componente / archivo de código (A-05) | Caso de prueba (A-04) | Commit / Versión (F2) | Estado de cobertura |
| :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: |
| RC-01 | No Funcional | Rendimiento: 2000 concurrentes, 95% ops ≤ 3s, oferta ≤ 1.5s, p99 ≤ 4s | docs/03-arquitectura.md | src/backend/src/config/redis.js | CP-NF-01 | ce50bfb | Cubierto |
| RC-02 | No Funcional | Seguridad: contraseñas bcrypt, tokens JWT, bloqueo tras 5 intentos y RBAC | docs/03-arquitectura.md | src/backend/src/middlewares/auth.js; roles.js | CP-AUT-01 a CP-AUT-08, CP-NF-04, CP-NF-05 | 7ea8591 | Cubierto |
| RC-03 | No Funcional | Disponibilidad: ≥ 99.5 % durante periodo de matrícula | docs/03-arquitectura.md | src/backend/src/server.js | CP-NF-11 | 7ea8591 | Cubierto |
| RC-04 | No Funcional | Integridad: 0 sobrecupos y operaciones transaccionales | docs/03-arquitectura.md | src/backend/src/modules/matricula/rules.js | CP-MAT-08, CP-MAT-20, CP-MAT-21 | 7ea8591 / ce50bfb | Cubierto |
| RC-05 | No Funcional | Usabilidad: Matrícula en ≤ 10 min, responsive móvil, WCAG 2.1 AA | docs/03-arquitectura.md | src/frontend/src/pages/Matricula.jsx | CP-NF-06, CP-NF-07, CP-NF-08 | 7ea8591 | En desarrollo |
| RC-06 | No Funcional | Auditoría: Registro de usuario, fecha/hora y acción en toda operación | docs/03-arquitectura.md | src/backend/src/modules/matricula/matricula.repository.js | CP-AUD-01, CP-AUD-02, CP-AUD-03 | 7ea8591 | Cubierto |
| RC-07 | No Funcional | Mantenibilidad: Cobertura de pruebas unitarias ≥ 70 % en reglas de negocio | docs/03-arquitectura.md | src/backend/src/modules/matricula/rules.js; tests/rules.test.js | Suite Jest rules.test.js | 7ea8591 / ce50bfb | Cubierto |
| RF-01 | Funcional | Consulta de oferta académica con horarios, secciones y cupos | docs/01-problema-y-alcance.md | src/backend/src/modules/cursos/cursos.routes.js | CP-CUR-01 a CP-CUR-06 | 7ea8591 | Cubierto |
| RF-02 | Funcional | Validación automática de prerrequisitos aprobados | docs/01-problema-y-alcance.md | src/backend/src/modules/matricula/rules.js (prerrequisitosPendientes) | CP-MAT-02, CP-MAT-06, CP-MAT-07 | 7ea8591 | Cubierto |
| RF-03 | Funcional | Detección y bloqueo de cruces de horario entre materias | docs/01-problema-y-alcance.md | src/backend/src/modules/matricula/rules.js (seCruzan) | CP-MAT-05, CP-MAT-12 | 7ea8591 | Cubierto |
| RF-04 | Funcional | Control del límite de créditos permitidos (22 créditos) | docs/01-problema-y-alcance.md | src/backend/src/modules/matricula/rules.js (superaCreditos) | CP-MAT-04, CP-MAT-10 | ce50bfb | Cubierto |
| RF-05 | Funcional | Consulta de estado de pagos y bloqueo por deudas con Tesorería | docs/03-arquitectura.md | src/backend/src/modules/pagos/tesoreria.client.js | CP-PAG-01 a CP-PAG-04 | 7ea8591 | Cubierto |
| RF-06 | Funcional | Emisión de constancia en PDF y notificación por correo | docs/03-arquitectura.md | src/backend/src/modules/reportes/constancia.service.js | CP-REP-01, CP-NOT-01 a CP-NOT-03 | 7ea8591 | Cubierto |
