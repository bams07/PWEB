function agregarEstudiantes() {

    $("#btn-agregar").click(function()

        {
            if (ValidarEstudiantes() == true)

            {
                //Variables

                var cedula = document.getElementById('cedula').value;
                var nombre = document.getElementById('nombre').value;
                var carrera = document.getElementById('carrera').value;
                var nivel_ingles = document.getElementById('nivel_ingles').value;
                var imagen = document.getElementById('imagen').src;

                var estudiante = {
                    "cedula": cedula,
                    "nombre": nombre,
                    "carrera": carrera,
                    "nivel_ingles": nivel_ingles,
                    "imagen": imagen
                };

                // toma los valores de carreras
                var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));

                // comprueba si existe valores en el localstorage
                if (estudiantes == null) {

                    estudiantes = [];

                }

                estudiantes.push(estudiante);

                //Enviamos los valores al localstorage
                localStorage.setItem('estudiantes', JSON.stringify(estudiantes));

                // Imprimos el menssaje de resultado

                var contador = 3;

                document.getElementById("mensaje").innerHTML = '<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Estudiante agregado con exito! - Seras redireccionado en ' + contador + '</div>';


                var tiempo = setInterval(function() {

                    contador--;

                    document.getElementById("mensaje").innerHTML = '<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Estudiante agregado con exito! - Seras redireccionado en ' + contador + '</div>';

                    if (contador == 1) {

                        clearInterval(tiempo);

                        window.location.href = 'estudiantes.html';
                    }

                }, 1000);

            }

        });


}


// Este metodo llena los input con los valores seleccionados en los dropdown
function dropdown_Inputs() {

    // Evento que se activa cuando presionamos el TAG <a>
    $("a").click(function() {

debugger;

        if (this.id == "carreras") {

            var carrera = this.name;

            document.getElementById('carrera').value = carrera;

        } else

        {

            var nivel_ingles = this.text;

            document.getElementById('nivel_ingles').value = nivel_ingles;


        }




    });

}



function CargarImagen() {

    // Evento que se activa cuando el elemento cambia
    $('#cargar-imagen').change(function() {

        // Variables
        var cargar_imagen = document.getElementById('cargar-imagen');
        var mostrar_imagen = document.getElementById('mostrar-imagen');


        //Toma los datos del input
        var file = cargar_imagen.files[0];
        // Tipo de datos que buscamos
        var tipo_imagen = /image.*/;

        //Compara si el archivo seleccionado es de tipo imagen
        if (file.type.match(tipo_imagen)) {

            // Variable que es una funcion de leer archivos
            var reader = new FileReader();

            reader.onload = function(e) {


                mostrar_imagen.innerHTML = null;

                // Crea una variable de tipo tag IMG
                var img = new Image();
                img.src = reader.result;
                img.id = "imagen";
                img.width = 200;
                img.height = 150;

                //Agregar la variable TAG IMG al DOM
                mostrar_imagen.appendChild(img);
            }

            // Convierte el archivo leido en un dato binario
            reader.readAsDataURL(file);

        } else {

            mostrar_imagen.innerHTML = "Archivo no soportado"
        }

    });


}


function cargarEstudiantes() {

    // Variable que es igual a los header de la tabla
    var columnas = "<tr><th></th><th>Cedula</th><th>Nombre</th><th>Carrera</th><th>Nivel ingles</th><th>Opciones</th></tr>";

    // Variable toma los valores del localstorage en formato JSON 
    var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
    var estudiante = columnas;


    // Ciclo que recorre la variable en formato JSON
    for (var i = 0; i < estudiantes.length; i++) {



        if (estudiantes[i] != undefined) {

            // Imprime los valores en formato html con sus respectivas variables tomadas del JSON
            estudiante += "<tr>";
            estudiante += '<td class="lbl-imagen"><img src="' + estudiantes[i].imagen + '" height="100" width="100" ></a></td>';
            estudiante += '<td class="lbl-cedula"><a href="vista.html?cedula=' + estudiantes[i].cedula + '">' + estudiantes[i].cedula + '</a></td>';
            estudiante += '<td class="lbl-nombre">' + estudiantes[i].nombre + '</td>';
            estudiante += '<td class="lbl-nombre">' + estudiantes[i].carrera + '</td>';
            estudiante += '<td class="lbl-nombre">' + estudiantes[i].nivel_ingles + '</td>';
            estudiante += "<td>";
            estudiante += '<div class="btn-group">';
            estudiante += ' <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">Opciones<span class="caret"></span></button>';
            estudiante += '<ul class="dropdown-menu" role="menu"><li><a class="editar" id="' + estudiantes[i].cedula + '" href="editar.html?cedula=' + estudiantes[i].cedula + '">Editar</a></li><li><a class="eliminar" id="' + estudiantes[i].cedula + '" href="#">Eliminar</a></li></ul>';
            estudiante += '</div>';
            estudiante += "</td>";
            estudiante += "</tr>";



        }




    };

    // Agrega los valores al DOM
    document.getElementById("table-estudiantes").innerHTML = estudiante;


}

// Carga el estudiante para revisar si ya fue ingresado
function CargarEstudiante(cedula) {
    //Igual la variable al parametro

    var cedula_estudiante = cedula;

    // Variable toma los valores del localstorage en formato JSON 
    var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));

    if (estudiantes != null) {

        // Ciclo que recorre 
        for (var i = 0; i < estudiantes.length; i++) {

            if (estudiantes[i] != undefined) {

                if (estudiantes[i].cedula == cedula_estudiante) {

                    return true;

                }
            }

        };

    } else {

        return false;
    }

}

function cargarCarreras() {


    // Variable toma los valores del localstorage en formato JSON 
    var carreras = JSON.parse(localStorage.getItem('carreras'));
    var carrera = "";

    // Ciclo que recorre las carreras
    for (var i = 0; i < carreras.length; i++) {

        if (carreras[i] != undefined) {

            // Imprime los valores en formato html con sus respectivas variables tomadas del JSON
            carrera += '<li><a id="carreras" name="' + carreras[i].codigo + '" href="#">Codigo: ' + carreras[i].codigo + ' - Nombre: ' + carreras[i].nombre + '</a></li>'

        }

    };


    // Agrega los valores al DOM
    document.getElementById('menu_carreras').innerHTML = carrera;





}


function eliminarEstudiantes() {
    // Evento que se activa cuando presionamo el TAG con el class .eliminar
    $(".eliminar").click(function() {

        // Tomamos el id del elemento clikqueado
        var cedula_estudiante = $(this).attr("id");

        // Variable toma los valores del localstorage en formato JSON 
        var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));

        // Ciclo que recorre 
        for (var i = 0; i < estudiantes.length; i++) {

            if (estudiantes[i] != undefined) {

                if (estudiantes[i].cedula == cedula_estudiante) {

                    delete estudiantes[i];

                }
            }

        };

        // Enviamos los valores de nuevo a localstorage ya actualizados
        localStorage.setItem('estudiantes', JSON.stringify(estudiantes));

        // Imprimos el menssaje de resultado
        document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Estudiante eliminado con exito!</div>';

        //Metodos llamados para cargar y elminar respectivamente

        cargarEstudiantes();

        eliminarEstudiantes();

    });



}


function editarEstudiantes() {
    //Variables
    var cedula_estudiante;
    var nombre_estudiante;
    var carrera_estudiante;
    var nivel_ingles_estudiante;
    var imagen_estudiante;

    //Toma los valores del localstorage
    var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));

    //Esta variable toma el valor de la cedula enviada por parametro desde el navegador
    cedula_estudiante = window.location.href.slice(window.location.href.indexOf('=') + 1);

    //Ciclo que reccore y busca en base al valor enviado por parametro
    for (var i = 0; i < estudiantes.length; i++) {

        if (estudiantes[i] != undefined) {


            if (estudiantes[i].cedula == cedula_estudiante) {
                // Igualamos los variables a los valores del arreglo
                nombre_estudiante = estudiantes[i].nombre;
                carrera_estudiante = estudiantes[i].carrera;
                nivel_ingles_estudiante = estudiantes[i].nivel_ingles;
                imagen_estudiante = estudiantes[i].imagen;

            }

        }


    };


    // Toma los valores y los agrega a los campo en el DOM
    document.getElementById("cedula").value = cedula_estudiante;
    document.getElementById("nombre").value = nombre_estudiante;
    document.getElementById("carrera").value = carrera_estudiante;
    document.getElementById("nivel_ingles").value = nivel_ingles_estudiante;
    document.getElementById("mostrar-imagen").innerHTML = '<img src="' + imagen_estudiante + '" id="imagen" width="200px" height="150px">';


    // Este evento se activa cuando presionamos el TAG con el id 
    $("#btn-editar").click(function()

        {

            //Ciclo que reccore los valores tomados del localstorage
            for (var i = 0; i < estudiantes.length; i++) {

                if (estudiantes[i] != undefined) {


                    if (estudiantes[i].cedula == cedula_estudiante) {

                        // Editamos los valores con los domados de los campos del DOM
                        estudiantes[i].cedula = document.getElementById("cedula").value;
                        estudiantes[i].nombre = document.getElementById("nombre").value;
                        estudiantes[i].carrera = document.getElementById("carrera").value;
                        estudiantes[i].nivel_ingles = document.getElementById("nivel_ingles").value;
                        estudiantes[i].imagen = document.getElementById('imagen').src;


                    }

                }


            };

            //Enviamos los datos al localstorage ya actualizados
            localStorage.setItem('estudiantes', JSON.stringify(estudiantes));

            // Imprimos el menssaje de resultado
            var contador = 3;

            document.getElementById("mensaje").innerHTML = '<div class="alert alert-info" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Estudiante editado con exito! - Seras redireccionado en ' + contador + '</div>';


            var tiempo = setInterval(function() {

                contador--;

                document.getElementById("mensaje").innerHTML = '<div class="alert alert-info" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Estudiante editado con exito! - Seras redireccionado en ' + contador + '</div>';

                if (contador == 1) {

                    clearInterval(tiempo);

                    window.location.href = 'estudiantes.html';
                }

            }, 1000);


        });


}


function vistaEstudiantes() {

    // Variables
    var cedula_estudiante;
    var nombre_estudiante;
    var carrera_estudiante;
    var nivel_ingles_estudiante;
    var imagen_estudiante;
    var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));

    //Esta variable toma el valor de la cedula enviada por parametro desde el navegador
    cedula_estudiante = window.location.href.slice(window.location.href.indexOf('=') + 1);

    // Ciclo que recorre los valores
    for (var i = 0; i < estudiantes.length; i++) {

        if (estudiantes[i] != undefined) {


            if (estudiantes[i].cedula == cedula_estudiante) {
                // Igualamos los variables a los valores del arreglo
                nombre_estudiante = estudiantes[i].nombre;
                carrera_estudiante = estudiantes[i].carrera;
                nivel_ingles_estudiante = estudiantes[i].nivel_ingles;
                imagen_estudiante = estudiantes[i].imagen;

            }

        }


    };

    // Agregamos los valores de las variables a los campos del DOM
    document.getElementById("cedula").value = cedula_estudiante;
    document.getElementById("nombre").value = nombre_estudiante;
    document.getElementById("carrera").value = carrera_estudiante;
    document.getElementById("nivel_ingles").value = nivel_ingles_estudiante;
    document.getElementById("mostrar-imagen").innerHTML = '<img src="' + imagen_estudiante + '" width="200px" height="150px">';
    document.getElementById("encabezado-pagina").innerHTML = "Estudiante - " + nombre_estudiante;



}

function ValidarEstudiantes() {
    debugger;

    //Variables

    try {
        var cedula = document.getElementById('cedula').value;
        var nombre = document.getElementById('nombre').value;
        var carrera = document.getElementById('carrera').value;
        var nivel_ingles = document.getElementById('nivel_ingles').value;
        var imagen = document.getElementById('imagen').src;

    } catch (err) {



    }

    // Compara los valores si estan vacios
    if (cedula == "" || nombre == "" || carrera == "" || nivel_ingles == "" || imagen == undefined) {

        // Imprime la ventana de camnpos obligatorios

        document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Campos obligatorios!</div>';

        return false;

    } else {
        //Buscar el estudiante si ya ha sido registrado con esa cedula
        if (CargarEstudiante(cedula) == true) {

            // Imprimer el mensaje de estudiante ya registrado
            document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>El estudiante con la cedula ' + cedula + ' ya esta registrado</div>';


        } else {

            return true;
        }




    }




}
