import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  centerNeeds: DS.hasMany('center-need', {async: true})
});
