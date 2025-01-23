// keycloack settings not used/reset in portal-b2c-mockup context, baseUrl is set in index.html
const baseUrl = 'http://127.0.0.1:8180';

export default {
  baseUrl: baseUrl,
  token: {
    username: 'alice',
    password: 'password',
    grant_type: 'password',
    client_id: 'test-cli',
    realmName: 'quickstart'
  },
  adminClient: {
    baseUrl: baseUrl,
    realmName: 'master',
    username: 'admin',
    password: 'admin',
    grantType: 'password',
    clientId: 'admin-cli'
  }
};
