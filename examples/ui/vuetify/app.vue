<template>
  <div class="d-flex align-center flex-column">
    <v-icon>mdi-home</v-icon>
    <v-card width="400">
      <v-card-title>This is a title</v-card-title>
      <v-card-subtitle>This is a subtitle</v-card-subtitle>
      <v-card-text> This is content </v-card-text>
    </v-card>
    <v-btn class="mt-10">
      Hello Sass Changes
    </v-btn>
  </div>
</template>

<style lang="sass">
@import 'vuetify/lib/styles/main.sass'
@import '@mdi/font/css/materialdesignicons.min.css'
</style>
