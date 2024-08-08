var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  permissions: [
    {
      _id: { type: Schema.ObjectId, ref: "User" },
      value: Number, // 0: no access, 1: read access, 2: write access, ... high number: owner/admin
    },
  ],
  personas: [
    {
      _id: false, // uniquely access personas by array index
      name: String,
      evidence: [
        {
          _id: false, // uniquely access evidence by array index
          name: String,
          url: String,
          icon: String,
          createdDate: Date,
          modifiedDate: Date,
          trends: [
            {
              _id: false,
              name: String,
              type: { type: String },
            },
          ],
        },
      ],
    },
  ],
  stories: [
    {
      _id: false,
      name: String,
      evidence: [
        {
          _id: false,
          name: String,
          path: String,
          trends: [
            {
              _id: false,
              name: String,
              type: { type: String },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = productSchema;
