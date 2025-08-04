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