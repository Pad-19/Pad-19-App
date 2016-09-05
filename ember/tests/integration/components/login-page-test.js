import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-page', 'Integration | Component | login page', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    {{#login-page}}
    {{/login-page}}
  `);

  assert.equal(this.$('h2').text().trim(), 'Login Page');
});
