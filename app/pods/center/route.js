import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: function(model) {
		return model.get('name');
	},
	model: function(params) {
		return this.store.query('center', { slug: params.slug }).then(function(response){
			return response.get('firstObject');
		});
	},
	  afterModel: function(model) {
	    $(function () { // dom ready
	      var meta = $('meta[property=og\\:url]').attr('content', window.location.href);
	      var meta = $('meta[property=og\\:title]').attr('content', model.get('name') + "- i-refugee");
	      if (model.get('imageUrl')) {
	      	var meta = $('meta[property=og\\:image]').attr('content', model.get('imageUrl'));
	      }
	    });
	  },
  	serialize: function(model) {
  		if (!model) {
  			//after authentication sometimes model becomes undefined 
  			return;
  		}
	    return { slug: model.get('slug') };
  	},

	actions: {
		willTransition: function() {
			this.controller.set('isEditing', false);
		},
		new_status: function(text) {
			var status = this.store.createRecord('status', {center: this.currentModel, context: text});
			status.save();
		},
		shareOnFacebook: function() {
			var str = "http://www.facebook.com/sharer/sharer.php?u=" + window.location.href + "&title=" + this.currentModel.get('name') + " - irefugee";
			window.open(str, "", "width=400, height=400");
		},
		shareOnTwitter: function() {
			var str = "https://twitter.com/intent/tweet?text=" + window.location.href + " " + this.currentModel.get('name') + " - irefugee";
			window.open(str, "", "width=400, height=400");
		}
	}
});
