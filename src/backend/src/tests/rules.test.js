// Datos tomados de A-04, sección 3 (estudiantes, cursos y secciones de prueba).
const {
  prerrequisitosPendientes, hayCupo, seCruzan, superaCreditos, dentroDePlazo, validarMatricula,
} = require('../modules/matricula/rules');

const PRO201 = { codigo: 'PRO201', creditos: 4, prerrequisitos: ['PRO101'] };
const ING301 = { codigo: 'ING301', creditos: 4, prerrequisitos: ['PRO201', 'BDD201'] };

const PRO201A = { codigo: 'PRO201-A', cupo: 30, matriculados: 12, horario: [{ dia: 'LUN', inicio: '08:00', fin: '10:00' }, { dia: 'MIE', inicio: '08:00', fin: '10:00' }] };
const BDD201A = { codigo: 'BDD201-A', cupo: 30, matriculados: 15, horario: [{ dia: 'LUN', inicio: '09:00', fin: '11:00' }] };
const ETI101A = { codigo: 'ETI101-A', cupo: 30, matriculados: 30, horario: [{ dia: 'SAB', inicio: '08:00', fin: '10:00' }] };
const ETI101B = { codigo: 'ETI101-B', cupo: 30, matriculados: 12, horario: [{ dia: 'LUN', inicio: '10:00', fin: '12:00' }] };

const plazo = { inicio: new Date('2027-02-15T00:00:00'), fin: new Date('2027-03-05T23:59:59') };
const base = { fecha: new Date('2027-02-20T10:00:00'), plazo, limiteCreditos: 22, seccionesMatriculadas: [] };

const ana = { codigo: '20210001', aprobados: ['MAT101', 'PRO101'], creditos: 0, deuda: 0 };
const luis = { codigo: '20210002', aprobados: ['MAT101'], creditos: 0, deuda: 0 };
const carla = { codigo: '20210003', aprobados: ['MAT101', 'PRO101'], creditos: 0, deuda: 350 };
const jorge = { codigo: '20210004', aprobados: ['MAT101', 'PRO101'], creditos: 20, deuda: 0 };
const marta = { codigo: '20210006', aprobados: ['PRO101', 'PRO201'], creditos: 0, deuda: 0 };

describe('reglas individuales', () => {
  test('prerrequisitos: cumple', () => expect(prerrequisitosPendientes(PRO201, ana.aprobados)).toEqual([]));
  test('prerrequisitos: falta PRO101', () => expect(prerrequisitosPendientes(PRO201, luis.aprobados)).toEqual(['PRO101']));
  test('prerrequisitos múltiples: falta BDD201', () => expect(prerrequisitosPendientes(ING301, marta.aprobados)).toEqual(['BDD201']));
  test('cupo: sección con lugares', () => expect(hayCupo(PRO201A)).toBe(true));
  test('cupo: sección llena', () => expect(hayCupo(ETI101A)).toBe(false));
  test('cruce: PRO201-A y BDD201-A se cruzan', () => expect(seCruzan(BDD201A.horario, PRO201A.horario)).toBe(true));
  test('cruce: horarios contiguos no se cruzan', () => expect(seCruzan(ETI101B.horario, PRO201A.horario)).toBe(false));
  test('créditos: 20 + 4 supera 22', () => expect(superaCreditos(20, 4, 22)).toBe(true));
  test('créditos: 18 + 4 llega justo al límite', () => expect(superaCreditos(18, 4, 22)).toBe(false));
  test('plazo: último día a las 23:59 es válido', () => expect(dentroDePlazo(new Date('2027-03-05T23:59:00'), plazo.inicio, plazo.fin)).toBe(true));
  test('plazo: un día después es inválido', () => expect(dentroDePlazo(new Date('2027-03-06T00:00:00'), plazo.inicio, plazo.fin)).toBe(false));
});

describe('validarMatricula', () => {
  test('caso ideal (Ana en PRO201-A) es aceptado', () => {
    expect(validarMatricula({ ...base, estudiante: ana, curso: PRO201, seccion: PRO201A })).toEqual({ ok: true, errores: [] });
  });
  test('Luis: rechazado por prerrequisito', () => {
    const r = validarMatricula({ ...base, estudiante: luis, curso: PRO201, seccion: PRO201A });
    expect(r.errores.map((e) => e.codigo)).toEqual(['PRERREQUISITO']);
  });
  test('Carla: rechazada por deuda', () => {
    const r = validarMatricula({ ...base, estudiante: carla, curso: PRO201, seccion: PRO201A });
    expect(r.errores.map((e) => e.codigo)).toEqual(['CON_DEUDA']);
  });
  test('Jorge: rechazado por límite de créditos', () => {
    const r = validarMatricula({ ...base, estudiante: jorge, curso: PRO201, seccion: PRO201A });
    expect(r.errores.map((e) => e.codigo)).toEqual(['LIMITE_CREDITOS']);
  });
  test('sección llena: rechazada por falta de cupo', () => {
    const eti = { codigo: 'ETI101', creditos: 2, prerrequisitos: [] };
    const r = validarMatricula({ ...base, estudiante: ana, curso: eti, seccion: ETI101A });
    expect(r.errores.map((e) => e.codigo)).toEqual(['SIN_CUPO']);
  });
  test('cruce de horario con una sección ya matriculada', () => {
    const bdd = { codigo: 'BDD201', creditos: 4, prerrequisitos: ['PRO101'] };
    const r = validarMatricula({ ...base, estudiante: ana, curso: bdd, seccion: BDD201A, seccionesMatriculadas: [PRO201A] });
    expect(r.errores.map((e) => e.codigo)).toEqual(['CRUCE_HORARIO']);
  });
  test('fuera de plazo', () => {
    const r = validarMatricula({ ...base, fecha: new Date('2027-03-10T09:00:00'), estudiante: ana, curso: PRO201, seccion: PRO201A });
    expect(r.errores.map((e) => e.codigo)).toEqual(['FUERA_DE_PLAZO']);
  });
  test('acumula varios errores a la vez', () => {
    const r = validarMatricula({ ...base, estudiante: { ...luis, deuda: 100 }, curso: PRO201, seccion: ETI101A });
    expect(r.errores.map((e) => e.codigo)).toEqual(expect.arrayContaining(['CON_DEUDA', 'PRERREQUISITO', 'SIN_CUPO']));
  });
});
