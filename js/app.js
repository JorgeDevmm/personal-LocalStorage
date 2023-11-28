//TODO variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//TODO Eventos Listeners
eventListeners();

function eventListeners() {
  formulario.addEventListener('submit', agregarTweet);


}

//TODO Funciones

function agregarTweet(e) {
  e.preventDefault();

  const textArea = formulario.children[1];

  tweets.push(textArea.value);

  return tweets;
}


