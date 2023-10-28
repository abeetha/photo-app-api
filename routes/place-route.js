const express = require('express')
const router = express.Router();
const { upload } = require("../middleware/multer")

const { addPlace, getPlace, importArray, updatePlace, deletePlace } = require('../controller/place-controller')

router.post('/save_place', addPlace)
router.get('/get_place', getPlace)
router.get('/update_place', updatePlace)
router.get('/delete_place', deletePlace)
// router.post("/upload_image/:id", upload.single("image"), uploadImage);
router.post("/upload_array/:id", upload.array("image"), importArray);

module.exports = router;