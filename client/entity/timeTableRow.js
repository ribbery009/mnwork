export const timeTableRow = (index, userId, userName, startT, endT, userStatus, icon, userUser_email,date) => {
    return {
        id: index,
        timeId: userId,
        name: userName,
        start: startT,
        end: endT,
        status: userStatus,
        delete: icon,
        email: userUser_email,
        date: date
    }
}