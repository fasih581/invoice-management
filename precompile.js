const ejs = require('ejs');
const fs = require('fs');
const templatePath = './views/invoice.ejs';
const outputPath = './index.html';
const data = {
  title: 'Hello World',
  content: 'This is EJS rendering.'
};
ejs.renderFile(templatePath, data, (err, html) => {
  if (err) {
    console.error(err);
  } else {
    fs.writeFileSync(outputPath, html);
    console.log('HTML generated successfully.');
  }
});


