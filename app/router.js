import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('center', {path:'/centers/:slug'});
  this.route('login');
  this.route('loading');
  this.route('about');
  this.route('how-to-use');
});

export default Router;
