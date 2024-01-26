import express from 'express';
import http from 'http';
import fs from 'fs/promises';
import readline from'readline';

const PORT = process.env.SERVER_PORT  || 8080;
const app = express();

app.use(express.json());

app.get('/data',async (req,res) => {
    const { n,m } = req.query;
    console.log(n,m);
    if (!n) {
        return res.status(400).send('Missing parameter: n');
      }
    
      try {
        const data = await fs.readFile(`data/${n}.txt`, 'utf8');
        console.log(data);
    
        if (m) {
          if (m < 1 || m > data.split('\n').length) {
            return res.status(400).send('Invalid line number');
          }
          res.send(data.split('\n')[m - 1]);
        } else {
          res.send(data);
        }
      } catch (err) {
        if (err.code === 'ENOENT') {
          res.status(404).send('File not found');
        } else {
          console.error(err);
          res.status(500).send('Internal server error');
        }
      }
});
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));

