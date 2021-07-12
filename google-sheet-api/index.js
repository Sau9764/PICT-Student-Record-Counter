var express = require('express');
var GoogleSpreadsheet = require('google-spreadsheet');
var ejs = require('ejs');
var http = require('http');
var fs = require('fs');

const app = express();

// get index route
app.listen(9000, function(err) {
  if (err) throw err;
  console.log("Server is Running on port " + 9000);
});

// Type localhost 9000 
app.get('/', async function(req, res) {
  // Deleting file first
  try{
    fs.unlinkSync('./StudentData.txt'); 
  }catch(err){
    console.log('No file to be deleted');
  }
  // getting google sheet data
  let StudentRows = await getSpreadSheetData();
  await writeFile(StudentRows);
  res.render(__dirname + "/index.ejs");
});

// Client secret file
var creds = require('./client_secret.json');

// Getting all SpreadSheet Data on File
function getSpreadSheetData(){
  return new Promise(function(resolve, reject){
    // Id of an GoogleSheet
    var doc = new GoogleSpreadsheet('19d6TmUKIDvwebTZ0D5_rGdonZ9apabp4Ib273EEhMy8');
    doc.useServiceAccountAuth(creds, function (err) {
      if (err) throw reject(err);
      doc.getRows(1, function (err, rows) {
        if (err) throw reject(err);
        console.log('Data Sent');
        resolve(rows);
      });
    });
  })
}

function writeFile(StudentRows){
  return new Promise(function(resolve, reject){
    // save file
    for(let i = 0; i < StudentRows.length; i++){
      var myJSON = JSON.stringify(StudentRows[i]);
      fs.appendFileSync('StudentData.txt', myJSON + "\r\n", function (err) {
        if (err) throw reject(err);
      });
    }
    console.log('File Saved!');
    resolve("");
  })
}




//++++++++++++++++++++ Old data ++++++++++++++++++++++++++

// let StudentRows = "";
// // Get data form google sheet
// var doc = new GoogleSpreadsheet('19d6TmUKIDvwebTZ0D5_rGdonZ9apabp4Ib273EEhMy8');
// doc.useServiceAccountAuth(creds, function (err) {
//   doc.getRows(1, function (err, rows) {
//     StudentRows = rows;
//     console.log('Data Sent');
//     app.get('/', function(req, res) {
//       res.render(__dirname + "/index.ejs", { rows: StudentRows });
//     });
//   });
// });

// // file created on server
// app.get('/createFile', function(req, res) {
//   fs.appendFile('StudentData.txt', 'Hello content!', function (err) {
//     if (err) throw err;
//     console.log('File Saved!');
//   });
// });

//++++++++++++++++++++ Old data ++++++++++++++++++++++++++
