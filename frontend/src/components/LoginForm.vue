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

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            @blur="validateEmail"
            @input="clearEmailError"
            :class="['form-input', { 'error': errors.email }]"
            placeholder="tu@email.com"
            required
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            @blur="validatePassword"
            @input="clearPasswordError"
            :class="['form-input', { 'error': errors.password }]"
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
      serverError: '', // Para errores del servidor
      isSuccessMessage: false // Para distinguir entre errores y éxitos
    }
  },
  methods: {
    validateEmail() {
      const email = this.formData.email.trim()

      if (this.isEmailEmpty(email)) {
        return this.setEmailError('El email es requerido')
      }

      if (this.isEmailInvalid(email)) {
        return this.setEmailError('Ingresa un email válido')
      }

      return this.clearEmailError()
    },

    validatePassword() {
      const password = this.formData.password.trim()

      if (this.isPasswordEmpty(password)) {
        return this.setPasswordError('La contraseña es requerida')
      }

      if (this.isPasswordTooShort(password)) {
        return this.setPasswordError('La contraseña debe tener al menos 6 caracteres')
      }

      return this.clearPasswordError()
    },

    // Helper methods for email validation
    isEmailEmpty(email) {
      return !email
    },

    isEmailInvalid(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return !emailRegex.test(email)
    },

    setEmailError(message) {
      this.errors.email = message
      return false
    },

    // Helper methods for password validation
    isPasswordEmpty(password) {
      return !password
    },

    isPasswordTooShort(password) {
      return password.length < 6
    },

    setPasswordError(message) {
      this.errors.password = message
      return false
    },

    clearEmailError() {
      this.clearFieldError('email')
      this.clearServerError()
    },

    clearPasswordError() {
      this.clearFieldError('password')
      this.clearServerError()
    },

    clearFieldError(fieldName) {
      if (this.errors[fieldName]) {
        this.errors[fieldName] = ''
      }
    },

    clearServerError() {
      this.serverError = ''
      this.isSuccessMessage = false
    },

    validateForm() {
      const isEmailValid = this.validateEmail()
      const isPasswordValid = this.validatePassword()
      return isEmailValid && isPasswordValid
    },

    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }

      this.prepareForSubmission()

      try {
        await this.performLoginRequest()
      } catch (error) {
        this.handleConnectionError(error)
      } finally {
        this.isSubmitting = false
      }
    },

    prepareForSubmission() {
      this.clearServerError()
      this.isSubmitting = true
    },

    async performLoginRequest() {
      this.logLoginAttempt()

      const { response, data } = await this.sendLoginRequest()

      if (response.ok) {
        this.handleSuccessfulLogin(data)
      } else {
        this.handleLoginError(data)
      }
    },

    logLoginAttempt() {
      console.log('🔄 Enviando datos de login al backend:', {
        email: this.formData.email,
        password: '[HIDDEN]'
      })
    },

    async sendLoginRequest() {
      return await apiRequest(API_CONFIG.ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({
          email: this.formData.email,
          password: this.formData.password
        })
      })
    },

    handleSuccessfulLogin(data) {
      console.log('✅ Login exitoso:', data)
      this.showSuccessMessage(data.user.email)
      this.resetForm()
    },

    handleLoginError(data) {
      console.error('❌ Error en login:', data)
      this.showErrorMessage(data.message || 'Error al iniciar sesión')
    },

    handleConnectionError(error) {
      console.error('❌ Error de conexión:', error)
      this.showErrorMessage('Error de conexión. Verifica que el servidor esté ejecutándose.')
    },

    showSuccessMessage(userEmail) {
      this.serverError = `¡Inicio de sesión exitoso! Bienvenido ${userEmail}`
      this.isSuccessMessage = true
    },

    showErrorMessage(message) {
      this.serverError = message
      this.isSuccessMessage = false
    },

    resetForm() {
      this.formData = {
        email: '',
        password: ''
      }
    },

    goToRegister() {
      // Emitir evento para cambiar a la vista de registro
      this.$emit('go-to-register')
    }
  }
}
</script>

<style scoped>
/* Los estilos ahora están en archivos CSS separados */
</style>