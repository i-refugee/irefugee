import Ember from 'ember';

export default Ember.Controller.extend({
	position: undefined,
	actions: {
		moveMap: function(position) {
			this.set('position', position);
		}
	}
});
