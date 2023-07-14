const recordCtrl = {};
const Record = require('../models/record');

recordCtrl.getRecords = async (req, res, next) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving records' });
  }
};

recordCtrl.createRecord = async (req, res, next) => {
  const record = new Record({
    description: req.body.description,
    debit: req.body.debit,
    credit: req.body.credit,
  });
  await record.save();
  res.json({ status: 'Record created' });
};

recordCtrl.getRecord = async (req, res, next) => {
  const { id } = req.params;
  const record = await Record.findById(id);
  res.json(record);
};

recordCtrl.editRecord = async (req, res, next) => {
  const { id } = req.params;
  await Record.findByIdAndUpdate(id, { $set: req.body }, { new: true });
  res.json({ status: 'Record updated' });
};

recordCtrl.deleteRecord = async (req, res, next) => {
  await Record.findByIdAndRemove(req.params.id);
  res.json({ status: 'Record deleted' });
};

module.exports = recordCtrl;
