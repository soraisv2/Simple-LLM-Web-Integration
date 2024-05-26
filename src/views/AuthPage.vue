<template>
    <div class="container">
        <div class="row" style="min-height: 100vh;">
            <form class="f-container col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4"
                @submit.prevent="isHaveAnAccount ? login() : register()">
                <h1>GPT testeur</h1>
                <div v-if="!isHaveAnAccount">
                    <p>Bienvenue, inscrivez vous et chatter</p>
                    <div>
                        <input v-model="registerEmail" type="email" placeholder="Email" required /><br>
                        <input v-model="registerPassword" type="password" placeholder="Password" required />
                    </div>
                    <button id="submit" type="submit">
                        <span v-if="!loading">Inscription</span>
                        <div v-else>
                            <img class="my_loader" src="@/assets/loading.png" width="30" alt="">
                        </div>
                    </button>
                    <span class="span">Déjà un compte ? <a style="color: blue;"
                            @click.prevent="isHaveAnAccount = true">Connection</a></span>
                    <button class="g-btn" @click="signInWithGoogle"><img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                            alt="">Se connecter avec Google</button>
                </div>
                <div v-else>
                    <p>Heureux de vous revoir :)</p>
                    <div>
                        <input v-model="loginEmail" type="email" placeholder="Email" required /><br>
                        <input v-model="loginPassword" type="password" placeholder="Password" required />
                    </div>
                    <button id="submit" type="submit">
                        <span v-if="!loading">Connection</span>
                        <div v-else>
                            <img class="my_loader" src="@/assets/loading.png" width="30" alt="">
                        </div>
                    </button>
                    <span class="span">Déjà un compte ? <a style="color: blue;"
                            @click.prevent="isHaveAnAccount = false">Créer un
                            compte</a></span>
                    <button class="g-btn" @click="signInWithGoogle"><img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                            alt="">Se connecter avec Google</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            isHaveAnAccount: false,
            registerEmail: '',
            registerPassword: '',
            loginEmail: '',
            loginPassword: '',
            loading: false
        }
    },
    methods: {
        async signInWithGoogle() {
            this.g_loading = true
            const auth = getAuth()
            try {
                const provider = new GoogleAuthProvider();
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                console.log("Utilisateur connecté:", user.uid);
            } catch (error) {
                console.error("Erreur lors de la connexion avec Google:", error);
            }
        },
        async register() {
            this.loading = true
            const auth = getAuth()
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword);
                console.log(userCredential.user.uid);
                this.loading = false
                this.$router.push({ name: 'home' });
            } catch (error) {
                console.log(error);
            }
        },
        async login() {
            this.loading = true
            const auth = getAuth()
            try {
                await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword);
                this.loading = false
                this.$router.push({ name: 'home' });
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>

<style>
form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* background-color: blue; */
    border-radius: 20px;
    text-align: left;
}

@media (min-width: 1230px) {
    .f-container {
        padding: 0 100px;
    }
}

form h1 {
    text-align: left;
    color: #7d7d7d;
    margin-bottom: 0px;
    width: 100%;
}

form p {
    margin-bottom: 50px;
    color: #a4a4a4;
}

form input {
    border: 1px solid #cfcfcf;
    border-radius: 10px;
    background-color: transparent;
    padding: 8px 18px;
    margin: 5px;
    color: rgb(57, 57, 57);
    width: 100%;
    outline: none;
}

form #submit {
    margin-top: 20px;
    width: 100%;
    border-radius: 10px;
    /* padding: 8px 18px; */
    border: none;
    color: #e5e5e5;
    background-color: #111111;
}

.span {
    color: #383838;
    text-align: center;
    width: 100%;
}

.span a {
    color: blue;
}

form button {
    margin-top: 20px;
    width: 100%;
    border-radius: 10px;
    padding: 8px 18px;
    border: none
}

form input::placeholder {
    color: #959595;
    /* Couleur du placeholder */
}

.g-btn {
    border: 1px solid rgb(217, 217, 217);
}

.g-btn img {
    width: 30px;
}
</style>