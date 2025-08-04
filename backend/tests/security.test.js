const securityConfig = require('../config/security');

describe('🔒 Configuración de Seguridad', () => {
    describe('Configuración de bcrypt', () => {
        test('debe tener saltRounds configurado', () => {
            expect(securityConfig.bcrypt).toHaveProperty('saltRounds');
            expect(typeof securityConfig.bcrypt.saltRounds).toBe('number');
            expect(securityConfig.bcrypt.saltRounds).toBeGreaterThan(0);
        });

        test('debe tener minPasswordLength configurado', () => {
            expect(securityConfig.bcrypt).toHaveProperty('minPasswordLength');
            expect(typeof securityConfig.bcrypt.minPasswordLength).toBe('number');
            expect(securityConfig.bcrypt.minPasswordLength).toBeGreaterThan(0);
        });

        test('debe tener maxPasswordLength configurado', () => {
            expect(securityConfig.bcrypt).toHaveProperty('maxPasswordLength');
            expect(typeof securityConfig.bcrypt.maxPasswordLength).toBe('number');
            expect(securityConfig.bcrypt.maxPasswordLength).toBeGreaterThan(0);
        });

        test('maxPasswordLength debe ser mayor que minPasswordLength', () => {
            expect(securityConfig.bcrypt.maxPasswordLength).toBeGreaterThan(
                securityConfig.bcrypt.minPasswordLength
            );
        });

        test('saltRounds debe ser un valor seguro (>= 10)', () => {
            expect(securityConfig.bcrypt.saltRounds).toBeGreaterThanOrEqual(10);
        });
    });

    describe('Configuración de email', () => {
        test('debe tener pattern configurado', () => {
            expect(securityConfig.email).toHaveProperty('pattern');
            expect(securityConfig.email.pattern).toBeInstanceOf(RegExp);
        });

        test('debe tener maxLength configurado', () => {
            expect(securityConfig.email).toHaveProperty('maxLength');
            expect(typeof securityConfig.email.maxLength).toBe('number');
            expect(securityConfig.email.maxLength).toBeGreaterThan(0);
        });

        test('maxLength debe ser un valor razonable (<= 254)', () => {
            expect(securityConfig.email.maxLength).toBeLessThanOrEqual(254);
        });

        test('pattern debe validar emails válidos', () => {
            const validEmails = [
                'test@example.com',
                'user.name@domain.co.uk',
                'user+tag@example.org',
                'user123@test-domain.com',
                'a@b.c'
            ];

            validEmails.forEach(email => {
                expect(securityConfig.email.pattern.test(email)).toBe(true);
            });
        });

        test('pattern debe rechazar emails inválidos', () => {
            const invalidEmails = [
                'invalid-email',
                '@example.com',
                'test@',
                'test@.com',
                'test..test@example.com',
                'test@example..com',
                'test@example.',
                '.test@example.com'
            ];

            invalidEmails.forEach(email => {
                expect(securityConfig.email.pattern.test(email)).toBe(false);
            });
        });
    });

    describe('Configuración de CORS', () => {
        test('debe tener origin configurado', () => {
            expect(securityConfig.cors).toHaveProperty('origin');
            expect(Array.isArray(securityConfig.cors.origin)).toBe(true);
        });

        test('debe tener credentials configurado', () => {
            expect(securityConfig.cors).toHaveProperty('credentials');
            expect(typeof securityConfig.cors.credentials).toBe('boolean');
        });

        test('origin debe incluir localhost', () => {
            const origins = securityConfig.cors.origin;
            expect(origins).toContain('http://localhost:3000');
        });

        test('credentials debe estar habilitado', () => {
            expect(securityConfig.cors.credentials).toBe(true);
        });
    });

    describe('Validación de Configuración Completa', () => {
        test('debe tener todas las propiedades requeridas', () => {
            expect(securityConfig).toHaveProperty('bcrypt');
            expect(securityConfig).toHaveProperty('email');
            expect(securityConfig).toHaveProperty('cors');
        });

        test('bcrypt debe tener todas las propiedades requeridas', () => {
            expect(securityConfig.bcrypt).toHaveProperty('saltRounds');
            expect(securityConfig.bcrypt).toHaveProperty('minPasswordLength');
            expect(securityConfig.bcrypt).toHaveProperty('maxPasswordLength');
        });

        test('email debe tener todas las propiedades requeridas', () => {
            expect(securityConfig.email).toHaveProperty('pattern');
            expect(securityConfig.email).toHaveProperty('maxLength');
        });

        test('cors debe tener todas las propiedades requeridas', () => {
            expect(securityConfig.cors).toHaveProperty('origin');
            expect(securityConfig.cors).toHaveProperty('credentials');
        });
    });

    describe('Validación de Valores', () => {
        test('saltRounds debe ser un número entero', () => {
            expect(Number.isInteger(securityConfig.bcrypt.saltRounds)).toBe(true);
        });

        test('minPasswordLength debe ser un número entero', () => {
            expect(Number.isInteger(securityConfig.bcrypt.minPasswordLength)).toBe(true);
        });

        test('maxPasswordLength debe ser un número entero', () => {
            expect(Number.isInteger(securityConfig.bcrypt.maxPasswordLength)).toBe(true);
        });

        test('maxLength debe ser un número entero', () => {
            expect(Number.isInteger(securityConfig.email.maxLength)).toBe(true);
        });

        test('origin debe ser un array de strings', () => {
            securityConfig.cors.origin.forEach(origin => {
                expect(typeof origin).toBe('string');
            });
        });
    });
});