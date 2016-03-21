import Ember from 'ember';

export default Ember.Controller.extend({
	success: 0,
	initialize: function() {
		this.set('success', 0);
	}.on('init'),
	actions: {
		register: function() {
			var _this = this;
			Ember.$.ajax({
				url: this.store.adapterFor('application').get('host') + '/recaptcha_auth',
				type: "POST",
				data: {
					captcha_response: grecaptcha.getResponse()
				}
			}).then(function(response){
				if (response.success === true) {
					if (_this.get('model.password')!==_this.get('passwordConfirmation')) {
						_this.set('success', 3);
						return;
					}
					_this.get('model').save().then(function(){
						_this.set('success', 2);
					}).catch(function(response){
						_this.set('success', 1);
					});
				}
				else {
					_this.set('success', 4);
				}
			}, function(){
				_this.set('success', 1);				
			});
			grecaptcha.reset();
		}
	}
});
