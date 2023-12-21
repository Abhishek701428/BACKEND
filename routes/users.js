var express = require('express');
var router = express.Router();
const userController=require('../Controllers/Usercontroller')
const csvController=require('../Controllers/Csvcontroller')
const multer = require('multer');
const storage = multer.memoryStorage(); // Use memory storage for handling file buffers

// Create multer instance with the defined storage
const upload = multer({ storage: storage });
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',userController.register)
router.post('/upload', upload.single('file'), csvController.uploadCSV);
router.get('/export-csv', csvController.exportCSV);
router.get('/export-xlsx', csvController.exportXLSX);
module.exports = router;
