import mongoose from "mongoose";

const planSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  p_date: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Day",
  },
  date: {
    type: Number,
    required: true,
  },
  p_isDone: {
    type: Boolean,
  },
  p_title: {
    type: String,
  },
  p_desc: {
    type: String,
  },
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
