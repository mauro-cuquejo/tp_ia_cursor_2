# Estructura de Estilos CSS

Esta carpeta contiene todos los archivos de estilos CSS organizados de manera modular para mejorar la mantenibilidad y reutilización.

## 📁 Estructura de Archivos

```
styles/
├── base.css          # Variables CSS, reset y estilos base
├── components.css    # Estilos de componentes reutilizables
├── responsive.css    # Media queries y estilos responsivos
├── main.css          # Archivo principal que importa todos los demás
└── README.md         # Esta documentación
```

## 🎨 Archivos de Estilos

### `base.css`
- **Variables CSS**: Colores, espaciado, tipografía, sombras, transiciones
- **Reset básico**: Normalización de estilos entre navegadores
- **Utilidades**: Clases helper y animaciones base
- **Configuración global**: Fuentes, colores de fondo, etc.

### `components.css`
- **Formularios**: Estilos para inputs, labels, grupos de campos
- **Botones**: Estilos para botones primarios y secundarios
- **Mensajes**: Estilos para errores, éxitos y mensajes del servidor
- **Layout**: Headers, footers y contenedores de formularios

### `responsive.css`
- **Media queries**: Adaptación para diferentes tamaños de pantalla
- **Modo oscuro**: Soporte para `prefers-color-scheme: dark`
- **Accesibilidad**: Soporte para `prefers-reduced-motion`
- **Impresión**: Estilos optimizados para impresión

### `main.css`
- **Importaciones**: Importa todos los archivos CSS
- **Estilos específicos**: Estilos únicos de la aplicación
- **Configuración**: Variables y configuraciones específicas

## 🎯 Variables CSS Disponibles

### Colores
```css
--primary-color: #667eea
--secondary-color: #764ba2
--success-color: #10b981
--error-color: #e74c3c
--warning-color: #f59e0b
```

### Espaciado
```css
--spacing-xs: 0.25rem
--spacing-sm: 0.5rem
--spacing-md: 0.75rem
--spacing-lg: 1rem
--spacing-xl: 1.5rem
--spacing-2xl: 2rem
```

### Tipografía
```css
--font-size-xs: 0.8rem
--font-size-sm: 0.9rem
--font-size-base: 1rem
--font-size-lg: 1.5rem
--font-size-xl: 1.8rem
```

## 🧩 Clases CSS Disponibles

### Contenedores
- `.container` - Contenedor centrado
- `.card` - Tarjeta con sombra y bordes redondeados
- `.auth-container` - Contenedor específico para autenticación
- `.auth-card` - Tarjeta específica para autenticación

### Formularios
- `.form` - Contenedor de formulario
- `.form-header` - Header del formulario
- `.form-group` - Grupo de campos
- `.form-input` - Campo de entrada
- `.form-footer` - Footer del formulario

### Botones
- `.btn` - Botón base
- `.btn-primary` - Botón primario con gradiente
- `.btn-secondary` - Botón secundario transparente

### Mensajes
- `.server-message` - Mensaje del servidor
- `.server-message.error` - Mensaje de error
- `.server-message.success` - Mensaje de éxito
- `.error-message` - Mensaje de error de campo

### Utilidades
- `.text-center` - Texto centrado
- `.text-error` - Texto de error
- `.text-success` - Texto de éxito
- `.fade-in` - Animación de aparición
- `.slide-in` - Animación de deslizamiento

## 📱 Breakpoints Responsivos

- **Desktop**: `> 1200px`
- **Tablet**: `768px - 1199px`
- **Mobile Large**: `481px - 767px`
- **Mobile Small**: `≤ 480px`
- **Mobile Extra Small**: `≤ 360px`

## 🌙 Modo Oscuro

El sistema incluye soporte automático para modo oscuro usando `prefers-color-scheme: dark`. Las variables CSS se ajustan automáticamente.

## ♿ Accesibilidad

- **Reducción de movimiento**: Soporte para `prefers-reduced-motion`
- **Contraste**: Colores optimizados para buen contraste
- **Navegación por teclado**: Estados focus visibles
- **Semántica**: Uso apropiado de elementos HTML

## 🚀 Uso

### En HTML
```html
<link rel="stylesheet" href="./src/assets/styles/main.css">
```

### En Vue Components
```vue
<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="form-header">
        <h1>Título</h1>
      </div>
      <form class="form">
        <div class="form-group">
          <label>Campo</label>
          <input class="form-input" type="text">
        </div>
        <button class="btn btn-primary">Enviar</button>
      </form>
    </div>
  </div>
</template>
```

## 🔧 Personalización

Para personalizar los estilos:

1. **Modificar variables**: Edita las variables CSS en `base.css`
2. **Agregar componentes**: Añade nuevos estilos en `components.css`
3. **Responsive**: Añade media queries en `responsive.css`
4. **Específicos**: Añade estilos únicos en `main.css`

## 📋 Mejores Prácticas

1. **Usar variables CSS**: Siempre usa variables en lugar de valores hardcodeados
2. **Clases semánticas**: Usa nombres de clases que describan el propósito
3. **Responsive first**: Diseña primero para móviles
4. **Accesibilidad**: Considera siempre la accesibilidad
5. **Performance**: Mantén los archivos CSS organizados y optimizados