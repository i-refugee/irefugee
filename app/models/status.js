import DS from 'ember-data';

export default DS.Model.extend({
  center: DS.belongsTo('center', {async: true}),
  context: DS.attr('string'),
  createdAt: DS.attr('date')
});
