const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

app.post('/api/upload', async (req, res) => {
  const { images } = req.body;
  const studentInfo = '2020141002-주현수-3-AI컴퓨터정보'; // 예를 들어, 고정된 학생 정보

  images.forEach((image, index) => {
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
    const filePath = path.join(__dirname, `./imgs/${studentInfo}/${index}.png`);
    ensureDirectoryExistence(filePath);
    fs.writeFileSync(filePath, base64Data, 'base64');
  });

  // 여기서 이미지 분석 후 학생 정보를 반환
  const recognizedStudentInfo = {
    id: '2020141002',
    name: '주현수',
    grade: '3',
    major: 'AI컴퓨터정보'
  };

  res.json(recognizedStudentInfo);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
