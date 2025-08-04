# Backend - API de Autenticación

API REST para autenticación de usuarios construida con Node.js, Express y SQLite.

## Características

- ✅ Registro de usuarios con encriptación de contraseñas (bcrypt)
- ✅ Login de usuarios con validación de credenciales
- ✅ Base de datos SQLite para almacenamiento persistente
- ✅ Validaciones de datos del lado del servidor
- ✅ Logging detallado de operaciones
- ✅ CORS habilitado para integración con frontend
- ✅ Manejo de errores robusto
- ✅ Configuración centralizada de seguridad
- ✅ Validaciones de longitud y formato mejoradas

## Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **SQLite3** - Base de datos ligera
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Cross-Origin Resource Sharing

## Instalación

1. Navega al directorio del proyecto:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicializa la base de datos:
```bash
npm run init-db
```

## Ejecución

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3001`

## Endpoints

### POST /api/register
Registra un nuevo usuario.

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "userId": 1
}
```

**Respuesta de error (409):**
```json
{
  "error": "Usuario ya existe",
  "message": "Ya existe una cuenta con este email"
}
```

### POST /api/login
Autentica un usuario existente.

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com"
  }
}
```

**Respuesta de error (401):**
```json
{
  "error": "Credenciales inválidas",
  "message": "Email o contraseña incorrectos"
}
```

### GET /health
Verifica el estado del servidor.

**Respuesta:**
```json
{
  "status": "OK",
  "message": "Servidor funcionando correctamente",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Validaciones

### Email
- Campo requerido
- Formato válido de email (regex RFC 5321)
- Longitud máxima de 254 caracteres
- Debe ser único en la base de datos

### Password
- Campo requerido
- Mínimo 6 caracteres, máximo 128 caracteres
- Se encripta con bcrypt (salt rounds: 12)
- Verificación segura en login

## Estructura del Proyecto

```
backend/
├── server.js              # Servidor principal
├── database.js            # Configuración de base de datos
├── init-database.js       # Script de inicialización
├── config/
│   └── security.js       # Configuración de seguridad
├── routes/
│   └── auth.js           # Rutas de autenticación
├── package.json           # Dependencias y scripts
├── .gitignore            # Archivos ignorados por Git
└── README.md             # Este archivo
```

## Seguridad

### Encriptación de Contraseñas
- **Algoritmo**: bcrypt
- **Salt Rounds**: 12 (configurable)
- **Función**: `bcrypt.hash()` para encriptar, `bcrypt.compare()` para verificar
- **Ventajas**: Salt automático, resistente a ataques de fuerza bruta

### Validaciones de Seguridad
- **Email**: Formato RFC 5321, longitud máxima 254 caracteres
- **Password**: Longitud 6-128 caracteres
- **SQL Injection**: Prevenido con consultas parametrizadas
- **CORS**: Configurado para permitir solo el frontend autorizado

### Configuración Centralizada
Todas las configuraciones de seguridad están centralizadas en `config/security.js`:
- Salt rounds para bcrypt
- Límites de longitud para campos
- Patrones de validación
- Configuración de CORS

## Base de Datos

### Tabla: users
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | Clave primaria autoincremental |
| email | TEXT | Email único del usuario |
| password | TEXT | Contraseña encriptada con bcrypt |
| created_at | DATETIME | Fecha de creación |
| updated_at | DATETIME | Fecha de última actualización |

## Logging

El servidor registra todas las operaciones importantes:

- 📥 Datos recibidos en cada request
- 🔄 Procesamiento de registro
- 🔒 Encriptación de contraseñas con bcrypt
- 🔍 Verificación de contraseñas encriptadas
- 🔐 Procesamiento de login
- ✅ Operaciones exitosas
- ❌ Errores y validaciones fallidas

## Scripts Disponibles

- `npm start` - Ejecuta el servidor en modo producción
- `npm run dev` - Ejecuta el servidor en modo desarrollo con nodemon
- `npm run init-db` - Inicializa la base de datos SQLite

## Integración con Frontend

El backend está configurado para trabajar con el frontend Vue.js:

- **CORS habilitado** para requests desde `http://localhost:3000`
- **Endpoints compatibles** con los formularios del frontend
- **Respuestas JSON** estructuradas para fácil integración

## Próximos Pasos

Para mejorar la aplicación:
1. Implementar JWT para autenticación persistente
2. Agregar validación de tokens en rutas protegidas
3. Implementar refresh tokens
4. Agregar rate limiting
5. Implementar logging a archivo
6. Agregar tests unitarios y de integración

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request