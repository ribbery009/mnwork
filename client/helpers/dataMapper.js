import { timeNow } from "../helpers/functions";
import { timeTableRow } from '../entity/timeTableRow';
import moment from "moment";

export function dataWrapper(array, icon) {

  console.log("Array: ",array)
  const newArray = array.map((user, index) => {
    const startT = timeNow(user.start);
    const endT = timeNow(user.end);
    const date = moment(new Date(user.start)).format('YYYY.MM.DD');
    const month = moment(new Date(user.start)).format('YYYY.MM');
    return new timeTableRow(index, user.id, user.name, startT, endT, user.status, icon, user.user_email,date,month,user.live_start,user.live_end,user.late);
  })

  return newArray;
}