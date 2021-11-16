import mongoose from 'mongoose';

const subjectDateSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Subject',
  },
  subject_title: {
    type: String,
    required: true,
  },
  s_date: {
    type: Number,
    required: true,
  },
  s_total: {
    type: Number,
  },
});

const SubjectDate = mongoose.model('SubjectDate', subjectDateSchema);
export default SubjectDate;
