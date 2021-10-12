import mongoose from "mongoose";

const lapseSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  subject_id: {
    type: String,
    required: true,
  },
  l_date: {
    type: String,
    required: true,
    ref: "Day",
  },
  l_start_time: {
    type: String,
  },
  l_end_time: {
    type: String,
  },
  l_lapse: {
    type: Number,
    default: 0,
  },
});

const Lapse = mongoose.model("Lapse", lapseSchema);
export default Lapse;
