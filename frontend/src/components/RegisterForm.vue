<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="form-header">
        <h1>Crear Cuenta</h1>
        <p>Completa los datos para registrarte</p>
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

        <div class="form-group" :class="{ 'has-error': errors.confirmPassword, 'has-success': !errors.confirmPassword && formData.confirmPassword }">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            @blur="validateConfirmPassword"
            @input="clearConfirmPasswordError"
            class="form-input"
            :class="{ 'error': errors.confirmPassword, 'success': !errors.confirmPassword && formData.confirmPassword }"
            placeholder="Confirma tu contraseña"
            required
          />
          <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting">Creando cuenta...</span>
            <span v-else>Crear Cuenta</span>
          </button>
          <button type="button" class="btn btn-secondary" @click="goToLogin" :disabled="isSubmitting">
            Cancelar
          </button>
        </div>
      </form>

      <div class="form-footer">
        <p>¿Ya tienes una cuenta? <a href="#" @click.prevent="goToLogin">Inicia sesión aquí</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiRequest, API_CONFIG } from '../config/api.js'

export default {
  name: 'RegisterForm',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: {
        email: '',
        password: '',
        confirmPassword: ''
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

    validateConfirmPassword() {
      const confirmPassword = this.formData.confirmPassword.trim()

      if (!confirmPassword) {
        this.errors.confirmPassword = 'Confirma tu contraseña'
        return false
      }

      if (confirmPassword !== this.formData.password) {
        this.errors.confirmPassword = 'Las contraseñas no coinciden'
        return false
      }

      this.errors.confirmPassword = ''
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

    clearConfirmPasswordError() {
      this.errors.confirmPassword = ''
      this.serverError = ''
    },

    async handleSubmit() {
      if (!this.validateEmail() || !this.validatePassword() || !this.validateConfirmPassword()) {
        return
      }

      this.isSubmitting = true
      this.serverError = ''

      try {
        console.log('🔄 Enviando datos de registro:', { email: this.formData.email, password: '[HIDDEN]' })

        const { response, data } = await apiRequest(API_CONFIG.ENDPOINTS.REGISTER, {
          method: 'POST',
          body: JSON.stringify({
            email: this.formData.email,
            password: this.formData.password
          })
        })

        if (response.ok) {
          console.log('✅ Registro exitoso:', data)
          this.serverError = `¡Cuenta creada exitosamente! Usuario ${data.userId} registrado.`
          this.isSuccessMessage = true
          this.formData = { email: '', password: '', confirmPassword: '' }

          // Redirigir al login después de 2 segundos
          setTimeout(() => {
            this.goToLogin()
          }, 2000)
        } else {
          console.error('❌ Error en registro:', data)
          this.serverError = data.message || 'Error al crear la cuenta'
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

    goToLogin() {
      this.$emit('go-to-login')
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

/* Mejoras específicas para el formulario de registro */
.form-input:focus {
  transform: scale(1.02);
}

.btn-primary:disabled {
  background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%);
  cursor: not-allowed;
}

.btn-secondary:disabled {
  opacity: 0.5;
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

  .button-group {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>