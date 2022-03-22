export function timeNow(i) {
    let time = new Date(new Date(i).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
    let returnTime = "";
    const h = (time.getHours()<10?'0':'') + time.getHours();
    const m = (time.getMinutes()<10?'0':'') + time.getMinutes();

    returnTime = h +":"+ m;
    return returnTime;
  }

  export function getQueryDate(date) {
    const queryDate = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + date.getDate()
    return queryDate;
  }

  export function activitySelector (query) {
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