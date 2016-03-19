import Ember from 'ember';

export default Ember.Controller.extend({
	position: undefined,
	filt_centers: [],
	keywords: [],
	actions: {
		moveMap: function(position, bounds) {
			//dont change this order 
			this.set('position', position);
			this.set('bounds', bounds);
		},
		filterMap: function(filt_centers) {
			this.set('filt_centers', filt_centers);
		},
		requestKeywordsFromStore: function() {
			var _this = this;
			this.store.findAll('keyword').then(function(keywords){
				_this.set('keywords', keywords);
			});
		}
	}
});
