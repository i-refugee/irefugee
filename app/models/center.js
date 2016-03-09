import DS from 'ember-data';

export default DS.Model.extend({
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  address: DS.attr('string'),
  centerType: DS.attr('number'),
  name: DS.attr('string'),
  refugeesNumber: DS.attr('string'),
  phoneNumber: DS.attr('string'),
  contactEmail: DS.attr('string'),
  email: DS.attr('string'),
  description: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  imageUrl: DS.attr('string'),
  slug: DS.attr('string'),
  centerNeeds: DS.hasMany('center-need', {async: true}),
  importantNeeds: DS.hasMany('need', {async: true, inverse: null}),
  statuses: DS.hasMany('status', {async: true}),
  centerKeywords: DS.hasMany('center-keyword', {async: true}),
  keywords: DS.hasMany('keyword', {async: true})
});
