function cargarGaugeCarreras() {

    var carreras = JSON.parse(localStorage.getItem('carreras'));
    var contador = 0;
    var g;



    if (carreras == null) {

        g = new JustGage({
            id: "gauge-carreras",
            value: 0,
            min: 0,
            max: 100,
            title: "Carreras",
            label: "carreras",
            levelColors: ["#00A3F0"]
        });


    } else {

        for (var i = 0; i < carreras.length; i++) {

            if (carreras[i] != undefined) {

                contador++;

            }
        };


        g = new JustGage({
            id: "gauge-carreras",
            value: contador,
            min: 0,
            max: contador * 2,
            title: "Carreras",
            label: "carreras",
            levelColors: ["#00A3F0"]
        });


    }



}

function cargarGaugeEstudiantes() {

    var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
    var contador = 0;
    var g;

    if (estudiantes == null) {

        g = new JustGage({
            id: "gauge-estudiantes",
            value: 0,
            min: 0,
            max: 100,
            title: "Estudiantes",
            label: "estudiantes",
            levelColors: ["#a94442"]
        });


    } else {

        for (var i = 0; i < estudiantes.length; i++) {

            if (estudiantes[i] != undefined) {

                contador++;

            }
        };

        g = new JustGage({
            id: "gauge-estudiantes",
            value: contador,
            min: 0,
            max: contador * 2,
            title: "Estudiantes",
            label: "estudiantes",
            levelColors: ["#a94442"]
        });


    }

}

function cargarGaugeUsuarios() {

    var usuarios = JSON.parse(localStorage.getItem('usuarios'));
    var contador = 0;
    var g;

    if (usuarios == null) {

        g = new JustGage({
            id: "gauge-usuarios",
            value: 0,
            min: 0,
            max: 100,
            title: "Usuarios",
            label: "usuarios",
            levelColors: ["#269B3D"]
        });


    } else {

        for (var i = 0; i < usuarios.length; i++) {

            if (usuarios[i] != undefined) {

                contador++;

            }
        };

        g = new JustGage({
            id: "gauge-usuarios",
            value: contador,
            min: 0,
            max: contador * 2,
            title: "Usuarios",
            label: "usuarios",
            levelColors: ["#269B3D"]
        });


    }
}
