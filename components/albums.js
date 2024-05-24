export default {
  props: {
    id: String,
    titulo: String,
    artista: String,
    anio: Number,
    portada: String,
    esFavorito: Boolean
  },
  methods: {
    addFav() {
      this.$emit('agregar', {id: this.id});
    }
  },
  template:
  `<article class="group relative">
    <div class="absolute left-28 top-2 translate-y-20 transition-all duration-500 opacity-0 group-hover:translate-y-28 group-hover:opacity-100 z-10 bg-zinc-800 rounded-full aspect-square">
      <button v-on:click="addFav" type="button" class="card-play-button text-xs font-bold text-white p-4">
        <i :class="esFavorito ? 'fa-solid' : 'fa-regular'" class="fa-heart"></i>
      </button>
    </div>
    <a class="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md hover:bg-zinc-800 shadow-lg hover:shadow-lg w-40 flex-col">
      <picture class="aspect-square w-full h-auto flex-none">
        <img :src="portada" :alt="titulo" class="object-cover w-full h-full rounded-md">
      </picture>
      <div class="flex flex-auto flex-col px-2 truncate">
        <h4 class="text-white text-sm">{{ titulo }}</h4>
        <span class="text-xs text-gray-400">{{ artista }} - {{ anio }}</span>
      </div>
    </a>
  </article>`
};