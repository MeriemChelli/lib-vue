<template>
  <div class="q-pa-md">
    <q-carousel animated v-model="slide" arrows navigation infinite>
      <q-carousel-slide :name="1" img-src="https://www.themelia.fr/wp-content/uploads/2022/01/Image3.jpg" />
      <q-carousel-slide :name="2" img-src="https://www.themelia.fr/wp-content/uploads/2022/01/IMG_0149-scaled.jpg" />

      <q-carousel-slide :name="3" img-src="https://www.themelia.fr/wp-content/uploads/2022/01/DSC_0010-1024x561.jpg" />
      <q-carousel-slide :name="4" img-src="https://www.themelia.fr/wp-content/uploads/2022/01/Image2.jpg" />
    </q-carousel>
  </div>



  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-input v-model="this.motCle" label="Title" color="warning" />
      <q-btn color="warning" label="Recherche" @click="chercherLivre()" />

    </div>
  </div>

  <div class="q-pa-md">
    <table class="my-sticky-header-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.name">{{ column.label }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="column in columns" :key="column.name">{{ row[column.field] }}</td>
          <td>
            <button @click="AddStock(row)">
              <i class="material-icons">add</i>
            </button>
            <button  v-if="row.qtestock === 1"  @click="showConfirmation(row,row.id)">
              <i class="material-icons">delete</i>
            </button>
            <button v-else @click="onDelete(row, row.id)">
              <i class="material-icons">delete</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Vous voulez vraiment supprimer ce livre ?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Non" color="warning" @click="confirm = false" />

        <q-btn flat label="Oui" color="warning" @click="onDelete(selectedRow,selectedRowId)" />

      </q-card-actions>
    </q-card>
  </q-dialog>

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
</template>

<script>
import { ref } from 'vue'
const motCle = ref("");

export default {


  data() {
    return {
      rows: [],
      columns: [
        {
          name: 'titre',
          required: true,
          label: 'Title',
          align: 'center',
          field: 'titre',
          sortable: true
        },
        {
          name: 'prix',
          required: true,
          label: 'Prix en euro',
          align: 'center',
          field: 'prix',
          sortable: true
        },
        {
          name: 'qtestock',
          align: 'center',
          label: 'Quantité en Stock',
          field: 'qtestock',
          sortable: true
        },


      ]
    };
  },
  mounted() {
    this.AfficherListeLivre();

  },
  methods: {
    onEdit(id) {
      // Code pour l'action de modification
      console.log('Modifier la ligne avec l\'ID:', id);
    },

    showConfirmation(row,id) {
      this.selectedRow=row
      this.selectedRowId = id;
      this.confirm = true;
    },
chercherLivre(){
  fetch( "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres?search=" +this.motCle)
    .then(response => response.json())
    .then(dataJSON => {
      this.rows = dataJSON;
      console.log(dataJSON)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });


},

    onDelete(row, id) {

      const url = `https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres/${id}`
      const fetchOptions = { method: "DELETE" };

      if (row.qtestock == 1) {

        fetch(url, fetchOptions)
          .then((response) => {
            return response.json();
          })
          .then((dataJSON) => {
            console.log(this.selectedRowId)
            this.AfficherListeLivre();


          })
          .catch((error) => {
            console.log(error);
          });
        // Code pour supprimer la ligne avec this.selectedRowId
        console.log('Supprimer la ligne avec l\'ID:', this.selectedRowId);
        this.confirm = false;
      }
      else {
        this.supprimerUnLivre(row)
      }
    },
  
  supprimerUnLivre(row) {

    const url = `https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres`

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        id: row.id,
        titre: row.titre,
        prix: row.prix,
        qtestock: row.qtestock - 1,
      }),
    };
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        if(this.motCle){
        this.chercherLivre();
        }
        else{
          this.AfficherListeLivre();
        }


      })
      .catch((error) => {
        console.log(error);
      });

  },



  AddStock(row) {
    const url = `https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres`

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        id: row.id,
        titre: row.titre,
        prix: row.prix,
        qtestock: row.qtestock + 1,
      }),
    };
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        if(this.motCle){
        this.chercherLivre();
        }
        else{
          this.AfficherListeLivre();
        }


      })
      .catch((error) => {
        console.log(error);
      });
  }







,




AfficherListeLivre() {
  fetch("https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres")
    .then(response => response.json())
    .then(dataJSON => {
      this.rows = dataJSON;
      console.log(dataJSON)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });



},

  },

setup() {
  return {
    slide: ref(1),
    confirm: ref(false)
  }

}
}

</script>
<style lang="sass">
.my-sticky-header-table
 

  thead tr:first-child th
    background-color: #FF8C00
    font-size:15px
    color:#FFFFFF


    
</style>
<style>
.my-sticky-header-table {
  border-collapse: collapse;
  width: 100%;
}

.my-sticky-header-table th,
.my-sticky-header-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.my-sticky-header-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.my-sticky-header-table tbody tr:hover {
  background-color: #f0f0f0;
}

.my-sticky-header-table button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
}

.my-sticky-header-table button i {
  font-size: 18px;
}



.my-sticky-header-table button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-sticky-header-table button i {
  font-size: 18px;
  margin-right: 4px;
}

.my-sticky-header-table button:hover {
  background-color: #e0e0e0;
}

.my-sticky-header-table button:focus {
  outline: none;
  box-shadow: 0 0 3px #888;
}
</style>
