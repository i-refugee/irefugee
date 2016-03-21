import Ember from 'ember';

// this helper is used to replace the underscore in a string with a space

export function keyWord(params/*, hash*/) {
  return params[0].replace("_", " ");
}

export default Ember.Helper.helper(keyWord);
