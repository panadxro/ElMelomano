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
  `<article class="group relative sm:w-15 sm:h-15 w-full h-auto md:aspect-w-1 md:aspect-h-1">
    <div
    class="playlist-item flex relative p-2 overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800">
      <picture class="h-12 w-12 flex-none">
        <img v-bind:src="portada" v-bind:alt="titulo" class="object-cover w-full h-full rounded-md">
      </picture>
      <div class="flex flex-auto flex-col truncate hidden sm:flex">
        <h3 class="text-white text-sm">{{ titulo }}</h3>
        <span class="text-xs text-gray-400">{{ artista }} {{ anio }}</span>
      </div>
      <div class="absolute right-4 bottom-8 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-4 group-hover:opacity-100 z-10">
      <button v-on:click="addFav" type="button" class="card-play-button text-xs font-bold text-white p-4">
      <i :class="esFavorito ? 'fa-solid' : 'fa-regular'" class="fa-heart"></i>
    </button>
      </div>
    </div>
  </article>`
};