<template>
  <div>
    <div v-if="isAuth">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">À propos</router-link>
      <span>{{user.displayName ? user.displayName : user.email }}</span>
      <button @click="logOut">Log out</button>
    </div>
    <router-view></router-view>
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
        this.$router.push({name: 'home'})
      }
      else this.$router.push({name: 'login'})
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
