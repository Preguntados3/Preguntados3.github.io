let preguntaActual;
let usuarioActual = "";
let todasLasPreguntas;
let contadorPreguntaActual = 0;
let HighScore = 0;


 function respuestaUsuario(respuesta){
   
    if(todasLasPreguntas[contadorPreguntaActual].correcta === respuesta){
      console.log("bien");
      contadorPreguntaActual++;
      HighScore++;
      pasarSiguiente();
      return true;
    }
    else{
      console.log("mal");
      alert("pal lobby");
      window.location.href = 'index.html';
      return false;
    }
    
  }

  function pasarSiguiente(){

    document.getElementById("pregunta").innerText = todasLasPreguntas[contadorPreguntaActual].Pregunta;
    document.getElementById("o1").innerText = todasLasPreguntas[contadorPreguntaActual].A;
    document.getElementById("o2").innerText = todasLasPreguntas[contadorPreguntaActual].B;
    document.getElementById("o3").innerText = todasLasPreguntas[contadorPreguntaActual].C;
    document.getElementById("o4").innerText = todasLasPreguntas[contadorPreguntaActual].D;
  }

  function obtenerPreguntas(){
    fetch("http://localhost:8080/api/obtenerPreguntas").then(function(response){
      response.json().then(function(data){
        todasLasPreguntas = data;
        pasarSiguiente();
      })
    })
  }

  function obtenerUsuario(){
   usuarioActual = localStorage.getItem("usuario");
  }
  


  window.onload = function(){
    obtenerUsuario();
    obtenerPreguntas(); 
  }