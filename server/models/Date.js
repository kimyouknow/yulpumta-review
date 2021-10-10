import mongoose from "mongoose";

const dateSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  d_date: {
    type: Date,
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

const Date = mongoose.model("Date", dateSchema);
export default Date;
