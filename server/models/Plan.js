import mongoose from 'mongoose';

const planSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  p_date: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CalendarDate',
  },
  date: {
    type: Number,
    required: true,
    required: true,
  },
  p_isDone: {
    type: Boolean,
    required: true,
  },
  p_title: {
    type: String,
    required: true,
  },
  p_desc: {
    type: String,
    required: true,
  },
});

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
