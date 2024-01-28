// Importing necessary modules for routing, file system operations, and HTTP status codes.
import { Router } from 'express';
import fs from 'fs/promises';
import { statusCodes } from './httpStatusCode.js';
import readFileInChunks from './readFileInChunks.js';

// Creating a new Express router instance.
const router = Router();

// Defining a GET route handler for the '/data' endpoint.
router.get('/data', async (req, res) => {
  // Retrieving query parameters from the request.
  console.log("Inside Req Res");
  console.log(req.query);
  const { n, m } = req.query;
  const filePath = `data/${n}.txt`;
  console.log(filePath);

  try {
    console.log("Inside Try");

    // Validating the presence of the 'n' parameter.
    if (!n) {
      return res.status(statusCodes.BAD_REQUEST).send('Missing parameter: n');
    }

    // Handling requests with both 'n' and 'm' parameters.
    else if (n && m) {
      console.log(n, "and", m);
      
      // Attempting to read the specific line from the file.
      try {
        const desiredLine = await readSpecificLine(filePath, m);
        res.status(statusCodes.OK).send(desiredLine);
      } catch (error) {
        console.error("Error reading specific line:", error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send("Error processing request");
      }
    }

    // Handling requests with only the 'n' parameter.
    else if (n) {
      try {
        console.log("If n is available", filePath);

        // Reading the file in chunks and sending the full content.
        await readFileInChunks(filePath)
          .then((chunks) => {
            const fileData = chunks.map(chunk => chunk.toString()).join("\n");
            console.log(fileData);
            res.send(fileData);
          })
          .catch((err) => {
            console.error("Error reading file:", err);
            res.status(statusCodes.INTERNAL_SERVER_ERROR).send('Internal server error');
          });
      } catch (error) {
        console.error("Error in else if block:", error);
      }
    }
  } catch (err) {
    // Handling file-related errors and sending appropriate responses.
    const statusCode = err.code === 'ENOENT' ? statusCodes.NOT_FOUND : statusCodes.INTERNAL_SERVER_ERROR;
    console.error(err);
    res.status(statusCode).send(statusCode === statusCodes.NOT_FOUND ? 'File not found' : 'Internal server error');
  }
});


async function readSpecificLine(filePath, lineNumber) {
    try {
        console.log("Inside try Read Specific Line");
    
        // Reading file in function call
        const chunks = await readFileInChunks(filePath);
    
        // Combining chunks into lines
        const lines = chunks.flatMap(chunk => chunk.toString().split('\n'));
    
        // Validating line number
        if (lines.length < lineNumber) {
          throw new Error(`Line ${lineNumber} not found in file`);
        }
    
        // Return the desired line
        console.log(lines[lineNumber])
        return lines[lineNumber - 1]; // Line numbers start at 1
    
      } catch (error) {
        console.error("Error reading specific line:", error);
        throw error; // Rethrow for handling in the calling context
      }
}

// Exporting the router for use in the main application.
export default router;