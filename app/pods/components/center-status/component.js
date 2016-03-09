import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service(),
	observerStatuses: function() {
		var _this = this;
		this.get('center.statuses').then(function(response){
			_this.set('statuses', response.toArray().reverse());
		});
	}.observes('center.statuses').on('init'),
	actions: {
		submit_status: function(text) {
			this.sendAction('new_status', text);
			$("#status-text").val('');
		},
		remove_status: function(status) {
			var r = confirm("Να διαγραφεί το status;");
			if (r == true) {
			    status.destroyRecord();
			} else {
			}
		}
	}
});
