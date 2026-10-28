# FORMATO F4 · MATRIZ DE TRAZABILIDAD

**Curso:** Ingeniería de Software 2 — Semana 10: Control de versiones y administración de artefactos  
**Institución:** Universidad Católica Sedes Sapientiae (UCSS)  
**Proyecto:** Sistema de Matrículas  
**Responsable:** Miguel  
**Fecha:** 28/10/2026  

---

### Propósito del formato
Relacionar de manera bidireccional los requisitos del sistema con los artefactos de diseño, arquitectura, componentes de código fuente, casos de prueba de verificación y las versiones controladas en Git, asegurando la consistencia e integridad del ciclo de vida del software.

---

## Matriz de Trazabilidad Cruzada

| ID Requisito | Tipo | Descripción del Requisito | Artefacto de Diseño / Arq. | Componente / Archivo de Código (A-05) | Caso de Prueba de Verificación (A-04) | Commit / Hash de Git (F2) | Estado de Cobertura |
| :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: |
| **RC-01** | No Funcional (Calidad) | Rendimiento: 2000 usuarios concurrentes; 95% ops ≤ 3s; oferta ≤ 1.5s; p99 ≤ 4s. | `docs/03-arquitectura.md` (Caché Redis y PostgreSQL indexada) | `src/backend/src/config/redis.js` | `CP-NF-01` (Carga concurrente k6 / JMeter) | `ce50bfb` (Commit 5 - CH-001) | **Cubierto** en diseño y ajuste de cambio |
| **RC-02** | No Funcional (Calidad) | Seguridad: Autenticación, contraseñas con hash bcrypt, JWT, bloqueo tras 5 intentos y RBAC. | `docs/03-arquitectura.md` (Módulo Autenticación y Roles) | `src/backend/src/middlewares/auth.js`, `roles.js`, `tests/seguridad.test.js` | `CP-AUT-01` a `CP-AUT-08`, `CP-NF-04`, `CP-NF-05` | `7ea8591` (Commit 4) | **Cubierto** e implementado con tests |
| **RC-03** | No Funcional (Calidad) | Disponibilidad: Operatividad ≥ 99.5 % durante periodo de matrícula. | `docs/03-arquitectura.md` (Arquitectura Node.js stateless) | `src/backend/src/server.js`, `app.js` | `CP-NF-11` (Monitoreo continuo de uptime) | `7ea8591` (Commit 4) | **Cubierto** en arquitectura |
| **RC-04** | No Funcional (Calidad) | Integridad: 0 sobrecupos en concurrencia y operaciones transaccionales. | `docs/03-arquitectura.md` (Módulo Matrícula + BD transaccional) | `src/backend/src/modules/matricula/rules.js` (`hayCupo`), `matricula.service.js` | `CP-MAT-08`, `CP-MAT-20`, `CP-MAT-21`, `CP-NF-02`, `CP-NF-03` | `7ea8591` (Commit 4), `ce50bfb` (Commit 5) | **Cubierto** con regla pura y pruebas Jest |
| **RC-05** | No Funcional (Calidad) | Usabilidad: Matrícula ≤ 10 min, responsive móvil (≥360px), WCAG 2.1 AA. | `docs/03-arquitectura.md` (Frontend React SPA) | `src/frontend/src/pages/Matricula.jsx`, `Oferta.jsx`, `Login.jsx` | `CP-NF-06`, `CP-NF-07`, `CP-NF-08`, `CP-NF-09` | `7ea8591` (Commit 4) | **En desarrollo** (base responsive implementada) |
| **RC-06** | No Funcional (Calidad) | Trazabilidad y auditoría: Registro de usuario, fecha/hora, acción y valores previos/posteriores. | `docs/03-arquitectura.md` (Módulo Matrícula + Auditoría) | `src/backend/src/modules/matricula/matricula.repository.js` | `CP-AUD-01`, `CP-AUD-02`, `CP-AUD-03` | `7ea8591` (Commit 4) | **Cubierto** en diseño y repositorio |
| **RC-07** | No Funcional (Calidad) | Mantenibilidad: Cobertura de pruebas unitarias ≥ 70 % en reglas de negocio y control con Git. | `docs/03-arquitectura.md` (Estructura modular en 3 capas) | `src/backend/src/modules/matricula/rules.js`, `tests/rules.test.js` | Suite unitaria Jest (`rules.test.js` cubre 100% de `rules.js`) | `7ea8591` (Commit 4), `ce50bfb` (Commit 5) | **Cubierto** al 100% con Jest |
| **RF-01** | Funcional | Consulta de oferta académica con asignaturas, secciones, horarios y cupos disponibles. | `docs/01-problema-y-alcance.md`, `docs/03-arquitectura.md` | `src/backend/src/modules/cursos/cursos.routes.js`, `src/frontend/src/pages/Oferta.jsx` | `CP-CUR-01` a `CP-CUR-06` | `7ea8591` (Commit 4) | **Cubierto** con rutas y vista React |
| **RF-02** | Funcional | Validación automática de prerrequisitos aprobados para cada asignatura. | `docs/01-problema-y-alcance.md` | `src/backend/src/modules/matricula/rules.js` (`prerrequisitosPendientes`) | `CP-MAT-02`, `CP-MAT-06`, `CP-MAT-07` | `7ea8591` (Commit 4) | **Cubierto** con regla pura y test Jest |
| **RF-03** | Funcional | Validación y bloqueo de cruces de horario entre materias seleccionadas. | `docs/01-problema-y-alcance.md` | `src/backend/src/modules/matricula/rules.js` (`seCruzan`, `seccionesQueCruzan`) | `CP-MAT-05`, `CP-MAT-12` | `7ea8591` (Commit 4) | **Cubierto** con regla pura y test Jest |
| **RF-04** | Funcional | Control estricto del límite máximo de créditos académicos permitidos (22 créditos). | `docs/01-problema-y-alcance.md` | `src/backend/src/modules/matricula/rules.js` (`superaCreditos` con mensaje detallado CH-001) | `CP-MAT-04`, `CP-MAT-10` | `ce50bfb` (Commit 5 - CH-001) | **Cubierto** y mejorado con CH-001 |
| **RF-05** | Funcional | Verificación del estado de pagos y bloqueo automático por deudas pendientes en Tesorería. | `docs/03-arquitectura.md` (Módulo Pagos y Deudas) | `src/backend/src/modules/pagos/tesoreria.client.js`, `matricula/rules.js` | `CP-PAG-01` a `CP-PAG-04` | `7ea8591` (Commit 4) | **Cubierto** con cliente mock y regla de negocio |
| **RF-06** | Funcional | Generación inmediata de constancia de matrícula en PDF y envío de notificación por correo. | `docs/03-arquitectura.md` (Reportes y Notificaciones) | `src/backend/src/modules/reportes/constancia.service.js`, `notificaciones/correo.service.js` | `CP-REP-01`, `CP-NOT-01` a `CP-NOT-03` | `7ea8591` (Commit 4) | **Cubierto** en diseño y servicio modular |
