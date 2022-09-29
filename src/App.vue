<template>
  <v-app :class="className">
    <v-main>
      <HomePage/>
    </v-main>
  </v-app>
</template>

<script>
import HomePage from './components/HomePage';

export default {
  name: 'App',
  components: {
    HomePage,
  },

  data: () => ({
    className: "",
  }),
};
</script>