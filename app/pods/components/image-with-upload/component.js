import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

export default Ember.Component.extend({
	sizeError: false,
	session: Ember.inject.service(),
	initialize: function() {
		$("#img-container").hover(function(){
			$("#caption").show(400);
		});
		$("#img-container").mouseleave(function(){
			$("#caption").hide(200);
		});
	}.on('didInsertElement'),

		actions: {
		    uploadImage: function (file) {
/*		      var product = this.modelFor('product');
		      var image = this.store.createRecord('image', {
		        product: product,
		        filename: get(file, 'name'),
		        filesize: get(file, 'size')
		      });
*/				
/*			  var _this = this;
			  if (get(file, 'size') > 2000000) {
			  	this.set('sizeError', true);
			  	setTimeout(function(){
				  _this.set('sizeError', false);
			  	}, 5000)
			  }*/

			  var center = this.get('center');

		      file.upload("http://localhost:3000/centers/" + this.get('session.data.currentCenterId') + "/upload",  { headers: { "Authorization": this.get('session.data.authenticated.access_token')}}).then(function (response) {
		      	center.set('imageUrl', response.body.data.attributes.image_url);
		      }, function () {
		      });
		    }
		  }
});
