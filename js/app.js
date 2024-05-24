import Albums from '../components/albums.js';
import Favs from '../components/favs.js';

const app = Vue.createApp({
  data() {
      return {
        busqueda: '',
        albums: [],
        exploreAlbums: [],
        favs: [],
        error: '',
        mode: 'explore'
      }
  },
  created(){
    this.leerFavoritosLocal();
    this.explore();
  },
  methods: {
      async searchAlbum() {
          if (!this.busqueda) {
            this.albums = [];
            return
          }
          this.error = '';
          this.albums = [];

          const url = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(this.busqueda)}&type=album&offset=0&limit=10`;
          const options = {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Key': '94b9b8f666msh537ecaf7787af34p16a305jsnf2d1b397b450',
                  'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
              }
          };

          try {
              const response = await fetch(url, options);
              const result = await response.json();
              console.log('API Response:', result.albums);

              if (result.albums && result.albums.items.length > 0) {
                this.albums = result.albums.items.map(item => ({
                    id: item.data.uri,
                    title: item.data.name,
                    artist: item.data.artists.items[0].profile.name,
                    year: item.data.date.year,
                    cover: item.data.coverArt.sources[0].url
                }));
              } else {
                  this.error = 'No se encontraron álbumes.';
              }
          } catch (error) {
            this.error = 'Ocurrió un error al buscar los álbumes.';
          }
      },
      async explore() {
        const letraRandom = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        const url = `https://spotify23.p.rapidapi.com/search/?q=${letraRandom}&type=album&offset=0&limit=10`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '94b9b8f666msh537ecaf7787af34p16a305jsnf2d1b397b450',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          
          if (result.albums && result.albums.items.length > 0) {
              this.exploreAlbums  = result.albums.items.map(item => ({
                  id: item.data.uri,
                  title: item.data.name,
                  artist: item.data.artists.items[0].profile.name,
                  year: item.data.date.year,
                  cover: item.data.coverArt.sources[0].url
              }));
              console.log(this.exploreAlbums)
          } else {
              this.error = 'No se encontraron álbumes.';
          }
        } catch (error) {
            this.error = 'Ocurrió un error al buscar los álbumes.';
        }
      },
      leerFavoritosLocal() {
        const favsStorage = JSON.parse(localStorage.getItem('favs'));
        this.favs = favsStorage ? favsStorage : [];
      },
      guardarFavs(){
        localStorage.setItem('favs', JSON.stringify(this.favs));
      },
      changeMode(newMode) {
        this.mode = newMode;
      },
      isFav(albumId) {
        return this.favs.some(album => album.id === albumId);
      },
      agregarFavorito(id) {
        const albumIndex = this.favs.findIndex(item => item.id === id);
      
        if (albumIndex > -1) {
          this.favs.splice(albumIndex, 1);
        } else {
          let album = this.albums.find(item => item.id === id);
          if (!album) {
            album = this.exploreAlbums.find(item => item.id === id);
          }  
          if (album) {
            this.favs.push(album);
          }
        }
        this.guardarFavs();
      }
  },
  components: {
    'albums': Albums,
    'favs': Favs
  }
});

app.mount('#app');