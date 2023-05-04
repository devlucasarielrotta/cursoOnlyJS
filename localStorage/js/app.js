// variables
const formulario = document.querySelector('#formulario');
const tweet = document.querySelector('#tweet');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

const btnSubmit = document.querySelector('input[type="submit"]');


//event listeners
eventListeners();

function eventListeners(){

    formulario.addEventListener('submit',agregarTweet)

    document.addEventListener('DOMContentLoaded', () => {

        tweets = JSON.parse(localStorage.getItem('tweets') ?? '[]');
        
        crearHTML();
    })
   
}
//tweet.addEventListener('input',agregarTweet);



//funciones 
function agregarTweet (e) {

    e.preventDefault();
    
    if( tweet.value === ''){
        mostrarError('Un tweet no puede ir vacio')
        console.log("no puede ir vacio")

        return; 
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet.value
    }
 
    tweets = [...tweets,tweetObj]

    //
    limpiarHTML();
    crearHTML()

    // reiniciar el formulario
    formulario.reset();

}


// mostrar Mensaje error

function mostrarError(mensaje){

    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');

    // insertarlo en html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError)
    btnSubmit.disabled = true;
    btnSubmit.style.opacity = 0.5;
  
    setTimeout( () => {
        mensajeError.remove();
        btnSubmit.style.opacity = 1;
        btnSubmit.disabled = false;
    },3000)
}

function crearHTML(){
    
    if( tweets.length > 0 ) {
        tweets.forEach( tweet => {
            // Crear html
            //boton eliminar tweet
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');

            // añado texto
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);
            // insertarlo en el html
            listaTweets.appendChild(li);
        })
        sincronizarStorage();
    }

   
}

// agregar los tweets al localstotage

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// borrar tweet

function borrarTweet(id){
   tweets = tweets.filter(tweet => tweet.id !== id);
   limpiarHTML();
   crearHTML();
   
}

// limpiar el html

function limpiarHTML(){
    while( listaTweets.firstChild ){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

