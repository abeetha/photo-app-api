const express = require('express')
const router = express.Router();

const { getUser, addUsers } = require('../controller/user-controller')

router.post('/get_user', getUser)
router.post('/save_user', addUsers)

module.exports = router;