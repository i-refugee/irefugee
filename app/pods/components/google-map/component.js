import Ember from 'ember';

export default Ember.Component.extend({
	insertMap: function() {
    var self = this;
	    var centers = this.get('centers').toArray();
      
      var mapCenter = new google.maps.LatLng(38.1458392, 24.4813);

      var mapOptions = {
          zoom: 8,
          center: mapCenter
      };

      var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
    
      var lt, lg, i, marker, latLng;

      for (i=0; i<centers.length; i++){
        lt = centers[i].get('latitude');
        lg = centers[i].get('longitude');

        if ((typeof lt)==='undefined' || (typeof lg)==='undefined') {
          console.error("Undefined latitude and longitude.");
          continue;
        }

        latLng = new window.google.maps.LatLng(
            lt,
            lg
        );
        
/*        latLngBounds.extend(latLng);
*/

        var type = centers[i].get('type');

        if (type === 1) {
          marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          });
        }
        else if (type === 2) {
          marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          });
        }
        else if (type === 3) {
          marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          });
        }

        marker.centerId = centers[i].get('id');

        marker.infowindow = new google.maps.InfoWindow({
            content: '<div id="content">'+
                        '<h5>' + centers[i].get('name') + '</h5>'+
                        '<div id="bodyContent">'+
                        '<b>' + 'Διεύθυνση:' + ' </b>' + centers[i].get('city') +
                        '<br>' +
                        '<b>' + 'Πρόσφυγες:' + ' </b>' + centers[i].get('refugees') +
                        '</div>'+
                        '</div>',
            options: {
              maxWidth: 200
            }
          });

          google.maps.event.addListener(marker, 'click', clickHandler());
        
          google.maps.event.addListener(marker, 'mouseover', hoverHandler(marker));  

          google.maps.event.addListener(marker, 'mouseout', hoverOutHandler());
        }

      function clickHandler() {
        return function() {
          self.sendAction('transitToCenter', this.centerId);
        };
      }

      function hoverHandler(marker) {
        return function() {
          marker.infowindow.open(map, marker);
        };
      }

      function hoverOutHandler() {
        return function() {
          this.infowindow.close();
        };
      }



	}.on('didInsertElement')
});
