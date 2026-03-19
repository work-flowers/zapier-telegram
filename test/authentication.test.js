'use strict';

const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('authentication', () => {
  it('should authenticate with a valid bot token', async () => {
    const bundle = {
      authData: { botToken: process.env.BOT_TOKEN },
    };

    const result = await appTester(App.authentication.test, bundle);
    expect(result).toHaveProperty('username');
    expect(result.is_bot).toBe(true);
  });
});
