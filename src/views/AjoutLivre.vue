<template>

<div class="q-pa-md">
  <div class="q-gutter-md" style="max-width: 500px">
    <h1>Ajouter Nouveau livre</h1>
    <form @submit.prevent="addLivre(livre)" class="my-form">
      <div class="form-group">
        <label for="titre" class="form-label">Titre</label>
        <input type="text" id="titre" class="form-input" v-model="livre.titre"  required/>
      </div>
      <div class="form-group">
        <label for="qtestock" class="form-label">Quantité</label>
        <input type="number" id="qtestock" class="form-input" v-model="livre.qtestock"  min="1"  required/>
      </div>
      <div class="form-group">
        <label for="prix" class="form-label">Prix</label>
        <input type="number" id="prix" class="form-input" v-model="livre.prix"  min="1" required />
      </div>
      <input type="submit" class="submit-btn"  value="Ajouter livre" > 
    
    </form>
  </div>

   
  </div>

  <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
     <img src="https://cdn.pixabay.com/photo/2021/06/17/19/13/books-6344402_1280.png">
    </q-drawer>
  <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/47/LOGO_CHAMPOLLION.png">
          </q-avatar>
          <div>Université Toulouse III </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <Swal v-if="showAlert" @confirm="resetLivre" title="Notification" text="Livre ajouté avec succès." icon="success" />

   

</template>

<script setup>
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

import { reactive,ref } from "vue";
import Livre from "../Livre.js";
const loading = ref(false);
const livre = reactive(Livre);
const showAlert = ref(false);


function addLivre(l) {
  loading.value = true; // Désactiver le bouton pendant la requête

  console.log("sdksdlfknsdlkfnl")
  let url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres";
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({

      titre: l.titre,
      qtestock: l.qtestock,
      prix: l.prix,
    }),
  };
  fetch(url, fetchOptions)
    .then((response) => {

      return response.json();

    })
    .then((dataJSON) => {
      loading.value = false; // Activer le bouton une fois la requête terminée
      showNotif(livre); // Afficher la notification
    


    
    })
    .catch((error) => {
      loading.value = false;
      console.log(error);
    });
    
}
function showNotif(l) {
  Swal.fire({
    title: 'Notification',
    text: 'Livre ajouté avec succès.',
    icon: 'success',
    showConfirmButton: false, // Masquer le bouton OK
    timer: 3000, // Durée en millisecondes avant de masquer la notification
    timerProgressBar: true // Afficher une barre de progression pendant le délai
  });
  setTimeout(() => {
    location.reload();
  }, 3000);
}



</script>
<style>
h1{
  color: rgb(150, 69, 69);
  font-size: xx-large;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
text-align: center;}

.q-pa-md {
  padding: 16px;
}

.q-gutter-md {
  margin: 0 -8px;
}

.my-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  width: 100%;
  padding: 8px;
  background-color: #FF8C00;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>