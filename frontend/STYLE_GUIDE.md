# 🎨 Guía de Estilos - Sistema de Autenticación

## 📋 Criterio de Estilos Implementado

### **🎯 Principios de Diseño**

1. **Consistencia Visual**: Todos los elementos siguen el mismo sistema de diseño
2. **Feedback Visual Claro**: Estados de error, éxito y validación bien definidos
3. **Accesibilidad**: Contraste adecuado y estados de foco visibles
4. **Responsive**: Adaptable a diferentes tamaños de pantalla
5. **Animaciones Sutiles**: Transiciones suaves que mejoran la UX

---

## 🎨 **Sistema de Colores**

### **Colores Principales**
```css
--primary-color: #667eea
--secondary-color: #764ba2
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
```

### **Colores de Estado**
```css
--success-color: #10b981    /* Verde para éxito */
--error-color: #e74c3c      /* Rojo para errores */
--warning-color: #f59e0b    /* Amarillo para advertencias */
```

### **Colores de Texto**
```css
--text-primary: #333        /* Texto principal */
--text-secondary: #666      /* Texto secundario */
--text-light: #999          /* Texto claro */
```

### **Colores de Fondo**
```css
--bg-primary: #ffffff       /* Fondo principal */
--bg-secondary: #f8f9fa     /* Fondo secundario */
--bg-error: #fdf2f2         /* Fondo de error */
--bg-success: #f0f9ff       /* Fondo de éxito */
--bg-warning: #fef3c7       /* Fondo de advertencia */
```

---

## 📝 **Variables Específicas para Form-Input**

### **Estado Normal**
```css
--form-input-bg: #ffffff              /* Fondo del campo */
--form-input-text: #333               /* Color del texto */
--form-input-border: #e1e5e9          /* Color del borde */
--form-input-placeholder: #999        /* Color del placeholder */
```

### **Estado de Focus**
```css
--form-input-focus-bg: #ffffff        /* Fondo al hacer focus */
--form-input-focus-border: #667eea    /* Borde al hacer focus */
--form-input-focus-shadow: rgba(102, 126, 234, 0.1)  /* Sombra al focus */
```

### **Estado de Error**
```css
--form-input-error-bg: #fdf2f2        /* Fondo con error */
--form-input-error-text: #333         /* Texto con error */
--form-input-error-border: #e74c3c    /* Borde con error */
--form-input-error-shadow: rgba(231, 76, 60, 0.1)    /* Sombra con error */
```

### **Estado de Éxito**
```css
--form-input-success-bg: #f0f9ff      /* Fondo con éxito */
--form-input-success-text: #333       /* Texto con éxito */
--form-input-success-border: #10b981  /* Borde con éxito */
--form-input-success-shadow: rgba(16, 185, 129, 0.1) /* Sombra con éxito */
```

### **Estado de Advertencia**
```css
--form-input-warning-bg: #fef3c7      /* Fondo con advertencia */
--form-input-warning-text: #92400e    /* Texto con advertencia */
--form-input-warning-border: #f59e0b  /* Borde con advertencia */
--form-input-warning-shadow: rgba(245, 158, 11, 0.1) /* Sombra con advertencia */
```

---

## 📋 **Variables Específicas para Form-Header**

### **Estilos Base**
```css
--form-header-bg: transparent         /* Fondo del header */
--form-header-text-primary: #333     /* Color del título */
--form-header-text-secondary: #666   /* Color del subtítulo */
--form-header-border: none           /* Borde del header */
--form-header-shadow: none           /* Sombra del header */
--form-header-spacing-bottom: 2rem   /* Espaciado inferior */
```

### **Implementación**
```css
.form-header {
  background-color: var(--form-header-bg);
  color: var(--form-header-text-primary);
  border: var(--form-header-border);
  box-shadow: var(--form-header-shadow);
  margin-bottom: var(--form-header-spacing-bottom);
  text-align: center;
}

.form-header h1 {
  color: var(--form-header-text-primary);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-semibold);
}

.form-header p {
  color: var(--form-header-text-secondary);
  font-size: var(--font-size-sm);
}
```

---

## 🔘 **Variables Específicas para Btn-Primary**

### **Estilos Base**
```css
--btn-primary-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%)  /* Fondo */
--btn-primary-text: #ffffff                                          /* Color del texto */
--btn-primary-border: none                                           /* Borde */
--btn-primary-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)                  /* Sombra normal */
```

### **Estados de Interacción**
```css
--btn-primary-shadow-hover: 0 4px 12px rgba(102, 126, 234, 0.4)     /* Sombra al hover */
--btn-primary-shadow-active: 0 2px 4px rgba(0, 0, 0, 0.1)          /* Sombra al activar */
--btn-primary-transform-hover: translateY(-2px)                     /* Transformación al hover */
--btn-primary-transform-active: translateY(0)                       /* Transformación al activar */
```

### **Estado Deshabilitado**
```css
--btn-primary-opacity-disabled: 0.7                                 /* Opacidad cuando está deshabilitado */
--btn-primary-bg-disabled: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%)  /* Fondo deshabilitado */
```

### **Implementación**
```css
.btn-primary {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border: var(--btn-primary-border);
  box-shadow: var(--btn-primary-shadow);
  transition: all var(--transition-normal);
}

.btn-primary:hover:not(:disabled) {
  transform: var(--btn-primary-transform-hover);
  box-shadow: var(--btn-primary-shadow-hover);
}

.btn-primary:active:not(:disabled) {
  transform: var(--btn-primary-transform-active);
  box-shadow: var(--btn-primary-shadow-active);
}

.btn-primary:disabled {
  opacity: var(--btn-primary-opacity-disabled);
  background: var(--btn-primary-bg-disabled);
  cursor: not-allowed;
}
```

---

## 🔘 **Variables Específicas para Btn (Botón Base)**

### **Estilos Base**
```css
--btn-bg: transparent                    /* Fondo */
--btn-text: var(--text-primary)         /* Color del texto */
--btn-border: none                      /* Borde */
--btn-shadow: none                      /* Sombra */
--btn-padding: var(--spacing-md)        /* Padding */
--btn-border-radius: var(--border-radius-md)  /* Radio de borde */
--btn-font-size: var(--font-size-base)  /* Tamaño de fuente */
--btn-font-weight: var(--font-weight-semibold)  /* Peso de fuente */
--btn-transition: all var(--transition-normal)  /* Transición */
--btn-cursor: pointer                   /* Cursor */
--btn-cursor-disabled: not-allowed      /* Cursor deshabilitado */
```

### **Estados de Interacción**
```css
--btn-shadow-hover: none               /* Sombra al hover */
--btn-shadow-active: none              /* Sombra al activar */
--btn-transform-hover: none            /* Transformación al hover */
--btn-transform-active: none           /* Transformación al activar */
--btn-opacity-disabled: 0.7            /* Opacidad cuando está deshabilitado */
--btn-bg-disabled: transparent         /* Fondo deshabilitado */
```

### **Implementación**
```css
.btn {
  background: var(--btn-bg);
  color: var(--btn-text);
  border: var(--btn-border);
  box-shadow: var(--btn-shadow);
  padding: var(--btn-padding);
  border-radius: var(--btn-border-radius);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  cursor: var(--btn-cursor);
  transition: var(--btn-transition);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  position: relative;
  overflow: hidden;
}

.btn:hover:not(:disabled) {
  transform: var(--btn-transform-hover);
  box-shadow: var(--btn-shadow-hover);
}

.btn:active:not(:disabled) {
  transform: var(--btn-transform-active);
  box-shadow: var(--btn-shadow-active);
}

.btn:disabled {
  opacity: var(--btn-opacity-disabled);
  background: var(--btn-bg-disabled);
  cursor: var(--btn-cursor-disabled);
}
```

---

## 🔘 **Variables Específicas para Btn-Secondary**

### **Estilos Base**
```css
--btn-secondary-bg: transparent         /* Fondo */
--btn-secondary-text: var(--text-secondary)  /* Color del texto */
--btn-secondary-border: 2px solid var(--border-primary)  /* Borde */
--btn-secondary-shadow: none           /* Sombra */
```

### **Estados de Interacción**
```css
--btn-secondary-shadow-hover: none     /* Sombra al hover */
--btn-secondary-shadow-active: none    /* Sombra al activar */
--btn-secondary-transform-hover: translateY(-2px)  /* Transformación al hover */
--btn-secondary-transform-active: translateY(0)    /* Transformación al activar */
--btn-secondary-opacity-disabled: 0.5  /* Opacidad cuando está deshabilitado */
--btn-secondary-bg-disabled: transparent  /* Fondo deshabilitado */
--btn-secondary-bg-hover: var(--bg-secondary)  /* Fondo al hover */
--btn-secondary-border-hover: var(--border-focus)  /* Borde al hover */
--btn-secondary-text-hover: var(--primary-color)  /* Texto al hover */
```

### **Implementación**
```css
.btn-secondary {
  background: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  border: var(--btn-secondary-border);
  box-shadow: var(--btn-secondary-shadow);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--btn-secondary-bg-hover);
  border-color: var(--btn-secondary-border-hover);
  color: var(--btn-secondary-text-hover);
  transform: var(--btn-secondary-transform-hover);
  box-shadow: var(--btn-secondary-shadow-hover);
}

.btn-secondary:active:not(:disabled) {
  transform: var(--btn-secondary-transform-active);
  box-shadow: var(--btn-secondary-shadow-active);
}

.btn-secondary:disabled {
  opacity: var(--btn-secondary-opacity-disabled);
  background: var(--btn-secondary-bg-disabled);
  cursor: var(--btn-cursor-disabled);
}
```

---

## 📄 **Variables Específicas para Form-Footer**

### **Estilos Base**
```css
--form-footer-bg: transparent         /* Fondo del footer */
--form-footer-text: var(--text-secondary)  /* Color del texto */
--form-footer-border: 1px solid var(--border-primary)  /* Borde superior */
--form-footer-shadow: none           /* Sombra */
```

### **Espaciado y Layout**
```css
--form-footer-spacing-top: 2rem      /* Margen superior */
--form-footer-spacing-bottom: 0      /* Margen inferior */
--form-footer-padding-top: 2rem      /* Padding superior */
```

### **Tipografía**
```css
--form-footer-text-size: var(--font-size-sm)  /* Tamaño del texto */
--form-footer-text-weight: var(--font-weight-normal)  /* Peso del texto */
```

### **Enlaces**
```css
--form-footer-link-color: var(--primary-color)  /* Color del enlace */
--form-footer-link-hover-color: var(--secondary-color)  /* Color al hover */
--form-footer-link-weight: var(--font-weight-medium)  /* Peso del enlace */
--form-footer-link-transition: color var(--transition-fast)  /* Transición */
```

### **Implementación**
```css
.form-footer {
  background: var(--form-footer-bg);
  color: var(--form-footer-text);
  border-top: var(--form-footer-border);
  box-shadow: var(--form-footer-shadow);
  margin-top: var(--form-footer-spacing-top);
  margin-bottom: var(--form-footer-spacing-bottom);
  padding-top: var(--form-footer-padding-top);
  text-align: center;
}

.form-footer p {
  font-size: var(--form-footer-text-size);
  font-weight: var(--form-footer-text-weight);
  margin: 0;
}

.form-footer a {
  color: var(--form-footer-link-color);
  font-weight: var(--form-footer-link-weight);
  text-decoration: none;
  transition: var(--form-footer-link-transition);
}

.form-footer a:hover {
  color: var(--form-footer-link-hover-color);
  text-decoration: underline;
}
```

---

## 📝 **Estilos de Formularios**

### **Campos de Entrada**
- **Borde**: 2px sólido con color `--form-input-border`
- **Radio de borde**: 8px
- **Padding**: 12px
- **Transición**: 0.3s ease para todos los cambios
- **Focus**: Borde azul con sombra sutil y escalado

### **Estados de Validación**

#### **Estado Normal**
```css
.form-input {
  background-color: var(--form-input-bg);
  color: var(--form-input-text);
  border: 2px solid var(--form-input-border);
}
```

#### **Estado de Error**
```css
.form-input.error,
.form-group.has-error .form-input {
  background-color: var(--form-input-error-bg);
  color: var(--form-input-error-text);
  border-color: var(--form-input-error-border);
  box-shadow: 0 0 0 3px var(--form-input-error-shadow);
  animation: shake 0.5s ease-in-out;
}
```

#### **Estado de Éxito**
```css
.form-input.success,
.form-group.has-success .form-input {
  background-color: var(--form-input-success-bg);
  color: var(--form-input-success-text);
  border-color: var(--form-input-success-border);
  box-shadow: 0 0 0 3px var(--form-input-success-shadow);
}
```

#### **Estado de Focus**
```css
.form-input:focus {
  background-color: var(--form-input-focus-bg);
  border-color: var(--form-input-focus-border);
  box-shadow: 0 0 0 3px var(--form-input-focus-shadow);
  transform: scale(1.02);
}
```

---

## 💬 **Mensajes del Sistema**

### **Variables para Mensajes**
```css
/* Mensajes de Error */
--error-message-bg: rgba(231, 76, 60, 0.05)
--error-message-text: #e74c3c
--error-message-border: #e74c3c

/* Mensajes de Éxito */
--success-message-bg: rgba(16, 185, 129, 0.05)
--success-message-text: #10b981
--success-message-border: #10b981

/* Mensajes de Advertencia */
--warning-message-bg: rgba(245, 158, 11, 0.05)
--warning-message-text: #92400e
--warning-message-border: #f59e0b
```

### **Mensajes de Error de Validación**
- **Color**: Rojo (`--error-message-text`)
- **Fondo**: Rojo muy claro (`--error-message-bg`)
- **Borde**: Línea izquierda roja (`--error-message-border`)
- **Animación**: `slideIn` para entrada suave
- **Posición**: Debajo del campo correspondiente

```css
.error-message {
  background-color: var(--error-message-bg);
  color: var(--error-message-text);
  border-left: 3px solid var(--error-message-border);
  padding: 4px 8px;
  border-radius: 4px;
  animation: slideIn 0.2s ease;
}
```

### **Mensajes del Servidor**
- **Éxito**: Fondo verde claro, borde verde, texto verde
- **Error**: Fondo rojo claro, borde rojo, texto rojo
- **Advertencia**: Fondo amarillo claro, borde amarillo, texto naranja
- **Animación**: `fadeIn` para entrada suave
- **Borde superior**: Línea de color con opacidad 0.3

```css
.server-message {
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  animation: fadeIn 0.3s ease;
  position: relative;
  overflow: hidden;
}

.server-message::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: currentColor;
  opacity: 0.3;
}
```

---

## 🔘 **Botones**

### **Arquitectura de Estilos**
Los botones siguen una arquitectura de estilos independiente para evitar solapamiento:

- **`.btn`**: Estilos base con fondo transparente
- **`.btn-primary`**: Estilos completos para botón primario (sobrescribe `.btn`)
- **`.btn-secondary`**: Estilos completos para botón secundario (sobrescribe `.btn`)

### **Botón Base (.btn)**
- **Fondo**: Transparente (`--btn-bg`)
- **Color**: Texto principal (`--btn-text`)
- **Borde**: Ninguno (`--btn-border`)
- **Padding**: 12px (`--btn-padding`)
- **Radio de borde**: 8px (`--btn-border-radius`)
- **Fuente**: Base, semibold (`--btn-font-size`, `--btn-font-weight`)
- **Transición**: 0.3s ease (`--btn-transition`)
- **Layout**: Flexbox con gap, posición relativa para efectos

### **Botón Primario (.btn-primary)**
- **Fondo**: Gradiente primario (`--btn-primary-bg`)
- **Color**: Blanco (`--btn-primary-text`)
- **Borde**: Ninguno (`--btn-primary-border`)
- **Sombra**: Sutil (`--btn-primary-shadow`)
- **Hover**: Elevación con sombra y transformación
- **Active**: Retorno a posición normal
- **Disabled**: Opacidad reducida y gradiente más claro

### **Botón Secundario (.btn-secondary)**
- **Fondo**: Transparente (`--btn-secondary-bg`)
- **Color**: Texto secundario (`--btn-secondary-text`)
- **Borde**: 2px sólido (`--btn-secondary-border`)
- **Hover**: Fondo gris claro, borde azul, texto primario
- **Active**: Retorno a posición normal
- **Disabled**: Opacidad reducida

### **Efectos Especiales**
- **Shimmer**: Efecto de brillo al hacer hover (definido en components.css)
- **Animación**: Transición suave en todas las interacciones
- **Estados**: Hover, active, disabled bien diferenciados

### **Resolución de Solapamiento**
- **Problema**: Las clases `.btn` y `.btn-primary`/`.btn-secondary` solapaban estilos
- **Solución**: Cada clase de botón tiene estilos completos e independientes
- **Resultado**: No hay dependencia entre clases, evitando conflictos de CSS

---

## 🎭 **Animaciones**

### **Entrada de Componentes**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### **Error de Validación**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```

### **Efecto Shimmer en Botones**
```css
.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}
```

---

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

### **Adaptaciones Mobile**
```css
@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
    margin: 10px;
  }

  .form-header h1 {
    font-size: 1.5rem;
  }

  .button-group {
    flex-direction: column;
    gap: 0.75rem;
  }
}
```

---

## 🎯 **Criterios de Implementación**

### **1. Consistencia**
- Todos los elementos usan las mismas variables CSS
- Espaciado uniforme con sistema de espaciado
- Tipografía consistente

### **2. Feedback Visual**
- Estados claros para error, éxito y validación
- Animaciones que guían la atención del usuario
- Colores semánticos (rojo=error, verde=éxito)

### **3. Accesibilidad**
- Contraste adecuado en todos los elementos
- Estados de foco visibles
- Textos descriptivos para lectores de pantalla

### **4. Performance**
- Animaciones optimizadas con `transform` y `opacity`
- Transiciones suaves pero no excesivas
- Efectos visuales ligeros

---

## 📁 **Estructura de Archivos CSS**

```
src/assets/styles/
├── base.css          # Variables, reset, utilidades, estilos base de todos los componentes
├── components.css    # Estilos de componentes (layout, estilos específicos adicionales)
├── responsive.css    # Media queries y responsive
└── main.css         # Importa todos los archivos
```

---

## 🔧 **Uso en Componentes**

### **Clases CSS Principales**
- `.form-header` - Header del formulario
- `.form-group` - Contenedor de campo
- `.form-input` - Campo de entrada
- `.form-footer` - Footer del formulario
- `.error-message` - Mensaje de error
- `.server-message` - Mensaje del servidor
- `.btn` - Botón base
- `.btn-primary` - Botón principal
- `.btn-secondary` - Botón secundario

### **Estados Dinámicos**
- `.has-error` - Grupo con error
- `.has-success` - Grupo con éxito
- `.has-warning` - Grupo con advertencia
- `.error` - Campo con error
- `.success` - Campo válido
- `.warning` - Campo con advertencia
- `.disabled` - Elemento deshabilitado

---

## ✨ **Mejoras Implementadas**

1. **Variables CSS Específicas**: Definición clara de colores para cada estado de form-input, form-header, form-footer y todos los tipos de botones
2. **Estados de Validación Visuales**: Campos cambian de color según validación
3. **Animaciones de Feedback**: Shake para errores, fadeIn para mensajes
4. **Efectos de Hover Mejorados**: Shimmer en botones, escalado en campos
5. **Mensajes Contextuales**: Diferentes estilos para diferentes tipos de mensaje
6. **Responsive Optimizado**: Adaptación perfecta a móviles
7. **Accesibilidad Mejorada**: Estados de foco claros y contraste adecuado
8. **Sistema de Variables Centralizado**: Fácil mantenimiento y consistencia
9. **Organización Modular**: Estilos base en base.css, estilos específicos en components.css
10. **Consistencia en Componentes**: Todos los elementos (form-input, form-header, form-footer, btn, btn-primary, btn-secondary) siguen el mismo patrón de variables CSS
11. **Arquitectura de Botones Independiente**: Resuelto el problema de solapamiento entre clases de botones