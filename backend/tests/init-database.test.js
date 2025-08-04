const initDatabase = require('../init-database');
const { runQuery, getQuery } = require('../database');
const TestDatabase = require('./helpers/database');

const testDb = new TestDatabase();

describe('🗄️ Inicialización de Base de Datos', () => {
    beforeAll(async () => {
        await testDb.init();
    });

    afterEach(async () => {
        await testDb.clean();
    });

    afterAll(async () => {
        await testDb.destroy();
    });

    describe('initDatabase', () => {
        test('debe crear la tabla users si no existe', async () => {
            // Limpiar la base de datos
            await testDb.clean();

            // Ejecutar inicialización
            await initDatabase();

            // Verificar que la tabla existe intentando insertar un usuario
            const result = await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['test@example.com', 'hashedpassword']
            );

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('changes');
            expect(result.changes).toBe(1);
        });

        test('debe crear la tabla con la estructura correcta', async () => {
            // Limpiar la base de datos
            await testDb.clean();

            // Ejecutar inicialización
            await initDatabase();

            // Insertar un usuario de prueba
            const insertResult = await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['test@example.com', 'hashedpassword']
            );

            // Verificar que el usuario se insertó correctamente
            const user = await getQuery(
                'SELECT * FROM users WHERE id = ?',
                [insertResult.id]
            );

            expect(user).toBeTruthy();
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('password');
            expect(user).toHaveProperty('created_at');
            expect(user.email).toBe('test@example.com');
            expect(user.password).toBe('hashedpassword');
        });

        test('debe manejar múltiples ejecuciones sin errores', async () => {
            // Ejecutar inicialización múltiples veces
            await initDatabase();
            await initDatabase();
            await initDatabase();

            // Verificar que todo sigue funcionando
            const result = await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['test@example.com', 'hashedpassword']
            );

            expect(result).toHaveProperty('id');
            expect(result.changes).toBe(1);
        });

        test('debe crear la tabla con restricciones correctas', async () => {
            // Limpiar la base de datos
            await testDb.clean();

            // Ejecutar inicialización
            await initDatabase();

            // Intentar insertar un usuario con email duplicado
            await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['test@example.com', 'hashedpassword']
            );

            // Intentar insertar el mismo email (debería fallar por UNIQUE constraint)
            await expect(
                runQuery(
                    'INSERT INTO users (email, password) VALUES (?, ?)',
                    ['test@example.com', 'anotherpassword']
                )
            ).rejects.toThrow();
        });

        test('debe manejar errores de base de datos', async () => {
            // Simular un error de base de datos
            const originalRunQuery = require('../database').runQuery;

            // Mock para simular error
            jest.spyOn(require('../database'), 'runQuery').mockRejectedValueOnce(
                new Error('Error de base de datos simulado')
            );

            await expect(initDatabase()).rejects.toThrow('Error de base de datos simulado');

            // Restaurar la función original
            jest.restoreAllMocks();
        });
    });

    describe('Estructura de la Tabla', () => {
        test('debe tener la columna id como PRIMARY KEY', async () => {
            await initDatabase();

            // Verificar que id es autoincremental
            const result1 = await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['user1@example.com', 'password1']
            );

            const result2 = await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['user2@example.com', 'password2']
            );

            expect(result2.id).toBeGreaterThan(result1.id);
        });

        test('debe tener la columna email como UNIQUE', async () => {
            await initDatabase();

            // Insertar primer usuario
            await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['unique@example.com', 'password1']
            );

            // Intentar insertar el mismo email
            await expect(
                runQuery(
                    'INSERT INTO users (email, password) VALUES (?, ?)',
                    ['unique@example.com', 'password2']
                )
            ).rejects.toThrow();
        });

        test('debe tener la columna created_at con valor por defecto', async () => {
            await initDatabase();

            const result = await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['test@example.com', 'hashedpassword']
            );

            const user = await getQuery(
                'SELECT * FROM users WHERE id = ?',
                [result.id]
            );

            expect(user.created_at).toBeDefined();
            expect(new Date(user.created_at)).toBeInstanceOf(Date);
        });
    });
});