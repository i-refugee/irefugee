import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrant.extend({
	serverTokenEndpoint: 'https://server.irefugee.gr/sessions',
	serverTokenRevocationEndpoint: 'https://server.irefugee.gr/sessions/revoke'
});