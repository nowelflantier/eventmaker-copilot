import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  prompt: {
    type: String,
    required: [true, "Prompt obligatoire !"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tag: {
    type: String,
    required: [true, "Tag obligatoire !"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema)
export default Prompt;