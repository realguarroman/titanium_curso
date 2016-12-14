(function constructor(args) {
	"use strict";

	//Debemos establecer los valores almacenados en properties en las vistas correspondientes
	//#username
	//#password
	//#notifications
	prepararAjustes();

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Establecemos listeners a las filas
		$.addListener($.usernameRow, "click", onClickUsernameRow);
		$.addListener($.passwordRow, "click", onClickPasswordRow);
		//Establecemos listeners a los AlertDialogs
		$.addListener($.editUsername, "click", onEditUsername);
		$.addListener($.editPassword, "click", onEditPassword);
		//Establecemos listener al elemento Switch
		$.addListener($.notifications, "change", onChangeNotifications);
	})();

	function prepararAjustes() {
		//Obtenemos la contraseña de Properties
		// y si no está el valor por defecto es Introducir contraseña
		var username = Ti.App.Properties.getString('username', 'Introducir usuario');
		$.username.setText(username);
		
		var password = Ti.App.Properties.getString('password', 'Introducir contraseña');
		$.password.setText(password);
		
		//Si el contenido es el valor por defecto
		//En otro caso reemplazamos el password por asteriscos : replace(/./g, "*")

		//Establecemos el nombre de usuario y el estado de las notificaciones
	}

	/**
	 * onClickUsernameRow
	 * @description Callback al hacer click sobre la fila de usuario
	 * @param {Object} e
	 */
	function onClickUsernameRow(e) {
		//Abrimos diálogo de cambio de usuario
		$.editUsername.show();
	}

	/**
	 * onClickPasswordRow
	 * @description Callback al hacer click sobre la fila de password
	 * @param {Object} e
	 */
	function onClickPasswordRow(e) {
		//Abrimos diálogo de cambio de password
		//alert(JSON.stringify(e));
		$.editPassword.show();
	}

	/**
	 * onEditUsername
	 * @description Callback al terminar el dialogo de usuario
	 * @param {Object} e
	 */
	function onEditUsername(e) {
		//Si pulsamos en Aceptar
		//alert(JSON.stringify(e));
		
		
		
		//aceptar = 0, cancelar = 1
		//Recogemos el valor del TextField con ID usernameField
		var username;
		if (e.index==0) { //aceptar
			
			username = $.usernameField.getValue();
			//Lo almacemamos en properties
			Ti.App.Properties.setString ("username", username);
			//Actualizamos la etiqueta de la fila Usuario
			$.username.setText(username);
			//Establecemos el valor del TextField a cadena vacía
			$.usernameField.setValue("");	
			
		}
		
	}

	/**
	 * onEditPassword
	 * @description Callback al terminar el dialogo de password
	 * @param {Object} e
	 */
	function onEditPassword(e) {
		//Si pulsamos en Aceptar
		//Recogemos el valor del TextField con ID passwordField
		//Lo almacemamos en properties
		//Actualizamos la etiqueta de la fila password transformándola en asteriscos
		//Establecemos el valor del TextField a cadena vacía
		
		
		//Recogemos el valor del TextField con ID usernameField
		var password;
		if (e.index==0) { //aceptar
			
			password = $.passwordField.getValue();
			//Lo almacemamos en properties
			Ti.App.Properties.setString ("password", password);
			//Actualizamos la etiqueta de la fila Usuario
			$.password.setText(password);
			//Establecemos el valor del TextField a cadena vacía
			$.passwordField.setValue("");	
			
		}
		
		
	}

	/**
	 * onChangeNotifications
	 * @description Callback cuando cambia de valor el componente switch
	 * @param {Object} e
	 */
	function onChangeNotifications(e) {
		//Recogemos el valor del Switch con ID notifications
		//Lo almacenamos en properties
		alert(JSON.stringify(e));
		//Ti.App.Properties.SetBool
	}

})($.args || {}); 