import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  initialize: function() {
    var _this = this;
    this.get('session').on('authenticationSucceeded', function() {
      _this.store.queryRecord('center', {me: 'true'}).then((center) => {
        _this.transitionToRoute('center', center.get('slug'));
      });
    });
  }.on('init'),
  actions: {
    authenticate: function() {
      var _this = this;
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:refugee', identification, password).then(function(){
        },function(reason){
          if (reason.errors === "Center not confirmed.") {
            _this.set('errorMessage', 'Η ομάδα δεν έχει επιβεβαιωθεί ακόμα!');
          }
          else {
            _this.set('errorMessage', 'Λάθος Email ή Κωδικός');
          } 
          setTimeout(function(){
            _this.set('errorMessage', null);          
          }, 5000);
      });
    }
  }
});
