const moongoose = require("mongoose");

const userSchema = new moongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "managerr"]
    },
  },
  { timestamps: true }
);


module.exports = moongoose.model("User", userSchema);