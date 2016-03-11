import Ember from 'ember';

export default Ember.Component.extend({
	initializeKeywords: function() {
		var element;
		var str;
		var _this = this;
		this.get('center').get('centerKeywords').then(function(centerKeywords){
/*			centerKeywords.forEach(function(centerKeyword){
				element = $("#" + _this.get('elementId') + " .keywords");
				console.log(element[0].clientHeight, element[0].scrollHeight, _this.get('elementId'))
				if (element.clientHeight < element.scrollHeight) {
					// overflow! remove last element and add dots
					console.log("overflow!")
					$("#" + this.get('elementId') + " .keywords span").last().remove();
					element.appendChild("...");
				} else {
					// no overflow, we are good
					str = " <span class='box-keyword alert-info'>" + centerKeyword.get('keyword.keyword').replace("_", " ") +"</span> ";   
				    element.append(str)
				}
			});*/
			var element = $("#" + _this.get('elementId') + " .keywords");
			var arr = centerKeywords.toArray();

			if (arr.length > 6) {
				var sl = arr.slice(0,6);
				sl.forEach(function(centerKeyword){
					str = " <span class='box-keyword alert-info'>" + centerKeyword.get('keyword.keyword').replace("_", " ") +"</span> ";   
				    element.append(str)
				});
				element.append("...");
			}
			else {
				arr.forEach(function(centerKeyword){
					str = " <span class='box-keyword alert-info'>" + centerKeyword.get('keyword.keyword').replace("_", " ") +"</span> ";   
				    element.append(str)
				});
			}
		});
	}.on('didInsertElement')
});
