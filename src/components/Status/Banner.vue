<script setup lang="ts">
import brImage from '../../static/images/banner01.jpeg'; 
import brImage2 from '../../static/images/banner02.png'; 
import brImage3 from '../../static/images/banner03.png'; 

const items = [
  brImage,
  brImage2,
  brImage3,
  'https://picsum.photos/1920/1080?random=4',
  'https://picsum.photos/1920/1080?random=5',
  'https://picsum.photos/1920/1080?random=6'
]

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 5000)
})
</script>

<template>
  <UCarousel
    ref="carouselRef"
    v-slot="{ item }"
    :items="items"
    :ui="{ item: 'basis-full', arrows: {
    wrapper: 'flex items-center justify-between !bg-red-500'
  }, }"
    class="overflow-hidden h-44 lg:h-fit"
    :arrows="false"
  >
    <img :src="item" class="w-full object-cover	object-center" draggable="false">
  </UCarousel>
</template>

