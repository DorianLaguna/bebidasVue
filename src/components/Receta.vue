<script setup>

    import { useBebidasStore } from '@/stores/bebidas';

    const bebidas = useBebidasStore();
    defineProps({
        receta : {
            type:Object
        }
    })
</script>

<template>
    <div class="border shadow-lg">
        <div class="overflow-hidden">
            <img 
                :src="receta.strDrinkThumb" 
                alt="ImagenBebida"
                class="hover:scale-125 transition-transform"
            >

        </div>
        <div class="p-5">
            <h2 class="text-2xl truncate font-extrabold">{{ receta.strDrink }}</h2>
            <button
                @click="bebidas.seleccionarBebida(receta.idDrink)"
                type="button"
                class="bg-orange-400 hover:bg-orange-500 w-full mt-5 p-3 font-bold text-white"
            >
                Ver receta
            </button>
        </div>
    </div>
</template>