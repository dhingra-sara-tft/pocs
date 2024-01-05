const Express = require("express");
const Router = Express.Router();
const fs = require("fs");
const path = require("path");
const os = require("os");
const puppeteer = require('puppeteer');
const json2xls = require("json2xls");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const data = require("../public/data.json")
// const data = [
//   { name: 'John', age: 30 },
//   { name: 'Alice', age: 25, city: 'San Francisco,lllllll' },
//   { name: 'Bob', age: 35, city: 'Los Angeles' },
// ];

async function convertToExcel(dataObj) {
  try {
    let {data, headers} = dataObj
    const xls = json2xls(data, { fields: headers })
    const timestamp = new Date().getTime();
    const filePath = path.join(os.homedir(), 'Downloads', `data_${timestamp}.xlsx`);
    fs.writeFileSync(filePath, xls, 'binary');

    return filePath;
  } catch (err) {
    console.error('Error writing EXCEL file:', err);
    throw err;
  }
}


async function convertToCSV(dataObj) {
  try {
    let {data, headers} = dataObj
    const timestamp = new Date().getTime();
    const filePath = path.join(os.homedir(), 'Downloads', `data_${timestamp}.csv`);
    const csvWriter = createCsvWriter({
      path: filePath,
      header: headers.map((key) => ({ id: key, title: key }))
    });

    await csvWriter.writeRecords(data);

    return filePath;
  } catch (err) {
    console.error('Error writing CSV file:', err);
    throw err;
  }
}


async function convertToPDF(data) {
  try {
    const htmlTemplatePath = path.join(__dirname, '../public/template.html');
    const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf-8');
    const htmlContent = htmlTemplate.replace('{{content}}', generateTable(data));

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const timestamp = new Date().getTime();
    const pdfPath = path.join(os.homedir(), 'Downloads', `data_${timestamp}.pdf`);
    await page.pdf({ path: pdfPath, format: 'A4' });

    await browser.close();

    return pdfPath;
  } catch (err) {
    console.error('Error writing PDF file:', err);
    throw err;
  }
}


function generateTable(dataObj) {
  let {data, headers} = dataObj
  let table = '<table border="1">';
  table += `<tr>${headers.map(header => `<th style="width: ${100/headers.length}%">${header}</th>`).join('')}</tr>`;
  data.forEach(obj => {
    table += `<tr>${headers.map(header => `<td style="width: ${100/headers.length}%">${obj[header]}</td>`).join('')}</tr>`;
  });
  table += '</table>';
  return table;
}

Router.get('/convertData', async (req, res, next) => {
  try {
    const type = req.query.type || 'xlsx'; 
    const headers = req.query.headers ? req.query.headers.slice(1, -1).split(',').map(item => item.trim()) : [...new Set(data.flatMap(obj => Object.keys(obj)))]
    // const headers = req.query.headers ? req.query.headers.slice(1, -1).split(',').map(item => item.trim()) : Object.keys(data[0])
    let filePath;
    switch (type) {
      case 'xlsx':
        filePath = await convertToExcel({data, headers});
        break;
      case 'csv':
        filePath = await convertToCSV({data, headers});
        break;
      case 'pdf':
        filePath = await convertToPDF({data, headers});
        break;
      default:
        throw new Error('Invalid file type');
    }

    res.download(filePath, `data.${type}`, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      } else {
        fs.unlinkSync(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });
      }
    });
  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = Router;
