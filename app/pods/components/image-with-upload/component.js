import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

export default Ember.Component.extend({
	sizeError: false,
	maxFileSize: 2000000,
	session: Ember.inject.service(),
	notify: Ember.inject.service(),
	initialize: function() {
		$("#img-container").hover(function(){
			$("#caption").show(400);
		});
		$("#img-container").mouseleave(function(){
			$("#caption").hide(200);
		});
	}.on('didInsertElement'),
		    uploadError: function() {
		      this.get('notify').error('Μέγιστο επιτρεπόμενο μέγεθος 2ΜΒ.');
		    },

		actions: {
		    uploadImage: function (file) {
			  var center = this.get('center');
//			  var filesize = get(file, 'size');
/*			  if (filesize > this.get('maxFileSize')) {
			  	Ember.run(this, this.uploadError);
			  	this.set('queue', []);
			  	return;
			  }*/
		      file.upload("https://server.irefugee.gr/centers/" + this.get('session.data.currentCenterId') + "/upload",  { headers: { "Authorization": this.get('session.data.authenticated.access_token')}}).then(function (response) {
		      	center.set('imageUrl', response.body.data.attributes.image_url);
		      }, function () {
		      });
		    }
		  }
});
