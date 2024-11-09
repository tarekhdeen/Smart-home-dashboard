import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
