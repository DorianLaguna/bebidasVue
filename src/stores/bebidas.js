
import { ref, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useModalStore } from './modal'
import APIService from '@/services/APIServices'

export const useBebidasStore = defineStore('bebidas', () => {
    
    const modal = useModalStore()
    const categorias = ref([])
    const recetario = ref([])

    const busqueda = reactive({
        nombre: '',
        categoria: ''
    })
    const recetas = ref([])
    const receta = ref({})

    onMounted(async () => {
        const {data: {drinks}} = await APIService.obtenerCategorias()
        categorias.value = drinks
    })

    async function obtenerRecetas(){
        const {data: {drinks}} = await APIService.buscarRecetas(busqueda)
        recetas.value = drinks
    }
    async function seleccionarBebida(id){
        const {data: {drinks}} = await APIService.buscarReceta(id) 
        modal.handleClickModal()
        receta.value = drinks[0]
        
        recetario.value = [];
        //crear recetaria de la bebida con la respúesta
        for(let i = 0; i <=15; i++){
            let ingrediente = {};
            
              if(receta.value[`strIngredient${i}`]){
                  ingrediente.ingrediente = receta.value[`strIngredient${i}`]
                  ingrediente.cantidad = receta.value[`strMeasure${i}`]
                  recetario.value.push(ingrediente)
              }
        }
        
    }

    return {
        categorias,
        busqueda,
        obtenerRecetas,
        recetas,
        receta,
        recetario,
        seleccionarBebida
    }
})