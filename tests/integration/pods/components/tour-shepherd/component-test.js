import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tour-shepherd', 'Integration | Component | tour shepherd', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{tour-shepherd}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#tour-shepherd}}
      template block text
    {{/tour-shepherd}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
