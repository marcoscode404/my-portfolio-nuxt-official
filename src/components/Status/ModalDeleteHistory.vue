<script setup lang="ts">
import type { InterfaceDriver } from '~/store/types';

const propsIsOpenModal = defineModel<boolean>('onOpenModal');
const propsData = defineModel<InterfaceDriver>('data');
const title = defineProps<{ text: string }>();

const emit = defineEmits(['close', 'onConfirmDelete']);
function handleDelete() {
  emit('onConfirmDelete')
}

</script>

<template>
  <UModal v-model="propsIsOpenModal" :transition="false" @close="emit('close')" :ui="{
    wrapper: 'relative z-[99992]',
    height: 'h-44',
    base: 'border dark:border-black border-gray-500 drop-shadow-xl',
    overlay: {
      base: 'fixed inset-0 w-full',
      background: 'bg-gray-800/65 brightness-[.4]',
      transition: {
        enter: '', enterFrom: '', enterTo: '', leave: 'ease-in duration-0', leaveFrom: '', leaveTo: '',
      },
    },
  }">
    <header class="flex justify-between">
      <h2 class="p-2 text-xl">
        {{ title.text }}
      </h2>

      <button @click="emit('close')" class="px-2">
        <GlobalIcon class="w-4 h-4 text-black" name="ci:close-lg" />
      </button>
    </header>

    <span class="px-2">ID: {{ propsData?.id }}</span>
    <span class="px-2">Nome: {{ propsData?.nome }}</span>
    <p class="flex-1 p-2">Deseja realmente apagar esta informação ?</p>

    <div class="flex h-10 px-4 justify-end gap-4">
      <button class="text-msRed500 font-semibold px-2 h-8" @click="emit('close')">Cancelar</button>
      <button @click="handleDelete()" class="btn-success px-4 h-8">
        Confirmar
      </button>
    </div>
  </UModal>
</template>