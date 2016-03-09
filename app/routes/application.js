import Ember from 'ember';

export default Ember.Route.extend({
  moment: Ember.inject.service(),
  title: function(tokens) {
    return tokens.join(' - ') + ' - i-refugee';
  },
  beforeModel() {
    this.get('moment').changeLocale('el');
  }
});
