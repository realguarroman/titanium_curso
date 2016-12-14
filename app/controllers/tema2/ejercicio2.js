(function constructor(args) {
	"use strict";
	var BOTONES_MENU = ["inicio", "fotos", "mensajes", "perfil"];
	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	function setEventos() {
		//Añadimos eventos de click a los elementos del menú y su callback

		var botones = BOTONES_MENU;

		botones.forEach(function(boton) {
			$.addListener($[boton], "click", clickEnMenu);
		});

	}

	setEventos();

	/**
	 * clickEnMenu
	 * @description Callback cuando se pulsa en un item de menu
	 * @param {Object} e
	 */
	function clickEnMenu(e) {
		//Implementar función que asigna una clase activa al menú pulsado
		//Y deja el resto como inactivas
		var resetItems,
		    label;

		switch(e.source.id) {

		case "inicio":

			$.addClass($.inicio, "menuItemActivo");
			resetItems = ["fotos", "mensajes", "perfil"];
			label = "Inicio";

			break;

		case "fotos":

			$.addClass($.fotos, "menuItemActivo");
			resetItems = ["inicio", "mensajes", "perfil"];
			label = "fotos";

			break;

		case "mensajes":

			$.addClass($.mensajes, "menuItemActivo");
			resetItems = ["fotos", "inicio", "perfil"];
			label = "mensajes";

			break;

		case "perfil":

			$.addClass($.perfil, "menuItemActivo");
			resetItems = ["fotos", "mensajes", "inicio"];
			label = "perfil";

			break;

		}
		//Añadir contenido a vista contenedor. Si ya hay una vista en el contenedor

		resetItems.forEach(function(boton) {
			$.resetClass($[boton], boton);
		//	$.removeClass($[boton], "menuItemActivo");
			$.addClass($[boton], boton);
		});

		$.etiqueta.text = label; 

		//debemos eliminarla antes para añadir la nueva
	}

})($.args || {});
