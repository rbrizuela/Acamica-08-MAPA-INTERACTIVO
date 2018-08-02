geocodificadorModulo = (function () {
  var geocodificador // Geocodificador que dada una dirección devuelve una coordenada
  var mapa

    // Permite obtener las coordenadas y las usa con la función llamada por parámtero
  function usaDireccion (direccion, funcionALlamar) {
        /* Completar la función usaDireccion(dirección,funcionALlamar)
     para que se obtengan las coordenadas a partir de la dirección pasada por parámetro
     y que llame a la función pasada por parámetro con los siguientes parámetros
     dirección: la dirección pasada por parámetro
     coordenada: la ubicación de tipo google.maps.LatLng */

        geocodificador = new google.maps.Geocoder()
        geocodificador.geocode( { 'address': direccion}, function(results, status) {
          if (status == 'OK') {
            funcionALlamar(direccion,results[0].geometry.location);

          } else {
            swal('Error de Localización','Imposible localizar esa dirección: ' + status,"error");
          }
        });

}
    // Inicializo el geocoder que obtiene las coordenadas a partir de una dirección
    // La variable dirección es igual al texto ingresado por el usuario
    // Llama a la función usaDirecciin para agregarla a los listados y mostrarlo en el mapa
  function inicializar () {

/*
  ESTA FUNCION LA COMENTE PARA QUE NO REPIRA FUNCIONALIDAD  CON EL EVENTO addListener('place_changed',
  YA QUE SI NO SE DUPLICABA LA FUNCIONALIDAD DEL ENTER

    var that = this

    // cuando se presiona la tecla enter en el campo direccion, se agrega la dirección y se muestra en el mapa
    document.querySelector('#direccion').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode
      if (key === 13) { // 13 is enter
                // code for enter
        var direccion = document.getElementById('direccion').value;
        that.usaDireccion(direccion, direccionesModulo.agregarDireccionYMostrarEnMapa);
      }

    })

*/

  }

  return {
    usaDireccion,
    inicializar
  }
})()
