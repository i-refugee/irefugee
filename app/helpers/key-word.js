import Ember from 'ember';

export function keyWord(params/*, hash*/) {
  return params[0].replace("_", " ");
}

export default Ember.Helper.helper(keyWord);
