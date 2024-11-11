import Activity from "../models/activity.js";

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ timestamp: -1 }).limit(100);
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
};

export const createActivity = async (req, res) => {
  try {
    const { type, device, action, timestamp } = req.body;
    const newActivity = await Activity.create({
      type,
      device,
      action,
      timestamp: timestamp || new Date().toISOString(),
    });
    res.status(201).json(newActivity);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ error: "Failed to create activity" });
  }
};
