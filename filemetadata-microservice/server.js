const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();

function sizeByteConvert (bytes) {
    const string = bytes.toString();
    const kiloByte = bytes / 1000;
    if (kiloByte.toString().length > 4) {
        return `${kiloByte / 1000} MB`;
    }
    return `${kiloByte} KB`;
}

//app.use(express.static(__dirname ,'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.post('/', multer().single('upfile'), function (req, res) {
    console.log(req.file)
   const metaData = {
       'name': req.file.originalname,
       'mime': req.file.mimetype,
       'size': sizeByteConvert(req.file.size)
   };
    return res.json(metaData);
});

app.listen(process.env.PORT || 8080);