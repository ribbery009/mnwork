export function timeNow(i) {
    let time = new Date(new Date(i).toLocaleString("hu-HU", { timeZone: "Europe/Budapest" }));
    let returnTime = "";
    const h = (time.getHours()<10?'0':'') + time.getHours();
    const m = (time.getMinutes()<10?'0':'') + time.getMinutes();

    returnTime = h +":"+ m;
    return returnTime;
  }