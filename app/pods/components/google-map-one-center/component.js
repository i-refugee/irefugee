import Ember from 'ember';

export default Ember.Component.extend({
	insertMap: function() {
    var self = this;
      var center = this.get('center');
      var mapCenter = new google.maps.LatLng(center.get('latitude'), center.get('longitude'));

      var mapOptions = {
          zoom: 15,
          center: mapCenter
      };

      var map = new google.maps.Map(document.getElementById("map-canvas-one"),
    mapOptions);
    
      var lt, lg, i, marker, latLng;

        var type = center.get('centerType');

        lt = center.get('latitude');
        lg = center.get('longitude');

        latLng = new window.google.maps.LatLng(
            lt,
            lg
        );
        

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


        marker.infowindow = new google.maps.InfoWindow({
            content: '<div id="content">'+
                        '<h5>' + center.get('name') + '</h5>'+
                        '<div id="bodyContent">'+
                        '<br>' + 
                        '<b>' + 'Location:' + ': </b>' + center.get('city') +
                        '</div>'+
                        '</div>',
            options: {
              maxWidth: 200
            }
          });

    
      google.maps.event.addListener(marker, 'mouseover', hoverHandler(marker));  

      google.maps.event.addListener(marker, 'mouseout', hoverOutHandler());
    


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
