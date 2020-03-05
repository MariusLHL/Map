var map = L.map('map', {
  center: [48.921583, -0.925078],
  zoom: 5
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

$( "#search" ).on('input', function() {
$.getJSON(`https://api-adresse.data.gouv.fr/search/?q=${$('#search').val()}`,function(data, status){
  $("#result").html("")
  console.log($('#search').val())
  console.log(data.features[0].geometry.coordinates.reverse())
  data.features.forEach(element => {
    $("#result").append(`<tr id="res" location="${element.geometry.coordinates.reverse()}"><td>${element.properties.label}<td><tr>`)
    let all = $('tr')
    console.log(all )
    all.click(function(){
      let location = this.getAttribute("location").split(',').map(num => Number(num))
      if(location[0] < location[1]){
        map.setView(location.reverse(), 17)
      } else {
        map.setView(location, 17)
      }
    })
  });
  map.setView(data.features[0].geometry.coordinates.reverse(), 17)
});
});