# src/ — Código fuente del Sistema de Matrículas (A-05)

Estructura alineada con la arquitectura de A-03: aplicación web React → API REST (Node.js + Express) → PostgreSQL, Redis, almacenamiento de PDF, Tesorería y SMTP.

```
src/
├── frontend/   Aplicación web responsive (React + Vite)
└── backend/    API REST (Node.js + Express), un módulo por componente de A-03
```

## Cómo ejecutar (entorno de desarrollo)

```bash
# Backend
cd src/backend
npm install
npm test          # pruebas unitarias de las reglas de matrícula
npm run dev       # API en http://localhost:3000  (GET /api/salud)

# Frontend
cd src/frontend
npm install
npm run dev       # web en http://localhost:5173
```

Las variables de entorno se documentan en `.env.example` (artefacto A-06, raíz del repositorio).

## Estado

Versión v0.1. Implementado: esqueleto de la API, autenticación JWT (middleware), control de roles y reglas de negocio de matrícula con pruebas unitarias.
Pendiente: inicio de sesión real, persistencia en PostgreSQL, caché Redis, constancia PDF, integración con Tesorería y SMTP, pantallas del frontend.
