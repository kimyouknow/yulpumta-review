import mongoose from 'mongoose';

const lapseSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  subject_id: {
    type: String,
    required: true,
  },
  subject_title: {
    type: String,
    required: true,
  },
  l_date: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Day',
  },
  date: {
    type: Number,
    required: true,
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

const Lapse = mongoose.model('Lapse', lapseSchema);
export default Lapse;
