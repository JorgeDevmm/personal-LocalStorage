//TODO variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const contenido = document.querySelector('#contenido');
let tweets = [];

//TODO Eventos Listeners
eventListeners();

function eventListeners() {
  formulario.addEventListener('submit', agregarTweet);
  listaTweets.addEventListener('click', eliminarMensaje);
}

//TODO Funciones

function agregarTweet(e) {
  e.preventDefault();

  // TextArea donde el usuario escribe
  const tweet = document.querySelector('#tweet').value;

  // Validación de uqe no se puede entrar un dato vacio
  if (tweet === '') {
    mostrarError('Un mensaje no puede ingresar vacío');

    return; //evita que se ejecuten más lineas de código
  }

  // para evitar duplicidad agregamos como objeto commo Date.now como id
  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  // Añadiendo al arreglo de tweets
  tweets = [...tweets, tweetObj];

  // Crear Html
  crearHtml();

  // Reiniciar el formulario
  formulario.reset();
}

// mostrar alerta de error
function mostrarError(error) {
  limpiarAlertaFinal(contenido);

  // Crear Elemento de error
  const mensajeError = document.createElement('P');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  // Insertar en el Contenido
  contenido.appendChild(mensajeError);

  //Eliminar mensaje en tres segundos
  setTimeout(() => {
    mensajeError.remove();
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
  if (tweets.length > 0) {
    // recorrer el arreglo de tweets, y crear elemento html y mostrarlo en la lista
    tweets.forEach((objMensaje) => {
      const mensaje = document.createElement('P');
      const borrar = document.createElement('span');
      mensaje.textContent = objMensaje.tweet;
      mensaje.classList.add('background-gris', 'p-05', 'font-w');

      // establezco clases y atributos para boton borrar
      borrar.textContent = 'X';
      borrar.classList.add('borrar-tweet');
      borrar.setAttribute('data-id', objMensaje.id);

      listaTweets.appendChild(mensaje);
      mensaje.appendChild(borrar);
    });
  }

  console.log(tweets);
}

// Eliminar los cursos de la listaTweets
function lipiarHtml() {
  // si contenedor tiene al menos un elemento
  while (listaTweets.firstChild) {
    // eliminar un hijo por el primero
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

// ELiminar Mensaje
function eliminarMensaje(e) {
  // verificamos si se encuentra la clase donde presionamos
  if (e.target.classList.contains('borrar-tweet')) {
    // guardamos el id de mensaje a eliminar
    const mensajId = e.target.getAttribute('data-id');

    // guardamos en un nuevo array el los elementos diferente al id eliminado
    tweets = tweets.filter((mensaje) => mensaje.id != mensajId);

    // volvemos a generar html
    crearHtml();
  }
}
