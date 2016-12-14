(function constructor(args) {
	"use strict";

	var modoEditor,
	    idEnEdicion,
	    MODO_NUEVO,
	    MODO_EDICION;

	MODO_NUEVO = 1;
	MODO_EDICION = 2;

	modoEditor = null;
	idEnEdicion = null;

/*
	- Al iniciar el controlador debemos instalar la base de datos

	- Cuando la ventana se abra debemos obtener los registros de la DB
	  y mostrarlos las peliculas en la lista

	- Cuando se haga click en un registro llamar a editarItem

	- Entonces se abrirá un diálogo sobre el que tendremos que volcar los
	  datos de la película y podremos operar de la siguiente forma:

			Insertar registro: nuevaPelicula - Insertaremos un nuevo registro en la base de datos
			Editar registro: editarItem - Editaremos un registro existente
			Borrar registro: borrarPelicula -Eliminaremos de la base de datos la película
			Guardar registro: guardarPelicula - Guardaremos los cambios hechos en el registro
*/

	var db = Ti.Database.install('/db/peliculas','peliculas');

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Establecer callback para el evento open la ventana $.win
		$.addListener($.win, "open", cargarDatos);

		//Establecer callback para el evento itemclick de la lista $.list
		$.addListener($.list, "itemclick", editarItem);

		//Establecer callback para el evento click de la etiqueta $.nuevaPelicula
		$.addListener($.nuevaPelicula, "click", nuevaPelicula);

		//Establecer callbacks botones formulario
		$.addListener($.guardar, "click", guardarPelicula);
		$.addListener($.eliminar, "click", borrarPelicula);
		$.addListener($.cancelar, "click", cerrarEditor);
	})();

	/**
	 * cargarDatos
	 * @description Cargar base de datos
	 * @param {Object} e
	 */
	function cargarDatos(e) {
		var resultSet;

		//Obtener todos los datos de la base de datos
		//Preparamos query, ejecutamos y obtenemos un ResultSet
		
		var db2 = Ti.Database.open('peliculas');
		
		var sql = 'SELECT * FROM PELICULAS';
		var resultSet = db2.execute(sql);

		//Llamar a mostrarDatos pasándole como parámetro un ResultSet
		mostrarDatos(resultSet);
		
		db2.close();
	}

	/**
	 * mostrarDatos
	 * @description Muestra los datos de la DB en la lista
	 * @param {Object} resultSet Conjunto de registros
	 */
	function mostrarDatos(resultSet) {
		var items;

		items = [];
		//resultSet = null;

		//Iterar sobre los registros: while(resultSet.isValidRow())
		while(resultSet.isValidRow()){
			items.push(prepararItem(resultSet));
			resultSet.next();
		}
		resultSet.close();
		
		
		//Añadimos cada registro como item: items.push(prepararItem(registro))
		

		//Mostramos elementos en la lista
		$.section.setItems(items);
	}

	/**
	 * prepararItem
	 * @description Prepara el objeto para un ListItem
	 * @param {Object} registro Objeto resultSet
	 */
	function prepararItem(registro) {
		var pelicula = {
			id: "id",
			titulo : "Titulo",
			genero : "Genero",
			año : "2000",
			sinopsis : "Sinopsis"
		};

		//Preparar objeto pelicula obteniendo la información
		//para cada item del registro
		
		pelicula.id = registro.fieldByName('ID');
		pelicula.titulo =  registro.fieldByName('TITULO');
		pelicula.genero =  registro.fieldByName('GENERO');
		pelicula.año =  registro.fieldByName('AÑO');
		pelicula.sinopsis =  registro.fieldByName('SINOPSIS');

		return {
			properties : {
				id: pelicula.id,
				width : Ti.UI.FILL,
				height : 48,
				title : pelicula.titulo,
				color : "black",
				accessoryType : Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
				pelicula : pelicula
			}
		};
	}

	/**
	 * actualizarLista
	 * @description Carga los datos
	 */
	function actualizarLista() {
		cargarDatos();
	}

	/**
	 * nuevaPelicula
	 * @description Abre el editor para añadir una nueva pelicula
	 * @param {Object} e
	 */
	function nuevaPelicula(e) {
		modoEditor = MODO_NUEVO;
		$.editor.show();
	}

	/**
	 * editarItem
	 * @description Callback de click en un item de la lista, llenamos el formulario
	 * @param {Object} e
	 */
	function editarItem(e) {
		//Obtener item de lista
		var id = e.section.items[e.itemIndex].properties.id;
		//Guardar ID en idEnEdicion
		idEnEdicion = id;
		//Rellenar el formulario
		$.titulo.setValue(e.section.items[e.itemIndex].properties.pelicula.titulo);
		$.genero.setValue(e.section.items[e.itemIndex].properties.pelicula.genero);
		$.año.setValue(e.section.items[e.itemIndex].properties.pelicula.año);
		$.sinopsis.setValue(e.section.items[e.itemIndex].properties.pelicula.sinopsis);
		
		//Establecemos modo de edición y mostramos formulario
		modoEditor = MODO_EDICION;
		$.editor.show();
	}

	/**
	 * guardarPelicula
	 * @description Dependiendo del modo de edicion insertamos o actualizamos
	 * @param {Object} e
	 */
	function guardarPelicula(e) {

		if (modoEditor == MODO_NUEVO) {
			insertarPelicula();
		} else if (modoEditor == MODO_EDICION) {
			actualizarPelicula();
		}

		//Cerramos editor
		cerrarEditor();

		//Refrescamos lista
		actualizarLista();
	}

	/**
	 * insertarPelicula
	 * @description Insertamos registro en DB
	 */
	function insertarPelicula() {

		//Solo insertamos si todos los campos tienen valores
		if (esFormularioValido()) {
			//Obtenemos datos del formulario
			var titulo = $.titulo.getValue();
			var genero = $.genero.getValue();
			var año = $.año.getValue();
			var sinopsis = $.sinopsis.getValue();
			//Preparamos query
			var sql = 'INSERT INTO PELICULAS (TITULO, GENERO, AÑO, SINOPSIS) VALUES (?,?,?,?)';
			
			var db = Ti.Database.open('peliculas');
				//Insertamos en la base de datos
			db.execute(sql, titulo, genero, año, sinopsis);
			db.close();
		
		}
	}

	/**
	 * actualizarPelicula
	 * @description Actualizamos registro en DB
	 */
	function actualizarPelicula() {

		//Solo actualizamos si todos los campos tienen valores
		if (esFormularioValido()) {
			//Obtenemos datos del formulario
			var titulo = $.titulo.getValue();
			var genero = $.genero.getValue();
			var año = $.año.getValue();
			var sinopsis = $.sinopsis.getValue();
			
			//Preparamos query
			var sql = 'UPDATE peliculas SET TITULO=?, GENERO=?, AÑO=?, SINOPSIS=? WHERE id=?';
			
			var db = Ti.Database.open('peliculas');
				//Insertamos en la base de datos
			db.execute(sql, titulo, genero, año, sinopsis, idEnEdicion);
			db.close();
		}
	}

	/**
	 * borrarPelicula
	 * @description Eliminamos registro de DB
	 */
	function borrarPelicula() {
		if (modoEditor == MODO_EDICION) {
			//Preparamos query con idEnEdicion
			var sql = 'DELETE FROM PELICULAS WHERE id=?';
			var db = Ti.Database.open('peliculas');
			db.execute(sql, idEnEdicion);
			db.close();
			//Eliminamos registro
			//Actualizamos la lista
			//Cerramos editor
			cerrarEditor();
			actualizarLista();
		}
	}

	/**
	 * cerrarEditor
	 * @description Cierra el editor y resetea valores
	 * @param {Object} e
	 */
	function cerrarEditor(e) {
		//Reset idEnEdicion y editor
		idEnEdicion = null;
		modoEditor = null;

		//Reset formulario
		$.titulo.setValue("");
		$.genero.setValue("");
		$.año.setValue("");
		$.sinopsis.setValue("");

		//Ocultamos editor
		$.editor.hide();
	}

	/**
	 * esFormularioValido
	 * @description Comprueba que todos los campos tengan contenido
	 * @return {Boolean}
	 */
	function esFormularioValido() {
		return ["titulo", "genero", "año", "sinopsis"].every(function(campo) {
			return $[campo].hasText();
		});
	}

})($.args || {});
