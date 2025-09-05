import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageFileId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev
export default mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionSchema);
