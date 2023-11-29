//TODO variables
const formulario = document.querySelector('#formulario');
const listaPublicaciones = document.querySelector('#lista-publicaciones');
const contenido = document.querySelector('#contenido');
let publicaciones = [];

//TODO Eventos Listeners
eventListeners();

function eventListeners() {
  // cuando el usuario agrega un nuevo
  formulario.addEventListener('submit', agregarPublicacion);

  // Cunao el documento esta listo
  document.addEventListener('DOMContentLoaded', leerPublicaciones);

  // cuando elimino el mensaje
  listaPublicaciones.addEventListener('click', eliminarMensaje);
}

//TODO Funciones

function leerPublicaciones() {
  // extraigo el string de localstorage y transformo a array, o devuelve un array vacio
  publicaciones = JSON.parse(localStorage.getItem('publicaciones')) || [];

  crearHtml();
}

function agregarPublicacion(e) {
  e.preventDefault();

  // TextArea donde el usuario escribe
  const publicacion = document.querySelector('#publicacion').value;

  // Validación de uqe no se puede entrar un dato vacio
  if (publicacion === '') {
    mostrarError('Un mensaje no puede ingresar vacío');

    return; //evita que se ejecuten más lineas de código
  }

  // para evitar duplicidad agregamos como objeto commo Date.now como id
  const publicacionObj = {
    id: Date.now(),
    publicacion,
    color: generarColorAleatorio(),
  };

  // Añadiendo al arreglo de publicaciones
  publicaciones = [...publicaciones, publicacionObj];

  // Crear Html
  crearHtml();

  // Reiniciar el formulario
  formulario.reset();
}

// mostrar alerta de error
function mostrarError(error) {
  limpiarAlertaFinal(contenido);

  // Crear Elemento de error
  const publicacionError = document.createElement('P');
  publicacionError.textContent = error;
  publicacionError.classList.add('error');

  // Insertar en el Contenido
  contenido.appendChild(publicacionError);

  //Eliminar mensaje en tres segundos
  setTimeout(() => {
    publicacionError.remove();
  }, 3000);
}

// limpiar alertas previas
function limpiarAlertaFinal(referencia) {
  // Comprueba si ya existe una alerta, en la referencia y la descendencia
  const alerta = referencia.querySelector('.error');
  if (alerta) {
    alerta.remove();
  }
}

function crearHtml() {
  // Limpiar html
  lipiarHtml();

  // validar elementos dentro del arreglo
  if (publicaciones.length > 0) {
    // recorrer el arreglo de publicaciones, y crear elemento html y mostrarlo en la lista
    publicaciones.forEach((objMensaje) => {
      const mensaje = document.createElement('P');
      const borrar = document.createElement('span');
      mensaje.textContent = objMensaje.publicacion;
      mensaje.classList.add('p-05', 'font-w-b', 'color-white', 'font-border');
      mensaje.style.backgroundColor = objMensaje.color;

      // establezco clases y atributos para boton borrar
      borrar.textContent = 'X';
      borrar.classList.add('borrar-publicacion');
      borrar.setAttribute('data-id', objMensaje.id);

      listaPublicaciones.appendChild(mensaje);
      mensaje.appendChild(borrar);
    });
  }

  // guardar en el localstorage
  sicronizarStorage();
}

// Agrega las publicaciones actuales a LocalStorage
function sicronizarStorage() {
  localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
}

// Eliminar los cursos de la listaPublicaciones
function lipiarHtml() {
  // si contenedor tiene al menos un elemento
  while (listaPublicaciones.firstChild) {
    // eliminar un hijo por el primero
    listaPublicaciones.removeChild(listaPublicaciones.firstChild);
  }
}

// ELiminar Mensaje
function eliminarMensaje(e) {
  // verificamos si se encuentra la clase donde presionamos
  if (e.target.classList.contains('borrar-publicacion')) {
    // guardamos el id de mensaje a eliminar
    const mensajId = e.target.getAttribute('data-id');

    // guardamos en un nuevo array el los elementos diferente al id eliminado
    publicaciones = publicaciones.filter((mensaje) => mensaje.id != mensajId);

    // volvemos a generar html
    crearHtml();
  }
}

// Generar color aleatorio
function generarColorAleatorio() {
  // Obtener valores aleatorios para rojo, verde y azul
  const rojo = Math.floor(Math.random() * 256);
  const verde = Math.floor(Math.random() * 256);
  const azul = Math.floor(Math.random() * 256);

  // Crear el color en formato hexadecimal, mediante toString que devuelve una cadena en base al argumento
  const colorHex = `#${rojo.toString(16)}${verde.toString(16)}${azul.toString(
    16
  )}`;

  return colorHex;
}
