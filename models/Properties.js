import mongoose from "mongoose";
const Propertieschema = new mongoose.Schema({
  photos: {
    type: [String],
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },

  distance: {
    type: Number,
  },

  detail: {
    type: String,
  },
  desc: {
    type: String,
  },

  cheapestPrice: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Properties", Propertieschema);
