
function agregarCarrera()
{

		$("#btn-agregar").click(function() 

			{

				var codigo = document.getElementById('codigo').value;
				var nombre = document.getElementById('nombre').value;

				var carrera = {"codigo":codigo,"nombre":nombre};

				// toma los valores de carreras
				var carreras = JSON.parse(localStorage.getItem('carreras'));

				// comprueba si existe valores en el localstorage
				if(carreras == null)                                                                                                      
				{

					carreras = [];

				}

				carreras.push(carrera);


				localStorage.setItem('carreras',JSON.stringify(carreras));

				document.getElementById("mensaje").innerHTML = '<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Carrera agregada con exito!</div>';


			});
		

}

function  cargarCarrera()
{



		var columnas = "<tr><th>Codigo</th><th>Nombre</th><th>Opciones</th></tr>";

		var carreras = JSON.parse(localStorage.getItem('carreras'));
		var carrera = columnas;

		for (var i = 0 ; i < carreras.length; i++) {
			


			if(carreras[i] != undefined)
			{

			carrera += "<tr>";
			carrera += '<td class="lbl-codigo"><a href="#">'+carreras[i].codigo+'</a></td>';
			carrera +=  '<td class="lbl-nombre">'+carreras[i].nombre+'</td>';
			carrera += "<td>";
			carrera += '<div class="btn-group">';
			carrera += ' <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">Opciones<span class="caret"></span></button>';
			carrera += '<ul class="dropdown-menu" role="menu"><li><a class="editar" id="'+carreras[i].codigo+'" href="editar.html?codigo='+carreras[i].codigo+'">Editar</a></li><li><a class="eliminar" id="'+carreras[i].codigo+'" href="#">Eliminar</a></li></ul>';
			carrera += '</div>';
			carrera += "</td>";
			carrera += "</tr>";

			

			}


			

		};

		document.getElementById("table-carreras").innerHTML = carrera;


}


function  eliminarCarrera()
{


		$(".eliminar").click(function() 
			{

			var	codigo_carrera =  $(this).attr("id");

			var carreras = JSON.parse(localStorage.getItem('carreras'));

			for (var i = 0; i < carreras.length; i++) {

				if(carreras[i] != undefined)
			{

				if(carreras[i].codigo == codigo_carrera)
				{

						delete carreras[i];

				}
	     	}

			};

		 localStorage.setItem('carreras',JSON.stringify(carreras));

			document.getElementById("mensaje").innerHTML = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Carrera eliminada con exito!</div>';
		
				cargarCarrera();

				eliminarCarrera();

			});
		
		

}


function editarCarrera()

{

	var codigo_carrera;
	var nombre_carrera;
	var carreras = JSON.parse(localStorage.getItem('carreras'));

    var codigo_carrera = window.location.href.slice(window.location.href.indexOf('=') + 1);



    for (var i = 0; i < carreras.length; i++) {

    			if(carreras[i] != undefined)
			{


    		if(carreras[i].codigo == codigo_carrera)
    		{

    			nombre_carrera = carreras[i].nombre;

    		}

			}
    	

   	};


  	document.getElementById("codigo").value = codigo_carrera;
  	document.getElementById("nombre").value = nombre_carrera;


		$("#btn-editar").click(function() 

			{

				for (var i = 0; i < carreras.length; i++) {

    			if(carreras[i] != undefined)
			{


    		if(carreras[i].codigo == codigo_carrera)
    		{

    			carreras[i].nombre = document.getElementById("nombre").value;

    		}

			}
    	

   			};

   			localStorage.setItem('carreras',JSON.stringify(carreras));

   			document.getElementById("mensaje").innerHTML = '<div class="alert alert-info" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Carrera editada con exito!</div>';

 
 			});


}


