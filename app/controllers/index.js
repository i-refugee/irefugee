import Ember from 'ember';

export default Ember.Controller.extend({
	position: undefined,
	filt_centers: [],
	actions: {
		moveMap: function(position, bounds) {
			//dont change this order 
			this.set('position', position);
			this.set('bounds', bounds);
		},
		filterMap: function(filt_centers) {
			this.set('filt_centers', filt_centers);
		}
	}
});
