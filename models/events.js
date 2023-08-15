import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String },
  _id: { type: String },
  website_domain_name: { type: String },
  start_date: { type: String },
  end_date: { type: String },
  type: {type: String},
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
