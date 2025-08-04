# Tests de Autenticación

Esta carpeta contiene los tests automatizados para los endpoints de autenticación usando Jest y Supertest.

## 📁 Estructura de Archivos

```
tests/
├── setup.js              # Configuración global de tests
├── auth.test.js          # Tests para endpoints de autenticación
├── helpers/
│   └── database.js       # Helper para base de datos de test
└── README.md             # Esta documentación
```

## 🚀 Ejecutar Tests

### Comandos Disponibles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch (desarrollo)
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests con logs verbosos
VERBOSE_TESTS=true npm test
```

### Configuración

Los tests están configurados para:
- **Base de datos**: Usar una base de datos SQLite separada para tests
- **Puerto**: Usar puerto 3002 para evitar conflictos
- **Logging**: Silenciar logs por defecto (configurable con `VERBOSE_TESTS=true`)
- **Timeout**: 10 segundos por test

## 🧪 Casos de Prueba Cubiertos

### POST /api/register

#### ✅ Casos Exitosos
- [x] Registro exitoso de nuevo usuario
- [x] Encriptación correcta de contraseña con bcrypt
- [x] Validación de formato de hash bcrypt

#### ❌ Casos de Error
- [x] Email inválido (formato incorrecto)
- [x] Email muy largo (> 254 caracteres)
- [x] Contraseña muy corta (< 6 caracteres)
- [x] Contraseña muy larga (> 128 caracteres)
- [x] Datos incompletos (email o password faltante)
- [x] Usuario ya existente (email duplicado)

### POST /api/login

#### ✅ Casos Exitosos
- [x] Login exitoso con credenciales correctas
- [x] Respuesta con datos de usuario correctos

#### ❌ Casos de Error
- [x] Usuario inexistente
- [x] Contraseña incorrecta
- [x] Email inválido
- [x] Email muy largo
- [x] Contraseña muy corta
- [x] Contraseña muy larga
- [x] Datos incompletos

### 🔒 Tests de Seguridad
- [x] Validación de encriptación bcrypt
- [x] Validación de salt rounds correctos
- [x] Validación de formato de email según RFC 5321
- [x] Validación de emails válidos e inválidos

### 📊 Tests de Rendimiento
- [x] Múltiples registros concurrentes
- [x] Manejo de concurrencia

## 🛠️ Herramientas Utilizadas

### Jest
- **Framework de testing**: Jest para ejecutar tests
- **Assertions**: Expect para validaciones
- **Mocks**: Funciones mock integradas
- **Coverage**: Reportes de cobertura automáticos

### Supertest
- **HTTP testing**: Supertest para probar endpoints HTTP
- **Request/Response**: Simulación de requests HTTP
- **Status codes**: Validación de códigos de estado
- **Body validation**: Validación de respuestas JSON

### SQLite (Test Database)
- **Base de datos de test**: SQLite separada para tests
- **Aislamiento**: Cada test usa una base de datos limpia
- **Helper functions**: Funciones helper para manipular datos de test

## 📊 Cobertura de Tests

Los tests cubren:

- **Endpoints**: 100% de los endpoints de autenticación
- **Validaciones**: 100% de las validaciones de entrada
- **Casos de error**: Todos los casos de error posibles
- **Seguridad**: Validaciones de encriptación y formato
- **Rendimiento**: Tests de concurrencia básicos

## 🔧 Configuración de Entorno

### Variables de Entorno para Tests

```bash
NODE_ENV=test              # Modo test
DB_PATH=./test-database.sqlite  # Base de datos de test
PORT=3002                  # Puerto para tests
VERBOSE_TESTS=true         # Logs verbosos (opcional)
```

### Archivos de Configuración

- **jest.config.js**: Configuración de Jest
- **tests/setup.js**: Setup global de tests
- **tests/helpers/database.js**: Helper para base de datos

## 📋 Mejores Prácticas Implementadas

### 1. Aislamiento de Tests
- Cada test usa una base de datos limpia
- No hay dependencias entre tests
- Setup y teardown apropiados

### 2. Datos de Prueba
- Datos de prueba consistentes
- Usuarios de prueba reutilizables
- Validación de datos después de operaciones

### 3. Validaciones Completas
- Status codes HTTP correctos
- Estructura de respuesta JSON
- Mensajes de error específicos
- Validación de datos en base de datos

### 4. Seguridad
- Validación de encriptación bcrypt
- Verificación de salt rounds
- Validación de formato de email
- Tests de casos edge

### 5. Rendimiento
- Tests de concurrencia
- Timeouts apropiados
- Limpieza de recursos

## 🚨 Troubleshooting

### Problemas Comunes

#### 1. Base de Datos Bloqueada
```bash
# Eliminar base de datos de test manualmente
rm test-database.sqlite
```

#### 2. Tests Fracasan por Timeout
```bash
# Aumentar timeout en jest.config.js
testTimeout: 15000
```

#### 3. Logs Muy Verbosos
```bash
# Ejecutar sin logs verbosos
npm test
```

#### 4. Puerto en Uso
```bash
# Cambiar puerto en tests/setup.js
process.env.PORT = 3003;
```

### Debugging

#### Ejecutar Test Específico
```bash
# Ejecutar solo tests de login
npm test -- --testNamePattern="login"

# Ejecutar test específico
npm test -- --testNamePattern="debe hacer login exitoso"
```

#### Modo Debug
```bash
# Ejecutar con logs verbosos
VERBOSE_TESTS=true npm test

# Ejecutar en modo watch
npm run test:watch
```

## 📈 Próximos Pasos

### Mejoras Sugeridas

1. **Tests de Integración**
   - Tests con base de datos real
   - Tests de carga
   - Tests de stress

2. **Tests de API**
   - Tests de rate limiting
   - Tests de CORS
   - Tests de headers

3. **Tests de Seguridad**
   - Tests de inyección SQL
   - Tests de XSS
   - Tests de CSRF

4. **Tests de Rendimiento**
   - Benchmarks de endpoints
   - Tests de memoria
   - Tests de concurrencia avanzados

## 📚 Recursos

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Express Testing](https://expressjs.com/en/advanced/best-practices-performance.html#use-gzip-compression)