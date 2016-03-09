import Ember from 'ember';

export default Ember.Component.extend({
  markers: [],
  session: Ember.inject.service(),
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

        if (lt && lg) {

          


          latLng = new window.google.maps.LatLng(
              lt,
              lg
          );
          

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


          marker.infowindow = new google.maps.InfoWindow({
              content: '<div id="content">'+
                          '<h5>' + center.get('name') + '</h5>'+
                          '<div id="bodyContent">'+
                          '<br>' + 
                          '<b>' + 'Διεύθυνση:' + ': </b>' + center.get('address') +
                          '<br>' +
                          '<b>'  + getTextCenterType(center.get('centerType')) + '</b>' +
                          '</div>'+
                          '</div>',
              options: {
                maxWidth: 200
              }
            });

          this.get('markers').pushObject(marker);
      
        google.maps.event.addListener(marker, 'mouseover', hoverHandler(marker));  

        google.maps.event.addListener(marker, 'mouseout', hoverOutHandler());
      }
      this.set('map', map);
    
      if (this.get('isCurrentCenter') && this.get('session.isAuthenticated')) {
        map.addListener('mouseover', function() {showButtonToEdit() });
      }

      function showButtonToEdit() {
        var centerControlDiv = document.createElement('div');
        var centerControl = new maximize(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
        google.maps.event.clearListeners(map, 'mouseover');
/*        $("#map-canvas-one").mouseleave(function() { 
          map.controls[google.maps.ControlPosition.TOP_RIGHT].clear();
          map.addListener('mouseover', function() {showButtonToEdit() });
          Ember.run(self, self.disableEditing);
         });*/
      }

      function getTextCenterType(num) {
        switch (num) {
          case 1:
            return 'Αυτοδιαχειριζόμενη δομή';
            break;
          case 2:
            return 'Μαγειρείο';
            break;
          case 3:
            return 'Δομή πρώτης υποδοχής';
            break;
          case 4:
            return 'Ανοιχτή δομή φιλοξενίας';
            break;
          case 5:
            return 'Ναυαγωσωστική ομάδα';
            break;
          default:
          return '';
            break;

        }

      }

//maximization custom control
      
      function maximize(controlDiv, map) {
      // Set CSS for the control border.
      var controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#fff';
      controlUI.id = 'map-edit';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.cursor = 'pointer';
    
      controlUI.style.textAlign = 'center';
      controlUI.title =  'Επεξεργασία τοποθεσίας';
      controlDiv.appendChild(controlUI);

      // Set CSS for the control interior.
      var controlText = document.createElement('div');
      controlText.style.paddingLeft = '0px';
      controlText.style.paddingRight = '0px';
      controlText.style.paddingTop = '0px';

      controlText.innerHTML = '<button><i class="fa fa-edit"></i></button>';

//      controlText.innerHTML = '<i class="fa fa-2x fa-arrows"></i>';
      controlUI.appendChild(controlText);

      controlUI.addEventListener('click', function() {
        if (!self.get('isEditing'))  {
          Ember.run(self, self.enableEditing);
        }
        else {
          Ember.run(self, self.disableEditing);
        }
      });

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



	}.on('didInsertElement'),
  enableEditing: function() {
    var map = this.get('map');
    var markers = this.get('markers');
    var marker;
    var center = this.get('center');
    var _this = this;

    if (markers.length > 0) {
      marker = markers[0];
      marker.set('draggable', true);
    }
    this.set('isEditing', true);
/*

      function maximize(controlDiv, map) {
      // Set CSS for the control border.
      var controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#fff';
      controlUI.id = 'map-edit';
      controlUI.style.border = '2px solid #fff';
      controlUI.style.borderRadius = '3px';
      controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
      controlUI.style.cursor = 'pointer';
      controlUI.style.marginTop = '22px';
      controlUI.style.marginLeft = '22px';      
      controlUI.style.textAlign = 'center';
      controlUI.title =  'Edit';
      controlDiv.appendChild(controlUI);

      // Set CSS for the control interior.
      var controlText = document.createElement('div');
      controlText.style.lineHeight = '38px';
      controlText.style.paddingLeft = '0px';
      controlText.style.paddingRight = '0px';
      controlText.style.paddingTop = '0px';
      controlText.style.height = '28px';
      controlText.style.width = '28px';
      controlText.innerHTML = "<button class='btn btn-primary'>Καταχώρηση</button>";

//      controlText.innerHTML = '<i class="fa fa-2x fa-arrows"></i>';
      controlUI.appendChild(controlText);

      controlUI.addEventListener('click', function() {

        Ember.run(_this, _this.disableEditingAndSave);
      });

    }

        var centerControlDiv = document.createElement('div');
        var centerControl = new maximize(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(centerControlDiv);
*/


    google.maps.event.addListener(map, 'click', function(event) {
      if (markers.length > 0) {
        marker = markers.pop();
        google.maps.event.clearInstanceListeners(marker);
        marker.setMap(null);
      }


        var type = center.get('centerType');


        if (type === 1) {
          marker = new google.maps.Marker({
              position: event.latLng,
              map: map,
              draggable: true,
              icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          });
        }
        else if (type === 2) {
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                draggable: true,
                icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            });
        }
        else if (type === 3) {
          marker = new google.maps.Marker({
              position: event.latLng,
              map: map,
              draggable: true,
              icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          });
        }

        
        marker.infowindow = new google.maps.InfoWindow({
                    content: '<div id="content">'+
                                '<h5>' + 'ASDF' + '</h5>'+
                                '<div id="bodyContent">'+
                                '<br>' +
                                '</div>'+
                                '</div>',
                    options: {
                      maxWidth: 200
                    }
                  });
        google.maps.event.addListener(marker, 'mouseover', hoverHandler(marker));  

        google.maps.event.addListener(marker, 'mouseout', hoverOutHandler());
        _this.get('markers').pushObject(marker);
        });


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

  },
  disableEditing: function() {
    this.set('isEditing', false);

    var map = this.get('map');
    var markers = this.get('markers');
    if (markers.length) {
      var marker = markers[0];
      marker.set('draggable', false);
    }
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].clear();
    google.maps.event.clearListeners(map, 'click');
  },
  actions: {
    disableEditingAndSave: function() {
      this.set('isEditing', false);
      var markers = this.get('markers');
      if (!markers.length) {
        Ember.run(this, this.disableEditing);
      } 
      else {
        var marker = markers[0];
        var center = this.get('center');
        var position = marker.getPosition();
        center.set('latitude', position.lat());
        center.set('longitude', position.lng());
        center.save();
        Ember.run(this, this.disableEditing);
      }
    }
  }
});
