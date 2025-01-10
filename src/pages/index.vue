<script lang="ts" setup>
import { useMemory, useOnline, useWindowSize } from '@vueuse/core';
import ConfettiExplosion from "vue-confetti-explosion";

import { useIntervalFn } from '@vueuse/core'
import { rand } from '@vueuse/shared'
import { ref } from 'vue'

// --------------------
const greetings = ['SEJA BEM VINDO!', 'AQUECENDO MOTORES!']
const word = ref('SEJA BEM VINDO!')
const interval = ref(2000)

const { pause, resume, isActive } = useIntervalFn(() => {
    word.value = greetings[rand(0, greetings.length - 1)]
}, interval)
// EXPERIMENTAL

interface InterfaceProps {
    name?: string;
    avatar_url?: string;
    bio: string;
    followers: string;
    following: string;
    updated_at?: string;
}

// ------------------------------------------------------
const online = useOnline();
const { isSupported, memory } = useMemory();
const clazz = computed(() => online.value ? 'text-green-700 font-bold dark:text-green-500' : 'text-gray');
const text = computed(() => online.value ? 'Online' : 'Offline');

function size(v: number) {
    const kb = v / 1024 / 1024
    return `${kb.toFixed(2)} MB`
}

// DIMENSÃO DA TELA
const { width, height } = useWindowSize();
// ------------------------------------------------------

const collectData = ref<InterfaceProps>();
const isOpenModal = ref(false);

const linkSocialMedia = reactive({
    github: 'marcoscode404',
    links: [{
        icon: 'line-md:github-loop',
        url: 'https://github.com/marcoscode404',
        name: 'GITHUB',
        style: 'dark:bg-msDarkHover bg-slate-200 rounded-full p-2',
    }, {
        icon: 'ri:linkedin-fill',
        url: 'https://www.linkedin.com/in/marcosvini-colabdevs/',
        name: 'LINKDIN',
        style: 'w-6 h-6 dark:text-gray-300 text-blue-600',
    }, ],
})

function getGitHubProfileInfos() {
    const url = `https://api.github.com/users/${linkSocialMedia.github}`;

    fetch(url).then((response) => response.json())
        .then(data => {
            collectData.value = data;
        })
        .catch((err) => { })
}

onMounted(async () => {
    getGitHubProfileInfos();
})


// confetti
const visible = ref(false);

const explode = async () => {
    visible.value = false;
    await nextTick();
    visible.value = true;
};

function handleAccessLink(url: string) {
    window.open(url, 'blanck')
}

</script>

<template>
    <main class="flex gap-7 container m-auto mt-4 h-[calc(100vh-100px)] flex-wrap">
        <aside class="w-96">
            <div class="fixed">
                <div>
                    <ConfettiExplosion :stageHeight="1000" />
                </div>

                <div class="w-96 border dark:bg-token_bgHeader overflow-hidden h-fit
                rounded-md dark:border-msDarkHeader leading-7 text-gray-700 dark:text-gray-300">
                    <!-- banner -->
                    <div class="bg-purple-500 w-full h-fit min-h-44">
                        <StatusBanner />
                    </div>

                    <div class="flex justify-center">
                        <div class="relative flex justify-center w-fit -mt-20">
                            <span class=" flex justify-center items-center flex-shrink-0 bg-purpleseat-base text-white select-none 
                        w-[10.95rem] h-[10rem] group-data-[reduced=&quot;true&quot;]:animate-reduce-large-avatar 
                        group-data-[reduced=&quot;false&quot;]:animate-restore-large-avatar group-hover:brightness-75">
                                <button @click="isOpenModal = true">
                                    <UAvatar :alt="collectData?.name" :img-class="'h-full w-full object-cover p-1'"
                                        :src="collectData?.avatar_url" loading="lazy" class="!dark:bg-token_bgHeader 
                                        bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-500
                            mx-auto text-center h-[7.5rem] w-[7.5rem] 
                            rounded-full" />

                                    <StatusModalStatus @close="isOpenModal = false"
                                        v-model:on-open-modal="isOpenModal" />
                                </button>
                            </span>

                            <div
                                class="flex items-center justify-center right-6 bottom-8  rounded-full w-8 h-8 overflow-hidden absolute 
                            transition-all ease-in-out duration-300
                            group-data-[reduced='true']:w-6 group-data-[reduced='true']:h-6 group-data-[reduced='true']:bottom-0">
                                <!-- img brasil -->
                                <img src="../assets/br.svg" class="object-cover object-center h-8 transition-all 
                                linear duration-300 group-data-[reduced='true']:h-6" loading="lazy" />
                            </div>
                        </div>
                    </div>

                    <div class="px-2">
                        <h2 class="text-center text-white text-lg font-semibold">
                            {{ collectData?.name }}
                        </h2>

                        <p class="text-center dark:opacity-75 opacity-95 text-sm leading-6">
                            {{ collectData?.bio }}
                        </p>

                        <p class="text-center leading-7 text-sm">
                            followers: {{ collectData?.followers }}
                            following: {{ collectData?.following }}
                        </p>

                        <div class="flex justify-center my-7 text-xs">
                            <ConfettiExplosion v-if="visible" :stageHeight="1000" />

                            <button @click="explode" class="dark:bg-msDarkHover py-1.5 dark:text-gray-100 rounded-md 
                                px-4 font-semibold bg-slate-50 border dark:border-gray-600">
                                <span class="dark:text-yellow-400 text-yellow-500 mr-1.5">JS</span>
                                JAVASCRIPT
                            </button>
                        </div>
                    </div>

                    <div class="border-t dark:border-gray-800 p-4 text-xs dark:text-gray-400 text-center">
                        {{ useFormat.asDateTime(String(collectData?.updated_at)) }}
                    </div>
                </div>

                <!-- links -->
                <div class="w-96 mt-4 border dark:bg-token_bgHeader overflow-hidden h-fit
                rounded-md dark:border-msDarkHeader leading-7
                text-gray-700 dark:text-gray-300">
                    <!-- banner -->
                    <div class="p-6">
                        links
                        <div class="flex gap-4">
                            <ul v-for="(link, index) in linkSocialMedia.links" :key="index" class="py-5 flex gap-5">
                                <li>
                                    <button @click="handleAccessLink(link.url)"
                                        class="bg-slate-200 dark:bg-msDarkHover rounded-full p-2">
                                        <GlobalIcon :name="link.icon" :class="link.style"/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        <!-- conteudo -->
        <div class="flex flex-1 flex-col gap-5 mb-14">
            <div class="border  h-fit w-full dark:bg-token_bgHeader
        rounded-md dark:border-msDarkHeader">
                <article class="p-6">
                    <h2 class="pb-4 dark:text-gray-400 flex items-center justify-between">
                        Sobre
                        <span class="text-xs">{{ word }}</span>
                    </h2>

                    <p class="leading-8 dark:text-gray-300 my-5">
                        Sou Desenvolvedor Front-end a mais de 2 anos, com uma leve paixão no mercado
                        financeiro/investimentos.

                        <br />
                        Se o problema não possui solução, está solucionado...
                        Se tudo é prioridade, não há prioridade...
                    </p>
                </article>
            </div>

            <div class="border  h-fit w-full dark:bg-token_bgHeader
        rounded-md dark:border-msDarkHeader">
                <article class="p-6">
                    <h2 class="pb-4 dark:text-gray-400">Destaques</h2>
                </article>
            </div>

            <div class="border  h-fit w-full dark:bg-token_bgHeader
        rounded-md dark:border-msDarkHeader">
                <article class="p-6">
                    <h2 class="pb-4 dark:text-gray-400">Habilidades</h2>

                    <div class="flex flex-col gap-4">
                        <div>
                            <strong>Tecnologias</strong>
                            <div class="flex flex-wrap gap-2 mt-2">
                                <UBadge color="gray" label="JAVASCRIPT" class="dark:bg-token_bgDark font-bold" />
                                <UBadge color="gray" label="TYPESCRIPT" class="dark:bg-token_bgDark font-bold" />
                                <UBadge color="gray" label="PYTHON" class="dark:bg-token_bgDark font-bold" />
                                <UBadge color="gray" label="VUE" class="dark:bg-token_bgDark font-bold" />
                                <UBadge color="gray" label="NUXT" class="dark:bg-token_bgDark font-bold" />
                                <UBadge color="gray" label="REACT" class="dark:bg-token_bgDark font-bold" />
                                <UBadge color="gray" label="FIGMA" class="dark:bg-token_bgDark font-bold" />
                                <UBadge color="gray" label="TAILWINDCSS" class="dark:bg-token_bgDark font-bold" />
                                <UBadge color="gray" label="LINUX" class="dark:bg-token_bgDark font-bold" />
                                <UBadge color="gray" label="WINDOWNS" class="dark:bg-token_bgDark font-bold" />
                            </div>

                            <div class="flex flex-col mt-4">
                                <strong>Outros</strong>
                                <div class="flex gap-2 mt-2">
                                    <UBadge color="gray" label="HELP DESK" class="dark:bg-token_bgDark font-bold" />
                                    <UBadge color="gray" label="PHOTOMAKER" class="dark:bg-token_bgDark font-bold" />

                                    <UBadge color="gray" label="EDIÇÃO" class="dark:bg-token_bgDark font-bold" />
                                </div>
                            </div>

                            <div class="flex flex-col mt-4">
                                <strong>Idiomas</strong>
                                <div class="flex gap-2 mt-2">
                                    <UBadge color="gray" label="PORTUGUÊS" class="dark:bg-token_bgDark font-bold" />
                                    <UBadge color="gray" label="INGLÊS BÁSICO" class="dark:bg-token_bgDark font-bold" />
                                </div>
                            </div>

                        </div>
                    </div>
                </article>
            </div>

            <div class="border  h-fit w-full dark:bg-token_bgHeader
        rounded-md dark:border-msDarkHeader">
                <article class="p-6">
                    <h2 class="pb-4 dark:text-gray-400">Certificados</h2>
                    <div>
                        asdasd
                    </div>
                </article>
            </div>

            <div class="border  h-fit w-full dark:bg-token_bgHeader
        rounded-md dark:border-msDarkHeader">
                <article class="p-6">
                    <h2 class="pb-4 dark:text-gray-400">Experiência</h2>
                    <div>
                        <div>
                        </div>
                    </div>
                </article>
            </div>

            <!-- metricas nerdianas -->
            <div class="border  h-fit w-full dark:bg-token_bgHeader
        rounded-md dark:border-msDarkHeader">
                <article class="p-6">
                    <h2 class="pb-4 dark:text-gray-400">
                        Metricas Nerdianas
                    </h2>
                    <div class="text-xs text-gray-500">
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

                        <div class="font-bold text-red-600 dark:text-white mt-4">
                            Largura: {{ width }} X Altura: {{ height }}</div>
                    </div>
                </article>
            </div>
        </div>
    </main>
</template>
