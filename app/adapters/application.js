import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
	authorizer: 'authorizer:refugee',
//	host: 'http://server.irefugee.gr',
	host: 'https://server.irefugee.gr',
	pathForType: function(type) {
		let underscored = Ember.String.underscore(type);
		return Ember.String.pluralize(underscored);
	}
});
