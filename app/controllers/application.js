import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	actions: {
	    invalidate: function() {
			var _this = this;
	      this.get('session').invalidate('authenticator:refugee').then(function(){
	      	_this.transitionToRoute('/');
	      }).catch((reason) => {
	        this.set('errorMessage', reason.error || reason);
	      });
	    }
	}
});
