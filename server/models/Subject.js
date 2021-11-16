import mongoose from 'mongoose';

const subjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  dates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubjectDate',
    },
  ],
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
