function ValidarLogin() {

    $("button[name = 'btn-editar']").click(function() {

        // Variables
        var usuario = document.getElementById("usuario").value;
        var contrasena = document.getElementById("contrasena").value;
        var usuarios = JSON.parse(localStorage.getItem('usuarios'));
        var correcto = 0;

        //Ciclo que recorre los usuarios
        for (var i = 0; i < usuarios.length; i++) {



            if (usuarios[i] != undefined) {

                // If que buscar el usuario y contrasena enviados
                if (usuarios[i].usuario == usuario && usuarios[i].contrasena == contrasena) {

                    location.href = "Dashboard.html";
                    correcto = 1;
                    break;

                }




            }




        };

        // Si la var correcto es 0 es por que no existe usuario y contrasena 
        if (correcto == 0) {

            document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Usuario o contraseña incorrectos!</div>';
            document.getElementById("usuario").value = "";
            document.getElementById("contrasena").value = "";

        }


    });

}
