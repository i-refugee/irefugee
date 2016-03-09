import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	loading: false,
	initialize: function() {
		this.set('loading', true);
		var _this = this;
		_this.get('store').findAll('newsfeed').then(function(response){
			_this.set('news', response);
			_this.set('loading', false);
		});
		var interval = setInterval(function(){
			_this.get('store').unloadAll('newsfeed');
			_this.set('loading', true);
			_this.get('store').findAll('newsfeed').then(function(response){
				_this.set('news', response);
				_this.set('loading', false);
			});
		}, 60000);
		this.set('interval', interval);
	}.on('init'),
	stopInterval: function() {
		clearInterval(this.get('interval'));
	}.on('willDestroyElement')
});
