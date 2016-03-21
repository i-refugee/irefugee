import Ember from 'ember';

// this helper returns true if the modulo of param[0] and param[1] 
// is zero and false if not

export function mod(params/*, hash*/) {
	if (params[0] % params[1] === 0) {
		console.log(params[0] % params[1], params[0],params[1], "true")
		return true;
	}
	else {
		console.log(params[0] % params[1], params[0],params[1], "false")
		return false;
	}
}

export default Ember.Helper.helper(mod);
