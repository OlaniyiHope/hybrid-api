import Properties from "../models/Properties.js";

export const createProperties = async (req, res, next) => {
  const newProperties = new Properties(req.body);

  try {
    const savedProperties = await newProperties.save();
    res.status(200).json(savedProperties);
  } catch (err) {
    next(err);
  }
};
export const updateProperties = async (req, res, next) => {
  try {
    const updatedProperties = await Properties.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProperties);
  } catch (err) {
    next(err);
  }
};
export const deleteProperties = async (req, res, next) => {
  try {
    await Properties.findByIdAndDelete(req.params.id);
    res.status(200).json("Property has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getProperties = async (req, res, next) => {
  try {
    const properties = await Properties.findById(req.params.id);
    res.status(200).json(properties);
  } catch (err) {
    next(err);
  }
};
export const getpropertiess = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const propertiess = await Properties.find({
      ...others,
    });
    res.status(200).json(propertiess);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Properties.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const propertiesCount = await Properties.countDocuments({
      type: "properties",
    });
    const apartmentCount = await Properties.countDocuments({
      type: "apartment",
    });
    const resortCount = await Properties.countDocuments({ type: "resort" });
    const villaCount = await Properties.countDocuments({ type: "villa" });
    const cabinCount = await Properties.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "properties", count: propertiesCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
