import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  s_date: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
  },
  content: {
    type: String,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
