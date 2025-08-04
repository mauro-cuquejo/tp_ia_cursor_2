const request = require('supertest');
const app = require('../server');

describe('🚀 Servidor', () => {
    describe('Health Check', () => {
        test('GET /health debe retornar estado OK', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);

            expect(response.body).toMatchObject({
                status: 'OK',
                message: 'Servidor funcionando correctamente'
            });

            expect(response.body).toHaveProperty('timestamp');
            expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
        });
    });

    describe('Middleware de Logging', () => {
        test('debe registrar requests en consola', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            await request(app)
                .get('/health')
                .expect(200);

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z - GET \/health$/)
            );

            consoleSpy.mockRestore();
        });
    });

    describe('Error Handling', () => {
        test('debe manejar rutas no encontradas', async () => {
            const response = await request(app)
                .get('/ruta-inexistente')
                .expect(404);

            expect(response.body).toMatchObject({
                error: 'Endpoint no encontrado',
                path: '/ruta-inexistente'
            });
        });

        test('debe manejar errores internos del servidor', async () => {
            // Crear una ruta temporal que genere un error
            const originalRoutes = app._router.stack;

            // Simular un error en el middleware
            app.use('/test-error', (req, res, next) => {
                next(new Error('Error de prueba'));
            });

            const response = await request(app)
                .get('/test-error')
                .expect(500);

            expect(response.body).toMatchObject({
                error: 'Error interno del servidor'
            });

            expect(response.body).toHaveProperty('message');
        });
    });

    describe('CORS', () => {
        test('debe permitir requests desde el frontend', async () => {
            const response = await request(app)
                .get('/health')
                .set('Origin', 'http://localhost:3000')
                .expect(200);

            expect(response.headers['access-control-allow-origin']).toBeDefined();
        });
    });

    describe('Body Parser', () => {
        test('debe parsear JSON correctamente', async () => {
            const testData = { email: 'test@example.com', password: 'password123' };

            const response = await request(app)
                .post('/api/register')
                .send(testData)
                .expect(400); // Esperamos 400 porque faltan validaciones, pero el body se parseó

            // Si el body parser funciona, debería llegar a la validación
            expect(response.body).toHaveProperty('error');
        });

        test('debe parsear URL encoded correctamente', async () => {
            const response = await request(app)
                .post('/api/register')
                .send('email=test@example.com&password=password123')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });
});