function agregarUsuarios() {

    $("#btn-agregar").click(function()

        {
            debugger;

            if (ValidarUsuarios() == true)

            {
                //Variables

                var nombre_usuario = document.getElementById('usuario').value;
                var nombre_completo = document.getElementById('nombre').value;
                var cedula = document.getElementById('cedula').value;
                var role = document.getElementById('role-valor').value;
                var contrasena = document.getElementById('contrasena').value;

                var usuario = {
                    "usuario": nombre_usuario,
                    "nombre": nombre_completo,
                    "cedula": cedula,
                    "role": role,
                    "contrasena": contrasena
                };

                // toma los valores de carreras
                var usuarios = JSON.parse(localStorage.getItem('usuarios'));

                // comprueba si existe valores en el localstorage
                if (usuarios == null) {

                    usuarios = [];

                }

                usuarios.push(usuario);

                //Enviamos los valores al localstorage
                localStorage.setItem('usuarios', JSON.stringify(usuarios));

                // Imprimos el menssaje de resultado

                var contador = 3;

                document.getElementById("mensaje").innerHTML = '<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Usuario agregado con exito! - Seras redireccionado en ' + contador + '</div>';


                var tiempo = setInterval(function() {

                    contador--;

                    document.getElementById("mensaje").innerHTML = '<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Usuario agregado con exito! - Seras redireccionado en ' + contador + '</div>';

                    if (contador == 1) {

                        clearInterval(tiempo);

                        window.location.href = 'usuarios.html';
                    }

                }, 1000);

            }

        });


}


function cargarUsuarios() {

    // Variable que es igual a los header de la tabla
    var columnas = "<tr><th>Usuario</th><th>Nombre completo</th><th>Cedula</th><th>Role</th><th>Opciones</th></tr>";

    // Variable toma los valores del localstorage en formato JSON 
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));
    var usuario = columnas;


    // Ciclo que recorre la variable en formato JSON
    for (var i = 0; i < usuarios.length; i++) {



        if (usuarios[i] != undefined) {

            // Imprime los valores en formato html con sus respectivas variables tomadas del JSON
            usuario += "<tr>";
            usuario += '<td class="lbl-cedula"><a href="vista.html?usuario=' + usuarios[i].usuario + '">' + usuarios[i].usuario + '</a></td>';
            usuario += '<td class="lbl-nombre">' + usuarios[i].nombre + '</td>';
            usuario += '<td class="lbl-nombre">' + usuarios[i].cedula + '</td>';
            usuario += '<td class="lbl-nombre">' + usuarios[i].role + '</td>';
            usuario += "<td>";
            usuario += '<div class="btn-group">';
            usuario += ' <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">Opciones<span class="caret"></span></button>';
            usuario += '<ul class="dropdown-menu" role="menu"><li><a class="editar" id="' + usuarios[i].usuario + '" href="editar.html?usuario=' + usuarios[i].usuario + '">Editar</a></li><li><a class="eliminar" id="' + usuarios[i].usuario + '" href="#">Eliminar</a></li></ul>';
            usuario += '</div>';
            usuario += "</td>";
            usuario += "</tr>";



        }

    };


    // Agrega los valores al DOM
    document.getElementById("table-usuarios").innerHTML = usuario;


}

function dropdown_Inputs() {

    // Evento que se activa cuando presionamos el TAG <a>
    $("a").click(function() {

        if (this.id == "role") {

            var role = this.text;

            document.getElementById('role-valor').value = role;

        }

    });

}

// Carga el estudiante para revisar si ya fue ingresado
function cargarUsuario(usuario) {
    //Igual la variable al parametro

    var usuario = usuario;

    // Variable toma los valores del localstorage en formato JSON 
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));

    if (usuarios != null) {

        // Ciclo que recorre 
        for (var i = 0; i < usuarios.length; i++) {

            if (usuarios[i] != undefined) {

                if (usuarios[i].cedula == usuario) {

                    return true;

                }
            }

        };

    } else {


        return false;
    }

}



function eliminarUsuarios() {
    // Evento que se activa cuando presionamo el TAG con el class .eliminar
    $(".eliminar").click(function() {

        debugger;

        // Tomamos el id del elemento clikqueado
        var nombre_usuario = $(this).attr("id");

        // Variable toma los valores del localstorage en formato JSON 
        var usuarios = JSON.parse(localStorage.getItem('usuarios'));

        // Ciclo que recorre 
        for (var i = 0; i < usuarios.length; i++) {

            if (usuarios[i] != undefined) {

                if (usuarios[i].usuario == nombre_usuario) {

                    delete usuarios[i];

                }
            }

        };

        // Enviamos los valores de nuevo a localstorage ya actualizados
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Imprimos el menssaje de resultado
        document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Usuario eliminado con exito!</div>';

        //Metodos llamados para cargar y elminar respectivamente

        cargarUsuarios();

        eliminarUsuarios();

    });



}


function editarUsuarios() {
    //Variables
    var cedula;
    var nombre;
    var usuario;
    var role;
    var contrasena;

    //Toma los valores del localstorage
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));

    //Esta variable toma el valor de la cedula enviada por parametro desde el navegador
    usuario = window.location.href.slice(window.location.href.indexOf('=') + 1);

    //Ciclo que reccore y busca en base al valor enviado por parametro
    for (var i = 0; i < usuarios.length; i++) {

        if (usuarios[i] != undefined) {


            if (usuarios[i].usuario == usuario) {

                // Igualamos los variables a los valores del arreglo
                nombre = usuarios[i].nombre;
                cedula = usuarios[i].cedula;
                role = usuarios[i].role;
                contrasena = usuarios[i].contrasena;

            }

        }


    };


    // Toma los valores y los agrega a los campo en el DOM
    document.getElementById("cedula").value = cedula;
    document.getElementById("nombre").value = nombre;
    document.getElementById("usuario").value = usuario;
    document.getElementById("role-valor").value = role;
    document.getElementById("contrasena").value = contrasena;


    // Este evento se activa cuando presionamos el TAG con el id 
    $("#btn-editar").click(function()

        {
            debugger;

            //Ciclo que reccore los valores tomados del localstorage
            for (var i = 0; i < usuarios.length; i++) {

                if (usuarios[i] != undefined) {


                    if (usuarios[i].usuario == usuario) {

                        // Editamos los valores con los domados de los campos del DOM
                        usuarios[i].cedula = document.getElementById("cedula").value;
                        usuarios[i].nombre = document.getElementById("nombre").value;
                        usuarios[i].usuario = document.getElementById("usuario").value;
                        usuarios[i].role = document.getElementById("role-valor").value;
                        usuarios[i].contrasena = document.getElementById('contrasena').value;


                    }

                }


            };

            //Enviamos los datos al localstorage ya actualizados
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            // Imprimos el menssaje de resultado
            var contador = 3;

            document.getElementById("mensaje").innerHTML = '<div class="alert alert-info" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Usuario editado con exito! - Seras redireccionado en ' + contador + '</div>';


            var tiempo = setInterval(function() {

                contador--;

                document.getElementById("mensaje").innerHTML = '<div class="alert alert-info" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Usuario editado con exito! - Seras redireccionado en ' + contador + '</div>';

                if (contador == 1) {

                    clearInterval(tiempo);

                    window.location.href = 'usuarios.html';
                }

            }, 1000);


        });


}


function vistaUsuarios() {

    //Variables
    var cedula;
    var nombre;
    var usuario;
    var role;
    var contrasena;

    //Toma los valores del localstorage
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));

    //Esta variable toma el valor de la cedula enviada por parametro desde el navegador
    usuario = window.location.href.slice(window.location.href.indexOf('=') + 1);

    //Ciclo que reccore y busca en base al valor enviado por parametro
    for (var i = 0; i < usuarios.length; i++) {

        if (usuarios[i] != undefined) {


            if (usuarios[i].usuario == usuario) {

                // Igualamos los variables a los valores del arreglo
                nombre = usuarios[i].nombre;
                cedula = usuarios[i].cedula;
                role = usuarios[i].role;
                contrasena = usuarios[i].contrasena;

            }

        }


    };

    // Toma los valores y los agrega a los campo en el DOM
    document.getElementById("cedula").value = cedula;
    document.getElementById("nombre").value = nombre;
    document.getElementById("usuario").value = usuario;
    document.getElementById("role-valor").value = role;
    document.getElementById("contrasena").value = contrasena;


}

function ValidarUsuarios() {

    //Variables


    var usuario = document.getElementById('usuario').value;
    var nombre = document.getElementById('nombre').value;
    var cedula = document.getElementById('cedula').value;
    var role = document.getElementById('role-valor').value;
    var contrasena = document.getElementById('contrasena').value;


    // Compara los valores si estan vacios
    if (usuario == "" || nombre == "" || cedula == "" || role == "" || contrasena == "") {

        // Imprime la ventana de camnpos obligatorios

        document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Campos obligatorios!</div>';

        return false;

    } else {
        //Buscar el estudiante si ya ha sido registrado con esa cedula
        if (cargarUsuario(usuario) == true) {

            // Imprimer el mensaje de estudiante ya registrado
            document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Este usuario ya ha sido registrado</div>';


        } else {

            return true;
        }




    }




}
