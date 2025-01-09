<script setup lang="ts">
import { useMemory, useOnline } from '@vueuse/core';
import { useLogout } from '~/composables/auth';
import { useWindowSize, useFps } from '@vueuse/core'
import { useMyManagerStore } from '~/store/ManagerTrips';

const fps = useFps()
const userInfo = await getUserInfo();
const { isSupported, memory } = useMemory();
const props = defineProps<{ styleProps?: string, showName?: boolean, showIcon?: boolean }>();
const { state } = useMyManagerStore();

const online = useOnline();

const clazz = computed(() => online.value ? 'text-green-700 font-bold dark:text-green-500' : 'text-gray');
const text = computed(() => online.value ? 'Online' : 'Offline');

interface InterfaceItems {
  slot: string;
  disabled?: boolean;
  label: string;
  icon?: string;
  click?: () => void;
}

const items: InterfaceItems[][] = [
  [{
    slot: 'metrics',
    disabled: true,
    label: 'Metricas',
  },
  {
    label: 'Alterar Senha',
    slot: 'changePassword',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => { state.isOpenChangePassword = true }
  },
  {
    label: 'Sobre',
    slot: 'about',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => { state.isOpenAbount = true }
  },
  {
    label: 'Sair',
    slot: 'logout',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => { useLogout() }
  },
],
]

function size(v: number) {
  const kb = v / 1024 / 1024
  return `${kb.toFixed(2)} MB`
}

// DIMENSÃO DA TELA
const { width, height } = useWindowSize();

</script>

<template>
  <UDropdown :items="items" :ui="{
    wrapper: 'relative z-[9999]',
    width: 'w-[16rem]',
    base: 'py-2',
    item: {
      disabled: 'cursor-auto opacity-100',
    },
  }" :popper="{ placement: 'bottom-start', arrow: true }" :mode="'click'">

    <div class="flex items-center gap-2">
      <UTooltip :text="userInfo?.full_name" :ui="{ background: 'dark:bg-black', base: 'font-semibold' }">
        <button class="bg-blue-100 rounded-full h-7 w-7 border-2 border-blue-600 
  dark:bg-blue-500 dark:border-white dark:font-medium" :class="props.styleProps">
          {{ userInfo?.first_name?.split('')[0] }}
          <GlobalIcon v-if="!userInfo?.first_name" class="w-full h-6 flex justify-center items-center"
            name="material-symbols:person-rounded" />
        </button>
      </UTooltip>

      <p class="text-sm font-semibold" v-if="props.showName">{{ userInfo?.first_name?.split(' ')[0] }}</p>

      <GlobalIcon v-if="props.showIcon" name="uis:angle-down" class="w-6 h-6" />
    </div>

    <template #metrics="{ item }">
      <div class="text-center  w-full select-none">
        <div
          class="text-base bg-slate-100 dark:bg-[#0f1013] rounded-md dark:text-white text-gray-800 font-semibold select-none">
          {{ userInfo?.first_name }}</div>

        <div class="my-2 ">
          <GlobalIcon name="material-symbols:memory-outline"
            class="m-auto text-green-700 w-7 h-7 dark:text-green-500" />

          <div class="font-bold flex items-center justify-center gap-1">
            Status:
            <div class="h-2.5 w-2.5 rounded-full" :class="text == 'Online' ? 'bg-green-500' : 'bg-red-500'"></div>
            <b :class="clazz">{{ text }}</b>
            FPS: 
            <div>{{ fps }}</div>
          </div>
        </div>

        <div v-if="isSupported && memory"
          class="inline-grid grid-cols-2 gap-x-4 gap-y-2 dark:text-white  text-black font-semibold">
          <template v-if="memory">
            <div opacity="50">
              Em uso
            </div>
            <div>{{ size(memory.usedJSHeapSize) }}</div>
            <div opacity="50">
              Alocado
            </div>
            <div>{{ size(memory.totalJSHeapSize) }}</div>
            <div opacity="50">
              Limite
            </div>
            <div>{{ size(memory.jsHeapSizeLimit) }}</div>
          </template>
        </div>

        <div class="font-bold text-red-600 dark:text-white mt-4">Largura: {{ width }} X Altura: {{ height }}</div>

        <div class="mt-3">© 2019 Copyright Modena e Silva</div>
        <div class="mt-3">Versão 2.0.0</div>
      </div>
    </template>

    <template #changePassword="{ item }">
      <div
        class="text-black border flex bg-white items-center rounded-sm py-0.5 justify-center w-full font-semibold">
          {{ item.label }}
      </div>
    </template>

    <template #about="{ item }">
      <div
        class="text-black border flex bg-white items-center  rounded-sm py-0.5 justify-center w-full font-semibold">
        {{ item.label }}
      </div>
    </template>

    <template #logout="{ item }">
      <div
        class="text-white flex bg-red-600 items-center  rounded-sm py-0.5 justify-center w-full font-semibold">
        <GlobalIcon name="material-symbols:logout-rounded" class="h-5 w-6 text-white" />
        {{ item.label }}
      </div>
    </template>

  </UDropdown>
</template>
