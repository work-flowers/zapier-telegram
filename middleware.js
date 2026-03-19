'use strict';

const handleBadResponses = (response, z) => {
  if (response.status === 401) {
    throw new z.errors.Error(
      'Invalid Bot Token. Please check your token and try again.',
      'AuthenticationError',
      response.status
    );
  }
  return response;
};

module.exports = {
  befores: [],
  afters: [handleBadResponses],
};
