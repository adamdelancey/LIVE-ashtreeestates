//list all individual property details for map to read from

let properties = {

    stgeorges: {
        lat: 51.4510,
        lng: -2.6073,        
        contentString: "<h4>St George's Road, Hotwell</h4><i class='fas fa-bed'></i> 2  &emsp;<i class='fas fa-bath'></i> 1 &emsp; <i class='fas fa-pound-sign'></i> 525 each pcm"
    },

    abbotsford: { 
        lat: 51.4642,
        lng: -2.6062,       
        contentString: "<h4 class='info-head'>Abbotsford Road, Cotham</h4><p><i class='fas fa-bed'></i> 2  &emsp;<i class='fas fa-bath'></i> 1 &emsp; <i class='fas fa-pound-sign'></i> 605 each pcm </p>"
        },
    
    richmond: { 
        lat: 51.4568,
        lng: -2.6121,   
        contentString: "<h4 class='info-head'>Richmond Hill Avenue, Clifton</h4><p><i class='fas fa-bed'></i> 3  &emsp;<i class='fas fa-bath'></i> 1 &emsp; <i class='fas fa-pound-sign'></i> 570 each pcm </p>"
        },   

    ashgrove: { 
        lat: 51.4665,
        lng: -2.6098,
        contentString: "<h4 class='info-head'>Ashgrove Road, Redland</h4><p><i class='fas fa-bed'></i> 3  &emsp;<i class='fas fa-bath'></i> 1 &emsp; <i class='fas fa-pound-sign'></i> 565 each pcm </p>"
        }, 

    smhl: { 
        lat: 51.4603,
        lng: -2.6016,
        contentString: "<h4 class='info-head'>Saint Michael's Hill Lower, Cotham</h4><p><i class='fas fa-bed'></i> 3  &emsp;<i class='fas fa-bath'></i> 1 &emsp; <i class='fas fa-pound-sign'></i> 580 each pcm </p>"
        }, 

    berkeley: { 
        lat: 51.4769,
        lng: -2.5974,       
        contentString: "<h4>Berkeley Avenue, Redland</h4><i class='fas fa-bed'></i> 4  &emsp;<i class='fas fa-bath'></i> 2 &emsp; <i class='fas fa-pound-sign'></i> 525 each pcm"
        },

    rosebury: { 
        lat: 51.4537,
        lng: -2.6082,      
        contentString: "<h4>Rosebury Terrace, Clifton</h4><i class='fas fa-bed'></i> 4  &emsp;<i class='fas fa-bath'></i> 1 &emsp; <i class='fas fa-pound-sign'></i> 570 each pcm"
        },

    dowry: { 
        lat: 51.4517,
        lng: -2.6202,
        contentString: "<h4>Dowry Road, Clifton Wood</h4><i class='fas fa-bed'></i> 4  &emsp;<i class='fas fa-bath'></i> 1 &emsp; <i class='fas fa-pound-sign'></i> 555 each pcm"
        },

    smhu: { 
        lat: 51.4603,
        lng: -2.6016,
        contentString: "<h4>Saint Michael's Hill Upper, Cotham</h4><i class='fas fa-bed'></i> 5  &emsp;<i class='fas fa-bath'></i> 2 &emsp; <i class='fas fa-pound-sign'></i> 560 each pcm"
        },

    high: { 
        lat: 51.4546,
        lng: -2.5927,
        contentString: "<h4>High Street, City Centre</h4><i class='fas fa-bed'></i> 6  &emsp;<i class='fas fa-bath'></i> 2 &emsp; <i class='fas fa-pound-sign'></i> 545 each pcm"
        },

    pipe: { 
        lat: 51.4545,
        lng: -2.5989,
        contentString: "<h4>Pipe Lane, City Centre</h4><i class='fas fa-bed'></i> 7  &emsp;<i class='fas fa-bath'></i> 3 &emsp; <i class='fas fa-pound-sign'></i> 565 each pcm"
        } 
    
};


$(document).ready(function () {

let propertyName = $("#property").attr("name");
    
const contentString = properties[propertyName].contentString;    

let pos;
let map;
const myLatLng = { 
    lat: properties[propertyName].lat,
    lng: properties[propertyName].lng
    };
    
//add empty array for which the markers from the getNearbyPlaces function will go into

let markers = [];

  function initMap() {
    // Set the default location
    pos = myLatLng;
    map = new google.maps.Map(document.getElementById("explore-map"), {
      center: pos,
      zoom: 15,
    });    

    // Set the marker for this property
    const marker = new google.maps.Marker({
      position: myLatLng,
      map,    
      
    });
 

    // Create info window
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  }

  let currentInfoWindow;
  
  // Sets the map on all markers in the array.

  function getNearbyPlaces(position, placeType) {
    let request = {
      location: position,
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: placeType,
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, nearbyCallback);
  }

  // Handle the results (up to 20) of the Nearby Search
  function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMarkers(results);
    }
  }
  function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {    
  setMapOnAll(null);
}

  function createMarkers(places) {
    places.forEach((place) => {
      let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
        icon: { url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png" },
        
      });

      //pushes markers into previously mentioned empty array in order to be cleared from map

      markers.push(marker);

      /* Add click listeners to the markers */
      google.maps.event.addListener(marker, "click", () => {
        let request = {
          placeId: place.place_id,
          fields: [
            "name",
            "formatted_address",
            "geometry",
            "rating",
            "website",
            "photos",
          ],
        };

        /* Only fetch the details of a place when the user clicks on a marker.
         * If we fetch the details for all place results as soon as we get
         * the search response, we will hit API rate limits. */
        service.getDetails(request, (placeResult, status) => {
          showDetails(placeResult, marker, status);
        });
      });

      function showDetails(placeResult, marker, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          let placeInfowindow = new google.maps.InfoWindow();
          placeInfowindow.setContent(
            "<div><strong>" +
              placeResult.name +
              "</strong><br>" +
              "Rating: " +
              placeResult.rating +
              "</div>"
          );
          placeInfowindow.open(marker.map, marker);

          if (currentInfoWindow) {
            currentInfoWindow.close();
          }

          currentInfoWindow = placeInfowindow;
        } else {
          console.log("showDetails failed: " + status);
        }
      }
    });   
    
  }

  //add event listeners for the buttons

  $("#cafeRadio").click(function () {
      clearMarkers();
    getNearbyPlaces(pos, "cafe");
  });

  $("#pubRadio").click(function () {
      clearMarkers();
    getNearbyPlaces(pos, "pub");
  });

  $("#restaurantRadio").click(function () {
      clearMarkers();
    getNearbyPlaces(pos, "restaurant");
  });  

  $("#shopRadio").click(function () {
      clearMarkers();
    getNearbyPlaces(pos, "supermarkets");
  });   

   $("#clear-btn").click(function () {
    clearMarkers();
  }); 
  
  initMap();
});


//scroll function repeated for sticky navbar
//back to top function:

mybutton = document.getElementById("topBtn");

// When the user scrolls down 300px from the top of the document, show the button. also includes sticky navbar function
window.onscroll = function() {
    scrollFunction();
    stickyFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//sticky nav function

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickyFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}