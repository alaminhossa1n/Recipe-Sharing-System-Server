import { Schema, model } from "mongoose";
import { TCountry } from "./country.interface";

const countrySchema = new Schema<TCountry>({
  countryName: { type: String, required: true, unique: true },
});

const CountryModel = model("countries", countrySchema);

export default CountryModel;
