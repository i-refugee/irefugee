import Ember from 'ember';

export default Ember.Route.extend({
  	titleToken: 'Ομάδες',
	model: function() {
		return Ember.RSVP.hash({
			centers: this.store.findAll('center'),
			// all keywords are needed only if advanced search is open
			// so we request them only if it is -- nvm for now
			keywords: this.store.findAll('keyword'),
			needs: this.store.findAll('need')
		})
	},
	actions: {
		transitToCenter: function(centerId) {
			this.transitionTo('center', centerId);
		}
	}
});
