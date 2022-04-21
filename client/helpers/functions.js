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
  var futureMonth = moment(start).add(0, 'M');
  for (let index = 0; index <= diff; index++) {
    filteredList.push(moment(futureMonth).format('YYYY.MM'));
    futureMonth = moment(start).add((index + 1), 'M');
  }

  console.log(filteredList)

  return filteredList;
}

//visszaadja a labeleket a chartsnak nevek alapján
export function getChartsLabelsByNames(list) {
  var filteredList = [];
console.log("list: ",list)
 list.map((item) =>{
  filteredList.push(item.name)
 })

 console.log("filteredList: ",filteredList)
  return filteredList;
}


//legenerálja a neveket és e-maileket tartalmazó struktúrát a customSelect komponensnek
export function getNamesAndEmails(data) {
  const newList = { email: "all", job_title: "all", name: "Mindenki" }
  const newArray = [newList].concat(data)

  console.log(newArray)
  return newArray
}

//kiszámolja 2 dátum különbségét hónapokban
export function monthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

//visszaadja a labeleket a chartsnak
export function getChartsData(data, labels) {
  console.log("data: ", data)
  console.log("labels: ", labels)
  const sumDays = [];
  for (let x = 0; x < labels.length; x++) {
    let num = 0;

    data.map((item) => {
      if (labels[x] === item.month) {
        num++;
      }
    })

    sumDays.push(num);
    num = 0;
  }

  return sumDays;
}

//visszaadja a labeleket a chartsnak
export function getChartsDataByNames(data, labels) {

  const sumDays = [];
  for (let x = 0; x < labels.length; x++) {
    let num = 0;

    data.map((item) => {
      if (labels[x] === item.month) {
        num++;
      }
    })

    sumDays.push(num);
    num = 0;
  }

  return sumDays;
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
      case "késés":
        result.push(query)
        break;
    default:
      break;
  }

  return result;
}

//random rgb generator
export function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = num >> 8 & 255;
  var b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}