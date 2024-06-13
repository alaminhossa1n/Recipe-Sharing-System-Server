import { TCountry } from "./country.interface";
import CountryModel from "./country.model";

const createCountryIntoDB = async (payload: TCountry) => {
  const result = await CountryModel.create(payload);
  return result;
};

const getAllCountryFromDB = async () => {
  const result = await CountryModel.find();
  return result;
};

export const countryServices = { createCountryIntoDB, getAllCountryFromDB };
