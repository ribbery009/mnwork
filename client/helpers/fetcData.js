export async function FetchData(url) {
    let dataResponse = await fetch(url, { headers: { "Content-type": "application/json;charset=utf-8" } })
    if (!dataResponse.ok) {
        throw new Error(`Error status: ${dataResponse.status}`);
    }
    const timeTableList = await dataResponse.json();
    return timeTableList
}