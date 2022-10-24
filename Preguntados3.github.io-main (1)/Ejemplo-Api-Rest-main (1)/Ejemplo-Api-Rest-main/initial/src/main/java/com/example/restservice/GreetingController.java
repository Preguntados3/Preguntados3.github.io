package com.example.restservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingController {

    private static final String template = "Hello, %s!";
    private DatosJson accesoABaseDeDatos;

    public GreetingController() {
        this.accesoABaseDeDatos = new DatosJson();
    }

    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/api/registrarUsuario/{mail}/{contraseña}/{nombre}/{apellido}")
    public ResponseEntity<Object> registrarUsuarios(@PathVariable String mail, @PathVariable String contraseña, @PathVariable String nombre, @PathVariable String apellido){

        HashMap<String, Boolean>hashMap = this.accesoABaseDeDatos.registrarUsuarios(mail, contraseña, nombre, apellido);

        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://127.0.0.1:5500")
    @GetMapping("/api/iniciarSesion/{mail}/{contraseña}")
    public  ResponseEntity<Object> iniciarSesion(@PathVariable String mail, @PathVariable String contraseña){
        HashMap<String, Boolean>hashMap = this.accesoABaseDeDatos.iniciarSesion(mail, contraseña);
        return new ResponseEntity<>(hashMap, HttpStatus.OK);
    }
    @GetMapping("/api/borrarUsuario/{mail}")
    public void borrarUsuario(@PathVariable String mail){
        this.accesoABaseDeDatos.borrarUsuario(mail);
    }

    @RequestMapping(value = "/datosUsuario/{nombreUsuario}/{clave}",method = RequestMethod.GET)
    public ResponseEntity<Object> traerDatosUsuario(@PathVariable String nombreUsuario, @PathVariable String clave){
        HashMap<String, Object> valoresRequeridos=new HashMap<>();
        valoresRequeridos.put("mail",nombreUsuario);
        valoresRequeridos.put("clave",clave);

        int idUsuario=this.accesoABaseDeDatos.obtenerIdUsuario(valoresRequeridos);
        HashMap<String, Object> infoResponse=new HashMap<>();
        infoResponse.put("idUsuario",idUsuario);
        return new ResponseEntity<>(infoResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "/agregarItem/{idUsuario}/{idLista}/{nombreItem}",method = RequestMethod.GET)
    public void insertarItem(@PathVariable int idUsuario,@PathVariable int idLista, @PathVariable String nombreItem){
        HashMap<String, Object> filtro = new HashMap<>();
        filtro.put("idUsuario",idUsuario);
        filtro.put("listaDeCompras.idLista",idLista);
        this.accesoABaseDeDatos.agregarItem(filtro,nombreItem,false);
    }

    @RequestMapping(value = "/ingresoUsuario",method = RequestMethod.POST)
    public ResponseEntity<Object> ingresarUsuario( @RequestBody HashMap infoUsuario){
        HashMap<String, String> usuario = (HashMap<String, String>) infoUsuario.get("usuario");
        HashMap<String, Object> filtro = new HashMap<>();
        HashMap<String, Object> infoResponse=new HashMap<>();
        filtro.put("mail",usuario.get("mail"));
        if(this.accesoABaseDeDatos.obtenerInfoUsuario(filtro)==null){
            filtro.clear();
            filtro.put("nombre",usuario.get("nombre"));
            if(this.accesoABaseDeDatos.obtenerInfoUsuario(filtro)==null){
                filtro.put("mail",usuario.get("mail"));
                filtro.put("clave",usuario.get("contrasenia"));
                infoResponse.put("usuarioCreadoExitosamente", this.accesoABaseDeDatos.insertarUsuario(filtro));
                return new ResponseEntity<>(infoResponse,HttpStatus.OK);
            }
            else{
                infoResponse.put("nombreRepetido","ya fue usado");
                return new ResponseEntity<>(infoResponse,HttpStatus.NOT_ACCEPTABLE);
            }
        }
        else{
            infoResponse.put("mailRepetido","ya fue usado");
            return new ResponseEntity<>(infoResponse,HttpStatus.OK);
        }

    }
}