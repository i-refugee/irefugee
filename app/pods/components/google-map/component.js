import Ember from 'ember';

export default Ember.Component.extend({
	insertMap: function() {
    var position = this.get('position');
    if (position) {
      this.get('map').panTo(position);
      smoothZoom(this.get('map'),12,this.get('map').getZoom());
      return;
    }

    // the smooth zoom function
    function smoothZoom (map, max, cnt) {
        if (cnt >= max) {
                return;
            }
        else {
            var z = google.maps.event.addListener(map, 'zoom_changed', function(){
                google.maps.event.removeListener(z);
                smoothZoom(map, max, cnt + 1);
            });
            setTimeout(function(){map.setZoom(cnt);}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
        }
    }

    var self = this;
	    var centers = this.get('centers').toArray();
      
      var mapCenter = new google.maps.LatLng(38.1458392, 24.4813);

      var mapOptions = {
          zoom: 7,
          center: mapCenter
      };

      var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
    
      var lt, lg, i, marker, latLng;

      for (i=0; i<centers.length; i++){
        lt = centers[i].get('latitude');
        lg = centers[i].get('longitude');

        if (!lt || !lg) {
          continue;
        }

        latLng = new window.google.maps.LatLng(
            lt,
            lg
        );
        
/*        latLngBounds.extend(latLng);
*/

        var type = centers[i].get('centerType');

        if (type === 1) {
          marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: "assets/map-icons/revolt.png"
          });
        }
        else if (type === 2) {
          marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: "assets/map-icons/restaurant.png"
          });
        }
        else if (type === 3) {
          marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: "assets/map-icons/camping-2.png"
          });
        }
        else if (type === 4) {
          marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: "assets/map-icons/cabin-2.png"
          });
        }
        else if (type === 5) {
          marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: "assets/map-icons/firstaid.png"
          });
        }
        else {
          marker = new google.maps.Marker({
              position: latLng,
              map: map,
              animation: google.maps.Animation.DROP
          });          
        }
        
        marker.centerId = centers[i].get('id');
        marker.centerSlug = centers[i].get('slug');

        marker.infowindow = new google.maps.InfoWindow({
            content: '<div id="content">'+
                        '<h5>' + centers[i].get('name') + '</h5>'+
                        '<div id="bodyContent">'+
                        '<b>' + 'Διεύθυνση:' + ' </b>' + parseAddress(centers[i].get('address')) +
                        '<br>' +
                          '<b>'  + getTextCenterType(centers[i].get('centerType')) + '</b>' +
                        '</div>'+
                        '</div>',
            options: {
              maxWidth: 200
            }
          });



          google.maps.event.addListener(marker, 'click', clickHandler());
        
          google.maps.event.addListener(marker, 'mouseover', hoverHandler(marker));  

          google.maps.event.addListener(marker, 'mouseout', hoverOutHandler());

          this.set('map', map);
        }



      function parseAddress (addr) {
        if (addr) {
          return addr;
        }
        else {
          return "-";
        }
      }
  

      function clickHandler() {
        return function() {
          self.sendAction('transitToCenter', this.centerSlug);
        };
      }
      function getTextCenterType(num) {
        switch (num) {
          case 1:
            return 'Αυτοδιαχειριζόμενη δομή';
          case 2:
            return 'Μαγειρείο';
          case 3:
            return 'Δομή πρώτης υποδοχής';
          case 4:
            return 'Ανοιχτή δομή φιλοξενίας';
          case 5:
            return 'Ναυαγωσωστική ομάδα';
          default:
          return '';

        }

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



	}.observes('position').on('didInsertElement')
});
