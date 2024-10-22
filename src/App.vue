
<template>
  <div>
    <button v-if="!isModalVisible" @click="openModal">
      Open modal
    </button>
   <ModalComponent  v-if="isModalVisible" @close-modal="closeModal"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import ModalComponent from "./components/ModalComponent.vue";

const isModalVisible = ref(false);

const openModal = () => {
  isModalVisible.value = true;
}

const closeModal = () => {
  console.log('ss')
  isModalVisible.value = false;  
};

</script>


<style scoped>

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
