# 🚀 Template de Proyecto Full-Stack: Frontend Vue + Backend Node.js

Este documento proporciona una guía completa para replicar la estructura de un proyecto full-stack con frontend Vue.js y backend Node.js/Express, incluyendo autenticación, tests automatizados y estilos modulares.

## 📋 Índice

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Configuración Inicial](#configuración-inicial)
3. [Frontend (Vue.js)](#frontend-vuejs)
4. [Backend (Node.js/Express)](#backend-nodejsexpress)
5. [Base de Datos](#base-de-datos)
6. [Sistema de Tests](#sistema-de-tests)
7. [Estilos CSS Modulares](#estilos-css-modulares)
8. [Integración Frontend-Backend](#integración-frontend-backend)
9. [Scripts y Comandos](#scripts-y-comandos)
10. [Deployment](#deployment)

---

## 🏗️ Estructura del Proyecto

```
proyecto-fullstack/
├── frontend/                    # Aplicación Vue.js
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   └── styles/         # CSS modular
│   │   │       ├── base.css
│   │   │       ├── components.css
│   │   │       ├── responsive.css
│   │   │       ├── main.css
│   │   │       └── README.md
│   │   ├── components/         # Componentes Vue
│   │   │   ├── LoginForm.vue
│   │   │   └── RegisterForm.vue
│   │   ├── config/            # Configuración
│   │   │   └── api.js
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
├── backend/                    # API Node.js/Express
│   ├── config/
│   │   └── security.js
│   ├── routes/
│   │   └── auth.js
│   ├── tests/
│   │   ├── helpers/
│   │   │   └── database.js
│   │   ├── auth.test.js
│   │   ├── setup.js
│   │   └── README.md
│   ├── database.js
│   ├── init-database.js
│   ├── server.js
│   ├── package.json
│   ├── jest.config.js
│   └── .gitignore
├── README.md
└── .gitignore
```

---

## ⚙️ Configuración Inicial

### 1. Crear Estructura de Directorios

```bash
mkdir proyecto-fullstack
cd proyecto-fullstack
mkdir frontend backend
```

### 2. Inicializar Git

```bash
git init
echo "node_modules/" > .gitignore
echo "*.log" >> .gitignore
echo "dist/" >> .gitignore
echo "coverage/" >> .gitignore
echo "*.sqlite" >> .gitignore
echo "test-database.sqlite" >> .gitignore
```

---

## 🎨 Frontend (Vue.js)

### 1. Inicializar Proyecto Vue

```bash
cd frontend
npm create vue@latest . -- --typescript false --router false --pinia false --vitest false --cypress false --eslint false --prettier false
npm install
```

### 2. Configurar Vite

**`frontend/vite.config.js`**
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### 3. Configurar HTML Principal

**`frontend/index.html`**
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Aplicación</title>
    <link rel="stylesheet" href="./src/assets/styles/main.css">
</head>
<body>
    <div id="app"></div>
    <script type="module" src="./src/main.js"></script>
</body>
</html>
```

### 4. Configurar Entry Point

**`frontend/src/main.js`**
```javascript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 5. Configurar App Principal

**`frontend/src/App.vue`**
```vue
<template>
  <div class="app">
    <LoginForm v-if="currentView === 'login'" @go-to-register="currentView = 'register'" />
    <RegisterForm v-else @go-to-login="currentView = 'login'" />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

export default {
  name: 'App',
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      currentView: 'login'
    }
  }
}
</script>
```

### 6. Configurar API Client

**`frontend/src/config/api.js`**
```javascript
// Configuración de la API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  ENDPOINTS: {
    REGISTER: '/api/register',
    LOGIN: '/api/login'
  }
}

// Función helper para requests
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options
  }

  try {
    const response = await fetch(url, defaultOptions)
    const data = await response.json()

    return { response, data }
  } catch (error) {
    throw new Error(`Error de red: ${error.message}`)
  }
}
```

---

## 🔧 Backend (Node.js/Express)

### 1. Inicializar Proyecto Node.js

```bash
cd backend
npm init -y
```

### 2. Instalar Dependencias

```bash
npm install express cors body-parser bcryptjs sqlite3
npm install --save-dev nodemon jest supertest
```

### 3. Configurar Package.json

**`backend/package.json`**
```json
{
  "name": "backend-api",
  "version": "1.0.0",
  "description": "API Backend con Node.js, Express y SQLite",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "init-db": "node init-database.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "sqlite3": "^5.1.6"
  },
  "devDependencies": {
    "jest": "^30.0.5",
    "nodemon": "^3.0.1",
    "supertest": "^7.1.4"
  },
  "keywords": ["nodejs", "express", "sqlite", "api"],
  "author": "",
  "license": "MIT"
}
```

### 4. Configurar Servidor Principal

**`backend/server.js`**
```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        path: req.originalUrl
    });
});

// Solo iniciar el servidor si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
}

module.exports = app;
```

---

## 🗄️ Base de Datos

### Estructura de Tablas

```sql
-- Tabla de usuarios
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Comandos de Base de Datos

```bash
# Inicializar base de datos
cd backend
npm run init-db

# Verificar base de datos
sqlite3 database.sqlite ".tables"
sqlite3 database.sqlite "SELECT * FROM users;"
```

---

## 🧪 Sistema de Tests

### 1. Configurar Jest

**`backend/jest.config.js`**
```javascript
module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/coverage/'
    ],
    collectCoverageFrom: [
        'routes/**/*.js',
        'config/**/*.js',
        'database.js',
        '!**/node_modules/**',
        '!**/coverage/**'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testTimeout: 10000,
    verbose: true,
    forceExit: true,
    clearMocks: true,
    restoreMocks: true
};
```

### 2. Setup de Tests

**`backend/tests/setup.js`**
```javascript
const path = require('path');

// Configurar variables de entorno para tests
process.env.NODE_ENV = 'test';
process.env.DB_PATH = path.join(__dirname, '../test-database.sqlite');
process.env.PORT = 3002;

// Configurar logging para tests
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

if (process.env.VERBOSE_TESTS !== 'true') {
    console.log = jest.fn();
    console.error = jest.fn();
}

afterEach(() => {
    if (process.env.VERBOSE_TESTS !== 'true') {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    }
});

global.testTimeout = 10000;
```

---

## 📜 Scripts y Comandos

### Comandos de Desarrollo

```bash
# Frontend
cd frontend
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build

# Backend
cd backend
npm run dev          # Servidor de desarrollo con nodemon
npm start            # Servidor de producción
npm run init-db      # Inicializar base de datos

# Tests
cd backend
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con cobertura
```

### Comandos de Instalación

```bash
# Instalar dependencias del frontend
cd frontend
npm install

# Instalar dependencias del backend
cd backend
npm install

# Inicializar base de datos
cd backend
npm run init-db
```

### Comandos de Testing

```bash
# Ejecutar todos los tests
cd backend
npm test

# Ejecutar tests específicos
npm test -- --testNamePattern="login"

# Ejecutar tests con logs verbosos
VERBOSE_TESTS=true npm test

# Ejecutar tests con cobertura
npm run test:coverage
```

---

## 📋 Checklist de Implementación

### ✅ Configuración Inicial
- [ ] Crear estructura de directorios
- [ ] Inicializar Git
- [ ] Configurar .gitignore

### ✅ Frontend (Vue.js)
- [ ] Inicializar proyecto Vue
- [ ] Configurar Vite
- [ ] Crear estructura de componentes
- [ ] Implementar estilos CSS modulares
- [ ] Configurar API client
- [ ] Implementar formularios de autenticación

### ✅ Backend (Node.js/Express)
- [ ] Inicializar proyecto Node.js
- [ ] Instalar dependencias
- [ ] Configurar servidor Express
- [ ] Implementar middleware (CORS, body-parser)
- [ ] Configurar base de datos SQLite
- [ ] Implementar rutas de autenticación
- [ ] Configurar validaciones y seguridad

### ✅ Base de Datos
- [ ] Crear script de inicialización
- [ ] Definir estructura de tablas
- [ ] Implementar funciones de base de datos
- [ ] Configurar para tests

### ✅ Sistema de Tests
- [ ] Configurar Jest
- [ ] Crear setup de tests
- [ ] Implementar helper de base de datos
- [ ] Escribir tests de endpoints
- [ ] Configurar cobertura de código

### ✅ Integración
- [ ] Configurar CORS
- [ ] Implementar manejo de errores
- [ ] Configurar variables de entorno
- [ ] Probar integración completa

---

## 🔧 Personalización

### Cambiar Colores del Tema

Editar `frontend/src/assets/styles/base.css`:
```css
:root {
    --primary-color: #tu-color-primario;
    --secondary-color: #tu-color-secundario;
    /* ... otros colores */
}
```

### Agregar Nuevos Endpoints

1. Crear nueva ruta en `backend/routes/`
2. Agregar middleware de validación
3. Implementar lógica de negocio
4. Escribir tests
5. Documentar en README

### Agregar Nuevos Componentes Vue

1. Crear componente en `frontend/src/components/`
2. Agregar estilos en `frontend/src/assets/styles/components.css`
3. Importar en `App.vue` o componente padre
4. Implementar lógica y validaciones

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Vue.js](https://vuejs.org/guide/)
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/docs.html)
- [Jest](https://jestjs.io/docs/getting-started)
- [Vite](https://vitejs.dev/guide/)

### Herramientas Recomendadas
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript (opcional)
- **State Management**: Pinia (si es necesario)
- **Routing**: Vue Router (si es necesario)
- **Testing**: Vitest (para tests unitarios del frontend)

### Mejores Prácticas
- **Seguridad**: Validar inputs, usar HTTPS, implementar rate limiting
- **Performance**: Lazy loading, code splitting, caching
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **SEO**: Meta tags, sitemap, structured data

---

Este template proporciona una base sólida para proyectos full-stack con Vue.js y Node.js. Puede ser adaptado y extendido según las necesidades específicas de cada proyecto.