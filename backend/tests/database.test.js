const { runQuery, getQuery, allQuery, db } = require('../database');
const TestDatabase = require('./helpers/database');

const testDb = new TestDatabase();

describe('🗄️ Base de Datos', () => {
    beforeAll(async () => {
        await testDb.init();
    });

    afterEach(async () => {
        await testDb.clean();
    });

    afterAll(async () => {
        await testDb.destroy();
    });

    describe('runQuery', () => {
        test('debe ejecutar una consulta INSERT exitosamente', async () => {
            const result = await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['test@example.com', 'hashedpassword']
            );

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('changes');
            expect(typeof result.id).toBe('number');
            expect(result.changes).toBe(1);
        });

        test('debe ejecutar una consulta UPDATE exitosamente', async () => {
            // Primero insertar un usuario
            const insertResult = await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['test@example.com', 'hashedpassword']
            );

            // Luego actualizar
            const updateResult = await runQuery(
                'UPDATE users SET email = ? WHERE id = ?',
                ['updated@example.com', insertResult.id]
            );

            expect(updateResult).toHaveProperty('changes');
            expect(updateResult.changes).toBe(1);
        });

        test('debe ejecutar una consulta DELETE exitosamente', async () => {
            // Primero insertar un usuario
            const insertResult = await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['test@example.com', 'hashedpassword']
            );

            // Luego eliminar
            const deleteResult = await runQuery(
                'DELETE FROM users WHERE id = ?',
                [insertResult.id]
            );

            expect(deleteResult).toHaveProperty('changes');
            expect(deleteResult.changes).toBe(1);
        });

        test('debe manejar errores de consulta SQL', async () => {
            await expect(
                runQuery('INSERT INTO non_existent_table (column) VALUES (?)', ['value'])
            ).rejects.toThrow();
        });
    });

    describe('getQuery', () => {
        test('debe obtener un registro existente', async () => {
            // Insertar un usuario
            const insertResult = await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['test@example.com', 'hashedpassword']
            );

            // Obtener el usuario
            const user = await getQuery(
                'SELECT * FROM users WHERE id = ?',
                [insertResult.id]
            );

            expect(user).toBeTruthy();
            expect(user.email).toBe('test@example.com');
            expect(user.password).toBe('hashedpassword');
        });

        test('debe retornar null para registro inexistente', async () => {
            const user = await getQuery(
                'SELECT * FROM users WHERE id = ?',
                [999999]
            );

            expect(user).toBeNull();
        });

        test('debe manejar errores de consulta SQL', async () => {
            await expect(
                getQuery('SELECT * FROM non_existent_table WHERE id = ?', [1])
            ).rejects.toThrow();
        });
    });

    describe('allQuery', () => {
        test('debe obtener múltiples registros', async () => {
            // Insertar múltiples usuarios
            await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['user1@example.com', 'password1']
            );
            await runQuery(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                ['user2@example.com', 'password2']
            );

            // Obtener todos los usuarios
            const users = await allQuery('SELECT * FROM users ORDER BY id');

            expect(users).toHaveLength(2);
            expect(users[0].email).toBe('user1@example.com');
            expect(users[1].email).toBe('user2@example.com');
        });

        test('debe retornar array vacío cuando no hay registros', async () => {
            const users = await allQuery('SELECT * FROM users WHERE id > 1000');

            expect(users).toEqual([]);
        });

        test('debe manejar errores de consulta SQL', async () => {
            await expect(
                allQuery('SELECT * FROM non_existent_table')
            ).rejects.toThrow();
        });
    });

    describe('Conexión de Base de Datos', () => {
        test('debe tener una conexión válida', () => {
            expect(db).toBeDefined();
            expect(typeof db.run).toBe('function');
            expect(typeof db.get).toBe('function');
            expect(typeof db.all).toBe('function');
        });

        test('debe poder ejecutar una consulta simple', async () => {
            const result = await runQuery('SELECT 1 as test');
            expect(result).toBeDefined();
        });
    });
});