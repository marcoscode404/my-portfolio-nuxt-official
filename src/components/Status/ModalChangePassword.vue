<script lang="ts" setup>
import { useMyManagerStore } from '~/store/ManagerTrips';
const { state } = useMyManagerStore();
</script>

<template>
  <div>
    <UModal v-model="state.isOpenChangePassword" :transition="false" :overlay="true" :ui="{
      wrapper: 'relative z-[9991]',
      inner: 'fixed inset-0 overflow-y-hidden',
      height: 'h-[15rem]',
      width: 'sm:max-w-[40rem]',
      base: 'p-2 m-2 border border-gray-400',
      background: 'dark:bg-msDarkGrey',
      overlay: {
      base: 'fixed inset-0 w-full',
      background: 'bg-gray-800/65 brightness-[.4]',
      transition: {
        enter: '', enterFrom: '', enterTo: '', leave: 'ease-in duration-0', leaveFrom: '', leaveTo: '',
      },
    },
    }">
      <div class="p-4 text-justify leading-9 overflow-y-auto text-gray-800">
        <!-- @submit="onSubmit" -->
        <UForm :state="state" class="space-y-4 mx-2">
          <fieldset class="border border-gray-400 rounded-md container mx-auto p-4
        overflow-y-auto
      ">
            <legend>Alterar Senha</legend>

            <div class="flex w-full gap-4">
              <UFormGroup label="Nova Senha" name="description" class="flex flex-col w-full">
                <input type="password" class="border-b focus:border-b-2 border-gray-300 selection:border-b
                text-sm px-1 h-7 focus:border-blue-600 outline-none w-full" color="gray" variant="none">
              </UFormGroup>

              <UFormGroup label="Repetir Nova Senha" name="description" class="flex flex-col w-full">
                <input type="password" class="border-b focus:border-b-2 border-gray-300 selection:border-b
                text-sm px-1 h-7 focus:border-blue-600 outline-none w-full" color="gray" variant="none">
              </UFormGroup>
            </div>
            
            <button class="btn-info w-full mt-3">Alterar</button>
          </fieldset>
        </UForm>
      </div>
    </UModal>
  </div>
</template>