const app = Vue.createApp({
  data() {
      return {
          categorias: ['audio', 'pc', 'teclados'],
          productos: [],
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
        const resp = await fetch('products.json');
        const json = await resp.json();
        console.log(json);
        this.productos = json.lista;
    },
    agregarCarrito(id){
        const producto =this.productos.find(item => item.id == id)

        if (producto) {
          const index = this.carrito.findIndex(item => item.id === id);
          if (index !== -1) {
              this.carrito[index].cantidad++;
          } else {
              const productoCarrito = {
                  id: producto.id,
                  name: producto.name,
                  price: producto.price,
                  img: producto.img,
                  categoria: producto.category,
                  cantidad: 1
              };
              this.carrito.push(productoCarrito);
          }
          this.guardarCarrito();
        }
    },
    eliminarCarrito(index) {
      this.carrito.splice(index, 1);
      this.guardarCarrito();
    },
    leerLocal() {
        const storage = JSON.parse(localStorage.getItem('productos'));
        this.productos = storage ? storage : [];
    },
    guardarCarrito(){
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        console.log(this.carrito)
    }
  }
})

app.mount('#app')