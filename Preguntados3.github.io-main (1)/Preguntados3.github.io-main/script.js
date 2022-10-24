document.getElementById("elform").addEventListener("submit", function(event){

  event.preventDefault();

});
function registrar(){

event.preventDefault();

  fetch("http://localhost:8080/api/registrarUsuario/"+ document.getElementById("email").value + "/" + document.getElementById("password").value + "/" + document.getElementById("nombre").value + "/" + document.getElementById("apellido").value).then(function(response){
    console.log("data");
    response.json().then(function(data) {
      
      if(!data.respuesta){
        alert("Cuenta ya registrada");
      }
        
    });
  });
}

  function iniciarSesion(){
    event.preventDefault();
    fetch("http://localhost:8080/api/iniciarSesion/" + document.getElementById("emaili").value + "/" + document.getElementById("passwordi").value).then(function(response){
    response.json().then(function(data) {
      
      if(data.respuesta){
        
        document.getElementById("cerrarSesion").style.display = "block"
        document.getElementById("registro").style.display = "none"
        document.getElementById("inicioDeSesion").style.display = "none"
        document.getElementById("usuario").style.display = "block"
        let mail = document.getElementById("emaili").value;
        console.log(mail)
        const array = mail.split("@")
        console.log(array)
        let usuario = array[0]
        console.log(usuario)
        document.getElementById("usuario").innerText = usuario
        document.getElementById("borrarCuenta").style.display = "block"
      }
      else{

      }
    });
  });
  }
  function cerrarSesion(){
        document.getElementById("cerrarSesion").style.display = "none"
        document.getElementById("registro").style.display = "block"
        document.getElementById("inicioDeSesion").style.display = "block"
        document.getElementById("usuario").style.display = "none"
  }
  function eliminarCuenta(){
    fetch("http://localhost:8080/api/borrarUsuario/" + document.getElementById("emaili").value)
  }