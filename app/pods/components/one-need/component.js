import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service(),
	isEditing: false,
	inserted: function() {
		var a = this.get('centerNeed');
		var importance = a.get('importance');
		var elementId = this.get('elementId');
		if (importance === 2) {
			$("#" + elementId + " .panel").addClass("panel-danger");
			$("#" + elementId + " .panel-heading").append("<i class='fa fa-warning pull-right'></i>");
		}
		else if (importance === 1) {
			$("#" + elementId + " .panel").addClass("panel-warning");
		}
		else if (importance === 0) {
			$("#" + elementId + " .panel").addClass("panel-default");
		}

	}.on('didInsertElement'),
	actions: {
		edit: function() {
			var a = this.get('centerNeed');
			var elementId = this.get('elementId');
			$("#" + elementId + " .panel-body").empty();
			$("#" + elementId + " .panel-body").append("<textarea id='textarea'>" + a.get('text') + "</textarea>");	
			this.set('isEditing', true);
			$("#" + elementId + " textarea").jqte();				
		},
		submit: function() {
			this.set('isEditing', false);
			var elementId = this.get('elementId');
			var value = $(".jqte_editor").html();
			this.set('centerNeed.text', value);
//			centerNeed.save();
			$("#" + elementId + " .panel-body").empty();
			$("#" + elementId + " .panel-body").append(value);
		}
	}
});
