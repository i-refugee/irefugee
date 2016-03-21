import Ember from 'ember';

export default Ember.Component.extend({
	sortCenterNeedPropertiesId: ['createdAt'],
	centerNeedsSortedByIndex: Ember.computed.sort('centerNeeds', 'sortCenterNeedPropertiesId'),
	centerNeedsSortedByIndexTripleGrouped: Ember.computed('centerNeedsSortedByIndex', function(){
		var newArray = [], size = 3;
		var tempArray = this.get('centerNeedsSortedByIndex').toArray();
		while (tempArray.length > 0) {
			newArray.push(tempArray.splice(0, size));
		}
		return newArray;
	}),
	initialize: function() {
		var _this = this;
		this.get('center.centerNeeds').then(function(centerNeeds){
			_this.set('centerNeeds', centerNeeds);
		});
	}.on('init')
});
