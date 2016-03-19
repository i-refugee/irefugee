import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  createdAt: DS.attr('date'),
  centerNeeds: DS.hasMany('center-need', {async: true})
});
