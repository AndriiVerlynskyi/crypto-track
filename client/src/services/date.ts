import { DateTime } from "luxon";

export const getDataFromTimestamp = (timestamp: string) => {
  return DateTime.fromSeconds(Number(timestamp)).toFormat("LLL-dd-yyyy");
};
