function registrar(){
    fetch("http://localhost:8080/api/registrarUsuario/"+ document.getElementById("email").value + "/" + document.getElementById("password").value + "/" + document.getElementById("nombre").value + "/" + document.getElementById("apellido").value)
  }