var express = require("express");
var home = require('../controllers/home');
var client = require('../controllers/client');
var path= require("path");
var multer = require("multer");
var upload = multer().single('fileToUpload');
var images = require("../controllers/image");
var folders = require("../controllers/folders");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/' + req.body.folder);
  },
  filename: function (req, file, cb) {
    cb(null, req.body.title + '-' + Date.now() + path.extname(file.originalname));
  }
});
 
var upload = multer({ storage: storage });
module.exports = function(app) {
    var router = express.Router();
    app.use('/', router);
    router.get('/', home.index);
    router.post("/", home.login);
    router.get('/client', client.home);
    router.post('/upload', upload.single('fileToUpload'), images.upload);
    router.get("/view", images.view);
    router.get('/uploads', folders.uploads);
    router.get('/good', folders.good);
    router.get('/better', folders.better);
    router.get('/best', folders.best);
    router.post('/delete', images.delete);
    router.post("/out", home.logout);
}