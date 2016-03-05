import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		search: function(){
			var centers = this.get('centers').toArray();


//			this.set('centers', centers);
/*

			var position = function(latitude,longitude){
			 var userLat = parseFloat(latitude);
			 var userLong = parseFloat(longitude);

			   var key =
			       function(x) {			   
					   return Math.sqrt(Math.pow(parseFloat(x.get('latitude')) - userLat,2) + Math.pow(parseFloat(x.get('longitude')) - userLong,2)); 
				   } 
					
			       
				   
				   
				
				 var reverse = 1;
					return function (a, b) {
						return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
			     };
				};
*/
	
			var position = function(latitude,longitude){

				var userLat = parseFloat(latitude);
				var userLong = parseFloat(longitude);

				var origin = new google.maps.LatLng(userLat,userLong);

				var key = 
					function(x){
					
						function callBack(response, status) {
						
						if (status !== google.maps.DistanceMatrixStatus.OK){
							alert('Error was:' + status);
						}
						else {
							console.log(response, status)
							var origins = response.originAddresses;
							var destinations = response.destinationAddresses;
			   
							var result = response.rows[0].elements;
//							console.log(result)
							var element  = result[0];
							console.log(element)
							var distance = element.distance.value;
							console.log(DistanceMatrixService)
							return distance;
							}
						}	
					
					
					
					
						var destination = new google.maps.LatLng(parseFloat(x.get('latitude')),parseFloat(x.get('longitude')));
						var service = new google.maps.DistanceMatrixService();
						return service.getDistanceMatrix(
						{

							origins: [origin],
							destinations: [destination],
							travelMode: google.maps.TravelMode.DRIVING,

						}, callBack);

					 
			//return callback(response,status);
			  
				};


				return function (a, b) {
						return a = key(a), b = key(b),  ((a > b) - (b > a));
						};
			};


			centers.sort(position(37.9838669,23.768163));

		}
	}
});
