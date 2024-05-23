<template>
  <div class="home">
    <div v-if="loading">Chargement...</div>
    <div v-else class="row">
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
      <div class="prompt-container">
        <input id="input" type="text" placeholder="Message au model">
        <img @click="askServer" src="@/assets/arrow.png" width="45" alt="">
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
      loading: true
    }
  },
  methods: {
    async askServer() {
      try {
        const auth = getAuth();
        const db = getDatabase();
        const inputText = document.getElementById("input").value;
        const response = await fetch("http://213.210.20.155:5000/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ input_text: inputText })
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
  color: #e4e4e4;
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
}

.prompt .prompt-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #2f2f2f; */
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
}

@media (min-width: 768px) {

  .prompt {
    width: 80%;
  }

  .prompt input {
    width: 50%;
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
