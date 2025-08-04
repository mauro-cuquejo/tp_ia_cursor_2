# 📋 Colección de Postman - Backend API

## 🚀 Descripción

Esta colección de Postman incluye todos los endpoints del sistema de autenticación backend, junto con casos de prueba para validar el funcionamiento correcto de la API.

## 📁 Archivos

- `postman_collection.json` - Colección completa de endpoints
- `README_POSTMAN.md` - Este archivo de instrucciones

## 🔧 Configuración

### 1. Importar la Colección

1. Abrir Postman
2. Hacer clic en "Import"
3. Seleccionar el archivo `postman_collection.json`
4. La colección se importará automáticamente

### 2. Configurar Variables

La colección incluye una variable de entorno:

- **`base_url`**: URL base del servidor (por defecto: `http://localhost:3001`)

Para cambiar la URL base:
1. Hacer clic en el ícono de engranaje (⚙️) en la esquina superior derecha
2. Seleccionar "Variables"
3. Modificar el valor de `base_url` según tu configuración

## 📊 Endpoints Incluidos

### 🔍 Health Check
- **GET** `/health` - Verificar el estado del servidor

### 🔐 Autenticación
- **POST** `/api/register` - Registrar nuevo usuario
- **POST** `/api/login` - Iniciar sesión

## 🧪 Casos de Prueba

### Casos de Prueba - Registro
1. **Registro Exitoso** - Registrar usuario nuevo (201)
2. **Email Inválido** - Email con formato incorrecto (400)
3. **Contraseña Muy Corta** - Contraseña menor a 6 caracteres (400)
4. **Usuario Ya Existe** - Intentar registrar usuario existente (409)
5. **Datos Faltantes** - Enviar datos incompletos (400)

### Casos de Prueba - Login
1. **Login Exitoso** - Credenciales correctas (200)
2. **Usuario No Existe** - Email no registrado (401)
3. **Contraseña Incorrecta** - Contraseña errónea (401)
4. **Email Inválido** - Email con formato incorrecto (400)
5. **Datos Faltantes** - Enviar datos incompletos (400)

### Casos de Prueba - Endpoints No Existentes
1. **Endpoint No Encontrado** - Acceder a ruta inexistente (404)

## 📝 Estructura de Datos

### Registro de Usuario
```json
{
  "email": "usuario@example.com",
  "password": "password123"
}
```

### Respuesta de Registro Exitoso
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "userId": 1
}
```

### Respuesta de Login Exitoso
```json
{
  "success": true,
  "message": "Login exitoso",
  "user": {
    "id": 1,
    "email": "usuario@example.com"
  }
}
```

### Respuesta de Error
```json
{
  "error": "Tipo de error",
  "message": "Descripción del error"
}
```

## 🚀 Cómo Usar

### 1. Iniciar el Servidor Backend
```bash
cd backend
npm run dev
```

### 2. Verificar el Servidor
1. Ejecutar el request "Health Check"
2. Debería devolver status 200 y confirmar que el servidor está funcionando

### 3. Probar Endpoints de Autenticación
1. **Registrar un usuario** usando "Registrar Usuario"
2. **Iniciar sesión** usando "Iniciar Sesión" con las mismas credenciales

### 4. Ejecutar Casos de Prueba
1. Ejecutar cada caso de prueba en las carpetas correspondientes
2. Verificar que los códigos de estado sean los esperados
3. Revisar las respuestas para confirmar el comportamiento correcto

## 🔍 Validaciones Incluidas

### Validaciones de Email
- Formato válido de email
- Longitud máxima de 254 caracteres
- Campo requerido

### Validaciones de Contraseña
- Longitud mínima de 6 caracteres
- Longitud máxima de 128 caracteres
- Campo requerido

### Validaciones de Negocio
- Usuario único por email
- Verificación de credenciales en login
- Manejo de errores de base de datos

## 📊 Códigos de Estado HTTP

- **200** - OK (Login exitoso, Health check)
- **201** - Created (Registro exitoso)
- **400** - Bad Request (Datos inválidos)
- **401** - Unauthorized (Credenciales incorrectas)
- **404** - Not Found (Endpoint no existe)
- **409** - Conflict (Usuario ya existe)
- **500** - Internal Server Error (Error del servidor)

## 🛠️ Scripts de Postman

La colección incluye scripts automáticos que se ejecutan:

### Pre-request Script
- Registra información del request en la consola

### Test Script
- Verifica que el status code sea 200
- Valida que el tiempo de respuesta sea menor a 2 segundos
- Confirma que la respuesta incluya headers JSON

## 🔧 Personalización

### Agregar Nuevos Endpoints
1. Crear nuevo request en Postman
2. Configurar método, URL y headers
3. Agregar body si es necesario
4. Guardar en la colección

### Modificar Variables
1. Ir a Variables de la colección
2. Agregar nuevas variables según necesidad
3. Usar `{{variable_name}}` en URLs y headers

### Agregar Tests Personalizados
1. En la pestaña "Tests" del request
2. Escribir scripts de validación personalizados
3. Usar la API de Postman para validaciones específicas

## 📚 Recursos Adicionales

- [Documentación de Postman](https://learning.postman.com/)
- [API de Postman para Tests](https://learning.postman.com/docs/writing-scripts/script-references/test-examples/)
- [Variables de Postman](https://learning.postman.com/docs/sending-requests/variables/)

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de Conexión**
   - Verificar que el servidor esté ejecutándose
   - Confirmar que el puerto 3001 esté disponible
   - Revisar la variable `base_url`

2. **Errores de CORS**
   - Verificar que el servidor tenga CORS configurado
   - Confirmar que el origen esté permitido

3. **Errores de Base de Datos**
   - Verificar que la base de datos esté inicializada
   - Ejecutar `npm run init-db` si es necesario

4. **Errores de Validación**
   - Revisar el formato de los datos enviados
   - Verificar que todos los campos requeridos estén presentes

### Logs del Servidor
Los logs del servidor mostrarán información detallada sobre:
- Requests recibidos
- Validaciones realizadas
- Errores encontrados
- Operaciones de base de datos

---

**¡Listo para probar la API! 🚀**