import Ember from 'ember';

export default Ember.Controller.extend({
	success: 0,
	initialize: function() {
		this.set('success', 0);
	}.on('init'),
	actions: {
		register: function() {
			var _this = this;
			if (this.get('model.password')!==this.get('passwordConfirmation')) {
				this.set('success', 3);
				return;
			}
			this.get('model').save().then(function(){
				_this.set('success', 2);
			}).catch(function(response){
				_this.set('success', 1);
			});
		}
	}
});
