<template>
  <div class="q-pa-md">
    <q-table
      title="Liste des livres"
      :rows="rows"
      :columns="columns"
      row-key="id"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: [],
      columns: [
        {
          name: 'titre',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'titre',
          sortable: true
        },
        {
          name: 'qtestock',
          align: 'left',
          label: 'Quantité en Stock',
          field: 'qtestock',
          sortable: true
        },
        {
          name: 'prix',
          align: 'left',
          label: 'Prix',
          field: 'prix',
          sortable: true
        }
      ]
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch("https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/5/livres")
        .then(response => response.json())
        .then(data => {
          this.rows = data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }
};
</script>
