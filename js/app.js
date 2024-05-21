const app = Vue.createApp({
  data() {
      return {
        query: '',
        albums: [],
        error: ''
      }
  },
  methods: {
      async searchAlbum() {
          if (!this.query) {
              this.error = 'Por favor, ingresa un título de álbum.';
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
              console.log('API Response:', result);

              if (result.items && result.items.length > 0) {
                console.log('Hola')
                this.albums = result.items.map(item => ({
                    title: item.data.name,
                    artist: item.data.artists.items[0].profile.name,
                    year: item.data.date.year,
                    cover: item.data.coverArt.sources[0].url
                }));
              } else {
                  this.error = 'No se encontraron álbumes.';
              }
          } catch (error) {
            console.error('Fetch error:', error);
              this.error = 'Ocurrió un error al buscar los álbumes.';
          }
      },
      async explore() {
        const url = 'https://spotify23.p.rapidapi.com/browse_all/';
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '0930f39a56mshddb81268cff26ccp1c5e05jsn7c2f80d2324a',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
        };

        try {
          const response = await fetch(url, options);
          const result = await response.text();
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      }
  }
});

app.mount('#app');