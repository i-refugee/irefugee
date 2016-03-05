import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service(),
	isEditing: false,
	isExpanded: false,
	inserted: function() {
		var a = this.get('centerNeed');
		var _this = this;

		var importance = a.get('importance');
		var elementId = this.get('elementId');
/*		if (importance === 2) {
			$("#" + elementId + " .panel").addClass("panel-danger");
			$("#" + elementId + " .panel-heading").append("<i class='fa fa-warning pull-right'></i>");
		}
		else if (importance === 1) {
			$("#" + elementId + " .panel").addClass("panel-warning");
		}
		else if (importance === 0) {
			$("#" + elementId + " .panel").addClass("panel-default");
		}*/

		$("#" + elementId + ' .edit-button').click(function(e) {
  		  $(this).toggleClass('active');
		});

		var p = $("#" + elementId + " .panel-body");
		if (p.height() > 200) {
			p.height(160); 
			p.after("<a class='readmore'> Περισσότερα </a>");
			$("#" + elementId + " .readmore").click(function() {
				if (_this.get('isExpanded')) {
					p.height(160);
					$("#" + elementId + " .readmore").html("Περισσότερα");
					_this.toggleProperty('isExpanded');
				}
				else {
					p.css("height", "100%");
					$("#" + elementId + " .readmore").html("Λιγότερα");
					_this.toggleProperty('isExpanded');
				}
			});
		}


	}.on('didInsertElement'),
	actions: {
		edit: function() {
			console.log("start editing")
			if (this.get('isEditing')) {
				this.send('cancel');
				console.log("canceling")
			}
			else {
				var a = this.get('centerNeed');
				var elementId = this.get('elementId');
				$("#" + elementId + " .panel-body").empty();
				$("#" + elementId + " .panel-body").append("<textarea maxlength='3000' id='textarea'>" + a.get('description') + "</textarea>");	
				this.set('isEditing', true);
				$("#" + elementId + " textarea").jqte({sub: false, sup: false});	
			}			
		},
		submit: function() {
			this.set('isEditing', false);
			var elementId = this.get('elementId');
			var value = $(".jqte_editor").html();
			var centerNeed = this.get('centerNeed');
			centerNeed.set('description', value);
			centerNeed.save();
			$("#" + elementId + " .panel-body").empty();
			$("#" + elementId + " .panel-body").append(value);
		},
		cancel: function() {
			this.set('isEditing', false);
			this.get('centerNeed').rollbackAttributes();
			var elementId = this.get('elementId');
			$("#" + elementId + " .panel-body").empty();
			$("#" + elementId + " .panel-body").append(this.get('centerNeed.description'));
		}
	}
});
