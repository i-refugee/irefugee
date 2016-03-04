import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	initialize: function() {
		var _this = this;
		_this.get('store').findAll('news-feed').then(function(response){
			_this.set('news', response)
		});
		setInterval(function(){
			_this.get('store').findAll('news-feed').then(function(response){
				_this.set('news', response)
			});
		}, 60000);
	}.on('init')
});
