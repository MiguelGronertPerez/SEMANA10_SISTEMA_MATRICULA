// Datos de prueba oficiales según la Sección 3 de docs/04-casos-prueba.md

const CURSOS = [
  {
    codigo: 'MAT101',
    nombre: 'Matemática I',
    creditos: 4,
    ciclo: 1,
    prerrequisitos: [],
    descripcion: 'Cálculo diferencial e integral aplicado a la computación.',
    secciones: [
      {
        id: 'MAT101-A',
        codigo: 'MAT101-A',
        docente: 'Dr. Ricardo Palacios',
        cupo: 30,
        matriculados: 18,
        aula: 'Pab. B - Aula 204',
        horario: [
          { dia: 'LUN', diaTexto: 'Lunes', inicio: '08:00', fin: '10:00' },
          { dia: 'MIE', diaTexto: 'Miércoles', inicio: '08:00', fin: '10:00' }
        ]
      },
      {
        id: 'MAT101-B',
        codigo: 'MAT101-B',
        docente: 'Mg. Carmen Silva',
        cupo: 30,
        matriculados: 29,
        aula: 'Pab. B - Aula 205',
        horario: [
          { dia: 'MAR', diaTexto: 'Martes', inicio: '14:00', fin: '16:00' },
          { dia: 'JUE', diaTexto: 'Jueves', inicio: '14:00', fin: '16:00' }
        ]
      }
    ]
  },
  {
    codigo: 'PRO101',
    nombre: 'Programación I',
    creditos: 4,
    ciclo: 1,
    prerrequisitos: [],
    descripcion: 'Fundamentos de algoritmos, programación estructurada y lógica.',
    secciones: [
      {
        id: 'PRO101-A',
        codigo: 'PRO101-A',
        docente: 'Ing. Carlos Mendoza',
        cupo: 30,
        matriculados: 24,
        aula: 'Lab. Cómputo 3',
        horario: [
          { dia: 'LUN', diaTexto: 'Lunes', inicio: '10:00', fin: '12:00' },
          { dia: 'MIE', diaTexto: 'Miércoles', inicio: '10:00', fin: '12:00' }
        ]
      },
      {
        id: 'PRO101-B',
        codigo: 'PRO101-B',
        docente: 'Ing. Laura Ríos',
        cupo: 30,
        matriculados: 30, // LLENO para probar rechazo por cupo
        aula: 'Lab. Cómputo 4',
        horario: [
          { dia: 'MAR', diaTexto: 'Martes', inicio: '08:00', fin: '10:00' },
          { dia: 'JUE', diaTexto: 'Jueves', inicio: '08:00', fin: '10:00' }
        ]
      }
    ]
  },
  {
    codigo: 'PRO201',
    nombre: 'Programación II',
    creditos: 4,
    ciclo: 2,
    prerrequisitos: ['PRO101'],
    descripcion: 'Programación orientada a objetos, patrones de diseño y modularidad.',
    secciones: [
      {
        id: 'PRO201-A',
        codigo: 'PRO201-A',
        docente: 'Ing. Miguel Silva',
        cupo: 30,
        matriculados: 12,
        aula: 'Lab. Cómputo 1',
        horario: [
          { dia: 'LUN', diaTexto: 'Lunes', inicio: '14:00', fin: '16:00' },
          { dia: 'MIE', diaTexto: 'Miércoles', inicio: '14:00', fin: '16:00' }
        ]
      },
      {
        id: 'PRO201-B',
        codigo: 'PRO201-B',
        docente: 'Dr. Andrés Soto',
        cupo: 25,
        matriculados: 20,
        aula: 'Lab. Cómputo 2',
        horario: [
          { dia: 'VIE', diaTexto: 'Viernes', inicio: '08:00', fin: '12:00' }
        ]
      }
    ]
  },
  {
    codigo: 'BDD201',
    nombre: 'Base de Datos',
    creditos: 4,
    ciclo: 2,
    prerrequisitos: ['PRO101'],
    descripcion: 'Diseño relacional, modelado entidad-relación y consultas SQL.',
    secciones: [
      {
        id: 'BDD201-A',
        codigo: 'BDD201-A',
        docente: 'Mg. Elena Vega',
        cupo: 30,
        matriculados: 15,
        aula: 'Pab. C - Aula 102',
        horario: [
          { dia: 'MAR', diaTexto: 'Martes', inicio: '10:00', fin: '12:00' },
          { dia: 'JUE', diaTexto: 'Jueves', inicio: '10:00', fin: '12:00' }
        ]
      },
      {
        id: 'BDD201-B',
        codigo: 'BDD201-B',
        docente: 'Ing. Javier Cruz',
        cupo: 30,
        matriculados: 22,
        aula: 'Pab. C - Aula 103',
        horario: [
          { dia: 'MIE', diaTexto: 'Miércoles', inicio: '16:00', fin: '18:00' },
          { dia: 'VIE', diaTexto: 'Viernes', inicio: '16:00', fin: '18:00' }
        ]
      }
    ]
  },
  {
    codigo: 'ING301',
    nombre: 'Ingeniería de Software 2',
    creditos: 4,
    ciclo: 3,
    prerrequisitos: ['PRO201', 'BDD201'],
    descripcion: 'Gestión de configuración, control de versiones, métricas de calidad y arquitectura.',
    secciones: [
      {
        id: 'ING301-A',
        codigo: 'ING301-A',
        docente: 'Dr. Fernando Morales',
        cupo: 30,
        matriculados: 14,
        aula: 'Pab. A - Aula 301',
        horario: [
          { dia: 'LUN', diaTexto: 'Lunes', inicio: '16:00', fin: '18:00' },
          { dia: 'MIE', diaTexto: 'Miércoles', inicio: '16:00', fin: '18:00' }
        ]
      }
    ]
  },
  {
    codigo: 'ETI101',
    nombre: 'Ética Profesional',
    creditos: 2,
    ciclo: 1,
    prerrequisitos: [],
    descripcion: 'Deontología profesional, responsabilidad social y bioética.',
    secciones: [
      {
        id: 'ETI101-A',
        codigo: 'ETI101-A',
        docente: 'Lic. Gloria Morales',
        cupo: 35,
        matriculados: 35, // LLENO para probar regla de cupo
        aula: 'Pab. Central - Auditorio',
        horario: [
          { dia: 'SAB', diaTexto: 'Sábado', inicio: '08:00', fin: '10:00' }
        ]
      },
      {
        id: 'ETI101-B',
        codigo: 'ETI101-B',
        docente: 'Lic. Juan Ramos',
        cupo: 35,
        matriculados: 19,
        aula: 'Pab. Central - Aula 105',
        horario: [
          { dia: 'SAB', diaTexto: 'Sábado', inicio: '10:00', fin: '12:00' }
        ]
      }
    ]
  }
];

const ESTUDIANTES_DB = {
  '20210001': {
    codigo: '20210001',
    nombre: 'Ana Torres',
    carrera: 'Ingeniería de Sistemas',
    cicloActual: 3,
    deuda: 0,
    aprobados: ['MAT101', 'PRO101'],
    seccionesMatriculadas: ['PRO201-A'] // Tiene 4 créditos matriculados
  },
  '20210002': {
    codigo: '20210002',
    nombre: 'Luis Ramos',
    carrera: 'Ingeniería de Sistemas',
    cicloActual: 2,
    deuda: 0,
    aprobados: ['MAT101'], // PRO101 reprobado -> Bloquea PRO201 y BDD201
    seccionesMatriculadas: []
  },
  '20210003': {
    codigo: '20210003',
    nombre: 'Carla Díaz',
    carrera: 'Ingeniería de Sistemas',
    cicloActual: 3,
    deuda: 350.00, // Con deuda -> Bloquea matrícula en Tesorería
    aprobados: ['MAT101', 'PRO101'],
    seccionesMatriculadas: []
  },
  '20210004': {
    codigo: '20210004',
    nombre: 'Jorge Paredes',
    carrera: 'Ingeniería de Sistemas',
    cicloActual: 4,
    deuda: 0,
    aprobados: ['MAT101', 'PRO101', 'PRO201', 'BDD201'],
    seccionesMatriculadas: ['PRO201-A', 'BDD201-A', 'ING301-A', 'MAT101-A', 'ETI101-B'] // Ya tiene 18 créditos
  }
};

module.exports = { CURSOS, ESTUDIANTES_DB };
