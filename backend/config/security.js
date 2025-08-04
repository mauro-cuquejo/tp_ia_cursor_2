// Configuraciones de seguridad
module.exports = {
    // Configuración de bcrypt
    bcrypt: {
        saltRounds: 12, // Número de salt rounds para encriptación
        minPasswordLength: 6, // Longitud mínima de contraseña
        maxPasswordLength: 128 // Longitud máxima de contraseña
    },

    // Configuración de validación de email
    email: {
        maxLength: 254, // Longitud máxima según RFC 5321
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Regex para validar email
    },

    // Configuración de rate limiting (para futuras implementaciones)
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutos
        maxRequests: 100 // Máximo 100 requests por ventana
    },

    // Configuración de CORS
    cors: {
        origin: ['http://localhost:3000'], // Frontend URL
        credentials: true
    }
};