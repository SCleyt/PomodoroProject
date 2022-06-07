const tareas = [];
let tiempo = 0;
let timer = null;
let tiempoLibre = null;
let tareaActual = null;

const bAplicacion = document.querySelector("#bAplicacion");
const itTarea = document.querySelector("#itTarea");
const formulario = document.querySelector("#formulario");
const nombreTarea = document.querySelector("#tiempo #nombreTarea");

renderizarTiempo();
renderizarTarea();


formulario.addEventListener("submit", e =>{
    e.preventDefault();
    if(itTarea.value !== "" ){
        crearTarea(itTarea.value);
        itTarea.value = "";
        renderizarTarea();
        }

});

function crearTarea(value){

       const nuevaTarea = {
           id: (Math.random() * 100).toString(36).slice(3),
           titulo: value,
           compleatado: false
       };

       tareas.unshift(nuevaTarea);

}

function renderizarTarea(){
    const html = tareas.map(tarea =>{
        return `
        <div class="tarea">
        <div class="compleatado">${tarea.compleatado ? `<span class="done">"Completado"</span>` : `<button class="star-button" data-id="${tarea.id}">empezar</button>`  }</div>
        <div class="titulo">${tarea.titulo}</div>
        </div>
        `;
    });

    const tareaContenedor = document.querySelector("#tareas");
    tareaContenedor.innerHTML = html.join(" ");

    const botonEmpezar = document.querySelectorAll(".tarea .star-button");

    botonEmpezar.forEach(boton => {
        boton.addEventListener("click", e => {
            if(!timer){
                const id = boton.getAttribute("data-id");
                startbuttonHandler(id);
                boton.textContent = "En Proceso";
            }
        })
    })
}

function startbuttonHandler(id){
    tiempo = 5;
    tareaActual = id;
    const tareaIndex = tareas.findIndex((tarea) => tarea.id == id);
    const nombreTarea = document.querySelector("#tiempo #nombreTarea");
    nombreTarea.textContent = tareas[tareaIndex].titulo;
    renderizarTiempo();
    timer= setInterval(() =>{
     timeHanlder(id);
    }, 1000);

}

function timeHanlder(id){
    tiempo --;
    renderizarTiempo();

    if(tiempo == 0){
        clearInterval(timer);
        marcaCompletado(id);
        timer = null;
        renderizarTarea();
        empezarDescanso();
    }
}

function empezarDescanso(){
  tiempo = 5 ;
  nombreTarea.textContent = "Descanso";
  renderizarTiempo();
  tiempoDescanso = setInterval(()=>{tiempoDescansoHanlder()},1000);
}

function tiempoDescansoHanlder(){
    tiempo --;
    renderizarTiempo();

    if(tiempo == 0){
        clearInterval(tiempoDescanso);
        tareaActual = null;
        tiempoDescanso = null;
        nombreTarea.textContent = "";
        renderizarTarea();
    }
}



function renderizarTiempo(){
    const tiempoDiv = document.querySelector("#tiempo #valor");
    const minutos = parseInt(tiempo / 60);
    const segundos = parseInt(tiempo % 60);

    tiempoDiv.textContent = `${minutos <10 ? "0": ""}${minutos}:${segundos < 10 ? "0": ""}${segundos}`
}

function marcaCompletado(id){
    const tareaIndex = tareas.findIndex((tarea) => tarea.id == id);
    tareas[tareaIndex].compleatado = true;

}