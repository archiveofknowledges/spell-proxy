import express from 'express';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/spellcheck', async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      'https://speller.cs.pusan.ac.kr/results',
      new URLSearchParams({ text1: text }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('프록시 서버 오류');
  }
});

app.listen(PORT, () => {
  console.log(`프록시 서버 실행 중: http://localhost:${PORT}`);
});
