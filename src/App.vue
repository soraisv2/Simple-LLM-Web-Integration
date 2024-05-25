<template>
  <div class="app-body">
    <div class="container-fluid">
      <div class="row">
        <div v-if="isAuth" class="my_nav">
          <img v-if="user.photoURL" :src="user.photoURL" alt="User Image" class="user-image" />
          <span v-else>{{ user.displayName ? user.displayName : user.email }}</span>
          <button @click="logOut">Log out</button>
        </div>
        <router-view class=""></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";

export default {
  name: 'App',
  data() {
    return {
      isAuth: false,
      user: {}
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isAuth = true
        this.user = user
        this.$router.push({ name: 'home' })
      }
      else this.$router.push({ name: 'login' })
    });
  },
  methods: {
    logOut() {
      const auth = getAuth();
      signOut(auth) // Déconnecte l'utilisateur
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Erreur lors de la déconnexion :", error);
        });
    }
  }
}
</script>

<style>
#app {
  font-family: system-ui;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dcdcdc;
}

.app-body {
  background-color: #f0f0f0;
  min-height: 100vh;
}

.my_nav {
  background-color: #212121;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  height: 60px;
  position: fixed;
}

.my_nav button {
  border: none;
  border-radius: 10px;
  padding: 0px 18px;
  height: 30px;
  background-color: transparent;
  border: 1px solid red;
  color: #ff0000;
  margin-left: 20px;
  transition-duration: 0.4s;
}

.my_nav button:hover {
  transition-duration: 0.4s;
  background-color: red;
  color: white;
}

.my_nav img {
  border-radius: 100px;
  width: 40px;
  border: 2px solid grey;
}

.my_loader {
    animation: rotate 0.5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
