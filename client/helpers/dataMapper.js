import { timeNow } from "../helpers/functions";
import { timeTableRow } from '../entity/timeTableRow';

export function dataWrapper(array, icon) {

  const newArray = array.map((user, index) => {
    const startT = timeNow(user.start);
    const endT = timeNow(user.end);
    return new timeTableRow(index, user.id, user.name, startT, endT, user.status, icon, user.user_email);
  })

  return newArray;
}