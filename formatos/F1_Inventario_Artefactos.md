# FORMATO F1 · INVENTARIO DE ARTEFACTOS

**Curso:** Ingeniería de Software 2 — Semana 10: Control de versiones y administración de artefactos  
**Institución:** Universidad Católica Sedes Sapientiae (UCSS)  
**Proyecto:** Sistema de Matrículas  
**Responsable:** Miguel  
**Fecha:** 28/10/2026  

---

### Propósito del formato
Registrar y controlar los artefactos existentes o planificados del proyecto de software, indicando su tipo, ubicación real dentro del repositorio, estado de avance, responsable y brechas detectadas.

---

## Tabla de Inventario de Artefactos

| ID | Artefacto | Descripción / contenido | Tipo | Ubicación / ruta | Estado | Responsable | Versión o fecha | Observaciones / brecha |
| :---: | :--- | :--- | :---: | :--- | :---: | :---: | :---: | :--- |
| **A-01** | Problema y alcance | Descripción del problema institucional, objetivos general y específicos, tipos de usuario, alcance y límites. | Documento | `docs/01-problema-y-alcance.md` | Terminado / Disponible | Miguel | v1.0 (28/10/2026) | Base conceptual y funcional del sistema. No presenta brechas. |
| **A-02** | Requisitos de calidad | Requisitos no funcionales clasificados bajo la norma ISO/IEC 25010 (RC-01 a RC-10), métricas y criterios de aceptación. | Documento | `docs/02-requisitos-calidad.md` | Actualizado / Disponible | Miguel | v1.1 (28/10/2026) | Ajustado mediante cambio formal CH-001 (precisión de p99 en RC-01). |
| **A-03** | Arquitectura | Arquitectura modular cliente-servidor en capas, responsabilidades por componente y diagrama visual de integración. | Diagrama / Documento | `docs/03-arquitectura.md` | Terminado / Disponible | Miguel | v1.0 (28/10/2026) | Incluye diagrama de arquitectura `docs/Diagrama_arquitectura.drawio.png`. |
| **A-04** | Casos de prueba | Especificación exhaustiva de casos de prueba (CP-AUT, CP-CUR, CP-MAT, CP-PAG, CP-REP, CP-NOT, CP-AUD, CP-NF), datos y resultados esperados. | Pruebas | `docs/04-casos-prueba.md` | Terminado / Disponible | Miguel | v1.0 (28/10/2026) | 60+ casos de prueba detallados para validación manual y automatizada. |
| **A-05** | Código fuente | Aplicación web en React (frontend) y API REST modular en Node.js + Express (backend), reglas puras de matrícula y suite Jest. | Código | `src/` | En desarrollo (Base funcional v0.1) | Miguel | v0.1 (28/10/2026) | Reglas puras y pruebas unitarias al 100%; pantallas y persistencia DB por completar en siguientes sprints. |
| **A-06** | Configuración de entorno | Plantilla de variables de entorno requeridas para el arranque y configuración de servicios. | Configuración | `.env.example` | Terminado / Disponible | Miguel | v1.0 (28/10/2026) | Define puertos, secretos JWT, credenciales de BD y URLs de servicios externos. |
| **A-07** | Guía de repositorio | Manual técnico de instalación, despliegue, estructura del proyecto y ejecución de pruebas unitarias. | Manual / Documento | `README.md` | Terminado / Disponible | Miguel | v1.0 (28/10/2026) | Contiene instrucciones reproducibles para evaluadores y colaboradores. |
