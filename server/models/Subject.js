import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
    unique: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  lapses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lapse",
    },
  ],
});

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
