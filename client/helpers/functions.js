import moment from "moment";
export function timeNow(i) {
  let time = new Date(new Date(i).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
  let returnTime = "";
  const h = (time.getHours() < 10 ? '0' : '') + time.getHours();
  const m = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();

  returnTime = h + ":" + m;
  return returnTime;
}

export function getQueryDate(date) {
  const queryDate = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + date.getDate()
  return queryDate;
}

//visszaadja a labeleket a chartsnak
export function getChartsLabels(startDate, diff) {
  var filteredList = [];
  const start = startDate;
  for (let index = 0; index <= diff; index++) {
    filteredList.push(moment(start).format('YYYY.MM'));
    var futureMonth = moment(start).add((index + 1), 'M');
  }

  console.log(filteredList)

  return filteredList;
}

//kiszámolja 2 dátum különbségét hónapokban
export function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}


export function activitySelector(query) {
  const result = [];
  switch (query) {
    case "munka":
      result.push(query)
      break;
    case "szabad":
      result.push(query)
      break;
    case "zárva az étterem":
      result.push(query)
      break;
    case "összes":
      result.push(query)
      break;
    case "mindegyik":
      result.push(query)
      break;
    case "beteg":
      result.push(query)
      break;
    case "nyaralás":
      result.push(query)
      break;

    default:
      break;
  }

  return result;
}