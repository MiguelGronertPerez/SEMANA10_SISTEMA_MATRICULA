# A-04 · Casos de Prueba del Sistema de Matrículas

**Tema:** Sistema de Matrículas  
**Universidad:** Universidad Católica Sedes Sapientiae (UCSS)  
**Curso:** Ingeniería de Software 2 — Semana 10: Control de versiones y administración de artefactos  
**Estudiante:** Miguel  
**Fecha:** 28/10/2026  
**Artefacto:** A-04 (tipo: Pruebas)  
**Ruta en el repositorio:** docs/04-casos-prueba.md  

---

A-04 · Casos de prueba
Tema: Sistema de Matrículas
Universidad: Universidad Católica Sedes Sapientiae (UCSS)
Curso: Ingeniería de Software — Semana 10: formatos de control de versiones
Estudiante: Miguel          Fecha: 28/10/2026
Artefacto: A-04 (tipo: Pruebas)          Ruta en el repositorio: docs/04-casos-prueba.md
Versión
Fecha
Responsable
Cambios
v1.0
28/10/2026
Miguel
Elaboración inicial de los casos, datos de prueba y resultados esperados.
1. Introducción
1.1 Propósito
Este documento define los casos de prueba del Sistema de Matrículas: qué situaciones se van a probar, con qué datos y qué resultado debe producir el sistema en cada una. Sirve como guía para verificar que el sistema cumpla las reglas académicas y administrativas descritas en A-01 y las metas de calidad de A-02, y para comprobar cada componente de la arquitectura de A-03.
El inventario señala que este artefacto depende de definir los requisitos funcionales detallados. Mientras estos no existan, los casos se basan en el problema, el alcance y los objetivos de A-01; los valores concretos que hubo que suponer se listan en la sección 7.
1.2 Documentos de referencia
A-01 Problema y alcance (docs/01-problema-y-alcance.md): objetivos específicos, alcance y criterios de éxito.
A-02 Requisitos de calidad (docs/02-requisitos-calidad.md): requisitos RC-01 a RC-10 y sus criterios de aceptación.
A-03 Arquitectura (docs/03-arquitectura.md): componentes (React, API REST Node.js + Express, PostgreSQL, Redis, almacenamiento de PDF, Tesorería y SMTP).
1.3 Alcance de las pruebas
Se prueba: autenticación y roles; gestión de cursos, secciones, horarios y cupos; matrícula, modificación y retiro con sus validaciones (prerrequisitos, cupos, cruces de horario, créditos máximos y plazos); consulta del estado de pago; constancia en PDF, reportes y correos; auditoría; y los requisitos no funcionales de A-02.
No se prueba (fuera del alcance de A-01): admisión de postulantes, notas y asistencia, cobro en línea con pasarela, contabilidad, becas, convalidaciones, titulación y aplicación móvil nativa. De Tesorería y del servicio de correo solo se verifica la integración, no su funcionamiento interno.
2. Estrategia de pruebas
2.1 Niveles y tipos de prueba
Nivel
Qué verifica
Técnica o herramienta sugerida
Unitarias
Reglas de negocio aisladas: prerrequisitos, cupos, cruces, créditos y plazos.
Jest; meta ≥ 70 % de cobertura (RC-07).
Integración
Módulos entre sí y con PostgreSQL, Redis, Tesorería y SMTP.
Jest + Supertest; Tesorería y SMTP simulados.
Sistema (funcionales)
Flujos completos de usuario sobre la web React y la API.
Casos de las secciones 4.1 a 4.7; Cypress o Playwright.
No funcionales
Rendimiento, concurrencia, seguridad, usabilidad, compatibilidad y recuperación.
Sección 4.8; k6 o JMeter, OWASP ZAP, axe / Lighthouse.
Aceptación
Que el sistema resuelve el problema para usuarios reales.
Sesión guiada con Registros Académicos y estudiantes (criterios de éxito de A-01).
2.2 Entorno de pruebas
Instancia separada de producción, con la misma arquitectura (React, Node.js + Express, PostgreSQL, Redis).
Tesorería y servidor SMTP simulados, para poder forzar deuda, caídas y tiempos de espera.
Reloj del sistema configurable, para probar los plazos de matrícula y de retiro.
Script que restablece los datos de la sección 3 antes de cada ejecución, de modo que los casos sean independientes.
2.3 Criterios de entrada y de salida
Entrada: código de A-05 desplegado en el entorno de pruebas; datos de la sección 3 cargados; calendario de matrícula configurado; servicios externos simulados.
Salida (propuesta): 100 % de los casos de prioridad Alta ejecutados y aprobados; al menos 90 % de los de prioridad Media aprobados; ningún defecto crítico abierto; los defectos restantes documentados.
Prioridad: Alta = regla crítica de negocio, seguridad o integridad de datos; Media = funcionalidad importante con alternativa; Baja = comodidad o presentación.
3. Datos de prueba
Todos los datos son ficticios, para no usar información personal real (Ley N.° 29733). El script de la sección 2.2 los carga antes de cada ejecución.
3.1 Parámetros y calendario
Parámetro
Valor de prueba
Periodo académico
2027-I
Matrícula
Del 15/02/2027 al 05/03/2027 (hasta las 23:59)
Retiro de cursos
Hasta el 26/03/2027 (hasta las 23:59)
Límite de créditos por estudiante
22
Cupo estándar por sección
30
Intentos fallidos antes del bloqueo
5
Tiempo de espera de consulta a Tesorería
10 segundos
3.2 Usuarios de prueba
Usuario
Rol
Uso en las pruebas
admin01
Administrador
Gestión de usuarios y roles; verificación de permisos.
reg01
Registros Académicos
Gestión de secciones, reportes y auditoría.
doc01
Coordinador / Docente
Lista de estudiantes de PRO201-A (asignado solo a esa sección).
Estudiantes
Estudiante
Los de la tabla 3.3.
3.3 Estudiantes
Código
Nombre
Situación para la prueba
Cursos aprobados
Créditos matric.
Deuda
20210001
Ana Torres
Caso ideal: cumple todo
MAT101, PRO101
0
No
20210002
Luis Ramos
Prerrequisito no cumplido
MAT101 (PRO101 desaprobado)
0
No
20210003
Carla Díaz
Con deuda
MAT101, PRO101
0
Sí: S/ 350.00
20210004
Jorge Paredes
Cerca del límite de créditos
MAT101, PRO101
20
No
20210005
Rosa Quispe
Concurrencia y bloqueo de cuenta
MAT101, PRO101
0
No
20210006
Marta Vega
Prerrequisitos múltiples incompletos
PRO101, PRO201
0
No
20210007
Pedro Salas
Cumple prerrequisitos avanzados
MAT101, PRO101, PRO201, BDD201
0
No
3.4 Cursos y secciones del periodo 2027-I
Código
Curso
Créditos
Prerrequisitos
MAT101
Matemática I
4
—
PRO101
Programación I
4
—
PRO201
Programación II
4
PRO101
BDD201
Base de Datos
4
PRO101
ING301
Ingeniería de Software
4
PRO201 y BDD201
FIS101
Física I
3
MAT101
ETI101
Ética Profesional
2
—
Sección
Horario
Cupo
Matriculados
Disponibles
Observación
PRO201-A
Lun y Mié 08:00–10:00
30
12
18
PRO201-B
Mar y Jue 14:00–16:00
30
5
25
BDD201-A
Lun 09:00–11:00
30
15
15
Cruza con PRO201-A
BDD201-B
Mar y Jue 08:00–10:00
30
20
10
ING301-A
Vie 08:00–12:00
30
8
22
FIS101-A
Mié 14:00–16:00
30
29
1
Último cupo
FIS101-B
Jue 16:00–18:00
30
29
1
Concurrencia
ETI101-A
Sáb 08:00–10:00
30
30
0
Llena
ETI101-B
Lun 10:00–12:00
30
12
18
Contigua a PRO201-A
4. Casos de prueba
Se definen 63 casos, agrupados por módulo de la arquitectura. Cada caso indica sus precondiciones y datos, los pasos, el resultado esperado y su prioridad. La columna «Estado» está en Pendiente porque todavía no existe código que probar (A-05).
4.1 Autenticación y roles
Verifica el inicio de sesión, el bloqueo de cuentas y el control de acceso por rol (RC-02, RC-10).
ID
Caso / objetivo
Precondiciones y datos de entrada
Pasos
Resultado esperado
Prior.
Estado
CP-AUT-01
Inicio de sesión válido de estudiante
– Usuario 20210001 (Ana Torres), contraseña vigente.
1. Abrir la página de inicio de sesión.
2. Ingresar usuario y contraseña correctos.
3. Pulsar «Ingresar».
– Ingresa al panel de estudiante y solo ve las opciones de su rol.
– Se crea la sesión (token JWT y registro en Redis).
– Tiempo de respuesta ≤ 3 s.
Alta
Pendiente
CP-AUT-02
Contraseña incorrecta
– Usuario 20210001, contraseña errónea.
1. Ingresar usuario correcto y contraseña incorrecta.
2. Pulsar «Ingresar».
– No ingresa.
– Mensaje genérico «Credenciales inválidas» (no indica cuál dato falló).
– El intento fallido queda registrado.
Alta
Pendiente
CP-AUT-03
Usuario inexistente
– Usuario 99999999, cualquier contraseña.
1. Ingresar el usuario inexistente.
2. Pulsar «Ingresar».
– No ingresa.
– Mismo mensaje y mismo tiempo de respuesta que en CP-AUT-02 (no revela si el usuario existe).
Media
Pendiente
CP-AUT-04
Bloqueo tras 5 intentos fallidos
– Usuario 20210005 (Rosa Quispe) activo, sin intentos previos.
1. Ingresar 5 veces una contraseña incorrecta.
2. En el 6.º intento ingresar la contraseña correcta.
– Tras el 5.º fallo la cuenta queda bloqueada.
– El 6.º intento es rechazado aunque la contraseña sea correcta, con mensaje de cuenta bloqueada.
– El bloqueo queda registrado en auditoría.
Alta
Pendiente
CP-AUT-05
Acceso restringido por rol
– Sesión iniciada como estudiante 20210001.
1. Escribir en el navegador la ruta de administración de usuarios (/admin/usuarios).
2. Invocar el endpoint de reportes de Registros Académicos con el token del estudiante.
– Ambas solicitudes responden 403 Prohibido.
– No se muestra ningún dato ni opción del rol Administrador o Registros.
Alta
Pendiente
CP-AUT-06
El estudiante solo accede a sus propios datos
– Sesión de 20210001; existe matrícula de 20210007.
1. Consultar GET /matriculas/{id de 20210007} con el token de Ana.
– Respuesta 403 o 404.
– No se devuelve ningún dato del otro estudiante.
Alta
Pendiente
CP-AUT-07
Acceso sin sesión o con sesión vencida
– Sin token, o token expirado.
1. Invocar un endpoint protegido sin token.
2. Repetir con un token vencido.
– Respuesta 401 No autorizado.
– La web redirige a la pantalla de inicio de sesión.
Media
Pendiente
CP-AUT-08
Cierre de sesión
– Sesión activa de 20210001 (token guardado).
1. Pulsar «Cerrar sesión».
2. Reutilizar el token anterior en un endpoint protegido.
– La sesión se elimina de Redis.
– El token anterior es rechazado con 401.
Media
Pendiente
4.2 Cursos, secciones y horarios
Verifica la gestión de la oferta académica por Registros Académicos y su consulta por los estudiantes (objetivo específico 1).
ID
Caso / objetivo
Precondiciones y datos de entrada
Pasos
Resultado esperado
Prior.
Estado
CP-CUR-01
Crear sección con datos válidos
– Sesión reg01 (Registros Académicos).
– Sección PRO201-C: Vie 14:00–16:00, cupo 30, aula A-201, periodo 2027-I.
1. Ir a Gestión de secciones › Nueva sección.
2. Completar los datos indicados.
3. Guardar.
– La sección se crea y aparece en la oferta académica con 30 cupos disponibles.
– El cupo se registra también en Redis.
– Se registra la acción en auditoría.
Alta
Pendiente
CP-CUR-02
Cupo inválido
– Sesión reg01.
– Nueva sección con cupo 0; repetir con cupo -5 y con cupo vacío.
1. Completar el formulario con cada valor inválido.
2. Guardar.
– No se crea la sección.
– Mensaje de validación indicando que el cupo debe ser un entero mayor que 0.
Media
Pendiente
CP-CUR-03
Sección duplicada
– Sesión reg01. Ya existe PRO201-A en 2027-I.
1. Intentar crear otra sección con código PRO201-A en el mismo periodo.
– Se rechaza con mensaje de código duplicado.
– La sección original no cambia.
Media
Pendiente
CP-CUR-04
Consulta de la oferta académica
– Sesión de 20210001. Datos de secciones de la sección 3.4.
1. Abrir «Oferta académica».
2. Revisar PRO201-A y ETI101-A.
– Se listan cursos, secciones, horarios y cupos disponibles.
– PRO201-A muestra 18 cupos; ETI101-A muestra 0 y figura como «Llena».
– Los cupos mostrados coinciden con los de PostgreSQL.
Alta
Pendiente
CP-CUR-05
Reducir el cupo por debajo de los matriculados
– Sesión reg01. PRO201-A tiene 12 matriculados y cupo 30.
1. Editar PRO201-A y poner cupo 10; guardar.
2. Editar de nuevo y poner cupo 12; guardar.
– Con 10: se rechaza (hay 12 matriculados).
– Con 12: se acepta (caso límite) y los cupos disponibles quedan en 0.
Media
Pendiente
CP-CUR-06
Rol Docente no puede gestionar secciones
– Sesión doc01 (Coordinador / Docente).
1. Intentar crear una sección desde la web.
2. Invocar el endpoint de creación con el token del docente.
– La opción no se muestra en la web.
– El endpoint responde 403 y no se crea ninguna sección.
Media
Pendiente
4.3 Matrícula, retiro y modificación
Verifica las reglas centrales del sistema: prerrequisitos, cupos, cruces de horario, límite de créditos, plazos y atomicidad (objetivo específico 2; RC-01, RC-04).
ID
Caso / objetivo
Precondiciones y datos de entrada
Pasos
Resultado esperado
Prior.
Estado
CP-MAT-01
Matrícula exitosa (flujo principal)
– Sesión de 20210001 (Ana). Sin deuda, sin matrículas.
– Curso PRO201-A (prerrequisito PRO101 aprobado; 18 cupos; 4 créditos).
– Fecha de sistema: 22/02/2027.
1. Abrir «Oferta académica».
2. Seleccionar PRO201-A.
3. Pulsar «Matricular» y confirmar.
– Matrícula confirmada en ≤ 5 s con estado «Matriculado».
– PRO201-A pasa de 18 a 17 cupos (PostgreSQL y Redis).
– Se genera la constancia PDF y se envía el correo de confirmación.
– Queda un registro de auditoría.
Alta
Pendiente
CP-MAT-02
Matrícula de varios cursos sin conflicto
– Sesión de 20210001, sin matrículas.
– Cursos: PRO201-A (Lun y Mié 08–10) y BDD201-B (Mar y Jue 08–10).
1. Matricular PRO201-A.
2. Matricular BDD201-B.
– Ambas matrículas se confirman.
– El total de créditos mostrado es 8.
– La constancia lista los dos cursos.
Alta
Pendiente
CP-MAT-03
Prerrequisito no cumplido
– Sesión de 20210002 (Luis). PRO101 desaprobado.
– Curso PRO201-A (prerrequisito PRO101).
1. Intentar matricular PRO201-A.
– Se rechaza con mensaje «No cumple el prerrequisito: PRO101».
– No se crea matrícula y los cupos no cambian.
– El intento rechazado queda en auditoría.
Alta
Pendiente
CP-MAT-04
Prerrequisitos múltiples: uno faltante
– Sesión de 20210006 (Marta). PRO201 aprobado; BDD201 no aprobado.
– Curso ING301-A (requiere PRO201 y BDD201).
1. Intentar matricular ING301-A.
– Se rechaza indicando específicamente que falta BDD201.
– No se crea matrícula.
Alta
Pendiente
CP-MAT-05
Prerrequisitos múltiples: todos cumplidos
– Sesión de 20210007 (Pedro). PRO201 y BDD201 aprobados.
– Curso ING301-A (22 cupos).
1. Matricular ING301-A.
– Matrícula confirmada.
– ING301-A pasa de 22 a 21 cupos.
Alta
Pendiente
CP-MAT-06
Sección sin cupos
– Sesión de 20210001.
– Sección ETI101-A con 30/30 (0 cupos).
1. Intentar matricular ETI101-A.
– Se rechaza con mensaje «Sección sin cupos disponibles».
– Se sugieren otras secciones del curso (ETI101-B).
– El contador de matriculados sigue en 30.
Alta
Pendiente
CP-MAT-07
Matrícula en el último cupo (límite)
– Sesión de 20210001 (MAT101 aprobado).
– Sección FIS101-A con 29/30 (1 cupo).
1. Matricular FIS101-A.
– Matrícula confirmada.
– La sección queda con 0 cupos y se muestra como «Llena» en la oferta.
Alta
Pendiente
CP-MAT-08
Concurrencia sobre el último cupo
– Sesiones de 20210005 (Rosa) y 20210007 (Pedro), ambos con MAT101 aprobado.
– Sección FIS101-B con 29/30.
1. Dejar ambas sesiones listas en la pantalla de confirmación.
2. Confirmar las dos matrículas al mismo tiempo (diferencia < 1 s, con script).
– Se confirma exactamente una matrícula; la otra se rechaza por falta de cupo.
– FIS101-B queda en 30/30: 0 sobrecupos.
– PostgreSQL y Redis muestran el mismo valor.
Alta
Pendiente
CP-MAT-09
Cruce de horario
– Sesión de 20210001, ya matriculada en PRO201-A (Lun 08–10).
– Curso BDD201-A (Lun 09–11).
1. Intentar matricular BDD201-A.
– Se rechaza con mensaje de cruce de horario con PRO201-A (Lun 09:00–10:00).
– No se crea matrícula.
Alta
Pendiente
CP-MAT-10
Horarios contiguos (sin cruce)
– Sesión de 20210001, ya matriculada en PRO201-A (termina Lun 10:00).
– Sección ETI101-B (Lun 10:00–12:00, 2 créditos).
1. Matricular ETI101-B.
– Matrícula confirmada: un curso que empieza a la hora exacta en que termina otro no se considera cruce.
Media
Pendiente
CP-MAT-11
Excede el límite de créditos
– Sesión de 20210004 (Jorge) con 20 créditos matriculados (sin cruces).
– Límite = 22. Curso BDD201-B (4 créditos).
1. Intentar matricular BDD201-B.
– Se rechaza (20 + 4 = 24 > 22).
– El mensaje indica créditos actuales, créditos del curso y el límite.
Alta
Pendiente
CP-MAT-12
Exactamente en el límite de créditos
– Sesión de 20210004 con 20 créditos y sin cruces con Lun 10–12.
– Sección ETI101-B (2 créditos).
1. Matricular ETI101-B.
– Matrícula confirmada (20 + 2 = 22).
– El total mostrado es 22 créditos.
Alta
Pendiente
CP-MAT-13
Mismo curso en otra sección
– Sesión de 20210001, ya matriculada en PRO201-A.
1. Intentar matricular PRO201-B (mismo curso, otra sección).
– Se rechaza con mensaje «Ya está matriculado en este curso».
– Los cupos de PRO201-B no cambian.
Media
Pendiente
CP-MAT-14
Matrícula fuera del plazo
– Sesión de 20210001.
– Variante A: fecha de sistema 08/03/2027 (cierre 05/03).
– Variante B: fecha de sistema 10/02/2027 (inicio 15/02).
1. Intentar matricular PRO201-A en cada variante.
– Ambas se rechazan con mensaje de periodo de matrícula cerrado / no iniciado, con las fechas del calendario.
– No se crea matrícula.
Alta
Pendiente
CP-MAT-15
Matrícula en el último minuto del plazo (límite)
– Sesión de 20210001.
– Fecha de sistema: 05/03/2027 23:59.
1. Matricular PRO201-A.
– Matrícula confirmada: el cierre incluye todo el día 05/03/2027.
Media
Pendiente
CP-MAT-16
Retiro dentro del plazo
– Sesión de 20210001, matriculada en PRO201-A (13/30).
– Fecha de sistema: 10/03/2027 (retiro hasta 26/03).
1. Abrir «Mis cursos».
2. Seleccionar PRO201-A › «Retirar» y confirmar.
– Estado del curso: «Retirado».
– PRO201-A vuelve a 12/30 (17 → 18 cupos; Redis y PostgreSQL).
– Los créditos totales se recalculan.
– Se envía correo de aviso y queda auditoría con los valores anteriores.
Alta
Pendiente
CP-MAT-17
Retiro fuera del plazo
– Sesión de 20210001, matriculada en PRO201-A.
– Fecha de sistema: 27/03/2027 00:00 (primer instante fuera del plazo).
1. Intentar retirar PRO201-A.
– Se rechaza con mensaje de plazo de retiro vencido.
– La matrícula y los cupos no cambian.
Alta
Pendiente
CP-MAT-18
Cambio de sección
– Sesión de 20210001, matriculada solo en BDD201-A (15/30).
– Destino BDD201-B (20/30).
1. Seleccionar BDD201-A › «Cambiar de sección».
2. Elegir BDD201-B y confirmar.
– Queda matriculada en BDD201-B y sin matrícula en BDD201-A.
– BDD201-A pasa a 14/30 y BDD201-B a 21/30.
– El cambio se registra en auditoría.
Media
Pendiente
CP-MAT-19
Cambio hacia una sección llena
– Sesión de 20210001, matriculada en BDD201-A.
– Se ajusta BDD201-B a 30/30.
1. Intentar cambiar de BDD201-A a BDD201-B.
– Se rechaza por falta de cupo.
– Conserva su matrícula en BDD201-A (operación de todo o nada).
Media
Pendiente
CP-MAT-20
Atomicidad ante una falla de base de datos
– Sesión de 20210001.
– Se simula un corte de conexión con PostgreSQL justo después de descontar el cupo (entorno de pruebas).
1. Matricular PRO201-A con la falla activa.
2. Restablecer la conexión y revisar la base de datos.
– Se muestra un mensaje de error controlado.
– No existe matrícula ni cupo descontado: la transacción se revierte completa.
– El estudiante puede reintentar.
Alta
Pendiente
CP-MAT-21
Doble clic en «Confirmar»
– Sesión de 20210001, PRO201-A con 18 cupos.
1. Pulsar «Confirmar matrícula» dos veces seguidas (o enviar la solicitud duplicada).
– Se registra una sola matrícula.
– PRO201-A baja solo en 1 cupo.
– No se envían dos correos ni se generan dos constancias.
Media
Pendiente
4.4 Pagos y deudas (Tesorería)
Verifica la consulta del estado de pago al sistema externo de Tesorería (objetivo específico 3).
ID
Caso / objetivo
Precondiciones y datos de entrada
Pasos
Resultado esperado
Prior.
Estado
CP-PAG-01
Estudiante sin deuda
– Sesión de 20210001. Tesorería simulada responde «al día».
1. Matricular PRO201-A.
– Se consulta el estado de pago y la matrícula continúa y se confirma.
Alta
Pendiente
CP-PAG-02
Estudiante con deuda
– Sesión de 20210003 (Carla). Tesorería responde deuda de S/ 350.00.
1. Intentar matricular PRO201-A.
– La matrícula se bloquea con mensaje de deuda pendiente (indica el monto y que debe regularizar en Tesorería).
– No se crea matrícula y los cupos no cambian.
Alta
Pendiente
CP-PAG-03
Tesorería no disponible
– Sesión de 20210001. Tesorería simulada sin respuesta (tiempo de espera de 10 s).
1. Intentar matricular PRO201-A.
– No se confirma la matrícula.
– Mensaje: «No se pudo verificar el estado de pago, intente más tarde».
– No queda matrícula parcial; el error se registra en el log.
Alta
Pendiente
CP-PAG-04
Deuda regularizada
– Sesión de 20210003 con deuda (CP-PAG-02 ya ejecutado).
– Tesorería cambia a «al día».
1. Sin cerrar sesión, reintentar la matrícula de PRO201-A.
– Se confirma la matrícula: el estado de pago se consulta en cada confirmación y no se reutiliza un dato antiguo.
Media
Pendiente
4.5 Reportes y constancias
Verifica la constancia de matrícula en PDF, las listas por sección y los reportes para Registros Académicos (objetivos 4 y 5).
ID
Caso / objetivo
Precondiciones y datos de entrada
Pasos
Resultado esperado
Prior.
Estado
CP-REP-01
Constancia de matrícula en PDF
– Sesión de 20210001 con matrícula confirmada en PRO201-A y BDD201-B.
1. Abrir «Mis constancias».
2. Descargar la constancia.
– La constancia está disponible de inmediato (≤ 5 s tras confirmar).
– El PDF contiene nombre, código, periodo, cursos con sección y horario, créditos totales y fecha y hora de emisión.
– El archivo queda guardado en el almacenamiento de constancias.
Alta
Pendiente
CP-REP-02
La constancia refleja los retiros
– Sesión de 20210001 con constancia previa (2 cursos).
– Se retira de PRO201-A dentro del plazo.
1. Descargar la constancia nuevamente.
– La nueva constancia muestra solo BDD201-B (4 créditos).
– La versión anterior queda conservada con su fecha de emisión.
Media
Pendiente
CP-REP-03
Lista de estudiantes por sección
– Sesión doc01, asignado a PRO201-A (12 matriculados).
1. Abrir «Mis secciones» › PRO201-A › «Lista de estudiantes».
2. Intentar abrir la lista de BDD201-A (no asignada).
– La lista de PRO201-A muestra los 12 estudiantes (coincide con la base de datos).
– El acceso a BDD201-A es rechazado (403).
Media
Pendiente
CP-REP-04
Reporte de demanda de cursos
– Sesión reg01. Datos de secciones de la sección 3.4.
1. Abrir Reportes › «Demanda de cursos».
2. Seleccionar el periodo 2027-I.
– Se muestra, por curso y sección, el total de matriculados y el porcentaje de ocupación.
– Ejemplos: ETI101-A = 100 %; FIS101-A = 96,7 % (29/30).
– Los totales coinciden con una consulta directa a PostgreSQL.
Media
Pendiente
CP-REP-05
Constancia de otro estudiante
– Sesión de 20210001; constancia de 20210007 existente.
1. Solicitar la URL de descarga de la constancia de 20210007.
– Respuesta 403 o 404 y no se entrega el PDF.
Alta
Pendiente
CP-REP-06
Reporte sin datos
– Sesión reg01. Periodo 2027-II sin matrículas.
1. Generar el reporte de demanda de 2027-II.
– Mensaje «No hay datos para el periodo seleccionado»; sin errores ni pantallas en blanco.
Baja
Pendiente
4.6 Notificaciones por correo
Verifica el envío de correos mediante el servicio SMTP externo (objetivo específico 4).
ID
Caso / objetivo
Precondiciones y datos de entrada
Pasos
Resultado esperado
Prior.
Estado
CP-NOT-01
Correo de confirmación de matrícula
– Estudiante 20210001 con correo institucional. SMTP de pruebas activo.
1. Confirmar la matrícula de PRO201-A.
2. Revisar la bandeja de pruebas.
– Llega un correo a la dirección institucional en menos de 1 minuto.
– Incluye curso, sección, horario y créditos, y enlace a la constancia.
Alta
Pendiente
CP-NOT-02
Correo por retiro o cambio de sección
– Estudiante 20210001 matriculado en PRO201-A.
1. Retirar PRO201-A (o cambiar de sección).
2. Revisar la bandeja.
– Llega un correo que describe el cambio realizado, con fecha y hora.
Media
Pendiente
CP-NOT-03
Servicio SMTP caído
– Se detiene el servidor SMTP de pruebas.
1. Confirmar la matrícula de PRO201-A.
2. Restablecer SMTP y esperar el reintento.
– La matrícula se confirma igual (no depende del correo).
– El correo queda pendiente y se reintenta; la falla se registra.
– Al restablecer SMTP, el correo se entrega.
Media
Pendiente
4.7 Auditoría
Verifica la trazabilidad de las operaciones de matrícula (RC-06).
ID
Caso / objetivo
Precondiciones y datos de entrada
Pasos
Resultado esperado
Prior.
Estado
CP-AUD-01
Registro de cada operación
– Se ejecutan CP-MAT-01 (matrícula), CP-MAT-16 (retiro) y CP-MAT-18 (cambio de sección).
1. Revisar la tabla de auditoría en la base de datos.
– Cada operación tiene un registro con usuario, fecha y hora, acción y valores anteriores y nuevos.
Alta
Pendiente
CP-AUD-02
Consulta de auditoría por rol
– Sesiones reg01 y 20210001.
1. Como Registros: buscar auditoría del estudiante 20210001 en un rango de fechas.
2. Como estudiante: intentar abrir la consulta de auditoría.
– Registros obtiene los movimientos filtrados correctamente.
– El estudiante recibe 403.
Media
Pendiente
CP-AUD-03
Los registros no se pueden alterar
– Sesión reg01 y sesión admin01.
1. Intentar modificar o eliminar un registro de auditoría desde la API.
– La operación se rechaza para todos los roles.
– El intento queda registrado.
Media
Pendiente
4.8 Pruebas no funcionales
Verifican las metas de A-02 (ISO/IEC 25010). Los valores objetivo provienen de los criterios de aceptación de los requisitos RC-01 a RC-10.
ID
Caso / objetivo
Precondiciones y datos de entrada
Pasos
Resultado esperado
Prior.
Estado
CP-NF-01
Carga del primer día de matrícula (RC-01)
– Entorno equivalente al de producción.
– 2 000 usuarios virtuales: inicio de sesión, consulta de oferta y matrícula.
– Duración 30 min, con subida gradual.
1. Ejecutar el escenario con k6 o JMeter.
2. Analizar tiempos y errores.
– El 95 % de las operaciones responde en ≤ 3 s.
– La confirmación de matrícula tarda ≤ 5 s.
– Sin caídas del servicio ni degradación progresiva.
Alta
Pendiente
CP-NF-02
Concurrencia masiva sobre una sección (RC-04)
– Sección con 30 cupos libres.
– 200 estudiantes válidos intentan matricularse a la vez.
1. Lanzar las 200 solicitudes simultáneas con script.
2. Contar matrículas en PostgreSQL y cupos en Redis.
– Exactamente 30 confirmadas y 170 rechazadas por falta de cupo.
– 0 sobrecupos; ambas fuentes de datos coinciden.
Alta
Pendiente
CP-NF-03
Consistencia de Redis tras un reinicio (RC-04)
– Cupos en Redis cargados con matrículas en curso.
1. Reiniciar Redis.
2. Consultar la oferta y matricular un curso.
– Los cupos se reconstruyen desde PostgreSQL y coinciden con el total real.
– El sistema sigue operando; las sesiones vuelven a exigir inicio de sesión si se perdieron.
Media
Pendiente
CP-NF-04
Contraseñas con hash y comunicación cifrada (RC-02)
– Entorno de pruebas con usuarios cargados.
1. Revisar la tabla de usuarios.
2. Abrir el sitio por http://.
3. Verificar la versión de TLS con un escáner.
– Las contraseñas están con hash (bcrypt/Argon2), nunca en texto plano.
– http:// redirige a https://.
– TLS 1.2 o superior.
Alta
Pendiente
CP-NF-05
Entradas maliciosas: inyección SQL y XSS (RC-02)
– Campos de inicio de sesión y de búsqueda de cursos.
1. Ingresar ' OR '1'='1 en usuario y contraseña.
2. Ingresar <script>alert(1)</script> en la búsqueda.
– No hay acceso no autorizado ni errores de base de datos visibles.
– El texto se muestra escapado y no se ejecuta ningún script.
Alta
Pendiente
CP-NF-06
Usabilidad: matrícula sin capacitación (RC-05)
– 5 estudiantes que nunca usaron el sistema, sin instrucciones previas.
1. Pedir que se matriculen en 4 cursos.
2. Medir el tiempo y anotar dificultades.
– Todos terminan en ≤ 10 min (criterio de éxito de A-01).
– Los problemas observados quedan documentados.
Media
Pendiente
CP-NF-07
Diseño adaptable a celular (RC-08)
– Pantalla de 360 px de ancho (emulador y dispositivo real).
1. Ejecutar el flujo CP-MAT-01 completo en el celular.
– No aparece barra de desplazamiento horizontal.
– Todas las funciones son accesibles y los botones son pulsables.
Media
Pendiente
CP-NF-08
Compatibilidad de navegadores (RC-08)
– Últimas 2 versiones de Chrome, Edge, Firefox y Safari.
1. Ejecutar CP-AUT-01, CP-MAT-01 y CP-REP-01 en cada navegador.
– Los tres casos dan el mismo resultado en todos los navegadores.
Media
Pendiente
CP-NF-09
Accesibilidad WCAG 2.1 AA (RC-05)
– Pantallas de inicio de sesión, oferta y matrícula.
1. Ejecutar un analizador (axe o Lighthouse).
2. Recorrer el flujo solo con teclado.
– Contraste mínimo 4,5:1 en textos.
– Campos con etiqueta y foco visible.
– Todo el flujo se completa con teclado.
Baja
Pendiente
CP-NF-10
Respaldo y restauración (RC-09)
– Respaldo diario de PostgreSQL disponible; entorno de pruebas aparte.
1. Restaurar el último respaldo en el entorno de pruebas.
2. Comparar totales de estudiantes, matrículas y auditoría.
3. Medir el tiempo total.
– Los datos restaurados coinciden con el origen.
– Tiempo de recuperación ≤ 4 h.
Alta
Pendiente
CP-NF-11
Disponibilidad en periodo de matrícula (RC-03)
– Monitoreo activo durante todo el periodo 2027-I.
1. Registrar caídas e interrupciones.
2. Calcular la disponibilidad al cierre del periodo.
– Disponibilidad ≥ 99,5 %.
– Ningún mantenimiento programado dentro del periodo.
Media
Pendiente
CP-NF-12
Cobertura de pruebas unitarias (RC-07)
– Código de A-05 en el repositorio.
1. Ejecutar las pruebas unitarias con reporte de cobertura (Jest).
– Cobertura ≥ 70 % en los módulos de reglas de negocio (Matrícula, Pagos, Cursos).
– Todas las pruebas pasan.
Media
Pendiente
5. Trazabilidad y cobertura
5.1 Matriz de trazabilidad
Cada objetivo de A-01 y cada requisito de A-02 tiene al menos un caso que lo verifica.
Objetivo (A-01) o requisito (A-02)
Casos que lo verifican
Obj. 1: publicar la oferta académica
CP-CUR-01 a CP-CUR-06
Obj. 2: validar prerrequisitos, cupos, cruces y créditos
CP-MAT-01 a CP-MAT-21
Obj. 3: verificar el estado de pago
CP-PAG-01 a CP-PAG-04
Obj. 4: constancia en PDF y notificación por correo
CP-REP-01, CP-REP-02, CP-NOT-01 a CP-NOT-03
Obj. 5: gestión, auditoría y reportes
CP-REP-03, CP-REP-04, CP-AUD-01 a CP-AUD-03
RC-01 Rendimiento
CP-NF-01
RC-02 Seguridad
CP-AUT-01 a CP-AUT-08, CP-NF-04, CP-NF-05
RC-03 Disponibilidad
CP-NF-11
RC-04 Confiabilidad e integridad
CP-MAT-08, CP-MAT-20, CP-MAT-21, CP-NF-02, CP-NF-03
RC-05 Usabilidad
CP-NF-06, CP-NF-09
RC-06 Trazabilidad y auditoría
CP-AUD-01 a CP-AUD-03
RC-07 Mantenibilidad
CP-NF-12
RC-08 Compatibilidad y portabilidad
CP-NF-07, CP-NF-08
RC-09 Recuperabilidad
CP-NF-10
RC-10 Protección de datos
CP-AUT-05, CP-AUT-06, CP-REP-05
Éxito: matrícula en < 10 min
CP-NF-06
Éxito: cero sobrecupos y cero matrículas sin prerrequisitos
CP-MAT-03, CP-MAT-04, CP-MAT-08, CP-NF-02
Éxito: constancia disponible de inmediato
CP-REP-01
5.2 Resumen de casos
Módulo
Casos
Alta
Media
Baja
Autenticación y roles
8
5
3
0
Cursos, secciones y horarios
6
2
4
0
Matrícula, retiro y modificación
21
15
6
0
Pagos y deudas (Tesorería)
4
3
1
0
Reportes y constancias
6
2
3
1
Notificaciones por correo
3
1
2
0
Auditoría
3
1
2
0
Pruebas no funcionales
12
5
6
1
Total
63
34
27
2
6. Estado de ejecución
A la fecha (28/10/2026) ningún caso ha sido ejecutado: el código (A-05) y el entorno (A-06) todavía no existen. Los 63 casos están en estado Pendiente. Cuando haya un prototipo se registrará cada ciclo de pruebas en esta tabla y el resultado obtenido de cada caso se anotará en la columna «Estado» (Aprobado / Fallido / Bloqueado).
Ciclo
Fecha
Versión probada
Ejecutados
Aprobados
Fallidos
Responsable
1
—
—
0 de 63
—
—
Miguel
7. Supuestos y brechas
Estos puntos se asumieron para poder escribir resultados esperados concretos y deben confirmarse:
Límite de 22 créditos: valor de prueba; A-01 menciona un límite, pero no su cifra. Confirmar con Registros Académicos.
Calendario 2027-I: fechas ficticias de matrícula (15/02 a 05/03) y de retiro (hasta 26/03).
Tesorería sin respuesta: se asume que la matrícula se bloquea (CP-PAG-03). Es una decisión de diseño pendiente de acordar con Tesorería.
Correo caído: se asume que la matrícula se confirma y el correo se reintenta (CP-NOT-03). Decisión de diseño por confirmar.
Curso ya aprobado: A-01 no define si se puede volver a matricular un curso aprobado; no se incluyó un caso hasta aclarar esta regla.
Requisitos funcionales detallados: al definirse, habrá que revisar los resultados esperados y agregar los casos que falten (el inventario indica esta dependencia).
Metas de rendimiento: son metas de diseño de A-02; las pruebas de carga requieren un entorno equivalente al de producción.
Validación con usuarios: A-01 aún no fue validado con un usuario real de Registros Académicos; conviene revisar con esa persona estos casos.