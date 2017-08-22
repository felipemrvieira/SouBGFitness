var x = document.getElementById("location");
var latlonbg = new google.maps.LatLng(-9.620370, -35.738493);


$("#checkIn").click(function(){
    getLocation();
});

function openModal(){
  $('#modalLoader').modal('show');
};
function closeModal(){
  $('#modalLoader').modal('hide');
};

function getLocation() {
    if (navigator.geolocation) {
      openModal();
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var latlon = new google.maps.LatLng(lat, lon);
  var mapholder = document.getElementById('map-area');


  mapholder.style.height = '400px';
  mapholder.style.width = '100%';

  var myOptions = {
    scrollwheel: false,
    center:latlon,zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  }

  var map = new google.maps.Map(document.getElementById("map-area"), myOptions);
  var marker = new google.maps.Marker({position:latlon,map:map,title:"Você está aqui!"});

  verificaDistancia(latlon);
  closeModal();
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "Você negou a autorização para acessar sua localiazação."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Informação de localização indisponível."
      break;
    case error.TIMEOUT:
      x.innerHTML = "A requisição para acessar a localização demorou demais."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "Ocorreu um erro desconhecido."
      break;
  }
}

function verificaDistancia(latlon){
  var distanciaBruta = google.maps.geometry.spherical.computeDistanceBetween(latlon, latlonbg)/1000;
  var distanciaFinal = parseFloat(distanciaBruta.toFixed(2));
  if (distanciaFinal > 0.5) {
    $("#alert-label").text("Voce está " + distanciaFinal +" km distante da academia");
    $(".alert").removeClass("hide");
  }


}
