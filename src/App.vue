<template>
  <v-app>
    <router-view>
      <Agenda/>
    </router-view>
  </v-app>
</template>

<script>
import Agenda from  '@/components/Agenda'
  export default {
    name: 'app',
    components: { Agenda },
  }
</script>