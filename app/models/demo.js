const mongoose = require('mongoose');

const DemoSchema = mongoose.Schema(
  {
    title: String,
    content: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Demo', DemoSchema);
