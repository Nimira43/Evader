<script setup>
import Header from './components/HeaderComponent.vue'
import Body from './components/BodyComponent.vue'
import Footer from './components/FooterComponent.vue'
</script>

<template>
  <div class="container">

    <Header />
    <div class="row">
      <div class="col">
        <h1 class="logo">Serapium</h1>
        <hr>
        <Body />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap');

* {
  font-family: 'Coromorant Garamond', serif;
  font-weight: 300;
}

.logo {
  font-family: 'Bonheur Royale', serif;
}
</style>
