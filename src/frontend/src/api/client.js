// Cliente HTTP único hacia la API REST (HTTPS / JSON). Adjunta el token JWT.
export async function api(ruta, { method = 'GET', body } = {}) {
  const token = sessionStorage.getItem('token');
  const respuesta = await fetch(`/api${ruta}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!respuesta.ok) throw new Error((await respuesta.json()).error || 'Error de red');
  return respuesta.json();
}
