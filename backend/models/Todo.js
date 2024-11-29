const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  checked: { type: Boolean, default: false },
});

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [ItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
