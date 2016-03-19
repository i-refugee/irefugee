import Ember from 'ember';

export default Ember.Component.extend({
	sortCenterNeedPropertiesId: ['createdAt'],
	centerNeedsSortedByIndex: Ember.computed.sort('centerNeeds', 'sortCenterNeedPropertiesId'),
	initialize: function() {
		var _this = this;
		this.get('center.centerNeeds').then(function(centerNeeds){
			_this.set('centerNeeds', centerNeeds);
		});
	}.on('init')
});
