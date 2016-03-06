import DS from 'ember-data';

export default DS.Model.extend({
  center: DS.belongsTo('center', {async: true}),
  keyword: DS.belongsTo('keyword', {async: true})
});
