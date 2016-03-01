import DS from 'ember-data';

export default DS.Model.extend({
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  location: DS.attr('string'),
  title: DS.attr('string'),
  type: DS.attr('number'),
  name: DS.attr('string'),
  refugees: DS.attr('number'),
  city: DS.attr('string'),
  phone: DS.attr('string'),
  contactmail: DS.attr('string'),
  centerNeeds: DS.hasMany('center-need', {async: true})
});
