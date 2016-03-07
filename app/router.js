import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('center', {path:'/centers/:center_id'});
  this.route('login');
  this.route('loading');
});

export default Router;
