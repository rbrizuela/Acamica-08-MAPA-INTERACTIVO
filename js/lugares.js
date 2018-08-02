
lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
        /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
        página (las direcciones ingresables por el usuario).
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */

        //declaracion del circulo con radio 20000 mts
        var circulo = new google.maps.Circle({
                        center: posicionCentral,
                        radius: 20000})

        //declaracion del autocompletar para la direccion
        var acDireccion = new google.maps.places.Autocomplete((document.getElementById('direccion')),{
                                                              bounds: circulo.getBounds(),
                                                              strictBounds: true,
                                                              types: ['geocode']});

          //programo el evento para que al hacer click en la lista tambien situe el marcador
          //esto tambien reemplaza al enter del inicializar del geodecodificador
          //es decir cuando cambia la direccion establece el marcador
          //tanto si hizo click o enter en el cuadro
          acDireccion.addListener('place_changed', function() {
              var direccion = document.getElementById('direccion').value;
              geocodificadorModulo.usaDireccion(direccion, direccionesModulo.agregarDireccionYMostrarEnMapa);
          });


          //declaracion del autocompletar para desde
          var acDesde = new google.maps.places.Autocomplete((document.getElementById('desde')),{
                                                                bounds: circulo.getBounds(),
                                                                strictBounds: true,
                                                                types: ['geocode']});

          //declaracion del autocompletar para hasta
          var acHasta = new google.maps.places.Autocomplete((document.getElementById('hasta')),{
                                                                bounds: circulo.getBounds(),
                                                                strictBounds: true,
                                                                types: ['geocode']});

          //declaracion del autocompletar para agregar
          var acAgregar = new google.maps.places.Autocomplete((document.getElementById('agregar')),{
                                                                bounds: circulo.getBounds(),
                                                                strictBounds: true,
                                                                types: ['geocode']});

  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion) {
        /* Completar la función buscarCerca  que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. */

    var tipodeLugar = [document.getElementById('tipoDeLugar').value];
    var radioDistancia = document.getElementById('radio').value;

    servicioLugares.nearbySearch({
                    location: posicion,
                    radius: radioDistancia,
                    type: tipodeLugar
                  }, function (results, status){
                     marcadorModulo.marcarLugares(results, status);
                  });

  }

  return {
    inicializar,
    buscarCerca
  }

  $(document).ready(function () {
     google.maps.event.addDomListener(window, 'load', lugaresModulo.inicializar);
  });

})()
