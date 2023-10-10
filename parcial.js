'use strict';

/*
 * PANADERO LUCAS
 */

// Ejemplo de la estructura de un disco:
let disco = {
    Nombre: 'Amor Amarillo',
    Banda: 'Gustavo Cerati',
    Codigo: 'FF0',
    Pistas: [
        {
            Track: 'Amor Amarillo',
            Duracion: 336,
        },
        {
            Track: 'Lisa',
            Duracion: 265,
        },
        {
            Track: 'Te Llevo para Que Me Lleves',
            Duracion: 224,
        },
        {
            Track: 'Pulsar',
            Duracion: 294,
        },
        {
            Track: 'Cabeza De Medusa',
            Duracion: 307,
        },
        {
            Track: 'Av. Alcorta',
            Duracion: 284,
        },
        {
            Track: 'Bajan',
            Duracion: 248,
        },  
        {
            Track: 'Rombos (Un Cuarto Lleno de Rombos)',
            Duracion: 263,
        },
        {
            Track: 'Ahora Es Nunca',
            Duracion: 282,
        },
        {
            Track: 'A Merced',
            Duracion: 388,
        },
        {
            Track: 'Torteval',
            Duracion: 364,
        },
    ],
};

// Discos:
let discos = [];
let cantidadDiscos = 0;

discos.push(disco);
cantidadDiscos++;

// Función Cargar:
const Cargar = () => {
  let nombre = prompt('Ingrese nombre de disco');
  while (nombre === null || nombre === '') {
    nombre = prompt('Por favor, ingrese algo (no puede quedar vacío)');
  }
  let banda = prompt('Ingrese nombre de banda o autor');
  while (banda === null || banda === '') {
    banda = prompt('Por favor, ingrese algo (no puede quedar vacío)')
  }

  // Código único de album
  let codigo;
  let errorCode;

  do {
    codigo = parseInt(prompt('Ingrese codigo del disco (XXX)'));
    errorCode = false;
    if (isNaN(codigo)) {
      errorCode = true;
      alert('Código erroneo. Solo se admiten números. Intente de nuevo.')
    }
    for (let i = 0; i < discos.length; i++) {
      if (discos[i].Codigo === codigo) {
        errorCode = true;
        alert('Código existente. Intente otro nuevo.')
      }
    }
    if (codigo <= 0 || codigo >= 1000) {
      errorCode = true;
      alert('Código valido entre 1 y 999');
    }
  } while (errorCode);

  // Track/Pista
  let pistas = [];
  do {
    let track = prompt('Ingrese el nombre de la pista.');
    while (!track) {
      track = prompt('Por favor, ingrese algo (no puede quedar vacío).')
    }
    let duracion = parseInt(prompt('Ingrese la duración en segundos.'));
    while (isNaN(duracion) || duracion < 0 || duracion > 7200) {
      duracion = parseInt(prompt('La duración debe estar entre 0 y 7200 segundos.'));
    }

    pistas.push({ Track: track, Duracion: duracion });
  } while (confirm('¿Desea agregar una pista más?'));

  const nuevoDisco = {
    Nombre: nombre,
    Banda: banda,
    Codigo: codigo,
    Pistas: pistas
  }

  discos.push(nuevoDisco);
  cantidadDiscos++;

  console.log(`Disco cargado: ${nombre} de ${banda}`);
  actualizarLibreria();
  actualizarCantidadDiscos();
};

function construirHtmlAlbum(album) {
  let htmlAlbum = `
  <div id="${album.Codigo}">
    <section class="info-album">
      <figure class="portada" style="background-color: #${album.Codigo}"></figure>
      <article class="descripcion">
        <span>Album</span>
        <h2>${album.Nombre}</h2>
        <ul>
          <ul>${album.Banda}.`;
  
  let cantidadTotal =  album.Pistas.length;
  let duracionTotal = 0;

  for (let pista of album.Pistas) {
    duracionTotal += pista.Duracion;
  }

  let minutos = parseInt(duracionTotal / 60);
  let segundos = duracionTotal % 60;

  htmlAlbum += `
          <li>${cantidadTotal} canciones, ${minutos} min ${segundos} seg</li>
        </ul>
      </article>
    </section>
    <section class="pistas">
      <div class="tabla">
        <h3>Título<span></span></h3>
      </div>
      <ol class="lista-flexbox">`;
  
  let pistaMasLarga = '';
  let duracionMasLarga = 0

  for (let pista of album.Pistas) {
    let minutosPista = parseInt(pista.Duracion / 60);
    let segundosPista = pista.Duracion % 60;
    segundosPista = segundosPista < 10 ? '0' + segundosPista : segundosPista;

    if (pista.Duracion > duracionMasLarga) {
      duracionMasLarga = pista.Duracion;
      pistaMasLarga = pista.Track;
    }

    if (pista.Duracion > 180) {
      htmlAlbum += `<li>${pista.Track}<span class="duracionMayor">${minutosPista}:${segundosPista}</span></li>`
    } else {
      htmlAlbum += `<li>${pista.Track}<span>${minutosPista}:${segundosPista}</span></li>`
    }
  }

  let promedioDuracion = duracionTotal / cantidadTotal;
  htmlAlbum += `
          </ol>
          <p>Código: ${album.Codigo}</p>
          <p>Promedio por canción: ${promedioDuracion.toFixed(0)} seg</p>
          <p>Pista más extensa: ${pistaMasLarga} (${(duracionMasLarga / 60).toFixed(0)} min)</p>
        </div>
      </section>
    </div>`;
  return htmlAlbum;
}

// Función Mostrar:
const Mostrar = () => {
    let htmlAlbums = '';

    for (let album of discos) {
      htmlAlbums += construirHtmlAlbum(album);
    }
    document.getElementById('jsAlbum').innerHTML = htmlAlbums;
  actualizarLibreria();
  actualizarCantidadDiscos();
};
/* Buscar */
const Buscar = () => {
  let buscarCode = prompt('Ingresa el código del disco (XXX)');
  let albumEncontrado = null;

  for (let i = 0; i < discos.length; i++) {
    if (discos[i].Codigo.toString() == buscarCode) {
      albumEncontrado = discos[i];
      break;
    }
  }
  if (albumEncontrado) {
    document.getElementById('jsAlbum').innerHTML = construirHtmlAlbum(albumEncontrado);
  } else {
    document.getElementById('jsAlbum').innerHTML = `<h2>No se encontró ningún elemento con el código "${buscarCode}"</h2>`
  }
}

/* Libreria */
const actualizarLibreria = () => {
  let htmlLibreria =  '';

  // Main
  for (let album of discos) {
    htmlLibreria += `<li onclick="ClickDisc('${album['Codigo']}')" class="lista-album">`;
    htmlLibreria += `<figure class="mini portada" style="background-color: #${album['Codigo']}"></figure>`;
    htmlLibreria += `<figcaption>${album['Nombre']}<br><span>${album['Banda']}</span></figcaption>`;
    htmlLibreria += `</li>`
  }
  document.getElementById('lista-libreria').innerHTML = htmlLibreria; 
};

/* ClickDisco */
function ClickDisc(codigo) {
  let albumEncontrado = null;
  
  for (let i = 0; i < discos.length; i++) {
    if (discos[i].Codigo.toString() == codigo) {
      albumEncontrado = discos[i];
      break
    }
  }
  if (albumEncontrado) {
    document.getElementById('jsAlbum').innerHTML = construirHtmlAlbum(albumEncontrado);
  } else {
    document.getElementById('jsAlbum').innerHTML = `<h2>No se encontró ningún elemento con el código "${codigo}"</h2>`
  }
  
}

function actualizarCantidadDiscos() {
  document.getElementById('cantidadDiscos').innerHTML = `(${cantidadDiscos})`
}