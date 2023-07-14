const express = require('express');
const router = express.Router();

const recordsCtrl = require('../controllers/records.controller.js');

router.get('/', recordsCtrl.getRecords);
router.post('/', recordsCtrl.createRecord);
router.get('/:id', recordsCtrl.getRecord);
router.put('/:id', recordsCtrl.editRecord);
router.delete('/:id', recordsCtrl.deleteRecord);

module.exports = router;
