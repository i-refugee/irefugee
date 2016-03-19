import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: "Εγγραφή",
	model: function() {
		return this.store.createRecord('center');
	},
	actions: {
		willTransition: function() {
			if (this.currentModel.get('isNew')) {
				console.log("destroy")
				this.currentModel.destroyRecord();
			}
			this.controller.set('success', 0);
		}
	}
});
