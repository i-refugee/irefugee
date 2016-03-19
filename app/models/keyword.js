import DS from 'ember-data';

export default DS.Model.extend({
  keyword: DS.attr('string'),
  center: DS.belongsTo('center', {async: true}),
  centerKeywords: DS.hasMany('center-keyword', {async: true}),
  createdAt: DS.attr('date'),
  keywordWithoutUnderscore: Ember.computed('keyword', function(){
  	return this.get('keyword').replace(/_/g, ' ');
  })
});
