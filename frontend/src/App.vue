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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>