import DS from 'ember-data';

export default DS.Model.extend({
  center: DS.belongsTo('center', {async: true}),
  name: DS.attr('string'),
  importance: DS.attr('number'),
  text: DS.attr('string'),
  updatedAt: DS.attr('date')
});
