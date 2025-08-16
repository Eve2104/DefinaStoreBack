const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  nombre:   { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true }, // hash
}, { timestamps: true });

module.exports = model('User', userSchema);
