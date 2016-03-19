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
		}, 50000);
		this.set('interval', interval);
/*if(typeof(EventSource) !== "undefined") {
console.log("events")
} else {
	console.log("no events")
    // Sorry! No server-sent events support..
}
		var source = new EventSource("http://developmentserver.irefugee.gr/stream");
		source.addEventListener('message', function(e) {
		  console.log(e.data);
		}, false);

		source.addEventListener('open', function(e) {
		  // Connection was opened. 
		  console.log(e)
		  console.log(e.data)
		  console.log("connection opened")
		}, false);

		source.addEventListener('error', function(e) {
		  if (e.readyState == EventSource.CLOSED) {
		    // Connection was closed.
		    console.log("connection closed")
		  }
		}, false);*/
	}.on('init'),
	stopInterval: function() {
		clearInterval(this.get('interval'));
	}.on('willDestroyElement')
});
