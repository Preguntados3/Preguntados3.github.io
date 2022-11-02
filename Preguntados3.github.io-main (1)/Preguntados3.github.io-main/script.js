
let usuarioActual

document.getElementById("elform").onsubmit(function(event){
  event.preventDefault();
});
function registrar(){
  
  event.preventDefault();
    fetch("http://localhost:8080/api/registrarUsuario/"+ document.getElementById("email").value + "/" + document.getElementById("password").value + "/" + document.getElementById("nombre").value + "/" + document.getElementById("apellido").value).then(function(response){
      response.json().then(function(data) {
        if(!data.respuesta){
          alert("Cuenta ya registrada");
        }else{
          $("#staticBackdrop2").modal("hide");
        }
          
      });
  
  });



}
function modoObscuro(){
  document.getElementById("container").style.backgroundColor = "rgb(46, 46, 46)";
  document.getElementById("btn-1").style.backgroundColor = "rgb(46, 46, 46)";
  document.getElementById("btn-1").style.color = "white";
  document.getElementById("btn-1").style.bordercolor = "white";

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
        document.getElementById("btn-1").style.display = "block"
        document.getElementById("btn-2").style.display = "none"
        let mail = document.getElementById("emaili", "email").value;
        usuarioActual = mail
        console.log(mail)
        const array = mail.split("@")
        console.log(array)
        let usuario = array[0]
        console.log(usuario)
        document.getElementById("usuario").innerText = usuario
        document.getElementById("borrarCuenta").style.display = "block"
        $("#staticBackdrop").modal("hide");
      }
      else{
          alert("El correo o la contraseña no son correctos")
      }
    });
  });
  }
  function cerrarSesion(){
        document.getElementById("cerrarSesion").style.display = "none"
        document.getElementById("registro").style.display = "block"
        document.getElementById("inicioDeSesion").style.display = "block"
        document.getElementById("usuario").style.display = "none"
        document.getElementById("borrarCuenta").style.display = "none"
  }
  function eliminarCuenta(){
    fetch("http://localhost:8080/api/borrarUsuario/" + usuarioActual)
  }

  
