import Ember from 'ember';

export default Ember.Component.extend({
	initialize: function() {
		$("#editor").jqte();
	}.on('didInsertElement'),
	actions: {
		submit: function() {
			console.log($("#editor").jqteVal());
		}
	}
});
