const app = Vue.createApp({
  data() {
      return {
        query: '',
        albums: [],
        favs: [],
        error: '',
        exploreAlbums: [],
        mode: 'explore'
      }
  },
  created(){
    this.leerFavoritosLocal();
    this.explore();
  },
  methods: {
      async searchAlbum() {
          if (!this.query) {
              return;
          }
          this.error = '';
          this.albums = [];
          const url = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(this.query)}&type=album&offset=0&limit=10`;
          const options = {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Key': 'a8983f1ebcmsh5ed8930e1304c38p1f914cjsn862494adce8f',
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
                console.log(this.albums)
              } else {
                  this.error = 'No se encontraron álbumes.';
              }
          } catch (error) {
            console.error('Fetch error:', error);
              this.error = 'Ocurrió un error al buscar los álbumes.';
          }
      },
      async explore() {
        const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        const url = `https://spotify23.p.rapidapi.com/search/?q=${randomLetter}&type=album&offset=0&limit=10`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'a8983f1ebcmsh5ed8930e1304c38p1f914cjsn862494adce8f',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          
          if (result.albums && result.albums.items.length > 0) {
              this.albums = result.albums.items.map(item => ({
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
            console.error('Fetch error:', error);
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
      agregarFavorito(albumId) {
        // Encontrar el índice del álbum en la lista de favoritos
        const albumIndex = this.favs.findIndex(item => item.id === albumId);
      
        if (albumIndex > -1) {
          // Si el álbum ya está en favs, eliminar
          this.favs.splice(albumIndex, 1);
        } else {
          // Si el álbum no está en favs, agregar
          const album = this.albums.find(item => item.id === albumId);
          if (album) {
            this.favs.push(album);
          }
        }
        this.guardarFavs();
      }
  }
});

app.mount('#app');