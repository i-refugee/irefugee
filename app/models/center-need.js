import DS from 'ember-data';

export default DS.Model.extend({
  center: DS.belongsTo('center', {async: true}),
  need: DS.belongsTo('need', {async: true}),
  importance: DS.attr('number'),
  description: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
