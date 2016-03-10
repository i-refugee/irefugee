import Ember from 'ember';

export default Ember.Component.extend({
	ns: [],
	keys: [],
	showSearch: false,
	placeToGeolocate: null,
	by_address: false,
	by_me: false,
	loading: false,
	selected_type: null,
	isClearing: false,
	session: Ember.inject.service(),
	observeFilters: function() {
		this.sendAction('filterMap', this.get('filt_centers'));
	}.observes('filt_centers'),
	observeCheckboxAddress: function() {
		if (this.get('by_address')) {
			this.set('by_me', !this.get('by_address'));
		}
	}.observes('by_address'),
	observeCheckboxMe: function() {
		if (this.get('by_me')) {
			this.set('by_address', !this.get('by_me'));
			Ember.run.once(this, this.global_search);
		}
		else {
			if (this.get('placeToGeolocate')) {
				Ember.run.once(this, this.global_search);
			}
		}
	}.observes('by_me'),
	initializeSearchBox: function() {
		var input = document.getElementById('place_search');
		var _this = this;
		var searchBox = new google.maps.places.SearchBox(input, {});
		searchBox.addListener('places_changed', function() {
		  var places = searchBox.getPlaces();

		  if (places.length === 0) {
		    return;
		  }

		  else {

		 // For each place, get the icon, name and location.
		    var bounds = new google.maps.LatLngBounds();
		    places.forEach(function(place) {
		      if (place.geometry.viewport) {
		        bounds.union(place.geometry.viewport);
		      } else {
		        bounds.extend(place.geometry.location);
		      }
		    });

	      	var latLng = new window.google.maps.LatLng(
	            places[0].geometry.location.lat(),
	            places[0].geometry.location.lng()
	        );
		  	_this.set('by_address', true);
		  	_this.set('placeToGeolocate', latLng);
		  	_this.set('bounds', bounds);
		  }
		});

		// start filtering if we there is saved storage
		var doSavedSearchFlag = false;
		
		this.set('isClearing', true);

		var i;
		

		var savedNeedIds = this.get('session.data.needs');
		if (savedNeedIds && savedNeedIds.length) {
			var all_needs = this.get('needs').toArray();
			for (i=0;i<savedNeedIds.length;i++) {
				this.get('ns').addObject(all_needs[savedNeedIds[i]-1]);
				var element = $("i#" + savedNeedIds[i]);
				element.toggleClass("icon-background-grey icon-background-grey-more");
				element.parent().next().addClass('black');
			}
			doSavedSearchFlag = true;
		}

		var _this = this;

		var savedKeywordIds = this.get('session.data.keywords');
		if (savedKeywordIds && savedKeywordIds.length) {
			var all_keywords = this.get('keywords').toArray();
			for (i=0;i<savedKeywordIds.length;i++) {
				all_keywords.forEach(function(keyword){
					if (keyword.get('id') === savedKeywordIds[i]) {
						_this.get('keys').addObject(keyword);
					}
				});
			}
			doSavedSearchFlag = true;
		}

		this.set('isClearing', false);

		this.set('showSearch', this.get('session.data.showSearch'));

		var tmp = this.get('session.data.centerType');

		if (tmp !== undefined && tmp !== null) {
			this.set('centerType', tmp);
			doSavedSearchFlag = true;
		}

		tmp = this.get('session.data.placeToGeolocate');
		if (tmp !== undefined && tmp !== null) {
			this.set('placeToGeolocate', tmp);
			doSavedSearchFlag = true;
		}

		tmp = this.get('session.data.by_me');
		if (tmp !== undefined && tmp !== null) {
			this.set('by_me', tmp);
			doSavedSearchFlag = true;
		}

		tmp = this.get('session.data.by_address');
		if (tmp !== undefined && tmp !== null && this.get('placeToGeolocate')) {
			this.set('by_address', tmp);
			doSavedSearchFlag = true;
		}
		
		tmp = this.get('session.data.placeToGeolocateText');
		if (tmp !== undefined && tmp !== null) {
			$('#place_search').val(tmp);
			doSavedSearchFlag = true;
		}

		tmp = this.get('session.data.bounds');
		if (tmp !== undefined && tmp !== null) {
			this.set('bounds', tmp);
			doSavedSearchFlag = true;
		}

		if (doSavedSearchFlag) {
			Ember.run.once(this, this.global_search);
		} 
		else 
		{
			this.set('filt_centers', this.get('centers').toArray());
		}

/////////////////////

	}.on('didInsertElement'),
	initialize: function() {
		this.set('selected_type', 0);

		var keywords = this.get('keywords').toArray();
		var keywordsSortedAlphabetically = keywords.sort(function(a, b){
			if (a.get('keyword') > b.get('keyword')) {
				return 1;
			}
			else {
				return -1;
			}
		});
		this.set('keywords', keywordsSortedAlphabetically);
		var needs = this.get('needs').toArray();
		var needsSortedByIndex = needs.sort(function(a, b){
			if (a.get('id') > b.get('id')) {
				return 1;
			}
			else {
				return -1;
			}
		});
		this.set('needs', needsSortedByIndex);
	}.on('init'),
	global_search: function() {
		var _this = this;
		if (this.get('isClearing')) {
			return;
		}

		this.set('loading', true);
		var centers = this.get('centers').toArray();
	

		var selected_type = this.get('selected_type');

		var type_centers;

		if (selected_type!==0) {
			type_centers = centers.filter(function(center){
				if (center.get('centerType') === selected_type) {
					return true;
				}
				else {
					return false;
				}
			});
		}
		else {
			type_centers = centers;
		}

		var keys_selected = this.get('keys');

		var filtered_once;

		if (keys_selected.length) {
			filtered_once = filter_by_keyword(type_centers, keys_selected);
		}
		else {
			filtered_once = type_centers;
		}


		var needs_selected = this.get('ns');
		var filtered_twice;
/////////// save to cookie or localstorage
		var needIds = [];
		needs_selected.forEach(function(need){
			needIds.push(need.get('id'));
		});

		var keywordIds = [];
		keys_selected.forEach(function(keyword){
			keywordIds.push(keyword.get('id'));
		});

		this.get('session').set('data.needs', needIds);
		this.get('session').set('data.keywords', keywordIds);
		this.get('session').set('data.centerType', selected_type);
		this.get('session').set('data.placeToGeolocate', this.get('placeToGeolocate'));
		this.get('session').set('data.placeToGeolocateText', $('#place_search').val());
		this.get('session').set('data.by_address', this.get('by_address'));
		this.get('session').set('data.by_me', this.get('by_me'));
		this.get('session').set('data.bounds', this.get('bounds'));


		if (needs_selected.length) {
			//this is a promise - sucks
			var promise_filtered_twice = filter_by_needs(filtered_once, needs_selected);
			promise_filtered_twice.then(function(filtered_twice){
					var filtered_thrice;

					// start sorting


					var sorted_centers;

					if (_this.get('by_address')) {
						var place = _this.get('placeToGeolocate');
						if (place) {
							sorted_centers = filtered_twice.sort(position(place.lat, place.lng));
							_this.set('filt_centers', sorted_centers);
							_this.set('loading', false);
						  	_this.sendAction('moveMap', place, this.get('bounds'));
						}
						else {
							alert('Παρακαλώ Εισάγετε Διεύθυνση');
							_this.set('loading', false);
						}
					}
					else if (_this.get('by_me')) { 
					    if (navigator.geolocation) {
					        return navigator.geolocation.getCurrentPosition(showPosition);
					    } else {
					        alert("Geolocation is not supported by this browser.");
					    }
						function showPosition(pos) {
							sorted_centers = filtered_twice.sort(position(pos.coords.latitude, pos.coords.longitude));
							_this.set('filt_centers', sorted_centers);
							var latLng = new window.google.maps.LatLng(
					            pos.coords.latitude,
					            pos.coords.longitude
					        );
							_this.sendAction('moveMap', latLng, 15);
							_this.set('loading', false);
						}
					}


					else {
						filtered_thrice = filtered_twice;
						_this.set('filt_centers', filtered_thrice);
						_this.set('loading', false);
					}

			});
		}
		else {
			filtered_twice = filtered_once;
			var filtered_thrice;


			// start sorting


			var sorted_centers;

			if (_this.get('by_address')) {
				var place = _this.get('placeToGeolocate');

				if (place) {
					sorted_centers = filtered_twice.sort(position(place.lat, place.lng));
					this.set('filt_centers', sorted_centers);
					this.set('loading', false);
				  	_this.sendAction('moveMap', place, this.get('bounds'));
				}
				else {
					alert('Παρακαλώ Εισάγετε Διεύθυνση');
					_this.set('loading', false);
				}
			}
			else if (_this.get('by_me')) { 
			    if (navigator.geolocation) {
			        return navigator.geolocation.getCurrentPosition(showPosition);
			    } else {
			        alert("Geolocation is not supported by this browser.");
			    }
				function showPosition(pos) {
					var latLng = new window.google.maps.LatLng(
			            pos.coords.latitude,
			            pos.coords.longitude
			        );
					_this.sendAction('moveMap', latLng, 15);

					sorted_centers = filtered_twice.sort(position(pos.coords.latitude, pos.coords.longitude));
					_this.set('filt_centers', sorted_centers);
					_this.set('loading', false);

				}
			}


			else {
				filtered_thrice = filtered_twice;
				this.set('filt_centers', filtered_thrice);
				this.set('loading', false);

			}
		}

	


	function filter_by_keyword(centers, keys_selected) {
		var filtered_by_key_centers = centers.filter(function(center){
			var flag = false;
			var center_keywords = center.get('keywords').toArray();

			center_keywords.forEach(function(center_keyword){
				if (flag === true) {
					return;
				}
				keys_selected.forEach(function(key_selected){
					if (flag === true) {
						return;
					}
					if (center_keyword.get('keyword') === key_selected.get('keyword')) {
						flag = true;
					}
				});
			});
			return flag;
		});
		return filtered_by_key_centers;		
	}


	function filter_by_needs(centers, needs_selected) {
			if (!needs_selected.length) {
				this.set('filt_centers', centers);
				return;						
			}

			var promises_array = [];


			centers.forEach(function(center){
				promises_array.push(center.get('importantNeeds'));
			});

			return Ember.RSVP.all(promises_array).then(function(){

				var filtered_by_need_centers = centers.filter(function(center){
					var flag = false;
					var importantNeeds = center.get('importantNeeds');

					importantNeeds.forEach(function(importantNeed){
						if (flag === true) {
							return;
						}
						needs_selected.forEach(function(need){
							if (flag === true) {
								return;
							}
							if (importantNeed.get('id') === need.get('id')) {
								flag = true;
							}
						});
					});
					return flag;
				});

				return filtered_by_need_centers;

			});

		}


		function sort_by_distance(centers){


			var sorted_centers;

			if (_this.get('by_address')) {
				var place = _this.get('placeToGeolocate');
				if (place) {
					sorted_centers = centers.sort(position(place.geometry.location.lat(), place.geometry.location.lng()));
					return sorted_centers;

				}
				else {
					alert('Παρακαλώ Εισάγετε Διεύθυνση');
				}
			}
			else { 
			    if (navigator.geolocation) {
			        return navigator.geolocation.getCurrentPosition(showPosition);
			    } else {
			        alert("Geolocation is not supported by this browser.");
			    }
				function showPosition(pos) {
					sorted_centers = centers.sort(position(pos.coords.latitude, pos.coords.longitude));
					return sorted_centers;
				}
			}

		}


		function position(latitude, longitude){
		 var userLat = parseFloat(latitude);
		 var userLong = parseFloat(longitude);

		   var key =
		       function(x) {
			   
			   
			   
			   return Math.sqrt(Math.pow(parseFloat(x.get('latitude')) - userLat,2) + Math.pow(parseFloat(x.get('longitude')) - userLong,2)); 
			   };
				
		       
			   
			   
			
			 var reverse = 1;
		   //reverse = !reverse ? 1 : -1;
			

				return function (a, b) {
					return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
		     };
			};


	}.observes('keys.[]'),
	observeAddres: function() {
		Ember.run.once(this, this.global_search)
	}.observes('placeToGeolocate'),
/*	filter_by_keyword: function() {
		var centers = this.get('filt_centers').toArray();

		var keys_selected = this.get('keys').toArray();

		if (!keys_selected.length) {
			this.set('filt_centers', centers);
			return;						
		}

		var filtered_by_key_centers = centers.filter(function(center){
			var flag = false;
			var center_keywords = center.get('keywords').toArray();

			center_keywords.forEach(function(center_keyword){
				if (flag === true) {
					return;
				}
				keys_selected.forEach(function(key_selected){
					if (flag === true) {
						return;
					}
					if (center_keyword.get('keyword') === key_selected.get('keyword')) {
						flag = true;
					}
				});
			});
			return flag;
		});

		this.set('filt_centers', filtered_by_key_centers);			
	}.observes('keys.[]'),*/
	actions: {
		filter_by_type: function() {
			Ember.run.once(this, this.global_search);
		},
		global_search: function() {
			this.set('by_address', true);
			Ember.run.once(this, this.global_search);
		},
		filter_by_needs: function(need) {
			var element = $("i#" + need.get('id'));
			if (element.hasClass("icon-background-grey")) {
				this.get('ns').addObject(need);
				element.parent().next().addClass('black');
			}
			else {
				this.get('ns').removeObject(need);		
				element.parent().next().removeClass('black');
			}
			
			element.toggleClass("icon-background-grey icon-background-grey-more");

			Ember.run.once(this, this.global_search);
/*
			var centers = this.get('filt_centers').toArray();

			var needs_selected = this.get('ns').toArray();			

			if (!needs_selected.length) {
				this.set('filt_centers', centers);
				return;						
			}

			var promises_array = [];

			var _this = this;

			centers.forEach(function(center){
				promises_array.push(center.get('importantNeeds'));
			})

			Ember.RSVP.all(promises_array).then(function(){

				var filtered_by_need_centers = centers.filter(function(center){
					var flag = false;
					var importantNeeds = center.get('importantNeeds');

					importantNeeds.forEach(function(importantNeed){
						if (flag === true) {
							return;
						}
						needs_selected.forEach(function(need){
							if (flag === true) {
								return;
							}
							if (importantNeed.get('id') === need.get('id')) {
								flag = true;
							}
						});
					});
					return flag;
				});

				_this.set('filt_centers', filtered_by_need_centers);

			});*/



		},
/*
		sort_by_distance: function(){

			var centers = this.get('filt_centers').toArray();




			var position = function( latitude,longitude){
			 var userLat = parseFloat(latitude);
			 var userLong = parseFloat(longitude);

			   var key =
			       function(x) {
				   
				   
				   
				   return Math.sqrt(Math.pow(parseFloat(x.get('latitude')) - userLat,2) + Math.pow(parseFloat(x.get('longitude')) - userLong,2)); 
				   } 
					
			       
				   
				   
				
				 var reverse = 1;
			   //reverse = !reverse ? 1 : -1;
				

					return function (a, b) {
						return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
			     };
				};
				



	
			search with distance matrix
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
							var element  = result[0];
							var distance = element.distance.value;
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

			var sorted_centers;
			var _this = this;
			if (this.get('by_address')) {
				var place = this.get('placeToGeolocate');
				if (place) {
					sorted_centers = centers.sort(position(place.geometry.location.lat(), place.geometry.location.lng()));
					this.set('filt_centers', sorted_centers);
				}
				else {
					alert('Παρακαλώ Εισάγετε Διεύθυνση');
				}
			}
			else { 
			    if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(showPosition);
			    } else {
			        alert("Geolocation is not supported by this browser.");
			    }
				function showPosition(position) {
					sorted_centers = centers.sort(position.coords.latitude, position.coords.longitude);
					_this.set('filt_centers', sorted_centers);
				}
			}


		},*/
		clear: function() {
/*			this.set('filt_centers', this.get('centers').toArray());
*/
			this.set('isClearing', true);
			this.set('filt_centers', this.get('centers').toArray());
			this.set('keys', []);
			this.set('ns', []);
			this.set('placeToGeolocate', null);
			this.set('by_address', false);
			this.set('by_me', false);
			this.set('selected_type', 0);
			$('#place_search').val('');

			this.get('session').set('data.needs', []);
			this.get('session').set('data.keywords', []);
			this.get('session').set('data.centerType', 0);
			this.get('session').set('data.placeToGeolocate', null);
			this.get('session').set('data.placeToGeolocateText', '');
			this.get('session').set('data.by_address', false);
			this.get('session').set('data.by_me', false);
			this.get('session').set('data.bounds', null);

	        var latLng = new window.google.maps.LatLng(
	            38.1458392, 
	            24.4813
	        );

	        this.sendAction('moveMap', latLng, 7);

			var i;
			for (i=1; i<6;i++) {
				$("i#"+i).removeClass('icon-background-grey-more');
				$("i#"+i).addClass('icon-background-grey');
				$("i#"+i).parent().next().removeClass('black');
			}
			this.set('isClearing', false);
		},
		toggleSearch: function() {
			this.toggleProperty('showSearch');
			this.get('session').set('data.showSearch', this.get('showSearch'));
		}
	}
});
