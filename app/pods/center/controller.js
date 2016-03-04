import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	isEditing: false,
	isCurrentCenter: Ember.computed('model', 'session.currentCenter', function(){
		if (this.get('model').get('id') === this.get('session.currentCenter.id')) {
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
				_this.set('isEditing', true);
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
