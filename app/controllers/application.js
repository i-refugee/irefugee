import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
	initializeNavForMobile: function() {
		$(document).ready(function(){
			$('a.closes-navbar').on('click', function(){
				$(".collapse").collapse('hide');
			});
		});
	}.on('init'),
	actions: {
	    invalidate: function() {
			var _this = this;
	      this.get('session').invalidate('authenticator:refugee').then(function(){
	      	_this.set('session.data.currentCenterId', null);
	      	_this.set('session.data.currentCenterSlug', null);
	      	_this.transitionToRoute('/');
	      }).catch((reason) => {
	        this.set('errorMessage', reason.error || reason);
	      });
	    },
	    password_change: function() {
	    	this.toggleProperty('isShowingModal');
	    }
	}
});
