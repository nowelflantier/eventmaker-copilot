import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  title: { type: String },
  _id: { type: String },
  website_domain_name: { type: String },
  start_date: { type: String },
  organizer: {type: String},
  end_date: { type: String },
  type_of_event: {type: String},
  public_type:  {type: String},
  thematics:  {type: String},
  
  requests: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
      type_of_content: {type: String},
      target:  {type: String},
      support:  {type: String},
    }
  ]
});

const Event = models.Event || model("Event", EventSchema)
export default Event;
 