<template>
  <div class="home">
    <div v-if="loading">Chargement...</div>
    <div v-else class="row" style="padding-bottom: 75px;">
      <div v-for="item in items" :key="item.id" class="item col-12 col-lg-6 offset-lg-3">
        <div class="input-container">
          <p class="input">{{ item.input }}</p>
        </div>
        <div style="display: flex; justify-content: flex-start; align-items: flex-start;">
          <img src="@/assets/pin.png" width="30" alt="">
          <p class="result">{{ item.result }}</p>
        </div>
      </div>
    </div>
    <div class="prompt">
      <div class="prompt-container row">
        <div class="col-12 col-md-4" style="display: flex; justify-content: flex-end;">
          <button @click="selectModel('gpt-neo')" :class="{ active: selected_model === 'gpt-neo' }">gpt-neo</button>
          <button @click="selectModel('gpt2')" :class="{ active: selected_model === 'gpt2' }">gpt2</button>
          <button @click="selectModel('gpt3')" :class="{ active: selected_model === 'gpt3' }">gpt3</button>
        </div>
        <div class="col-12 col-md-8" style="display: flex; justify-content: flex-start;">
          <input v-if="selected_model == 'gpt-neo'" id="input" type="text" @keyup.enter="askServer" placeholder="Message GPT-neo">
          <input v-if="selected_model == 'gpt2'" id="input" type="text" @keyup.enter="askServer" placeholder="Message GPT-2">
          <input v-if="selected_model == 'gpt3'" id="input" type="text" @keyup.enter="askServer" placeholder="Message GPT-3.5">
          <div>
            <img v-if="!req_loading" @click="askServer" src="@/assets/arrow.png" width="55" alt="">
            <div style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;">
              <img v-if="req_loading" class="my_loader" src="@/assets/loading.png" width="30" alt="">
            </div>
          </div>
        </div>
      </div>
      <span>Le model peut faire des erreurs. Envisagez de vérifier les informations importantes.</span>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      text: "",
      items: [],
      loading: true,
      req_loading: false,
      selected_model: "gpt3",
    }
  },
  methods: {
    async askServer() {
      try {
        const auth = getAuth();
        const db = getDatabase();
        const inputText = document.getElementById("input").value;
        if (inputText == "") return
        this.req_loading = true
        const response = await fetch("http://213.210.20.155:5000/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ input_text: inputText, model: this.selected_model })
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la requête.");
        }

        const data = await response.json();
        this.text = data.generated_text;

        const user = auth.currentUser;

        if (user) {
          const userResultsRef = ref(db, 'users/' + user.uid + '/results');
          await push(userResultsRef, {
            input: inputText,
            result: data.generated_text,
          });
          console.log("Data added to list successfully");
        } else {
          console.error("User not authenticated");
        }
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
      this.req_loading = false
      window.scrollTo({
        top: document.body.scrollHeight, // Fait défiler jusqu'à la hauteur totale du document
        behavior: 'smooth' // Défilement en douceur
      });
      document.getElementById("input").value = ""
    },
    fetchItems(user) {
      const db = getDatabase();
      const userResultsRef = ref(db, 'users/' + user.uid + '/results');
      onValue(userResultsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.items = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
        } else {
          this.items = [];
        }
        this.loading = false;
      });
    },
    selectModel(model) {
      this.selected_model = model;
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.fetchItems(user);
      } else {
        console.error("User not authenticated");
        this.loading = false;
      }
    });
  }
};
</script>

<style>
.home {
  /* padding: 50px 400px; */
  background-color: #212121;
  min-height: 100vh;
  color: #e4e4e4;
  padding-top: 100px;
}

.item {
  margin-bottom: 20px;
  /* color: #d1d1d1; */
}

.item p {
  padding: 10px 20px;
}

.item .input-container {
  text-align: right
}

.item .input {
  background-color: #2f2f2f;
  border-radius: 100px;
  display: inline-block;
  right: 0;
}

.item .result {
  text-align: left;
}


.prompt {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 10px;

  background-color: #212121;
}

.prompt .prompt-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #2f2f2f; */
}

.prompt .prompt-container button {
  border: none;
  border-radius: 15px;
  padding: 8px 20px;
  background-color: transparent;
  color: #e3e3e3;
  margin: 0 10px;
  transition-duration: 0.4s;
}

.prompt .prompt-container button:hover {
  background-color: #2f2f2f;
  transition-duration: 0.4s;
}

.active {
  background-color: #2f2f2f !important;
}

.prompt span {
  color: #bebebe;
  font-size: 13px;
}

.prompt input {
  padding: 15px 30px;
  width: 100%;
  background-color: #2f2f2f;
  border: none;
  border-radius: 100px;
  color: #e3e3e3;
  font-size: 16px;
  outline: none;
  /* margin: 0 10px; */
}

@media (min-width: 768px) {

  .prompt {
    width: 100%;
  }

  .prompt input {
    width: 40%;
  }

}

.prompt img {
  border-radius: 100px;
  cursor: pointer;
  transition-duration: 0.4s;
  opacity: 0.5;
}

.prompt img:hover {
  transition-duration: 0.4s;
  opacity: 1;
}
</style>