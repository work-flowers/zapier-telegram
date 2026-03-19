'use strict';

const zapier = require('zapier-platform-core');
const App = require('../../index');

const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe('creates.download_file', () => {
  it('should download a file given a valid file_id', async () => {
    // To run this test, set BOT_TOKEN and TEST_FILE_ID in your .env file.
    // You can get a TEST_FILE_ID by sending a file to your bot and checking
    // the message object via the Telegram getUpdates endpoint.
    const bundle = {
      authData: { botToken: process.env.BOT_TOKEN },
      inputData: { file_id: process.env.TEST_FILE_ID },
    };

    const result = await appTester(
      App.creates.download_file.operation.perform,
      bundle
    );

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('file');
    expect(result).toHaveProperty('filename');
    expect(typeof result.file).toBe('string');
  });
});
