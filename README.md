# inciando projeto 
npx nuxi init <project-name>

# yarn
yarn install

# tailwind
yarn add --dev @nuxtjs/tailwindcss

# icons
yarn add nuxt-icon

# headlessui
yarn add --dev nuxt-headlessui 

# pinia
yarn add pinia @pinia/nuxt

# vue3-toastify
yarn add vue3-toastify
-ou
npm i vue3-toastify
<!-- link documentação -> https://vue3-toastify.js-bridge.com/ -->

# ZOD
pnpm add zod

# clipboard
npm i @vueuse/core

# Axios
 yarn add axios

# Axios-retry
npm install axios-retry

<!-- # ofetch ()
yarn add ofetch -->

# Composables
Encapsular e reutilizar a lógica de estado

<!--  ATUALIZAR O NUXT -->
npx nuxi upgrade

<!-- ATUALIZA TODOS OS MODULOS DO PACKAGE.JSON AO MESMO TEMPO -->
pnpm up --latest 


----------------------------------------

# Como pegar o status error da api
<!-- ${error.response.data.detail.error_description} -->

# google fonts
yarn add --dev @nuxtjs/google-fonts
<!-- https://google-fonts.nuxtjs.org/setup -->
# tooltip
yarn add floating-vue

# npm i sortablejs
npm i sortablejs
<!-- assim vc consegue trocar as colunas da tabela apenas arrastando e soltando -->
<!-- https://vueuse.org/integrations/useSortable/ -->
# maskara para formulario
yarn add vue-the-mask
<!-- Exemplo de uso  
<GlobalInputLabel v-mask="'##.###.###/####-##'" />
https://vuejs-tips.github.io/vue-the-mask/
-->

<!-- Examplo de uso -->
<!-- crie um  pasta plugin -> plugin.ts e adicione este codigo baixo -->
<!-- https://floating-vue.starpad.dev/guide/component.html#placements link da documentação -->

<!-- import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FloatingVue);
}); -->

<!-- --- no html - formas de uso -->
 <!-- <VTooltip>
            <button class="p-2 bg-red-500 text-white rounded-lg">
                Button Tooltip
            </button>

            <template #popper>
                Help me fund my Open Source work!
            </template>
 </VTooltip>


 <butto v-tooltip.bottom-start="'teste tooltip'">
    teste
 </butto> -->

---------------------------------------------------------------------------------
# Padroes de Código
## use o Gerenciador de Pacotes (yarn) de preferência para baixar as dependências

## camelCase - criação de variaveis
## adotar o cleanCode

----------------------------------------------------------------------------------





# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.











-----------------------------------------------------------------------------------------------------
# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

<!-- Gradients -->
## bg-gradient-to-br from-stone-700 to-zinc-900 
## #09090B