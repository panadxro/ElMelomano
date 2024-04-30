const app = Vue.createApp({
  data() {
      return {
          categorias: ['audio', 'pc', 'teclados'],
          albums: [],
          carrito: []
      }
  },
  created(){
      console.log('Creacion de Vue :D');
      this.getJSON();
      this.leerLocal();
  },
  computed: {
    totalCarrito() {
      let total = 0;
      this.carrito.forEach(item => {
        total += item.price * item.cantidad;
      });
      return total;
    }
  },
  methods: {
    async getJSON(){
        const resp = await fetch('/lib/albums.json');
        const json = await resp.json();
        console.log(json);
        this.albums = json.albums;
    },
    agregarCarrito(id){
        const album =this.albums.find(item => item.id == id)

        if (album) {
          const index = this.carrito.findIndex(item => item.id === id);
          if (index !== -1) {
              this.carrito[index].cantidad++;
          } else {
              const albumCarrito = {
                  id: album.id,
                  titulo: album.titulo,
                  lanzamiento: album.lanzamiento,
                  artista: album.artista,
                  precio: album.precio,
                  imagen: album.imagen,
                  cantidad: 1
              };
              this.carrito.push(albumCarrito);
          }
          this.guardarCarrito();
        }
    },
    eliminarCarrito(index) {
      this.carrito.splice(index, 1);
      this.guardarCarrito();
    },
    leerLocal() {
        const storage = JSON.parse(localStorage.getItem('albums'));
        this.albums = storage ? storage : [];
    },
    guardarCarrito(){
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        console.log(this.carrito)
    }
  }
})

app.mount('#app')