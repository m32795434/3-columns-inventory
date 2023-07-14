const { Schema, model } = require('mongoose');

const recordSchema = new Schema(
  {
    description: { type: String, required: true },
    debit: { type: Number, required: true },
    credit: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Record', recordSchema);
