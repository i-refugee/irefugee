import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	session: Ember.inject.service(),
	isEditing: false,
	keys: [],
	actions: {
		edit_keywords: function() {
			this.set('isEditing', true);
			var _this = this;
			this.get('store').findAll('keyword').then(function(response){
				_this.set('keywords', response);
			});
			this.get('center.keywords').then(function(keywords){
				_this.set('keys', keywords.toArray());
			});
		},
		submit_keywords: function() {
			var center = this.get('center');
			var _this = this;
			var keys_selected = this.get('keys');
			var old_keys = this.get('center.centerKeywords');
			keys_selected.forEach(function(key){
				var flag = false;
				old_keys.forEach(function(old_key){
					if (old_key.get('keyword.id') === key.get('id')) {
						flag = true;
					}
				});
				if (!flag) {
					var a = _this.get('store').createRecord('center-keyword', {center: _this.get('center'), keyword: key});
					center.get('keywords').addObject(key);
					a.save();
				}
			});
			old_keys.forEach(function(old_key){
				var flag = false;
				keys_selected.forEach(function(key){
					if (old_key.get('keyword.id') === key.get('id')) {
						flag = true;
					}
				});
				if (!flag) {
					old_key.get('keyword').then(function(key){
					    center.get('keywords').removeObject(key);
						old_key.destroyRecord();
					})
				}
			});
			this.set('isEditing', false);
		}
	}
});
