
function agregarEstudiantes()
{

	


		$("#btn-agregar").click(function() 

			{
				var cedula = document.getElementById('cedula').value;
				var nombre = document.getElementById('nombre').value;
				var carrera = document.getElementById('carrera').value;
				var nivel_ingles = document.getElementById('nivel_ingles').value;
				var imagen = document.getElementById('imagen').lastChild.attributes[0].value;

				var estudiante = {"cedula":cedula,"nombre":nombre, "carrera":carrera,"nivel_ingles":nivel_ingles,"imagen":imagen};

				// toma los valores de carreras
				var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));

				// comprueba si existe valores en el localstorage
				if(estudiantes == null)                                                                                                      
				{

					estudiantes = [];

				}

				estudiantes.push(estudiante);


				localStorage.setItem('estudiantes',JSON.stringify(estudiantes));

				document.getElementById("mensaje").innerHTML = '<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Estudiante agregado con exito!</div>';


			});
		

}

		
		// Este metodo llena los input con los valores seleccionados en los dropdown
		function dropdown_Inputs()
		{


			$("a").click(function() 
		{
		
		debugger;

		if(this.id == "carreras")
		{

				var	carrera =  this.text;

				document.getElementById('carrera').value = carrera;

		}else

		{

				var	nivel_ingles =  this.text;

				document.getElementById('nivel_ingles').value = nivel_ingles;


		}

				


		});

	}



function  cargarEstudiantes()
{

		var columnas = "<tr><th></th><th>Cedula</th><th>Nombre</th><th>Carrera</th><th>Nivel ingles</th><th>Opciones</th></tr>";

		var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
		var estudiante = columnas;

		for (var i = 0 ; i < estudiantes.length; i++) {
			


			if(estudiantes[i] != undefined)
			{

			estudiante += "<tr>";
			estudiante += '<td class="lbl-imagen"><img src="'+estudiantes[i].imagen+'" height="100" width="100" ></a></td>';
			estudiante += '<td class="lbl-cedula"><a href="vista.html?cedula='+estudiantes[i].cedula+'">'+estudiantes[i].cedula+'</a></td>';
			estudiante +=  '<td class="lbl-nombre">'+estudiantes[i].nombre+'</td>';
			estudiante +=  '<td class="lbl-nombre">'+estudiantes[i].carrera+'</td>';
			estudiante +=  '<td class="lbl-nombre">'+estudiantes[i].nivel_ingles+'</td>';
			estudiante += "<td>";
			estudiante += '<div class="btn-group">';
			estudiante += ' <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">Opciones<span class="caret"></span></button>';
			estudiante += '<ul class="dropdown-menu" role="menu"><li><a class="editar" id="'+estudiantes[i].cedula+'" href="editar.html?cedula='+estudiantes[i].cedula+'">Editar</a></li><li><a class="eliminar" id="'+estudiantes[i].cedula+'" href="#">Eliminar</a></li></ul>';
			estudiante += '</div>';
			estudiante += "</td>";
			estudiante += "</tr>";

			

			}


			

		};

		document.getElementById("table-estudiantes").innerHTML = estudiante;


}

function cargarCarreras()
{

debugger;
var carreras = JSON.parse(localStorage.getItem('carreras'));
var carrera = "";

		for (var i = 0 ; i < carreras.length; i++) {

			if(carreras[i] != undefined)
			{

				carrera += '<li><a id="carreras" href="#">'+carreras[i].nombre+'</a></li>'

			}

			};



			document.getElementById('menu_carreras').innerHTML = carrera;




	
}


function  eliminarEstudiantes()
{

		$(".eliminar").click(function() 
			{

			var	cedula_estudiante =  $(this).attr("id");

			var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));

			for (var i = 0; i < estudiantes.length; i++) {

				if(estudiantes[i] != undefined)
			{

				if(estudiantes[i].cedula == cedula_estudiante)
				{

						delete estudiantes[i];

				}
	     	}

			};

		 localStorage.setItem('estudiantes',JSON.stringify(estudiantes));

			document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Estudiante eliminado con exito!</div>';
		
				cargarEstudiantes();

				eliminarEstudiantes();

			});
		
		

}


function editarEstudiantes()
{

	var cedula_estudiante;
	var nombre_estudiante;
	var carrera_estudiante;
	var nivel_ingles_estudiante;
	var imagen_estudiante;
	var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));

   cedula_estudiante = window.location.href.slice(window.location.href.indexOf('=') + 1);


    for (var i = 0; i < estudiantes.length; i++) {

    			if(estudiantes[i] != undefined)
			{


    		if(estudiantes[i].cedula == cedula_estudiante)
    		{

    			nombre_estudiante = estudiantes[i].nombre;
    			carrera_estudiante = estudiantes[i].carrera;
    			nivel_ingles_estudiante = estudiantes[i].nivel_ingles;
    			imagen_estudiante = estudiantes[i].imagen;

    		}

			}
    	

   	};


  	document.getElementById("cedula").value = cedula_estudiante;
  	document.getElementById("nombre").value = nombre_estudiante;
    document.getElementById("carrera").value = carrera_estudiante;
  	document.getElementById("nivel_ingles").value = nivel_ingles_estudiante;
  	document.getElementById("imagen").innerHTML = '<img src="'+imagen_estudiante+'">';


		$("#btn-editar").click(function() 

			{

			for (var i = 0; i < estudiantes.length; i++) {

    			if(estudiantes[i] != undefined)
			{


    		if(estudiantes[i].cedula == cedula_estudiante)
    		{

    			estudiantes[i].cedula = document.getElementById("cedula").value;
    			estudiantes[i].nombre = document.getElementById("nombre").value;
    			estudiantes[i].carrera = document.getElementById("carrera").value;
    			estudiantes[i].nivel_ingles = document.getElementById("nivel_ingles").value;
    			estudiantes[i].imagen = document.getElementById('imagen').lastChild.attributes[0].value;


    		}

			}
    	

   			};

   			localStorage.setItem('estudiantes',JSON.stringify(estudiantes));

   			document.getElementById("mensaje").innerHTML = '<div class="alert alert-info" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Estudiante editado con exito!</div>';

 
 			});


}


function vistaEstudiantes()
{


	var cedula_estudiante;
	var nombre_estudiante;
	var carrera_estudiante;
	var nivel_ingles_estudiante;
	var imagen_estudiante;
	var estudiantes = JSON.parse(localStorage.getItem('estudiantes'));

   cedula_estudiante = window.location.href.slice(window.location.href.indexOf('=') + 1);


    for (var i = 0; i < estudiantes.length; i++) {

    			if(estudiantes[i] != undefined)
			{


    		if(estudiantes[i].cedula == cedula_estudiante)
    		{

    			nombre_estudiante = estudiantes[i].nombre;
    			carrera_estudiante = estudiantes[i].carrera;
    			nivel_ingles_estudiante = estudiantes[i].nivel_ingles;
    			imagen_estudiante = estudiantes[i].imagen;

    		}

			}
    	

   	};


  	document.getElementById("cedula").value = cedula_estudiante;
  	document.getElementById("nombre").value = nombre_estudiante;
    document.getElementById("carrera").value = carrera_estudiante;
  	document.getElementById("nivel_ingles").value = nivel_ingles_estudiante;
  	document.getElementById("imagen").innerHTML = '<img src="'+imagen_estudiante+'">';
  	document.getElementById("encabezado-pagina").innerHTML = nombre_estudiante;



}