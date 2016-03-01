// app/instance-initializers/current-user.js

import Session from "ember-simple-auth/services/session";

export default {
  name: "current-user",
  before: "ember-simple-auth",

  initialize: function() {
    Session.reopen({
      setCurrentUser: function() {
        if (this.get('isAuthenticated')) {
          this.container.lookup('service:store').queryRecord('center', {me: ''}).then((center) => {
            this.set('currentCenter', center);
          });
        }
      }.observes('isAuthenticated')

    });
  }
};