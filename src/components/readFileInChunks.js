// Importing the 'fs' module for file system operations.
import fs from 'fs';

// Exporting a function that reads a file in chunks.
export default function readFileInChunks(filePath, chunkSize = 1024) {
  // Creating a new Promise to handle asynchronous file reading.
  return new Promise((resolve, reject) => {
    // Creating a readable stream for the specified file path.
    const stream = fs.createReadStream(filePath, { highWaterMark: chunkSize });

    // Initializing an empty array to store the read chunks.
    let chunks = [];

    // Handling data events as chunks are read from the stream.
    stream.on('data', (chunk) => {
      // Appending the received chunk to the chunks array.
      chunks.push(chunk);
    });

    // Handling the end event when the stream finishes reading.
    stream.on('end', () => {
      // Resolving the Promise with the collected chunks.
      resolve(chunks);
    });

    // Handling any errors that occur during the reading process.
    stream.on('error', (err) => {
      // Rejecting the Promise with the error.
      reject(err);
    });
  });
}
