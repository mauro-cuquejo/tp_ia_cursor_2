<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="form-header">
        <h1>Iniciar Sesión</h1>
        <p>Ingresa tus credenciales para continuar</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <!-- Mensaje de error del servidor -->
        <div v-if="serverError" id="errorMessage" :class="['server-message', { 'success': isSuccessMessage, 'error': !isSuccessMessage }]">
          {{ serverError }}
        </div>

        <div class="form-group" :class="{ 'has-error': errors.email, 'has-success': !errors.email && formData.email }">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            @blur="validateEmail"
            @input="clearEmailError"
            class="form-input"
            :class="{ 'error': errors.email, 'success': !errors.email && formData.email }"
            placeholder="tu@email.com"
            required
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.password, 'has-success': !errors.password && formData.password }">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            @blur="validatePassword"
            @input="clearPasswordError"
            class="form-input"
            :class="{ 'error': errors.password, 'success': !errors.password && formData.password }"
            placeholder="Tu contraseña"
            required
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <span v-if="isSubmitting">Iniciando sesión...</span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>

      <div class="form-footer">
        <p>¿No tienes una cuenta? <a href="#" @click.prevent="goToRegister">Regístrate aquí</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiRequest, API_CONFIG } from '../config/api.js'

export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: ''
      },
      isSubmitting: false,
      serverError: '',
      isSuccessMessage: false
    }
  },
  methods: {
    validateEmail() {
      const email = this.formData.email.trim()

      if (!email) {
        this.errors.email = 'El email es requerido'
        return false
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        this.errors.email = 'Ingresa un email válido'
        return false
      }

      this.errors.email = ''
      return true
    },

    validatePassword() {
      const password = this.formData.password.trim()

      if (!password) {
        this.errors.password = 'La contraseña es requerida'
        return false
      }

      if (password.length < 6) {
        this.errors.password = 'La contraseña debe tener al menos 6 caracteres'
        return false
      }

      this.errors.password = ''
      return true
    },

    clearEmailError() {
      this.errors.email = ''
      this.serverError = ''
    },

    clearPasswordError() {
      this.errors.password = ''
      this.serverError = ''
    },

    async handleSubmit() {
      if (!this.validateEmail() || !this.validatePassword()) {
        return
      }

      this.isSubmitting = true
      this.serverError = ''

      try {
        console.log('🔄 Enviando datos de login:', { email: this.formData.email, password: '[HIDDEN]' })

        const { response, data } = await apiRequest(API_CONFIG.ENDPOINTS.LOGIN, {
          method: 'POST',
          body: JSON.stringify({
            email: this.formData.email,
            password: this.formData.password
          })
        })

        if (response.ok) {
          console.log('✅ Login exitoso:', data)
          this.serverError = `¡Inicio de sesión exitoso! Bienvenido ${data.user.email}`
          this.isSuccessMessage = true
          this.formData = { email: '', password: '' }
        } else {
          console.error('❌ Error en login:', data)
          this.serverError = data.message || 'Error al iniciar sesión'
          this.isSuccessMessage = false
        }
      } catch (error) {
        console.error('❌ Error de conexión:', error)
        this.serverError = 'Error de conexión. Verifica que el servidor esté ejecutándose.'
        this.isSuccessMessage = false
      } finally {
        this.isSubmitting = false
      }
    },

    goToRegister() {
      this.$emit('go-to-register')
    }
  }
}
</script>

<style scoped>
/* Estilos específicos del componente que complementan los estilos globales */
.auth-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.3s ease;
}

/* Animaciones específicas */
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

/* Estados de validación específicos */
.form-group.has-error .form-input {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Mejoras específicas para el formulario de login */
.form-input:focus {
  transform: scale(1.02);
}

.btn-primary:disabled {
  background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%);
  cursor: not-allowed;
}

/* Responsive específico */
@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
    margin: 10px;
  }

  .form-header h1 {
    font-size: 1.5rem;
  }
}
</style>