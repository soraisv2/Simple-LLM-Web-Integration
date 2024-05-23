<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>Accueil</h1>
    <input id="input" type="text">
    <button @click="askServer">Get</button>
    {{ text }}
  </div>
</template>

<script>
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

export default {
  data() {
    return {
      text: ""
    }
  },
  methods: {
    async askServer() {
      try {
        const response = await fetch("http://213.210.20.155:5000/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            input_text: document.getElementById("input").value
          })
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la requête.");
        }

        const data = await response.json();
        console.log(data); // Traitez la réponse du serveur ici
        this.text = data.generated_text

        const auth = getAuth();
        const user = auth.currentUser;
        const db = getDatabase();
        set(ref(db, 'users/' + user.uid), {
          input: document.getElementById("input").value,
          result: data.generated_text,
        });


      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    }
  }
};
</script>