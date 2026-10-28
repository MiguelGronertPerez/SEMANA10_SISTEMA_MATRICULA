// Acceso a datos de matrícula (PostgreSQL). Pendiente de implementar y probar.
//
// Evitar el sobrecupo con matrículas simultáneas (RC-04):
// reservar el cupo con una sola sentencia atómica dentro de una transacción.
//
//   BEGIN;
//   UPDATE secciones
//      SET matriculados = matriculados + 1
//    WHERE id = $1 AND matriculados < cupo
//    RETURNING id;                    -- 0 filas => sin cupo
//   INSERT INTO matriculas (...) VALUES (...);
//   INSERT INTO auditoria (...) VALUES (...);
//   COMMIT;                           -- ante cualquier error: ROLLBACK (todo o nada)

module.exports = {
  async reservarCupoYMatricular(/* estudianteId, seccionId */) {
    throw new Error('Pendiente de implementar');
  },
};
