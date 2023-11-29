//TODO variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const contenido = document.querySelector('#contenido');
let tweets = [];

//TODO Eventos Listeners
eventListeners();

function eventListeners() {
  formulario.addEventListener('submit', agregarTweet);
}

//TODO Funciones

function agregarTweet(e) {
  e.preventDefault();

  // TextArea donde el usuario escribe
  const tweet = document.querySelector('#tweet').value;

  // Validación de uqe no se puede entrar un dato vacio
  if (tweet === '') {
    mostrarError('Un mensaje no puede ir vacío');

    return; //evita que se ejecuten más lineas de código
  }
  tweets.push(tweet);

  console.log(tweets);
}

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

function limpiarAlertaFinal(referencia) {
  // Comprueba si ya existe una alerta, en la referencia y la descendencia
  const alerta = referencia.querySelector('.error');
  if (alerta) {
    alerta.remove();
  }
}
