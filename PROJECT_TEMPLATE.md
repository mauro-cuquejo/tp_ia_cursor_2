# 🏗️ Plantilla de Proyecto - Estructura Base

## 📋 Descripción General

Esta plantilla define la estructura base para crear proyectos web modernos con separación clara entre frontend y backend, siguiendo las mejores prácticas de desarrollo y los lineamientos establecidos.

## 🎯 Arquitectura del Proyecto

### **Estructura de Directorios**
```
proyecto/
├── frontend/           # Aplicación frontend (Vue.js/React)
├── backend/            # API backend (Node.js/Express)
├── docs/              # Documentación del proyecto
├── tests/             # Tests de integración
├── .gitignore         # Archivos a ignorar por Git
├── README.md          # Documentación principal
└── PROJECT_TEMPLATE.md # Esta plantilla
```

### **Separación de Responsabilidades**
- **Frontend**: Interfaz de usuario, validaciones del lado del cliente, comunicación con API
- **Backend**: Lógica de negocio, base de datos, autenticación, validaciones del servidor
- **Documentación**: Guías, especificaciones, ejemplos de uso

---

## 🚀 Configuración Inicial

### **1. Estructura Base**
```bash
# Crear estructura de directorios
mkdir proyecto
cd proyecto
mkdir frontend backend docs tests

# Inicializar Git
git init
```

### **2. Configuración de Git**
```bash
# .gitignore principal
node_modules/
.env
.env.local
.env.production
*.log
.DS_Store
dist/
build/
coverage/
```

### **3. Documentación Base**
```bash
# Crear archivos de documentación
touch README.md
touch docs/API.md
touch docs/FRONTEND.md
touch docs/BACKEND.md
touch docs/DEPLOYMENT.md
```

---

## 🎨 Frontend - Estructura Base

### **Tecnologías Recomendadas**
- **Framework**: Vue.js 3 o React
- **Build Tool**: Vite o Webpack
- **Estilos**: CSS Modules, SCSS, o Tailwind CSS
- **Estado**: Pinia (Vue) o Redux/Zustand (React)
- **HTTP Client**: Axios o Fetch API

### **Estructura de Directorios**
```
frontend/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/          # Recursos (imágenes, estilos)
│   │   ├── images/
│   │   └── styles/
│   │       ├── base.css
│   │       ├── components.css
│   │       ├── responsive.css
│   │       └── main.css
│   ├── components/      # Componentes reutilizables
│   ├── views/           # Páginas/Vistas
│   ├── router/          # Configuración de rutas
│   ├── stores/          # Estado global
│   ├── services/        # Servicios API
│   ├── utils/           # Utilidades
│   ├── config/          # Configuraciones
│   ├── App.vue          # Componente raíz
│   └── main.js          # Punto de entrada
├── package.json
├── vite.config.js       # Configuración de Vite
└── .gitignore
```

### **Configuración de Estilos**
```css
/* Estructura modular de CSS */
src/assets/styles/
├── base.css          # Variables CSS, reset, utilidades
├── components.css    # Estilos de componentes
├── responsive.css    # Media queries
└── main.css         # Importa todos los archivos
```

### **Variables CSS Base**
```css
:root {
  /* Colores principales */
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  /* Colores de estado */
  --success-color: #10b981;
  --error-color: #e74c3c;
  --warning-color: #f59e0b;

  /* Espaciado */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 0.75rem;
  --spacing-lg: 1rem;
  --spacing-xl: 1.5rem;
  --spacing-2xl: 2rem;

  /* Transiciones */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### **Configuración de API**
```javascript
// src/config/api.js
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    // Definir endpoints específicos del proyecto
  },
  HEADERS: {
    'Content-Type': 'application/json'
  }
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const config = {
    headers: { ...API_CONFIG.HEADERS, ...options.headers },
    ...options
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return { response, data };
  } catch (error) {
    throw new Error(`Error en petición API: ${error.message}`);
  }
};
```

---

## ⚙️ Backend - Estructura Base

### **Tecnologías Recomendadas**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: SQLite (desarrollo), PostgreSQL (producción)
- **Autenticación**: JWT, bcrypt
- **Validación**: Joi o express-validator
- **Testing**: Jest, Supertest

### **Estructura de Directorios**
```
backend/
├── src/
│   ├── config/          # Configuraciones
│   │   ├── database.js
│   │   ├── security.js
│   │   └── environment.js
│   ├── routes/          # Rutas de la API
│   ├── controllers/     # Controladores
│   ├── models/          # Modelos de datos
│   ├── middleware/      # Middleware personalizado
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades
│   ├── tests/           # Tests
│   │   ├── setup.js
│   │   ├── helpers/
│   │   └── *.test.js
│   └── app.js           # Aplicación Express
├── database/            # Archivos de base de datos
├── scripts/             # Scripts de utilidad
├── package.json
├── jest.config.js
└── .gitignore
```

### **Configuración de Base de Datos**
```javascript
// src/config/database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

class Database {
  constructor() {
    this.db = null;
  }

  async connect() {
    this.db = await open({
      filename: process.env.DB_PATH || './database/app.sqlite',
      driver: sqlite3.Database
    });
    return this.db;
  }

  async query(sql, params = []) {
    return await this.db.run(sql, params);
  }

  async getQuery(sql, params = []) {
    return await this.db.get(sql, params);
  }

  async allQuery(sql, params = []) {
    return await this.db.all(sql, params);
  }
}

export default new Database();
```

### **Configuración de Seguridad**
```javascript
// src/config/security.js
export const SECURITY_CONFIG = {
  bcrypt: {
    saltRounds: 12
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h'
  },
  validation: {
    email: {
      minLength: 3,
      maxLength: 254
    },
    password: {
      minLength: 6,
      maxLength: 128
    }
  },
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }
};
```

### **Estructura de Rutas**
```javascript
// src/routes/index.js
import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router;
```

### **Middleware de Validación**
```javascript
// src/middleware/validation.js
import { SECURITY_CONFIG } from '../config/security.js';

export const validateUserData = (req, res, next) => {
  const { email, password } = req.body;

  // Validaciones específicas del proyecto
  if (!email || email.length < SECURITY_CONFIG.validation.email.minLength) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  if (!password || password.length < SECURITY_CONFIG.validation.password.minLength) {
    return res.status(400).json({ message: 'Contraseña inválida' });
  }

  next();
};
```

---

## 🧪 Testing - Estructura Base

### **Frontend Testing**
```javascript
// Configuración de tests frontend
// vitest.config.js o jest.config.js
export default {
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js']
  }
};
```

### **Backend Testing**
```javascript
// backend/jest.config.js
export default {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/tests/**',
    '!src/app.js'
  ]
};
```

### **Helpers de Testing**
```javascript
// backend/src/tests/helpers/database.js
export class TestDatabase {
  constructor() {
    this.dbPath = './test-database.sqlite';
  }

  async initialize() {
    // Inicializar base de datos de prueba
  }

  async cleanup() {
    // Limpiar datos de prueba
  }

  async destroy() {
    // Eliminar archivo de base de datos
  }
}
```

---

## 📚 Documentación - Estructura Base

### **README.md Principal**
```markdown
# Nombre del Proyecto

## Descripción
Breve descripción del proyecto y sus objetivos.

## Tecnologías
- Frontend: [Framework]
- Backend: [Framework]
- Base de Datos: [DB]

## Instalación
```bash
# Clonar repositorio
git clone [url]

# Instalar dependencias frontend
cd frontend && npm install

# Instalar dependencias backend
cd ../backend && npm install
```

## Desarrollo
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && npm run dev
```

## Testing
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test
```
```

### **Documentación Específica**
- `docs/API.md` - Documentación de endpoints
- `docs/FRONTEND.md` - Guía de desarrollo frontend
- `docs/BACKEND.md` - Guía de desarrollo backend
- `docs/DEPLOYMENT.md` - Guía de despliegue

---

## 🔧 Scripts de Desarrollo

### **Frontend (package.json)**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint src --ext .vue,.js,.ts",
    "format": "prettier --write src/"
  }
}
```

### **Backend (package.json)**
```json
{
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "init-db": "node scripts/init-database.js",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  }
}
```

---

## 🎨 Guías de Estilo

### **CSS Architecture**
- **Base**: Variables CSS, reset, utilidades
- **Components**: Estilos de componentes específicos
- **Responsive**: Media queries y adaptaciones
- **Main**: Archivo principal que importa todo

### **JavaScript/TypeScript**
- **ESLint**: Configuración de linting
- **Prettier**: Formateo de código
- **Husky**: Git hooks para calidad de código

### **Componentes Frontend**
- **Props**: Validación de props
- **Events**: Emisión de eventos
- **State**: Gestión de estado local
- **Lifecycle**: Hooks del ciclo de vida

---

## 🚀 Despliegue

### **Variables de Entorno**
```bash
# Frontend (.env)
VITE_API_URL=https://api.tudominio.com

# Backend (.env)
NODE_ENV=production
PORT=3001
DB_PATH=./database/production.sqlite
JWT_SECRET=tu-secret-super-seguro
FRONTEND_URL=https://tudominio.com
```

### **Docker (Opcional)**
```dockerfile
# Dockerfile para backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

---

## 📋 Checklist de Implementación

### **Estructura Base**
- [ ] Crear estructura de directorios
- [ ] Configurar Git y .gitignore
- [ ] Crear documentación base
- [ ] Configurar scripts de desarrollo

### **Frontend**
- [ ] Inicializar proyecto (Vue/React)
- [ ] Configurar build tool (Vite/Webpack)
- [ ] Establecer estructura de estilos
- [ ] Configurar routing
- [ ] Implementar gestión de estado
- [ ] Configurar comunicación con API

### **Backend**
- [ ] Inicializar proyecto Node.js
- [ ] Configurar Express
- [ ] Establecer conexión a base de datos
- [ ] Implementar autenticación
- [ ] Crear middleware de validación
- [ ] Configurar CORS

### **Testing**
- [ ] Configurar framework de testing
- [ ] Crear tests unitarios
- [ ] Implementar tests de integración
- [ ] Configurar coverage

### **Documentación**
- [ ] README principal
- [ ] Documentación de API
- [ ] Guías de desarrollo
- [ ] Guía de despliegue

---

## 🔄 Mantenimiento

### **Actualizaciones Regulares**
- Dependencias de desarrollo
- Dependencias de producción
- Configuraciones de seguridad
- Documentación

### **Monitoreo**
- Logs de aplicación
- Métricas de rendimiento
- Errores y excepciones
- Uso de recursos

### **Backup**
- Base de datos
- Configuraciones
- Archivos de usuario
- Documentación

---

## 📞 Soporte

### **Recursos Útiles**
- Documentación oficial de frameworks
- Comunidades de desarrolladores
- Herramientas de debugging
- Guías de mejores prácticas

### **Contacto**
- Equipo de desarrollo
- Documentación del proyecto
- Issues y feature requests
- Contribuciones

---

*Esta plantilla proporciona una base sólida para desarrollar proyectos web modernos siguiendo las mejores prácticas y lineamientos establecidos.*