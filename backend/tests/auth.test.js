const request = require('supertest');
const express = require('express');
const TestDatabase = require('./helpers/database');

// Importar la aplicación Express
const app = require('../server');

// Crear instancia de base de datos de test
const testDb = new TestDatabase();

// Datos de prueba
const testUser = {
    email: 'test@example.com',
    password: 'password123'
};

const invalidUser = {
    email: 'nonexistent@example.com',
    password: 'wrongpassword'
};

describe('🔐 Endpoints de Autenticación', () => {
    // Setup antes de todos los tests
    beforeAll(async () => {
        await testDb.init();
    });

    // Limpiar base de datos después de cada test
    afterEach(async () => {
        await testDb.clean();
    });

    // Cleanup después de todos los tests
    afterAll(async () => {
        await testDb.destroy();
    });

    describe('POST /api/register', () => {
        describe('✅ Casos Exitosos', () => {
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

                // Verificar que el usuario existe en la base de datos
                const userExists = await testDb.userExists(testUser.email);
                expect(userExists).toBe(true);
            });

            test('debe encriptar la contraseña correctamente', async () => {
                const bcrypt = require('bcryptjs');

                // Registrar usuario con email único
                const uniqueUser = { email: 'encrypt@example.com', password: 'password123' };

                await request(app)
                    .post('/api/register')
                    .send(uniqueUser)
                    .expect(201);

                // Obtener usuario de la base de datos
                const user = await testDb.getUserByEmail(uniqueUser.email);
                expect(user).toBeTruthy();
                expect(user.password).not.toBe(uniqueUser.password);
                expect(user.password).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/); // Formato bcrypt

                // Verificar que se puede desencriptar correctamente
                const isValidPassword = await bcrypt.compare(uniqueUser.password, user.password);
                expect(isValidPassword).toBe(true);
            });
        });

        describe('❌ Casos de Error', () => {
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

            test('debe rechazar registro con email muy largo', async () => {
                const longEmail = 'a'.repeat(250) + '@example.com';

                const response = await request(app)
                    .post('/api/register')
                    .send({
                        email: longEmail,
                        password: 'password123'
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Email muy largo',
                    message: 'El email es demasiado largo'
                });
            });

            test('debe rechazar registro con contraseña muy corta', async () => {
                const response = await request(app)
                    .post('/api/register')
                    .send({
                        email: 'test@example.com',
                        password: '123'
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Password muy corto',
                    message: 'La contraseña debe tener al menos 6 caracteres'
                });
            });

            test('debe rechazar registro con contraseña muy larga', async () => {
                const longPassword = 'a'.repeat(129);

                const response = await request(app)
                    .post('/api/register')
                    .send({
                        email: 'test@example.com',
                        password: longPassword
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Password muy largo',
                    message: 'La contraseña es demasiado larga'
                });
            });

            test('debe rechazar registro con datos incompletos', async () => {
                const response = await request(app)
                    .post('/api/register')
                    .send({
                        email: 'test@example.com'
                        // password faltante
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Datos incompletos',
                    message: 'Email y password son requeridos'
                });
            });

            test('debe rechazar registro con email vacío', async () => {
                const response = await request(app)
                    .post('/api/register')
                    .send({
                        email: '',
                        password: 'password123'
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Datos incompletos',
                    message: 'Email y password son requeridos'
                });
            });

            test('debe rechazar registro con password vacío', async () => {
                const response = await request(app)
                    .post('/api/register')
                    .send({
                        email: 'test@example.com',
                        password: ''
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Datos incompletos',
                    message: 'Email y password son requeridos'
                });
            });

            test('debe rechazar registro con email null', async () => {
                const response = await request(app)
                    .post('/api/register')
                    .send({
                        email: null,
                        password: 'password123'
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Datos incompletos',
                    message: 'Email y password son requeridos'
                });
            });

            test('debe rechazar registro con password null', async () => {
                const response = await request(app)
                    .post('/api/register')
                    .send({
                        email: 'test@example.com',
                        password: null
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Datos incompletos',
                    message: 'Email y password son requeridos'
                });
            });

            test('debe rechazar registro de usuario ya existente', async () => {
                // Registrar usuario primero
                await request(app)
                    .post('/api/register')
                    .send(testUser)
                    .expect(201);

                // Intentar registrar el mismo usuario
                const response = await request(app)
                    .post('/api/register')
                    .send(testUser)
                    .expect(409);

                expect(response.body).toMatchObject({
                    error: 'Usuario ya existe',
                    message: 'Ya existe una cuenta con este email'
                });
            });
        });
    });

    describe('POST /api/login', () => {
        // Setup: crear usuario antes de los tests de login
        beforeEach(async () => {
            await testDb.createTestUser(testUser.email, testUser.password);
        });

        describe('✅ Casos Exitosos', () => {
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
        });

        describe('❌ Casos de Error', () => {
            test('debe rechazar login con usuario inexistente', async () => {
                const response = await request(app)
                    .post('/api/login')
                    .send(invalidUser)
                    .expect(401);

                expect(response.body).toMatchObject({
                    error: 'Credenciales inválidas',
                    message: 'Email o contraseña incorrectos'
                });
            });

            test('debe rechazar login con contraseña incorrecta', async () => {
                const response = await request(app)
                    .post('/api/login')
                    .send({
                        email: testUser.email,
                        password: 'wrongpassword'
                    })
                    .expect(401);

                expect(response.body).toMatchObject({
                    error: 'Credenciales inválidas',
                    message: 'Email o contraseña incorrectos'
                });
            });

            test('debe rechazar login con email inválido', async () => {
                const response = await request(app)
                    .post('/api/login')
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

            test('debe rechazar login con email muy largo', async () => {
                const longEmail = 'a'.repeat(250) + '@example.com';

                const response = await request(app)
                    .post('/api/login')
                    .send({
                        email: longEmail,
                        password: 'password123'
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Email muy largo',
                    message: 'El email es demasiado largo'
                });
            });

            test('debe rechazar login con contraseña muy corta', async () => {
                const response = await request(app)
                    .post('/api/login')
                    .send({
                        email: testUser.email,
                        password: '123'
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Password muy corto',
                    message: 'La contraseña debe tener al menos 6 caracteres'
                });
            });

            test('debe rechazar login con contraseña muy larga', async () => {
                const longPassword = 'a'.repeat(129);

                const response = await request(app)
                    .post('/api/login')
                    .send({
                        email: testUser.email,
                        password: longPassword
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Password muy largo',
                    message: 'La contraseña es demasiado larga'
                });
            });

            test('debe rechazar login con datos incompletos', async () => {
                const response = await request(app)
                    .post('/api/login')
                    .send({
                        email: testUser.email
                        // password faltante
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Datos incompletos',
                    message: 'Email y password son requeridos'
                });
            });

            test('debe rechazar login con email vacío', async () => {
                const response = await request(app)
                    .post('/api/login')
                    .send({
                        email: '',
                        password: 'password123'
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Datos incompletos',
                    message: 'Email y password son requeridos'
                });
            });

            test('debe rechazar login con password vacío', async () => {
                const response = await request(app)
                    .post('/api/login')
                    .send({
                        email: testUser.email,
                        password: ''
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Datos incompletos',
                    message: 'Email y password son requeridos'
                });
            });

            test('debe rechazar login con email null', async () => {
                const response = await request(app)
                    .post('/api/login')
                    .send({
                        email: null,
                        password: 'password123'
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Datos incompletos',
                    message: 'Email y password son requeridos'
                });
            });

            test('debe rechazar login con password null', async () => {
                const response = await request(app)
                    .post('/api/login')
                    .send({
                        email: testUser.email,
                        password: null
                    })
                    .expect(400);

                expect(response.body).toMatchObject({
                    error: 'Datos incompletos',
                    message: 'Email y password son requeridos'
                });
            });
        });
    });

    describe('🔒 Seguridad', () => {
        test('debe usar bcrypt con salt rounds correctos', async () => {
            const bcrypt = require('bcryptjs');
            const securityConfig = require('../config/security');

            // Registrar usuario
            await request(app)
                .post('/api/register')
                .send(testUser)
                .expect(201);

            // Verificar que la contraseña está encriptada correctamente
            const user = await testDb.getUserByEmail(testUser.email);
            const isValidHash = await bcrypt.compare(testUser.password, user.password);

            expect(isValidHash).toBe(true);
            expect(user.password).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/);
        });

        test('debe validar formato de email según RFC 5321', async () => {
            const validEmails = [
                'test@example.com',
                'user.name@domain.co.uk',
                'user+tag@example.org'
            ];

            const invalidEmails = [
                'invalid-email',
                '@example.com',
                'test@',
                'test@.com'
            ];

            // Probar emails válidos
            for (const email of validEmails) {
                const response = await request(app)
                    .post('/api/register')
                    .send({ email, password: 'password123' });

                expect(response.status).not.toBe(400);
            }

            // Probar emails inválidos
            for (const email of invalidEmails) {
                const response = await request(app)
                    .post('/api/register')
                    .send({ email, password: 'password123' });

                expect(response.status).toBe(400);
                expect(response.body.error).toBe('Email inválido');
            }
        });

        test('debe manejar errores de base de datos en registro', async () => {
            // Mock para simular error de base de datos
            const originalGetQuery = require('../database').getQuery;
            jest.spyOn(require('../database'), 'getQuery').mockRejectedValueOnce(
                new Error('Error de base de datos simulado')
            );

            const response = await request(app)
                .post('/api/register')
                .send({ email: 'newuser@example.com', password: 'password123' })
                .expect(500);

            expect(response.body).toMatchObject({
                error: 'Error interno del servidor',
                message: 'Error al registrar usuario'
            });

            jest.restoreAllMocks();
        });

        test('debe manejar errores de base de datos en login', async () => {
            // Mock para simular error de base de datos
            const originalGetQuery = require('../database').getQuery;
            jest.spyOn(require('../database'), 'getQuery').mockRejectedValueOnce(
                new Error('Error de base de datos simulado')
            );

            const response = await request(app)
                .post('/api/login')
                .send({ email: 'newuser@example.com', password: 'password123' })
                .expect(500);

            expect(response.body).toMatchObject({
                error: 'Error interno del servidor',
                message: 'Error al autenticar usuario'
            });

            jest.restoreAllMocks();
        });

        test('debe manejar errores de bcrypt en registro', async () => {
            // Mock para simular error de bcrypt
            const bcrypt = require('bcryptjs');
            jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(
                new Error('Error de bcrypt simulado')
            );

            const response = await request(app)
                .post('/api/register')
                .send(testUser)
                .expect(500);

            expect(response.body).toMatchObject({
                error: 'Error interno del servidor',
                message: 'Error al registrar usuario'
            });

            jest.restoreAllMocks();
        });

        test('debe manejar errores de bcrypt en login', async () => {
            // Crear usuario primero
            await testDb.createTestUser(testUser.email, testUser.password);

            // Mock para simular error de bcrypt
            const bcrypt = require('bcryptjs');
            jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(
                new Error('Error de bcrypt simulado')
            );

            const response = await request(app)
                .post('/api/login')
                .send(testUser)
                .expect(500);

            expect(response.body).toMatchObject({
                error: 'Error interno del servidor',
                message: 'Error al autenticar usuario'
            });

            jest.restoreAllMocks();
        });
    });

    describe('📊 Rendimiento', () => {
        test('debe manejar múltiples registros concurrentes', async () => {
            const concurrentRequests = 5;
            const promises = [];

            for (let i = 0; i < concurrentRequests; i++) {
                promises.push(
                    request(app)
                        .post('/api/register')
                        .send({
                            email: `test${i}@example.com`,
                            password: 'password123'
                        })
                );
            }

            const responses = await Promise.all(promises);

            // Verificar que todos los registros fueron exitosos
            responses.forEach(response => {
                expect(response.status).toBe(201);
                expect(response.body.success).toBe(true);
            });

            // Verificar que todos los usuarios existen
            const users = await testDb.getAllUsers();
            expect(users).toHaveLength(concurrentRequests);
        });
    });
});