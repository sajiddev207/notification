import mongoose from "mongoose";

// extract schema from package
const { Schema } = mongoose;

// initialize schema
const notificationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread",
    },
    revert: {
      type: String,
      default: null,
    },
    sentAt: { type: Date, default: Date.now(), immutable: true }, // auto timestamp
  },
  {
    timestamps: false, // avoid duplicate timestamps bcoz we handle `createdAt`.
    versionKey: false, // avoid version key `_v` in logs.
  }
);

const notification = mongoose.model("Notifications", notificationSchema);
export default notification;
