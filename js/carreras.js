
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

			});
		

}

function cargarCarrera()
{

	$(document).ready(function() {


		var columnas = "<tr><th>Codigo</th><th>Nombre</th><th>Opciones</th></tr>";

		var carreras = JSON.parse(localStorage.getItem('carreras'));
		var carrera = columnas;

		for (var i = 0 ; i < carreras.length; i++) {
			
			carrera += "<tr>";
			carrera += '<td class="lbl-codigo"><a href="#">'+carreras[i].codigo+'</a></td>';
			carrera +=  '<td class="lbl-nombre">'+carreras[i].nombre+'</td>';
			carrera += "<td>";
			carrera += '<div class="btn-group">';
			carrera += ' <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">Opciones<span class="caret"></span></button>';
			carrera += '<ul class="dropdown-menu" role="menu"><li><a id="'+carreras[i].codigo+'" href="#">Editar</a></li><li><a id="'+carreras[i].codigo+'" href="#">Eliminar</a></li></ul>';
			carrera += '</div>';
			carrera += "</td>";
			carrera += "</tr>";

			document.getElementById("table-carreras").innerHTML = carrera;


		};

	});


}