import mongoose from "mongoose";
const Propertieschema = new mongoose.Schema({
  photos: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  distance: {
    type: Number,
    required: false,
  },

  detail: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },

  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Properties", Propertieschema);
