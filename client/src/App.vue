<template>
  <div class="app-body">
    <div class="container-fluid">
      <div class="row">
        <div v-if="isAuth" class="my_nav col-12 col-md-2">
          <!-- <router-link to="/">Accueil</router-link> -->
          <!-- <router-link to="/about">À propos</router-link> -->
          <span>{{ user.displayName ? user.displayName : user.email }}</span>
          <button @click="logOut">Log out</button>
        </div>
        <router-view class="col-12 col-md-10"></router-view>
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
  color: #2c3e50;

}

.app-body {
  background-color: #212121;
  min-height: 100vh;
}

.my_nav {
  background-color: #171717;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

@media (min-width: 768px) {
  .my_nav {
    height: 100vh;
  }
}

@media (max-width: 768px) {
  .my_nav {
    height: 100%;
  }
}
</style>
