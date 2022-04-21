export const timeTableRow = (index, userId, userName, startT, endT, userStatus, icon, userUser_email,date,month,liveStart,liveEnd,late) => {
    return {
        id: index,
        timeId: userId,
        name: userName,
        start: startT,
        end: endT,
        status: userStatus,
        delete: icon,
        email: userUser_email,
        date: date,
        month: month,
        liveS: liveStart,
        liveE: liveEnd,
        late:late
    }
}