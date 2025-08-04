// Configuración global para tests
const path = require('path');

// Configurar variables de entorno para tests
process.env.NODE_ENV = 'test';

// Configurar base de datos de test
process.env.DB_PATH = path.join(__dirname, '../test-database.sqlite');

// Configurar puerto de test
process.env.PORT = 3002;

// Configurar logging para tests (reducir ruido)
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// Silenciar logs durante tests a menos que se especifique lo contrario
if (process.env.VERBOSE_TESTS !== 'true') {
    console.log = jest.fn();
    console.error = jest.fn();
}

// Restaurar console después de cada test
afterEach(() => {
    if (process.env.VERBOSE_TESTS !== 'true') {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    }
});

// Configuración global de Jest
global.testTimeout = 10000;