import { mongoose, Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  title: { type: String },
  _id: { type: String },
  website_domain_name: { type: String },
  start_date: { type: String },
  organizer: { type: String },
  end_date: { type: String },
  type_of_event: { type: String },
  public_type: { type: String },
  thematics: { type: String },
  categories: [
    {
      id: { type: String },
      name: { type: String },
      population: { type: String },
      selected: {type: Boolean},
    },
  ],
  requests: [
    {
      // _id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId(), unique: [true, "Email déjà existant !"], },
      req_id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      type_of_content: { type: String },
      target: { type: String },
      support: { type: String },
      topic: { type: String },
      tone: { type: String },
      generatedPrompt: { type: String },
      generatedContent: { type: String },
      isContentGenerated: { type: Boolean },
    },
  ],
});

const Event = models.Event || model("Event", EventSchema);
export default Event;
