# Aplicación Vue - Formulario de Login

Una aplicación Vue.js moderna con un formulario de login responsivo que incluye validaciones del lado del cliente.

## Características

- ✅ Formulario de login responsivo
- ✅ Campos de email y contraseña
- ✅ Validaciones JavaScript del lado del cliente
- ✅ Diseño moderno y atractivo
- ✅ Link a página de registro
- ✅ Manejo de estados de carga
- ✅ Mensajes de error en tiempo real

## Tecnologías Utilizadas

- **Vue.js 3** - Framework de JavaScript
- **Vite** - Herramienta de construcción
- **CSS3** - Estilos modernos con gradientes y animaciones

## Instalación

1. Navega al directorio del proyecto:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

## Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`

## Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── LoginForm.vue      # Componente del formulario de login
│   │   └── RegisterForm.vue   # Componente del formulario de registro
│   ├── App.vue                # Componente raíz de la aplicación
│   └── main.js                # Punto de entrada de Vue
├── index.html                 # Archivo HTML principal
├── package.json               # Dependencias y scripts
├── vite.config.js            # Configuración de Vite
└── README.md                 # Este archivo
```

## Validaciones Implementadas

### LoginForm
- **Email**: Campo requerido + formato válido (regex)
- **Contraseña**: Campo requerido + mínimo 6 caracteres

### RegisterForm
- **Email**: Campo requerido + formato válido (regex)
- **Contraseña**: Campo requerido + mínimo 6 caracteres
- **Confirmar Contraseña**: Campo requerido + debe coincidir con contraseña

## Funcionalidades

- **Validación en tiempo real**: Los errores se muestran cuando el usuario sale del campo (evento blur)
- **Limpieza de errores**: Los errores se limpian automáticamente cuando el usuario comienza a escribir
- **Estado de carga**: El botón muestra un estado de carga durante el envío
- **Diseño responsivo**: Se adapta a diferentes tamaños de pantalla
- **Accesibilidad**: Labels apropiados y estructura semántica
- **Navegación entre formularios**: Cambio fluido entre login y registro
- **Validación de confirmación**: Verificación de que las contraseñas coincidan en registro

## Próximos Pasos

Para integrar con el backend:
1. Reemplazar la función `handleSubmit` con llamadas reales a la API
2. Implementar manejo de tokens de autenticación
3. Agregar navegación real a la página de registro
4. Implementar persistencia de sesión

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request