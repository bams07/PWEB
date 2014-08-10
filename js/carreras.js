function agregarCarrera() {

    $("#btn-agregar").click(function()

        {
            if (ValidarCarrera() == true) {

                var codigo = document.getElementById('codigo').value;
                var nombre = document.getElementById('nombre').value;

                var carrera = {
                    "codigo": codigo,
                    "nombre": nombre
                };

                // toma los valores de carreras
                var carreras = JSON.parse(localStorage.getItem('carreras'));

                // comprueba si existe valores en el localstorage
                if (carreras == null) {

                    carreras = [];

                }

                carreras.push(carrera);


                localStorage.setItem('carreras', JSON.stringify(carreras));

                var contador = 3;

                document.getElementById("mensaje").innerHTML = '<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Carrera agregada con exito! - Seras redireccionado en ' + contador + '</div>';


                var tiempo = setInterval(function() {

                    contador--;

                    document.getElementById("mensaje").innerHTML = '<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Carrera agregada con exito! - Seras redireccionado en ' + contador + '</div>';

                    if (contador == 1) {

                        clearInterval(tiempo);

                        window.location.href = 'carreras.html';
                    }

                }, 1000);

            }

        });



}

function cargarCarrera() {



    var columnas = "<tr><th>Codigo</th><th>Nombre</th><th>Opciones</th></tr>";

    var carreras = JSON.parse(localStorage.getItem('carreras'));
    var carrera = columnas;

    for (var i = 0; i < carreras.length; i++) {



        if (carreras[i] != undefined) {

            carrera += "<tr>";
            carrera += '<td class="lbl-codigo"><a href="#">' + carreras[i].codigo + '</a></td>';
            carrera += '<td class="lbl-nombre">' + carreras[i].nombre + '</td>';
            carrera += "<td>";
            carrera += '<div class="btn-group">';
            carrera += ' <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">Opciones<span class="caret"></span></button>';
            carrera += '<ul class="dropdown-menu" role="menu"><li><a class="editar" id="' + carreras[i].codigo + '" href="editar.html?codigo=' + carreras[i].codigo + '">Editar</a></li><li><a class="eliminar" id="' + carreras[i].codigo + '" href="#">Eliminar</a></li></ul>';
            carrera += '</div>';
            carrera += "</td>";
            carrera += "</tr>";



        }




    };

    document.getElementById("table-carreras").innerHTML = carrera;


}


function eliminarCarrera() {


    $(".eliminar").click(function() {

        var codigo_carrera = $(this).attr("id");

        var carreras = JSON.parse(localStorage.getItem('carreras'));

        for (var i = 0; i < carreras.length; i++) {

            if (carreras[i] != undefined) {

                if (carreras[i].codigo == codigo_carrera) {

                    delete carreras[i];

                }
            }

        };

        localStorage.setItem('carreras', JSON.stringify(carreras));

        document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Carrera eliminada con exito!</div>';

        cargarCarrera();

        eliminarCarrera();

    });



}


function editarCarrera() {

    var codigo_carrera;
    var nombre_carrera;
    var carreras = JSON.parse(localStorage.getItem('carreras'));

    var codigo_carrera = window.location.href.slice(window.location.href.indexOf('=') + 1);



    for (var i = 0; i < carreras.length; i++) {

        if (carreras[i] != undefined) {


            if (carreras[i].codigo == codigo_carrera) {

                nombre_carrera = carreras[i].nombre;

            }

        }


    };


    document.getElementById("codigo").value = codigo_carrera;
    document.getElementById("nombre").value = nombre_carrera;


    $("#btn-editar").click(function()

        {

            for (var i = 0; i < carreras.length; i++) {

                if (carreras[i] != undefined) {


                    if (carreras[i].codigo == codigo_carrera) {

                        carreras[i].nombre = document.getElementById("nombre").value;

                    }

                }


            };

            localStorage.setItem('carreras', JSON.stringify(carreras));



            var contador = 3;

            document.getElementById("mensaje").innerHTML = '<div class="alert alert-info" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Carrera editada con exito! - Seras redireccionado en ' + contador + '</div>';


            var tiempo = setInterval(function() {

                contador--;

                document.getElementById("mensaje").innerHTML = '<div class="alert alert-info" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Carrera editada con exito! - Seras redireccionado en ' + contador + '</div>';

                if (contador == 1) {

                    clearInterval(tiempo);

                    window.location.href = 'carreras.html';
                }

            }, 1000);

        });


}

function ValidarCarrera() {



    //Variables
    var codigo = document.getElementById('codigo').value;
    var nombre = document.getElementById('nombre').value;


    // Compara los valores si estan vacios
    if (codigo == "" || nombre == "") {

        // Imprime la ventana de camnpos obligatorios

        document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Campos obligatorios!</div>';

        return false;

    } else {
        //Buscar el estudiante si ya ha sido registrado con esa cedula
        if (CargarCarrera(codigo) == true) {

            // Imprimer el mensaje de estudiante ya registrado
            document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>La carrera con el codigo ' + codigo + ' ya esta registrada</div>';


        } else {

            return true;
        }

    }


}


function CargarCarrera(codigo) {


    //Igual la variable al parametro
    var codigo_carrera = codigo;

    // Variable toma los valores del localstorage en formato JSON 
    var carreras = JSON.parse(localStorage.getItem('carreras'));

    if (carreras != null) {

        // Ciclo que recorre 
        for (var i = 0; i < carreras.length; i++) {

            if (carreras[i] != undefined) {

                if (carreras[i].codigo == codigo_carrera) {

                    return true;

                }
            }

        };

    }else

    {

        return false;        
    }

}
