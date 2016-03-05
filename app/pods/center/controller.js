import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	isEditing: false,
	isCurrentCenter: Ember.computed('model', 'session.data.currentCenterId', function(){
		if (this.get('model').get('id') === this.get('session.data.currentCenterId')) {
			return true;
		}
		else {
			return false;
		}
	}),
	actions: {
		editCenterInfo: function() {
			this.set('isEditing', true);
		},
		submitInfo: function() {
			var _this = this;
			this.get('model').save().then(function(){
				_this.set('isEditing', false);
			}).catch(function(){
				// error
			});
		},	
		cancelInfo: function() {
			this.get('model').rollbackAttributes();
			this.set('isEditing', false);
		}
	}
});
