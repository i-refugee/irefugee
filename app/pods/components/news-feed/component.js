import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	initialize: function() {
		var _this = this;
		_this.get('store').findAll('newsfeed').then(function(response){
			_this.set('news', response)
		});
		var interval = setInterval(function(){
			_this.get('store').findAll('newsfeed').then(function(response){
				_this.set('news', response)
			});
		}, 60000);
		this.set('interval', interval)
	}.on('init'),
	stopInterval: function() {
		clearInterval(this.get('interval'));
	}.on('willDestroyElement')
});
