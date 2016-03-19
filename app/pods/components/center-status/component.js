import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service(),
	loading: false,
	observerStatuses: function() {
		this.set('loading', true);
		var _this = this;
		this.get('center.statuses').then(function(response){
			_this.set('statuses', response.toArray().reverse());
			_this.set('loading', false);
		});
	}.observes('center.statuses').on('init'),
	actions: {
		submit_status: function(text) {
			this.sendAction('new_status', text);
			this.set('newstatus_text', null);
		},
		remove_status: function(status) {
			var r = confirm("Να διαγραφεί το status;");
			if (r === true) {
			    status.destroyRecord();
			} else {
			}
		}/*,
		shareStatusFacebook: function(status) {
			var image_url = this.get('center.imageUrl');
			if (!image_url) {
				image_url = "https://cdn.irefugee.gr/logo.png";
			}
			var str = "http://www.facebook.com/dialog/feed?  
				app_id=123050457758183&  
				link=" + window.location.href + "&
				picture="+ image_url +"&  
				name=Facebook%20Dialogs&  
				caption=Reference%20Documentation& 
				description=Dialogs%20provide%20a%20simple,%20consistent%20interface%20for%20applications%20to%20interact%20with%20users.&
				message=" + status + "&
				redirect_uri=" +  window.location.href + "\"";
			window.open(str, "", "width=400, height=400");
		}*/
	}
});



