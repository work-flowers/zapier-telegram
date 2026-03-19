'use strict';

const perform = async (z, bundle) => {
  const { botToken } = bundle.authData;
  const { file_id } = bundle.inputData;

  // Step 1: Get file metadata from Telegram
  const fileInfoResponse = await z.request({
    url: `https://api.telegram.org/bot${botToken}/getFile`,
    method: 'POST',
    body: { file_id },
  });

  const fileData = fileInfoResponse.data;

  if (!fileData.ok || !fileData.result.file_path) {
    throw new z.errors.Error(
      `Telegram could not retrieve the file. The file_id may be invalid or the file may exceed the 20 MB bot download limit.`,
      'InvalidData',
      400
    );
  }

  const { file_path, file_size, file_unique_id } = fileData.result;

  // Extract filename from the file_path (e.g. "documents/file_1.pdf" -> "file_1.pdf")
  const filename = file_path.split('/').pop();

  // Step 2: Download the file and stash it as a Zapier file object
  const downloadUrl = `https://api.telegram.org/file/bot${botToken}/${file_path}`;
  const fileResponse = await z.request({ url: downloadUrl, raw: true });

  const file = await z.stashFile(fileResponse, file_size, filename);

  return {
    id: file_unique_id,
    file_id,
    file,
    filename,
    file_size,
  };
};

module.exports = {
  key: 'download_file',
  noun: 'File',
  display: {
    label: 'Download File',
    description:
      'Downloads a Telegram file by its file_id and returns a file object that can be used in subsequent Zap steps.',
  },
  operation: {
    cleanInputData: false,
    inputFields: [
      {
        key: 'file_id',
        label: 'File ID',
        type: 'string',
        required: true,
        helpText:
          'The file_id from a Telegram message. This is provided by the Telegram trigger when a message contains an attachment.',
      },
    ],
    perform,
    sample: {
      id: 'AgACAgIAAxkBAAI',
      file_id: 'BAADBAADAgADZG5jRm9FeGNh',
      file: 'https://zapier-dev-files.s3.amazonaws.com/sample.pdf',
      filename: 'document.pdf',
      file_size: 12345,
    },
    outputFields: [
      { key: 'id', label: 'File Unique ID', type: 'string' },
      { key: 'file_id', label: 'File ID', type: 'string' },
      { key: 'file', label: 'File', type: 'file' },
      { key: 'filename', label: 'Filename', type: 'string' },
      { key: 'file_size', label: 'File Size (bytes)', type: 'integer' },
    ],
  },
};
