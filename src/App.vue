<template>
  <v-app >
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Issues Project</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/diico/issues-create"
        target="_blank"
      >
        <span class="mr-2">Último Release</span>
        <v-icon>fas fa-external-link-alt</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view class="mb-5"/>
    </v-content>

    <v-footer
        dark
        height="auto"
        fixed
      >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-actions class="grey darken-3 justify-center">
          &copy;2019 — <strong>Valdir Botingnon</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
