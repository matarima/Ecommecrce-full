const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  children: [
    {
      name: String,
    },
  ],
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
