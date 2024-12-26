const mongoose = require("mongoose");

const marksheetSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  physics: {
    type: Number,
    required: true,
  },
  chemistry: {
    type: Number,
    required: true,
  },
  maths: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
  },
});

marksheetSchema.pre("save", function (next) {
  this.totalMarks = this.physics + this.chemistry + this.maths;
  next();
});

module.exports = mongoose.model("marksheet", marksheetSchema);
