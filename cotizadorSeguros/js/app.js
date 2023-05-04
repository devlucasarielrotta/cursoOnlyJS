// constructores

function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
// realizar cotizacion de seguro
Seguro.prototype.corizarSeguro = function(){
    const base = 2000; 
    let valor;

    switch(this.marca){
        case '1':
            valor = base * 1.15;
            break;
        case '2':
            valor = base * 1.05;
            break;
         case '3':
            valor = base * 1.35;
            break;
        default:
            break;
    }
   
    let antiguedad = new Date().getFullYear() - this.year ;

    let precioTotal = valor - (valor * (3*antiguedad) / 100);
    if(this.tipo ==='basico'){
        precioTotal*= 1.3
    }else {
        precioTotal*=1.5;
    }
    
    return precioTotal;
    

}

function UI(){

}

// llenar select años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');
    const fragmetOption = document.createDocumentFragment();
    for(let i = max; i>= min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        fragmetOption.appendChild(option)
    }
    selectYear.appendChild(fragmetOption);
}

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje,tipo) => {

    const div = document.createElement('div');

    if(tipo ==='error'){
        div.classList.add('error');
    }else {
        div.classList.add('correcto')
    }

    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    // Insertar en el html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));
    const btnCotizador = document.querySelector('button[type="submit"]');
    btnCotizador.disabled = true;
    btnCotizador.style.opacity = 0.3;
    btnCotizador.style.cursor = 'auto';
    btnCotizador.classList.remove('hover:bg-teal-700');
    setTimeout(() => {
        div.remove()
        btnCotizador.disabled = false;
        btnCotizador.style.opacity = 1;
        btnCotizador.style.cursor = 'pointer';
        btnCotizador.classList.add('hover:bg-teal-700');
    },3000)
}

UI.prototype.mostrarResultado = (total,seguro) => {
    let {marca,year,tipo} = seguro;
    const objMarca = {
        1: 'Americano',
        2: 'Asiatico',
        3: 'Europeo'
    }
    marca = objMarca[marca]
    // crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header"> Tu resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${marca}</span></p>
        <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
        <p class="font-bold">Tipo de seguro: <span class="font-normal capitalize"> ${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
    `
    const resultadoDiv = document.querySelector('#resultado');
   

    // mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; // se borra el spinner
        resultadoDiv.appendChild(div); // se muestra el resultado
    },3000)
}

//Instanciar UI

const ui = new UI ();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); // lenar el select options con los añosP
})

eventListeners();

function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro);
}

function  cotizarSeguro(e){
    e.preventDefault();
    // leer la marca
    const marca = document.querySelector('#marca').value;

    // leer el año
    const year = document.querySelector('#year').value;

    // leer el tipo
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if ( marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios','error');
        return ; 
    }
    limpiarHTML();
    ui.mostrarMensaje('Cotizando...','exito');

    // istanciar el seguro
    const seguro = new Seguro(marca,year,tipo);
    const total = seguro.corizarSeguro();

    // utilizar proto seguro
    ui.mostrarResultado(total,seguro)
}

function limpiarHTML(){
    const resultado = document.querySelector('#resultado div')
    if(resultado){
        resultado.remove();
    }
}

