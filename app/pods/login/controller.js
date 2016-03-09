import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    authenticate: function() {
      var _this = this;
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:refugee', identification, password).then(function(){
        _this.transitionToRoute('/')
      }).catch((reason) => {
        this.set('errorMessage', 'Λάθος Email ή Κωδικός');
        setTimeout(function(){
          _this.set('errorMessage', null);          
        }, 5000);
      });
    }
  }
});
