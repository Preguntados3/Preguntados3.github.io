let preguntaActual;
let usuarioActual = "";
let contraseñaActual = "";
let todasLasPreguntas;
let contadorPreguntaActual = 0;
let HighScore = 0;


 function respuestaUsuario(respuesta){
   
    if(todasLasPreguntas[contadorPreguntaActual].correcta === respuesta){
      contadorPreguntaActual++;
      HighScore++;
      document.getElementById("contador").innerText = HighScore;
      if(contadorPreguntaActual === todasLasPreguntas.length){
        fetch("http://localhost:8080/api/actualizarHighscore/" + usuarioActual + "/" + HighScore);
        alert("wtf gano alguien");
        window.location.href = 'index.html';
      }
      pasarSiguiente();
      return true;
    }
    else{
      fetch("http://localhost:8080/api/actualizarHighscore/" + usuarioActual + "/" + HighScore);
      localStorage.setItem("estabaIngresado", true);
      console.log(localStorage.getItem("estabaIngresado"));
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
    document.getElementById("categoria").innerText = todasLasPreguntas[contadorPreguntaActual].Categoria;
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
   localStorage.setItem("usuarioActual2", usuarioActual);
   contraseñaActual = localStorage.getItem("contraseña");
   localStorage.setItem("contraseñaActual2", contraseñaActual);
  }
  
  


  window.onload = function(){
    obtenerUsuario();
    obtenerPreguntas(); 
  }