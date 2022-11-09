let usuarioActual = "";
let yaJugo;


function registrar(){
  event.preventDefault(); 
    fetch("http://localhost:8080/api/registrarUsuario/"+ document.getElementById("email").value + "/" + document.getElementById("password").value + "/" + document.getElementById("nombre").value + "/" + document.getElementById("apellido").value).then(function(response){
      response.json().then(function(data) {
        if(!data.respuesta){
          document.getElementById("alerta2").style.display = "block"
        }else{
          $("#staticBackdrop2").modal("hide");
        }
          
      });
  
  });

}



function verScore(){
  fetch("http://localhost:8080/api/verHighScore/").then(function(response){
    response.json().then(function(data) {
      let contador = 0;
      let contador2 = 3;
      for(var key in data){
        if(contador >= (Object.keys(data).length)-3){
          const array = key.split("@");
          let usuario = array[0];
          document.getElementById("H" + contador2).innerText = contador2 + "-" + usuario + ": " + data[key];
          contador2--;
        }
        contador++;
    }
      
     



    });
    
  });
}

function savesnum(val) {
  document.cookie = 'snum:'+val; //Set the cookie
}
window.onload = function(){

  console.log(localStorage.getItem("estabaIngresado"));
  if(localStorage.getItem("estabaIngresado")){
    document.getElementById("cerrarSesion").style.display = "block"
    document.getElementById("registro").style.display = "none"
    document.getElementById("inicioDeSesion").style.display = "none"
    document.getElementById("usuario").style.display = "block"
    document.getElementById("btn-1").style.display = "block"
    document.getElementById("btn-2").style.display = "none"
    const array = localStorage.getItem("usuarioActual2").split("@")
    let usuario = array[0]
    document.getElementById("usuario").innerText = usuario;
    document.getElementById("borrarCuenta").style.display = "block";
    localStorage.removeItem("estabaIngresado");
  }
    
}


document.getElementById("elform2").onsubmit(function(event){
  event.preventDefault();
});
  function iniciarSesion(){
    event.preventDefault();
    fetch("http://localhost:8080/api/iniciarSesion/" + document.getElementById("emaili").value + "/" + document.getElementById("passwordi").value).then(function(response){
    response.json().then(function(data) {
      
      if(data.respuesta){
        
        document.getElementById("cerrarSesion").style.display = "block"
        document.getElementById("registro").style.display = "none"
        document.getElementById("inicioDeSesion").style.display = "none"
        document.getElementById("usuario").style.display = "block"
        document.getElementById("btn-1").style.display = "block"
        document.getElementById("btn-2").style.display = "none"
        let mail = document.getElementById("emaili").value;
        let contraseña = document.getElementById("passwordi").value;
        usuarioActual = mail
        console.log(mail)
        const array = mail.split("@")
        console.log(array)
        let usuario = array[0]
        console.log(usuario)
        console.log(contraseña);
        document.getElementById("usuario").innerText = usuario;
        document.getElementById("borrarCuenta").style.display = "block";
        $("#staticBackdrop").modal("hide");
        localStorage.setItem("usuario", usuarioActual);
        localStorage.setItem("contraseña", contraseña);
        localStorage.setItem("estabaIngresado", false);
        localStorage.removeItem("estabaIngresado");
      }
      else{
          document.getElementById("alerta").style.display = "block";
      }
    });
    
  });
  }
  window.onload = function(){
    console.log("hola");
    console.log(localStorage.getItem("estabaIngresado"));
    if(yaJugo){
      document.getElementById("cerrarSesion").style.display = "block"
      document.getElementById("registro").style.display = "none"
      document.getElementById("inicioDeSesion").style.display = "none"
      document.getElementById("usuario").style.display = "block"
      document.getElementById("btn-1").style.display = "block"
      document.getElementById("btn-2").style.display = "none"
      const array = localStorage.getItem("usuarioActual2").split("@")
      let usuario = array[0]
      document.getElementById("usuario").innerText = usuario;
      document.getElementById("borrarCuenta").style.display = "block";
      localStorage.removeItem("estabaIngresado");
    }
      
  }

  

  function cerrarSesion(){
        document.getElementById("cerrarSesion").style.display = "none"
        document.getElementById("registro").style.display = "block"
        document.getElementById("inicioDeSesion").style.display = "block"
        document.getElementById("usuario").style.display = "none"
        document.getElementById("borrarCuenta").style.display = "none"
        localStorage.removeItem("usuario");
        localStorage.removeItem("estabaIngresado");
  }
  function eliminarCuenta(){
    fetch("http://localhost:8080/api/borrarUsuario/" + usuarioActual);
    localStorage.removeItem("estabaIngresado");
  }
 
