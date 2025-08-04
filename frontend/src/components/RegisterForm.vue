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

        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            @blur="validateConfirmPassword"
            @input="clearConfirmPasswordError"
            :class="['form-input', { 'error': errors.confirmPassword }]"
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

    validateConfirmPassword() {
      const confirmPassword = this.formData.confirmPassword.trim()

      if (this.isConfirmPasswordEmpty(confirmPassword)) {
        return this.setConfirmPasswordError('Confirma tu contraseña')
      }

      if (this.doPasswordsNotMatch(confirmPassword)) {
        return this.setConfirmPasswordError('Las contraseñas no coinciden')
      }

      return this.clearConfirmPasswordError()
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

    // Helper methods for confirm password validation
    isConfirmPasswordEmpty(confirmPassword) {
      return !confirmPassword
    },

    doPasswordsNotMatch(confirmPassword) {
      return confirmPassword !== this.formData.password
    },

    setConfirmPasswordError(message) {
      this.errors.confirmPassword = message
      return false
    },

    clearEmailError() {
      this.clearFieldError('email')
      this.clearServerError()
    },

    clearPasswordError() {
      this.clearFieldError('password')
      this.validateConfirmPasswordIfNeeded()
      this.clearServerError()
    },

    clearConfirmPasswordError() {
      this.clearFieldError('confirmPassword')
      this.clearServerError()
    },

    clearFieldError(fieldName) {
      if (this.errors[fieldName]) {
        this.errors[fieldName] = ''
      }
    },

    validateConfirmPasswordIfNeeded() {
      if (this.formData.confirmPassword && this.errors.confirmPassword) {
        this.validateConfirmPassword()
      }
    },

    clearServerError() {
      this.serverError = ''
      this.isSuccessMessage = false
    },

    validateForm() {
      const isEmailValid = this.validateEmail()
      const isPasswordValid = this.validatePassword()
      const isConfirmPasswordValid = this.validateConfirmPassword()
      return isEmailValid && isPasswordValid && isConfirmPasswordValid
    },

    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }

      this.prepareForSubmission()

      try {
        await this.performRegistrationRequest()
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

    async performRegistrationRequest() {
      this.logRegistrationAttempt()

      const { response, data } = await this.sendRegistrationRequest()

      if (response.ok) {
        this.handleSuccessfulRegistration(data)
      } else {
        this.handleRegistrationError(data)
      }
    },

    logRegistrationAttempt() {
      console.log('🔄 Enviando datos de registro al backend:', {
        email: this.formData.email,
        password: '[HIDDEN]'
      })
    },

    async sendRegistrationRequest() {
      return await apiRequest(API_CONFIG.ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify({
          email: this.formData.email,
          password: this.formData.password
        })
      })
    },

    handleSuccessfulRegistration(data) {
      console.log('✅ Registro exitoso:', data)
      this.showSuccessMessage()
      this.resetForm()
      this.scheduleRedirectToLogin()
    },

    handleRegistrationError(data) {
      console.error('❌ Error en registro:', data)
      this.showErrorMessage(data.message || 'Error al crear la cuenta')
    },

    handleConnectionError(error) {
      console.error('❌ Error de conexión:', error)
      this.showErrorMessage('Error de conexión. Verifica que el servidor esté ejecutándose.')
    },

    showSuccessMessage() {
      this.serverError = '¡Cuenta creada exitosamente! Redirigiendo al login...'
      this.isSuccessMessage = true
    },

    showErrorMessage(message) {
      this.serverError = message
      this.isSuccessMessage = false
    },

    resetForm() {
      this.formData = {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },

    scheduleRedirectToLogin() {
      setTimeout(() => {
        this.goToLogin()
      }, 1000)
    },

    goToLogin() {
      // Emitir evento para cambiar a la vista de login
      this.$emit('go-to-login')
    }
  }
}
</script>

<style scoped>
/* Los estilos ahora están en archivos CSS separados */
</style>