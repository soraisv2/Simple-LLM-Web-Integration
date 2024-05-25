<!-- src/views/Home.vue -->
<template>
    <div>
        <h1>Login</h1>
        <div>
            <h1>Créer un compte</h1>
            <form @submit.prevent="register">
                <div v-if="!isHaveAnAccount">
                    <div>
                        <input type="email" id="email" placeholder="Email" required /><br>
                        <input type="password" id="password" placeholder="Password" required />
                    </div>
                    <button @click="register" type="submit">Inscription</button><br>
                    <span>Déjà un compte ? <a @click="isHaveAnAccount = true">Connection</a></span>
                </div>
                <div v-else>
                    <div>
                        <input type="email" id="l-email" placeholder="Email" required /><br>
                        <input type="password" id="l-password" placeholder="Password" required />
                    </div>
                    <button @click="login" type="submit">Connection</button><br>
                    <span>Déjà un compte ? <a @click="isHaveAnAccount = false">Créer un compte</a></span>
                </div>
            </form>
        </div>
        <button @click="signInWithGoogle"><img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                width="50" alt="">Se connecter avec Google</button>
    </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            isHaveAnAccount: false
        }
    },
    methods: {
        async signInWithGoogle() {
            const auth = getAuth()
            try {
                const provider = new GoogleAuthProvider();
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                console.log("Utilisateur connecté:", user);
            } catch (error) {
                console.error("Erreur lors de la connexion avec Google:", error);
            }
        },
        async register() {
            const auth = getAuth()
            const email = document.getElementById("email").value
            const password = document.getElementById("password").value
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential.user.uid)
                    this.$router.push({ name: 'home' })
                })
                .catch((error) => {
                    console.log(error)
                });
        },
        login() {
            const auth = getAuth()
            const l_email = document.getElementById("l-email").value
            const l_password = document.getElementById("l-password").value
            signInWithEmailAndPassword(auth, l_email, l_password)
                .then(() => {
                    this.$router.push({ name: 'home' })
                })
                .catch(() => {
                    // console.log(error)
                });
        }
    }
};

</script>