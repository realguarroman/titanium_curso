(function constructor(args) {
	"use strict";

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	function setEventos() {
		//Añadimos evento al botón enviar y asignamos callback
		 $.addListener($.enviar, "click", validarCamposRequeridos);
		//Añadimos evento al botón reset y asignamos callback
		$.addListener($.reset, "click", resetFormulario);
	}

	 setEventos();
	/**
	 * validarCamposRequeridos
	 * @description Validamos campos requeridos
	 * @param {Object} e
	 */
	function validarCamposRequeridos(e) {
		//Implementar función de validación de campos requeridos
		//Nombre, email y mensaje
		if (($.nombre.getValue()) && ($.email.getValue()) && ($.mensaje.getValue())) {
			alert("Mensaje enviado");
		} else {
			if (!$.nombre.getValue()) {
				$.nombre.setBorderColor(Alloy.CFG.rojo);
				//$.addClass($.nombre, "TextField");
				//$.removeClass($.nombre, "TextField_Error");
			}
			;
		}	
		//Si validación correcta mensaje de alerta "Mensaje enviado."
		//Si error, marcar campos erróneos
	}

	/**
	 * resetFormulario
	 * @description Vaciamos los campos del formulario
	 * @param {Object} e
	 */
	function resetFormulario(e) {
		//Implementar función de validación de campos requeridos
		//Nombre, email y mensaje
	}

})($.args || {});