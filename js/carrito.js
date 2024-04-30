const app = Vue.createApp({
  data() {
      return {
          albums: [],
          carrito: []
      }
  },
  created(){
      this.getJSON();
      this.leerLocal();
      this.leerCarritoLocal();
  },
  computed: {
    totalCarrito() {
      let total = 0;
      this.carrito.forEach(item => {
        total += item.precio * item.cantidad;
      });
      return total;
    }
  },
  methods: {
    async getJSON(){
        const resp = await fetch('/lib/albums.json');
        const json = await resp.json();
        this.albums = json.albums;
        console.log(`$json`);
    },
    agregarCarrito(id){
        const album = this.albums.find(item => item.id == id)
        if (album) {
          const index = this.carrito.findIndex(item => item.id === id);
          if (index !== -1) {
              this.carrito[index].cantidad++;
          } else {
              const albumCarrito = {
                  id: album.id,
                  titulo: album.titulo,
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
    leerCarritoLocal() {
      const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
      this.carrito = carritoStorage ? carritoStorage : [];
    },
    guardarCarrito(){
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        console.log(this.carrito)
    }
  }
})

app.mount('#app')