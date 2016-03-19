import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	notMatching: false,
	successful: false,
	actions: {
		change_password: function() {
			var _this = this;
			var password = this.get('password');
			var confirmation = this.get('password_confirmation');
			if (password!==confirmation) {
				this.set('notMatching', true);
				setTimeout(function(){
					_this.set('notMatching', false);
				}, 3000);
				return;
			}		
			console.log(this.get('session.data.authenticated.access_token'))
			Ember.$.ajax({
				url: this.store.adapterFor('application').get('host') + "/password_change",
				type: 'POST',
				data: {password: this.get('password')},
				headers: {"Authorization": this.get('session.data.authenticated.access_token')},
				success: function() {
					_this.set('successful', true);
				},
				error: function(error) {
				} 
			})
		}
	}
});
