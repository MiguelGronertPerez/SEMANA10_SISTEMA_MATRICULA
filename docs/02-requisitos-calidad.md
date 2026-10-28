# A-02 · Requisitos de Calidad

**Tema:** Sistema de Matrículas  
**Universidad:** Universidad Católica Sedes Sapientiae (UCSS)  
**Curso:** Ingeniería de Software 2 — Semana 10: Control de versiones y administración de artefactos  
**Estudiante:** Miguel  
**Fecha:** 28/10/2026  
**Artefacto:** A-02 (tipo: Documento)  
**Ruta en el repositorio:** `docs/02-requisitos-calidad.md`  

---

## Requisitos de calidad (A-02)

Los requisitos se organizan según las características del modelo de calidad **ISO/IEC 25010**. Los valores representan metas de diseño para el Sistema de Matrículas y son verificados mediante pruebas automáticas e inspecciones técnicas.

| ID | Característica | Requisito | Criterio de aceptación / métrica |
| :--- | :--- | :--- | :--- |
| **RC-01** | Rendimiento | El sistema debe atender la carga del primer día de matrícula sin degradarse. | 2 000 usuarios concurrentes; 95 % de las operaciones en ≤ 3 s; confirmación de matrícula en ≤ 5 s; consulta de oferta en ≤ 1.5 s. |
| **RC-02** | Seguridad | Solo usuarios autenticados acceden al sistema y cada rol ve únicamente lo que le corresponde. | Contraseñas con hash (bcrypt con sal); tokens JWT para sesiones; bloqueo tras 5 intentos fallidos consecutivos; control de acceso RBAC por endpoints. |
| **RC-03** | Disponibilidad | El sistema debe estar operativo durante los periodos de matrícula académica. | Disponibilidad ≥ 99.5 % durante el periodo de matrícula; ventanas de mantenimiento programadas fuera del horario de matrícula. |
| **RC-04** | Confiabilidad e integridad | Nunca debe asignarse más estudiantes que cupos disponibles, aun en matrículas simultáneas. | 0 sobrecupos en pruebas de concurrencia; transacciones atómicas (ACID) en la confirmación de asignación de vacantes. |
| **RC-05** | Usabilidad | Un estudiante debe poder completar su matrícula sin requerir capacitación previa. | Matrícula completada en ≤ 10 min por usuarios nuevos; interfaz responsive adaptable a teléfonos móviles (desde 360 px); contraste conforme WCAG 2.1 AA. |
| **RC-06** | Trazabilidad y auditoría | Toda operación de inscripción, retiro o modificación debe quedar registrada formalmente. | Registro persistente de usuario, IP, fecha/hora, acción y estado previo/posterior; módulo de auditoría consultable por Registros Académicos. |
| **RC-07** | Mantenibilidad | El sistema debe facilitar el cambio modular y la verificación automatizada. | Arquitectura modular desacoplada; cobertura de pruebas unitarias ≥ 70 % en reglas de negocio (`rules.js`); control de versiones estricto con Git. |
| **RC-08** | Compatibilidad y portabilidad | La aplicación debe operar sin anomalías en los principales navegadores del mercado. | Compatibilidad comprobada en las 2 últimas versiones de Google Chrome, Mozilla Firefox, Microsoft Edge y Safari; diseño responsive. |
| **RC-09** | Recuperabilidad | Ante cualquier eventual fallo en el servidor o base de datos, los registros deben recuperarse íntegramente. | Copias de seguridad automáticas diarias de PostgreSQL; RTO (tiempo de recuperación) ≤ 4 horas; RPO ≤ 1 hora. |
| **RC-10** | Protección de datos | Los datos personales y académicos deben ser tratados con estricta confidencialidad. | Cumplimiento de la Ley N.° 29733 (Ley de Protección de Datos Personales de Perú); cifrado de datos en reposo y tránsito (HTTPS/TLS 1.2+). |
