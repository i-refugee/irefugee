import Ember from 'ember';

export default Ember.Route.extend({
	titleToken: "About",
	  afterModel: function() {
	    $(function () { // dom ready
	      var meta = $('meta[property=og\\:url]').attr('content', window.location.href);
	      var meta = $('meta[property=og\\:title]').attr('content', "About" + "- i-refugee");
	      	var meta = $('meta[property=og\\:image]').attr('content', "http://www.irefugee.gr/assets/logo.png");
	    });
	  },
});
