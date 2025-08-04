<template>
  <div class="app">
    <LoginForm v-if="currentView === 'login'" @go-to-register="switchToRegister" />
    <RegisterForm v-else @go-to-login="switchToLogin" />
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

export default {
  name: 'App',
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      currentView: 'login' // 'login' o 'register'
    }
  },
  methods: {
    switchToRegister() {
      this.currentView = 'register'
    },
    switchToLogin() {
      this.currentView = 'login'
    }
  }
}
</script>