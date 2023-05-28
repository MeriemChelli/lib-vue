<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input v-model="text" label="Title" />

      <q-input filled v-model="text" label="Quantité en Stock" />

      <q-input outlined v-model="text" label="Prix" />

      <q-btn color="black" label="Ajouter livre" />

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      text: ref('')
    }
  }
}
</script>
