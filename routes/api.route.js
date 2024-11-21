const router = require('express').Router();
const { addschool, listschools } = require('../controllers/schools');

router.post('/addschool', addschool);

router.get('/listschools', listschools);

module.exports = router;
