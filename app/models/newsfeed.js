import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  center: DS.belongsTo('center'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
