import mongoose from "mongoose";

const daySchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  subject_id: {
    type: String,
    required: true,
    ref: "Subject",
  },
  d_date: {
    type: String,
    required: true,
  },
  lapses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lapse",
    },
  ],
  Schedules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
    },
  ],
});

const Day = mongoose.model("Day", daySchema);
export default Day;
