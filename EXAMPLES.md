# 📝 Ejemplos de Código - Plantilla de Proyecto

Este documento proporciona ejemplos concretos de código para implementar la estructura base definida en `PROJECT_TEMPLATE.md`.

## 🎨 Frontend - Ejemplos de Implementación

### **1. Configuración de Vite (Vue.js)**

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
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### **2. Configuración de Estilos Base**

**`frontend/src/assets/styles/base.css`**
```css
/* Variables CSS para colores y configuración */
:root {
  /* Colores principales */
  --primary-color: #667eea;
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-color: #764ba2;

  /* Colores de estado */
  --success-color: #10b981;
  --error-color: #e74c3c;
  --warning-color: #f59e0b;

  /* Colores de texto */
  --text-primary: #333;
  --text-secondary: #666;
  --text-light: #999;

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

/* Reset básico */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
}

/* Animaciones base */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### **3. Configuración de API**

**`frontend/src/config/api.js`**
```javascript
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    // Definir endpoints específicos del proyecto
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout'
    },
    USERS: {
      PROFILE: '/api/users/profile',
      UPDATE: '/api/users/update'
    }
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

// Helper para requests con autenticación
export const authenticatedRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    ...options.headers,
    'Authorization': token ? `Bearer ${token}` : ''
  };

  return apiRequest(endpoint, { ...options, headers });
};
```

### **4. Componente Base Vue**

**`frontend/src/components/BaseForm.vue`**
```vue
<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form-header">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>

    <!-- Mensaje del servidor -->
    <div v-if="serverMessage"
         :class="['server-message', { 'success': isSuccess, 'error': !isSuccess }]">
      {{ serverMessage }}
    </div>

    <!-- Campos del formulario -->
    <slot name="fields"></slot>

    <!-- Botones -->
    <div class="button-group">
      <button type="submit"
              class="btn btn-primary"
              :disabled="isSubmitting">
        <span v-if="isSubmitting">{{ loadingText }}</span>
        <span v-else>{{ submitText }}</span>
      </button>

      <slot name="secondary-button"></slot>
    </div>

    <!-- Footer -->
    <div class="form-footer">
      <slot name="footer"></slot>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    submitText: {
      type: String,
      default: 'Enviar'
    },
    loadingText: {
      type: String,
      default: 'Enviando...'
    },
    isSubmitting: {
      type: Boolean,
      default: false
    },
    serverMessage: {
      type: String,
      default: ''
    },
    isSuccess: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit'],
  methods: {
    handleSubmit() {
      this.$emit('submit');
    }
  }
}
</script>
```

### **5. Store de Estado (Pinia)**

**`frontend/src/stores/auth.js`**
```javascript
import { defineStore } from 'pinia';
import { apiRequest, API_CONFIG } from '@/config/api.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const { response, data } = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
          method: 'POST',
          body: JSON.stringify(credentials)
        });

        if (response.ok) {
          this.user = data.user;
          this.token = data.token;
          this.isAuthenticated = true;
          localStorage.setItem('authToken', data.token);
          return { success: true, data };
        } else {
          this.error = data.message;
          return { success: false, error: data.message };
        }
      } catch (error) {
        this.error = 'Error de conexión';
        return { success: false, error: 'Error de conexión' };
      } finally {
        this.loading = false;
      }
    },

    async register(userData) {
      this.loading = true;
      this.error = null;

      try {
        const { response, data } = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
          method: 'POST',
          body: JSON.stringify(userData)
        });

        if (response.ok) {
          return { success: true, data };
        } else {
          this.error = data.message;
          return { success: false, error: data.message };
        }
      } catch (error) {
        this.error = 'Error de conexión';
        return { success: false, error: 'Error de conexión' };
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
      localStorage.removeItem('authToken');
    },

    clearError() {
      this.error = null;
    }
  }
});
```

---

## ⚙️ Backend - Ejemplos de Implementación

### **1. Configuración de Express**

**`backend/src/app.js`**
```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();

// Middleware de seguridad
app.use(helmet());

// Middleware de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Middleware de logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Middleware de manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
```

### **2. Configuración de Base de Datos**

**`backend/src/config/database.js`**
```javascript
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

class Database {
  constructor() {
    this.db = null;
    this.dbPath = process.env.DB_PATH || './database/app.sqlite';
  }

  async connect() {
    try {
      this.db = await open({
        filename: this.dbPath,
        driver: sqlite3.Database
      });

      console.log('✅ Base de datos conectada');
      return this.db;
    } catch (error) {
      console.error('❌ Error conectando a la base de datos:', error);
      throw error;
    }
  }

  async query(sql, params = []) {
    try {
      return await this.db.run(sql, params);
    } catch (error) {
      console.error('❌ Error en query:', error);
      throw error;
    }
  }

  async getQuery(sql, params = []) {
    try {
      return await this.db.get(sql, params);
    } catch (error) {
      console.error('❌ Error en getQuery:', error);
      throw error;
    }
  }

  async allQuery(sql, params = []) {
    try {
      return await this.db.all(sql, params);
    } catch (error) {
      console.error('❌ Error en allQuery:', error);
      throw error;
    }
  }

  async close() {
    if (this.db) {
      await this.db.close();
      console.log('🔒 Base de datos cerrada');
    }
  }
}

export default new Database();
```

### **3. Middleware de Autenticación**

**`backend/src/middleware/auth.js`**
```javascript
import jwt from 'jsonwebtoken';
import { SECURITY_CONFIG } from '../config/security.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Token de acceso requerido'
    });
  }

  try {
    const decoded = jwt.verify(token, SECURITY_CONFIG.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Token inválido o expirado'
    });
  }
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, SECURITY_CONFIG.jwt.secret);
      req.user = decoded;
    } catch (error) {
      // Token inválido, pero continuamos sin autenticación
    }
  }

  next();
};
```

### **4. Controlador de Usuarios**

**`backend/src/controllers/userController.js`**
```javascript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import database from '../config/database.js';
import { SECURITY_CONFIG } from '../config/security.js';

export const userController = {
  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await database.getQuery(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingUser) {
        return res.status(409).json({
          message: 'El usuario ya existe'
        });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(
        password,
        SECURITY_CONFIG.bcrypt.saltRounds
      );

      // Crear usuario
      const result = await database.query(
        'INSERT INTO users (email, password, name, created_at) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, name, new Date().toISOString()]
      );

      console.log('✅ Usuario registrado:', { email, userId: result.lastID });

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        userId: result.lastID
      });
    } catch (error) {
      console.error('❌ Error en registro:', error);
      res.status(500).json({
        message: 'Error interno del servidor'
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar usuario
      const user = await database.getQuery(
        'SELECT id, email, password, name FROM users WHERE email = ?',
        [email]
      );

      if (!user) {
        return res.status(401).json({
          message: 'Credenciales inválidas'
        });
      }

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({
          message: 'Credenciales inválidas'
        });
      }

      // Generar token JWT
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email
        },
        SECURITY_CONFIG.jwt.secret,
        { expiresIn: SECURITY_CONFIG.jwt.expiresIn }
      );

      console.log('✅ Login exitoso:', { email: user.email });

      res.json({
        message: 'Login exitoso',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      });
    } catch (error) {
      console.error('❌ Error en login:', error);
      res.status(500).json({
        message: 'Error interno del servidor'
      });
    }
  },

  async getProfile(req, res) {
    try {
      const userId = req.user.userId;

      const user = await database.getQuery(
        'SELECT id, email, name, created_at FROM users WHERE id = ?',
        [userId]
      );

      if (!user) {
        return res.status(404).json({
          message: 'Usuario no encontrado'
        });
      }

      res.json({
        user
      });
    } catch (error) {
      console.error('❌ Error obteniendo perfil:', error);
      res.status(500).json({
        message: 'Error interno del servidor'
      });
    }
  }
};
```

### **5. Rutas de API**

**`backend/src/routes/auth.js`**
```javascript
import express from 'express';
import { userController } from '../controllers/userController.js';
import { validateUserData } from '../middleware/validation.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', validateUserData, userController.register);

// POST /api/auth/login
router.post('/login', validateUserData, userController.login);

export default router;
```

**`backend/src/routes/users.js`**
```javascript
import express from 'express';
import { userController } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/users/profile
router.get('/profile', authenticateToken, userController.getProfile);

export default router;
```

---

## 🧪 Testing - Ejemplos de Implementación

### **1. Test de Endpoint de Autenticación**

**`backend/src/tests/auth.test.js`**
```javascript
import request from 'supertest';
import app from '../app.js';
import { TestDatabase } from './helpers/database.js';

const testDb = new TestDatabase();

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await testDb.initialize();
  });

  afterEach(async () => {
    await testDb.cleanup();
  });

  afterAll(async () => {
    await testDb.destroy();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Usuario creado exitosamente');
      expect(response.body).toHaveProperty('userId');
      expect(typeof response.body.userId).toBe('number');
    });

    it('should return error for duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      // Registrar usuario por primera vez
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Intentar registrar el mismo email
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body).toHaveProperty('message', 'El usuario ya existe');
    });

    it('should return error for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Crear usuario de prueba
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData);
    });

    it('should login successfully with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Login exitoso');
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should return error for invalid password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Credenciales inválidas');
    });

    it('should return error for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Credenciales inválidas');
    });
  });
});
```

### **2. Helper de Base de Datos para Tests**

**`backend/src/tests/helpers/database.js`**
```javascript
import fs from 'fs';
import path from 'path';
import database from '../../config/database.js';

export class TestDatabase {
  constructor() {
    this.dbPath = './test-database.sqlite';
    this.originalDbPath = process.env.DB_PATH;
  }

  async initialize() {
    // Configurar base de datos de prueba
    process.env.DB_PATH = this.dbPath;

    // Conectar a la base de datos de prueba
    await database.connect();

    // Crear tablas de prueba
    await this.createTables();
  }

  async createTables() {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await database.query(createUsersTable);
  }

  async cleanup() {
    // Limpiar datos de prueba
    await database.query('DELETE FROM users');
  }

  async destroy() {
    // Cerrar conexión
    await database.close();

    // Restaurar configuración original
    process.env.DB_PATH = this.originalDbPath;

    // Eliminar archivo de base de datos de prueba
    if (fs.existsSync(this.dbPath)) {
      fs.unlinkSync(this.dbPath);
    }
  }

  async createTestUser(userData = {}) {
    const defaultUser = {
      email: 'test@example.com',
      password: 'hashedpassword',
      name: 'Test User',
      ...userData
    };

    const result = await database.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [defaultUser.email, defaultUser.password, defaultUser.name]
    );

    return {
      id: result.lastID,
      ...defaultUser
    };
  }

  async getUserByEmail(email) {
    return await database.getQuery(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
  }
}
```

---

## 📚 Documentación - Ejemplos de Implementación

### **1. README Principal**

**`README.md`**
```markdown
# Nombre del Proyecto

## Descripción
Breve descripción del proyecto y sus objetivos principales.

## Tecnologías
- **Frontend**: Vue.js 3 + Vite
- **Backend**: Node.js + Express
- **Base de Datos**: SQLite (desarrollo) / PostgreSQL (producción)
- **Testing**: Jest + Supertest
- **Estilos**: CSS Variables + Modular CSS

## Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Pasos de Instalación
```bash
# Clonar repositorio
git clone [url-del-repositorio]
cd [nombre-del-proyecto]

# Instalar dependencias frontend
cd frontend
npm install

# Instalar dependencias backend
cd ../backend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones
```

## Desarrollo

### Frontend
```bash
cd frontend
npm run dev
```
El frontend estará disponible en: http://localhost:3000

### Backend
```bash
cd backend
npm run dev
```
El backend estará disponible en: http://localhost:3001

### Base de Datos
```bash
cd backend
npm run init-db
```

## Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

### Tests con Coverage
```bash
cd backend
npm run test:coverage
```

## Scripts Disponibles

### Frontend
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm test` - Ejecutar tests

### Backend
- `npm run dev` - Servidor de desarrollo con nodemon
- `npm start` - Servidor de producción
- `npm test` - Ejecutar tests
- `npm run test:watch` - Tests en modo watch
- `npm run test:coverage` - Tests con cobertura
- `npm run init-db` - Inicializar base de datos

## Estructura del Proyecto

```
proyecto/
├── frontend/           # Aplicación Vue.js
├── backend/            # API Node.js/Express
├── docs/              # Documentación
└── README.md          # Este archivo
```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/users/profile` - Obtener perfil (requiere autenticación)

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## Contacto

- Email: tu-email@ejemplo.com
- Proyecto: [https://github.com/usuario/proyecto](https://github.com/usuario/proyecto)
```

---

## 🔧 Scripts de Utilidad

### **1. Script de Inicialización de Base de Datos**

**`backend/scripts/init-database.js`**
```javascript
import database from '../src/config/database.js';

const createTables = async () => {
  try {
    console.log('🔄 Inicializando base de datos...');

    // Conectar a la base de datos
    await database.connect();

    // Crear tabla de usuarios
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await database.query(createUsersTable);
    console.log('✅ Tabla users creada');

    // Crear índices
    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
    `;

    await database.query(createIndexes);
    console.log('✅ Índices creados');

    console.log('🎉 Base de datos inicializada correctamente');

  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    process.exit(1);
  } finally {
    await database.close();
  }
};

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  createTables();
}

export default createTables;
```

### **2. Script de Migración**

**`backend/scripts/migrate.js`**
```javascript
import database from '../src/config/database.js';

const migrations = [
  {
    version: 1,
    description: 'Crear tabla de usuarios',
    up: `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
  },
  {
    version: 2,
    description: 'Agregar campo updated_at',
    up: `
      ALTER TABLE users ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    `
  }
];

const createMigrationsTable = async () => {
  const createTable = `
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version INTEGER UNIQUE NOT NULL,
      description TEXT,
      executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await database.query(createTable);
};

const getExecutedMigrations = async () => {
  const migrations = await database.allQuery(
    'SELECT version FROM migrations ORDER BY version'
  );
  return migrations.map(m => m.version);
};

const executeMigration = async (migration) => {
  console.log(`🔄 Ejecutando migración ${migration.version}: ${migration.description}`);

  await database.query(migration.up);

  await database.query(
    'INSERT INTO migrations (version, description) VALUES (?, ?)',
    [migration.version, migration.description]
  );

  console.log(`✅ Migración ${migration.version} completada`);
};

const migrate = async () => {
  try {
    console.log('🔄 Iniciando migraciones...');

    await database.connect();
    await createMigrationsTable();

    const executedMigrations = await getExecutedMigrations();

    for (const migration of migrations) {
      if (!executedMigrations.includes(migration.version)) {
        await executeMigration(migration);
      } else {
        console.log(`⏭️  Migración ${migration.version} ya ejecutada`);
      }
    }

    console.log('🎉 Todas las migraciones completadas');

  } catch (error) {
    console.error('❌ Error en migraciones:', error);
    process.exit(1);
  } finally {
    await database.close();
  }
};

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  migrate();
}

export default migrate;
```

---

*Estos ejemplos proporcionan una base sólida para implementar la estructura definida en `PROJECT_TEMPLATE.md`. Pueden ser adaptados y extendidos según las necesidades específicas de cada proyecto.*