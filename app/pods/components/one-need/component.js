import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service(),
	isEditing: false,
	isExpanded: false,
	inserted: function() {
		var tmp = this.get('centerNeed').get('importance');
		if (tmp===1 || !tmp) {
			this.set('needString', "Μικρή Ανάγκη");
		}
		else if (tmp===2) {
			this.set('needString', "Μέση Ανάγκη");
		}
		else if (tmp===3) {
			this.set('needString', "Μεγάλη Ανάγκη");
		}
//		console.log(this.get('needString'))
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
					_this.set('isExpanded', false);
				}
				else {
					p.css("height", "100%");
					$("#" + elementId + " .readmore").html("Λιγότερα");
					_this.set('isExpanded', true);
				}
			});
		}


	}.on('didInsertElement'),
	actions: {
		edit: function() {
			var _this = this;
			if (this.get('isEditing')) {
				this.send('cancel');
			}
			else {
				var a = this.get('centerNeed');
				var elementId = this.get('elementId');
		
				var p = $("#" + elementId + " .panel-body");
				p.css("height", "100%");				
				$("#" + elementId + " .readmore").remove();

				$("#" + elementId + " .panel-body").empty();
				$("#" + elementId + " .panel-body").append("<textarea maxlength='3000' id='textarea'>" + a.get('description') + "</textarea>");	
				this.set('isEditing', true);
				$("#" + elementId + " textarea").jqte({sub: false, sup: false});	
			}			
		},
		submit: function() {
			var _this = this;
			this.set('isEditing', false);
			$("#" + elementId + " .readmore").html("Λιγότερα");
			this.toggleProperty('isExpanded');
			var elementId = this.get('elementId');
			var value = $(".jqte_editor").html();
			var centerNeed = this.get('centerNeed');
			centerNeed.set('description', value);
			centerNeed.save();
			$("#" + elementId + " .panel-body").empty();
			$("#" + elementId + " .panel-body").append(value);
			var p = $("#" + elementId + " .panel-body");
			if (p.height() > 200) {
				p.height(160); 
				p.after("<a class='readmore'> Περισσότερα </a>");
				this.set('isExpanded', false);
				$("#" + elementId + " .readmore").click(function() {
					if (_this.get('isExpanded')) {
						p.height(160);
						$("#" + elementId + " .readmore").html("Περισσότερα");
						_this.set('isExpanded', false);
					}
					else {
						p.css("height", "100%");
						$("#" + elementId + " .readmore").html("Λιγότερα");
						_this.set('isExpanded', true);
					}
				});
			}
		},
		cancel: function() {
			var _this = this;
			this.set('isEditing', false);
			$("#" + elementId + " .readmore").html("Λιγότερα");
			this.toggleProperty('isExpanded');
			this.get('centerNeed').rollbackAttributes();
			var elementId = this.get('elementId');
			$("#" + elementId + " .panel-body").empty();
			$("#" + elementId + " .panel-body").append(this.get('centerNeed.description'));
				var p = $("#" + elementId + " .panel-body");
				if (p.height() > 200) {
					p.height(160); 
					p.after("<a class='readmore'> Περισσότερα </a>");
					this.set('isExpanded', false);
					$("#" + elementId + " .readmore").click(function() {
						if (_this.get('isExpanded')) {
							p.height(160);
							$("#" + elementId + " .readmore").html("Περισσότερα");
							_this.set('isExpanded', false);
						}
						else {
							p.css("height", "100%");
							$("#" + elementId + " .readmore").html("Λιγότερα");
							_this.set('isExpanded', true);
						}
					});
				}
		}
	}
});
