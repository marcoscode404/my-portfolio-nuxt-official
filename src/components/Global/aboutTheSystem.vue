<script lang="ts" setup>
import { useMyManagerStore } from '~/store/ManagerTrips';
const { state } = useMyManagerStore();
</script>

<template>
  <div>
    <UModal v-model="state.isOpenAbount" :transition="false" :appear="true" :ui="{
      wrapper: 'relative z-[9991]',
      inner: 'fixed inset-0 overflow-y-hidden',
      height: 'h-[90vh]',
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
        <h2 class="mb-4 text-lg underline">Sobre o Sistema TMS Viagens</h2>
        O TMS (Transportation Management System) é um Sistema desenvolvido para otimizar a gestão e o controle de
        processos logísticos relacionados
        ao transporte de cargas.

        <p class="text-justify ">
          "TMS" significa Transportation Management System (Sistema de Gerenciamento de Transporte), que é uma
          ferramenta ou software projetado para ajudar empresas a gerenciar suas operações de transporte e logística.

          No contexto de transportes, um TMS é usado para:

          Planejamento de Transporte

          Determinar as melhores rotas e modos de transporte.
          Planejar horários de entrega otimizados.
          Execução de Transporte

          Gerenciamento de pedidos.
          Rastreamento de cargas em tempo real.
          Gerenciamento de Custos

          Otimização de frete para reduzir custos.
          Comparação de preços entre transportadoras.
          Rastreamento e Visibilidade

          Monitoramento em tempo real do status das entregas.
          Integração com GPS e sistemas de rastreamento.
          Relatórios e Análise

          Coleta de dados sobre eficiência operacional.
          Análises para melhorar a tomada de decisões.
        </p>
      </div>
    </UModal>
  </div>
</template>