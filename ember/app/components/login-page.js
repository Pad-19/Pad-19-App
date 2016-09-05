import Ember from 'ember';

export default Ember.Component.extend({

  authManager: Ember.inject.service('session'),

  actions: {
    authenticate() {
      const { username, password} = this.getProperties('username', 'password');
      this.get('authManager').authenticate('authenticator:oauth2', username, password).then(() => {
        alert('Yes!');
      }, (err) => {
        alert('Nope!' + err.responseText);
      });
    }
  }
});
