import moment from "moment";

export const toMinutesAndSeconds = (millis: number) => {
  let result = moment.utc(millis).format("mm:ss");
  return result;
};
