<script setup>
import {  RouterView } from 'vue-router'
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-warning text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="./assets/lib-logo.jpg">
          </q-avatar>
          Maison de Campus
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="Rechereche des livres" />
        <q-route-tab to="/page2" label="Ajouter un livre" />
        <q-route-tab to="/page3" label="About Us" />
      </q-tabs>
    </q-header>

    <q-page-container>
    

      <router-view />
    </q-page-container>

  </q-layout>
</template>




