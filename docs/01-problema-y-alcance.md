# A-01 · Problema y Alcance

**Tema:** Sistema de Matrículas  
**Universidad:** Universidad Católica Sedes Sapientiae (UCSS)  
**Curso:** Ingeniería de Software 2 — Semana 10: Control de versiones y administración de artefactos  
**Estudiante:** Miguel  
**Fecha:** 28/10/2026  
**Artefacto:** A-01 (tipo: Documento)  
**Ruta en el repositorio:** `docs/01-problema-y-alcance.md`  

---

## 1. Problema y alcance (A-01)

### 1.1 Descripción del problema
En muchas instituciones de educación superior, la matrícula se gestiona con una mezcla de formularios en papel, hojas de cálculo y sistemas aislados. Esto genera:
- Largas colas y saturación del personal al inicio de cada ciclo académico.
- Errores en la asignación de cupos (sobrematrícula o secciones vacías).
- Cruces de horario que no se detectan oportunamente.
- Matrículas que ignoran prerrequisitos académicos o deudas pendientes en tesorería.
- Poca trazabilidad y falta de auditoría sobre quién modificó una matrícula y cuándo.
- Falta de un canal de autoservicio para que el estudiante consulte la oferta académica y descargue su constancia de matrícula.

El **Sistema de Matrículas** propone centralizar y automatizar este proceso en una aplicación web que aplique las reglas académicas y administrativas de forma automática, garantizando integridad, consistencia y rapidez.

---

### 1.2 Objetivos

#### Objetivo general
Permitir que los estudiantes se matriculen en línea de forma rápida, correcta y trazable, aplicando automáticamente las reglas académicas y administrativas de la institución.

#### Objetivos específicos
1. **Publicar la oferta académica** del periodo con sus secciones, horarios y cupos disponibles en tiempo real.
2. **Validar automáticamente** en cada matrícula los prerrequisitos, disponibilidad de cupos, cruces de horario y el límite máximo de créditos.
3. **Verificar el estado de pago** del estudiante antes de confirmar la inscripción.
4. **Emitir la constancia de matrícula** en formato PDF y notificar al estudiante por correo electrónico.
5. **Brindar herramientas a Registros Académicos** para la configuración de periodos, gestión de excepciones, auditoría y reportes consolidados.

---

### 1.3 Usuarios y Roles

| Usuario | Tipo | Necesidades principales |
| :--- | :--- | :--- |
| **Estudiante** | Usuario principal | Consultar la oferta académica, matricularse, retirarse de cursos dentro del plazo y descargar su constancia de matrícula. |
| **Registros Académicos** | Operador | Configurar periodos, cursos, secciones y cupos; atender casos especiales; emitir reportes de matrícula. |
| **Coordinador / Docente** | Consulta | Revisar la lista de estudiantes matriculados por sección y la demanda de cursos. |
| **Tesorería** | Apoyo | Informar el estado de pagos y deudas que condicionan la matrícula del estudiante. |
| **Administrador del sistema** | Soporte técnico | Gestionar usuarios y roles, políticas de seguridad, respaldos y monitoreo del sistema. |

---

### 1.4 Alcance del Sistema

#### El sistema incluye:
- Inicio de sesión seguro con credenciales institucionales y control de acceso basado en roles (RBAC).
- Gestión de periodos académicos, planes de estudio, cursos, secciones, horarios y cupos.
- Matrícula, modificación y retiro de cursos dentro de los plazos establecidos en el calendario académico.
- Validación automática y transaccional de prerrequisitos, cupos, cruces de horario y límite de créditos.
- Consulta de estado financiero y bloqueo preventivo ante deudas pendientes reportadas por Tesorería.
- Generación inmediata de constancia de matrícula en PDF y envío de notificación por correo.
- Módulo de auditoría que registra cada operación de matrícula (quién, cuándo, qué cambió).

#### El sistema no incluye (límites del proyecto):
- Proceso de admisión e ingreso de postulantes nuevos.
- Registro de calificaciones, asistencia diaria y aula virtual (LMS).
- Pasarela de cobro en línea (solo se consulta el estado de pagos provisto por Tesorería).
- Gestión contable, becas, convalidaciones externas ni titulación.
- Aplicación móvil nativa (se ofrece diseño web responsivo adaptable a dispositivos móviles).

---

### 1.5 Supuestos y restricciones
- La institución define un calendario de matrícula formal con fechas fijas de inicio, cierre y retiro.
- Los datos de estudiantes, mallas curriculares y prerrequisitos están cargados previamente en la base de datos.
- Tesorería provee un servicio o interfaz para verificar deudas en tiempo real.
- Los usuarios disponen de conexión a internet y un navegador web moderno (Chrome, Edge, Firefox, Safari).

---

### 1.6 Criterios de éxito
- Reducir el tiempo promedio de matrícula por estudiante a **menos de 10 minutos**.
- **0 casos** de sobrecupo o matriculación sin cumplimiento de prerrequisitos.
- Constancia de matrícula disponible de manera inmediata al confirmar la solicitud.
