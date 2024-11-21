const router = require('express').Router();
const { addschool, listschools,allschools } = require('../controllers/schools');

router.post('/addschool', addschool);

router.get('/listschools', listschools);

router.get('/allschools',allschools)
module.exports = router;
