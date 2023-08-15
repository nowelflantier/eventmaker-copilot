import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email déjà existant !"],
    required: [true, "Email obligatoire !"],
  },
  username: {
    type: String,
    required: [true, "Username obligatoire !"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  token: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  image: {
    type: String,
  },
  favoriteEvents: [
    {
      title: {type: String,},
      _id: {type: String,},
      website_domain_name: {type: String,},
    },
  ],
});

const User = models.User || model("User", UserSchema)
export default User;