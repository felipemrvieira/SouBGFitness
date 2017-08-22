console.log('\'Allo \'Allo!');
var x = document.getElementById("location");

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
  var latlon = new google.maps.LatLng(lat, lon)
  var mapholder = document.getElementById('map-area')
  mapholder.style.height = '400px';
  mapholder.style.width = '100%';

  var myOptions = {
  center:latlon,zoom:17 ,
  mapTypeId:google.maps.MapTypeId.ROADMAP,
  mapTypeControl:false,
  navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  }

  var map = new google.maps.Map(document.getElementById("map-area"), myOptions);
  var marker = new google.maps.Marker({position:latlon,map:map,title:"Você está aqui!"});
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
