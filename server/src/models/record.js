const { Schema, model } = require('mongoose');

const recordSchema = new Schema(
  {
    description: { type: String, required: true },
    debit: { type: Number},
    credit: { type: Number},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Record', recordSchema);
