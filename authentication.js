'use strict';

const test = async (z, bundle) => {
  const response = await z.request({
    url: `https://api.telegram.org/bot${bundle.authData.botToken}/getMe`,
  });
  return response.data.result;
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'botToken',
      label: 'Bot Token',
      required: true,
      type: 'password',
      helpText:
        'The token you received from @BotFather when creating your Telegram bot.',
    },
  ],
  test,
  connectionLabel: '{{json.first_name}} (@{{json.username}})',
};
