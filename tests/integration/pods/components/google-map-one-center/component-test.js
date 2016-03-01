import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('google-map-one-center', 'Integration | Component | google map one center', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{google-map-one-center}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#google-map-one-center}}
      template block text
    {{/google-map-one-center}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
