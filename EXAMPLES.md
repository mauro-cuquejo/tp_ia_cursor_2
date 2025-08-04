# 📝 Ejemplos de Implementación

Este archivo contiene ejemplos prácticos de los componentes y archivos más importantes del proyecto.

## 🎨 Frontend - Componentes Vue

### LoginForm.vue

```vue
<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="form-header">
        <h1>Iniciar Sesión</h1>
        <p>Ingresa tus credenciales para continuar</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <!-- Mensaje de error del servidor -->
        <div v-if="serverError" id="errorMessage" :class="['server-message', { 'success': isSuccessMessage, 'error': !isSuccessMessage }]">
          {{ serverError }}
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            @blur="validateEmail"
            @input="clearEmailError"
            :class="['form-input', { 'error': errors.email }]"
            placeholder="tu@email.com"
            required
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            @blur="validatePassword"
            @input="clearPasswordError"
            :class="['form-input', { 'error': errors.password }]"
            placeholder="Tu contraseña"
            required
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <span v-if="isSubmitting">Iniciando sesión...</span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>

      <div class="form-footer">
        <p>¿No tienes una cuenta? <a href="#" @click.prevent="goToRegister">Regístrate aquí</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiRequest, API_CONFIG } from '../config/api.js'

export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: ''
      },
      isSubmitting: false,
      serverError: '',
      isSuccessMessage: false
    }
  },
  methods: {
    validateEmail() {
      const email = this.formData.email.trim()

      if (!email) {
        this.errors.email = 'El email es requerido'
        return false
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        this.errors.email = 'Ingresa un email válido'
        return false
      }

      this.errors.email = ''
      return true
    },

    validatePassword() {
      const password = this.formData.password.trim()

      if (!password) {
        this.errors.password = 'La contraseña es requerida'
        return false
      }

      if (password.length < 6) {
        this.errors.password = 'La contraseña debe tener al menos 6 caracteres'
        return false
      }

      this.errors.password = ''
      return true
    },

    clearEmailError() {
      this.errors.email = ''
      this.serverError = ''
    },

    clearPasswordError() {
      this.errors.password = ''
      this.serverError = ''
    },

    async handleSubmit() {
      if (!this.validateEmail() || !this.validatePassword()) {
        return
      }

      this.isSubmitting = true
      this.serverError = ''

      try {
        const { response, data } = await apiRequest(API_CONFIG.ENDPOINTS.LOGIN, {
          method: 'POST',
          body: JSON.stringify({
            email: this.formData.email,
            password: this.formData.password
          })
        })

        if (response.ok) {
          this.serverError = `¡Inicio de sesión exitoso! Bienvenido ${data.user.email}`
          this.isSuccessMessage = true
          this.formData = { email: '', password: '' }
        } else {
          this.serverError = data.message || 'Error al iniciar sesión'
          this.isSuccessMessage = false
        }
      } catch (error) {
        this.serverError = 'Error de conexión. Verifica que el servidor esté ejecutándose.'
        this.isSuccessMessage = false
      } finally {
        this.isSubmitting = false
      }
    },

    goToRegister() {
      this.$emit('go-to-register')
    }
  }
}
</script>
```

### RegisterForm.vue

```vue
<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="form-header">
        <h1>Crear Cuenta</h1>
        <p>Completa los datos para registrarte</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <!-- Mensaje de error del servidor -->
        <div v-if="serverError" id="errorMessage" :class="['server-message', { 'success': isSuccessMessage, 'error': !isSuccessMessage }]">
          {{ serverError }}
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            @blur="validateEmail"
            @input="clearEmailError"
            :class="['form-input', { 'error': errors.email }]"
            placeholder="tu@email.com"
            required
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            @blur="validatePassword"
            @input="clearPasswordError"
            :class="['form-input', { 'error': errors.password }]"
            placeholder="Tu contraseña"
            required
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            @blur="validateConfirmPassword"
            @input="clearConfirmPasswordError"
            :class="['form-input', { 'error': errors.confirmPassword }]"
            placeholder="Confirma tu contraseña"
            required
          />
          <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting">Creando cuenta...</span>
            <span v-else>Crear Cuenta</span>
          </button>
          <button type="button" class="btn btn-secondary" @click="goToLogin" :disabled="isSubmitting">
            Cancelar
          </button>
        </div>
      </form>

      <div class="form-footer">
        <p>¿Ya tienes una cuenta? <a href="#" @click.prevent="goToLogin">Inicia sesión aquí</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiRequest, API_CONFIG } from '../config/api.js'

export default {
  name: 'RegisterForm',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      isSubmitting: false,
      serverError: '',
      isSuccessMessage: false
    }
  },
  methods: {
    validateEmail() {
      const email = this.formData.email.trim()

      if (!email) {
        this.errors.email = 'El email es requerido'
        return false
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        this.errors.email = 'Ingresa un email válido'
        return false
      }

      this.errors.email = ''
      return true
    },

    validatePassword() {
      const password = this.formData.password.trim()

      if (!password) {
        this.errors.password = 'La contraseña es requerida'
        return false
      }

      if (password.length < 6) {
        this.errors.password = 'La contraseña debe tener al menos 6 caracteres'
        return false
      }

      this.errors.password = ''
      return true
    },

    validateConfirmPassword() {
      const confirmPassword = this.formData.confirmPassword.trim()

      if (!confirmPassword) {
        this.errors.confirmPassword = 'Confirma tu contraseña'
        return false
      }

      if (confirmPassword !== this.formData.password) {
        this.errors.confirmPassword = 'Las contraseñas no coinciden'
        return false
      }

      this.errors.confirmPassword = ''
      return true
    },

    clearEmailError() {
      this.errors.email = ''
      this.serverError = ''
    },

    clearPasswordError() {
      this.errors.password = ''
      this.serverError = ''
      // Revalidar confirmación si hay datos
      if (this.formData.confirmPassword) {
        this.validateConfirmPassword()
      }
    },

    clearConfirmPasswordError() {
      this.errors.confirmPassword = ''
      this.serverError = ''
    },

    async handleSubmit() {
      if (!this.validateEmail() || !this.validatePassword() || !this.validateConfirmPassword()) {
        return
      }

      this.isSubmitting = true
      this.serverError = ''

      try {
        const { response, data } = await apiRequest(API_CONFIG.ENDPOINTS.REGISTER, {
          method: 'POST',
          body: JSON.stringify({
            email: this.formData.email,
            password: this.formData.password
          })
        })

        if (response.ok) {
          this.serverError = '¡Cuenta creada exitosamente! Redirigiendo al login...'
          this.isSuccessMessage = true
          this.formData = { email: '', password: '', confirmPassword: '' }

          // Redirigir al login después de 1 segundo
          setTimeout(() => {
            this.goToLogin()
          }, 1000)
        } else {
          this.serverError = data.message || 'Error al crear la cuenta'
          this.isSuccessMessage = false
        }
      } catch (error) {
        this.serverError = 'Error de conexión. Verifica que el servidor esté ejecutándose.'
        this.isSuccessMessage = false
      } finally {
        this.isSubmitting = false
      }
    },

    goToLogin() {
      this.$emit('go-to-login')
    }
  }
}
</script>
```

## 🔧 Backend - Rutas y Configuración

### database.js

```javascript
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Configuración de la base de datos
const dbPath = process.env.DB_PATH || path.join(__dirname, 'database.sqlite');

// Crear conexión a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err.message);
    } else {
        console.log('✅ Conectado a la base de datos SQLite');
    }
});

// Habilitar foreign keys
db.run('PRAGMA foreign_keys = ON');

// Función para ejecutar consultas con promesas
const runQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, changes: this.changes });
            }
        });
    });
};

// Función para obtener un registro
const getQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Función para obtener múltiples registros
const allQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = {
    db,
    runQuery,
    getQuery,
    allQuery
};
```

### routes/auth.js

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const { runQuery, getQuery } = require('../database');
const securityConfig = require('../config/security');

const router = express.Router();

// Middleware para validar datos de entrada
const validateUserData = (req, res, next) => {
    const { email, password } = req.body;

    console.log('📥 Datos recibidos:', { email, password: password ? '[HIDDEN]' : 'undefined' });

    if (!email || !password) {
        return res.status(400).json({
            error: 'Datos incompletos',
            message: 'Email y password son requeridos'
        });
    }

    // Validar formato de email
    if (!securityConfig.email.pattern.test(email)) {
        return res.status(400).json({
            error: 'Email inválido',
            message: 'Ingresa un email válido'
        });
    }

    // Validar longitud de email
    if (email.length > securityConfig.email.maxLength) {
        return res.status(400).json({
            error: 'Email muy largo',
            message: 'El email es demasiado largo'
        });
    }

    // Validar longitud de password
    if (password.length < securityConfig.bcrypt.minPasswordLength) {
        return res.status(400).json({
            error: 'Password muy corto',
            message: `La contraseña debe tener al menos ${securityConfig.bcrypt.minPasswordLength} caracteres`
        });
    }

    if (password.length > securityConfig.bcrypt.maxPasswordLength) {
        return res.status(400).json({
            error: 'Password muy largo',
            message: 'La contraseña es demasiado larga'
        });
    }

    next();
};

// POST /api/register - Registrar nuevo usuario
router.post('/register', validateUserData, async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('🔄 Procesando registro para:', email);

        // Verificar si el usuario ya existe
        const existingUser = await getQuery('SELECT id FROM users WHERE email = ?', [email]);

        if (existingUser) {
            console.log('❌ Usuario ya existe:', email);
            return res.status(409).json({
                error: 'Usuario ya existe',
                message: 'Ya existe una cuenta con este email'
            });
        }

        // Encriptar password con bcrypt
        console.log('🔒 Encriptando contraseña con bcrypt...');
        const saltRounds = securityConfig.bcrypt.saltRounds;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log('✅ Contraseña encriptada exitosamente');

        // Insertar nuevo usuario con contraseña encriptada
        const result = await runQuery(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        console.log('✅ Usuario registrado exitosamente:', {
            email,
            userId: result.id,
            passwordHashed: true,
            saltRounds: saltRounds
        });

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            userId: result.id
        });

    } catch (error) {
        console.error('❌ Error en registro:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Error al registrar usuario'
        });
    }
});

// POST /api/login - Autenticar usuario
router.post('/login', validateUserData, async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('🔐 Procesando login para:', email);

        // Buscar usuario por email
        const user = await getQuery('SELECT id, email, password FROM users WHERE email = ?', [email]);

        if (!user) {
            console.log('❌ Usuario no encontrado:', email);
            return res.status(401).json({
                error: 'Credenciales inválidas',
                message: 'Email o contraseña incorrectos'
            });
        }

        // Verificar password encriptado con bcrypt
        console.log('🔍 Verificando contraseña encriptada...');
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('❌ Password incorrecto para:', email);
            return res.status(401).json({
                error: 'Credenciales inválidas',
                message: 'Email o contraseña incorrectos'
            });
        }

        console.log('✅ Contraseña verificada exitosamente');
        console.log('✅ Login exitoso para:', email);

        res.json({
            success: true,
            message: 'Login exitoso',
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        console.error('❌ Error en login:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'Error al autenticar usuario'
        });
    }
});

module.exports = router;
```

### config/security.js

```javascript
module.exports = {
    bcrypt: {
        saltRounds: 12,
        minPasswordLength: 6,
        maxPasswordLength: 128
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        maxLength: 254
    },
    cors: {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
        credentials: true
    }
};
```

## 🧪 Tests - Ejemplos de Tests

### auth.test.js (Simplificado)

```javascript
const request = require('supertest');
const TestDatabase = require('./helpers/database');
const app = require('../server');

const testDb = new TestDatabase();

const testUser = {
    email: 'test@example.com',
    password: 'password123'
};

describe('🔐 Endpoints de Autenticación', () => {
    beforeAll(async () => {
        await testDb.init();
    });

    afterEach(async () => {
        await testDb.clean();
    });

    afterAll(async () => {
        await testDb.destroy();
    });

    describe('POST /api/register', () => {
        test('debe registrar un nuevo usuario exitosamente', async () => {
            const response = await request(app)
                .post('/api/register')
                .send(testUser)
                .expect(201);

            expect(response.body).toMatchObject({
                success: true,
                message: 'Usuario registrado exitosamente'
            });

            expect(response.body).toHaveProperty('userId');
            expect(typeof response.body.userId).toBe('number');
        });

        test('debe rechazar registro con email inválido', async () => {
            const response = await request(app)
                .post('/api/register')
                .send({
                    email: 'invalid-email',
                    password: 'password123'
                })
                .expect(400);

            expect(response.body).toMatchObject({
                error: 'Email inválido',
                message: 'Ingresa un email válido'
            });
        });
    });

    describe('POST /api/login', () => {
        beforeEach(async () => {
            await testDb.createTestUser(testUser.email, testUser.password);
        });

        test('debe hacer login exitoso con credenciales correctas', async () => {
            const response = await request(app)
                .post('/api/login')
                .send(testUser)
                .expect(200);

            expect(response.body).toMatchObject({
                success: true,
                message: 'Login exitoso'
            });

            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toMatchObject({
                id: expect.any(Number),
                email: testUser.email
            });
        });

        test('debe rechazar login con usuario inexistente', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'wrongpassword'
                })
                .expect(401);

            expect(response.body).toMatchObject({
                error: 'Credenciales inválidas',
                message: 'Email o contraseña incorrectos'
            });
        });
    });
});
```

## 🎨 CSS - Ejemplos de Estilos

### Variables CSS Base

```css
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

    /* Colores de fondo */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-error: #fdf2f2;
    --bg-success: #f0f9ff;

    /* Espaciado */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 0.75rem;
    --spacing-lg: 1rem;
    --spacing-xl: 1.5rem;
    --spacing-2xl: 2rem;

    /* Bordes redondeados */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;

    /* Sombras */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 8px 32px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 4px 12px rgba(102, 126, 234, 0.4);

    /* Transiciones */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

### Estilos de Componentes

```css
/* Formulario */
.form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

/* Grupo de campos */
.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.form-group label {
    color: var(--text-primary);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-sm);
}

/* Campos de entrada */
.form-input {
    padding: var(--spacing-md);
    border: 2px solid var(--border-primary);
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-base);
    transition: border-color var(--transition-normal);
    background: var(--bg-secondary);
}

.form-input:focus {
    outline: none;
    border-color: var(--border-focus);
    background: var(--bg-primary);
}

.form-input.error {
    border-color: var(--border-error);
    background: var(--bg-error);
}

/* Botones */
.btn {
    border: none;
    padding: var(--spacing-md);
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: all var(--transition-normal);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
}

.btn-primary {
    background: var(--primary-gradient);
    color: var(--bg-primary);
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.btn-secondary {
    background: transparent;
    color: var(--text-secondary);
    border: 2px solid var(--border-primary);
}

.btn-secondary:hover:not(:disabled) {
    background: var(--bg-secondary);
    border-color: var(--border-focus);
    color: var(--primary-color);
    transform: translateY(-2px);
}
```

## 📋 Comandos de Ejemplo

### Desarrollo

```bash
# Iniciar frontend
cd frontend
npm run dev

# Iniciar backend
cd backend
npm run dev

# Inicializar base de datos
cd backend
npm run init-db
```

### Testing

```bash
# Ejecutar tests
cd backend
npm test

# Tests con cobertura
npm run test:coverage

# Tests específicos
npm test -- --testNamePattern="login"
```

### Build

```bash
# Build frontend
cd frontend
npm run build

# Iniciar backend en producción
cd backend
npm start
```

Estos ejemplos proporcionan una base sólida para implementar la funcionalidad completa del proyecto. Pueden ser adaptados y extendidos según las necesidades específicas.