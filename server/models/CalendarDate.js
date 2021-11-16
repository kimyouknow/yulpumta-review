import mongoose from 'mongoose';

const calendarDateSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  d_date: {
    type: Number,
    required: true,
  },
  d_total: {
    type: Number,
  },
  lapses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lapse',
    },
  ],
  plans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
    },
  ],
});

const CalendarDate = mongoose.model('CalendarDate', calendarDateSchema);
export default CalendarDate;
