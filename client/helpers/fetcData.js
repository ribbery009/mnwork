import axios from "axios";
export async function FetchData(url) {

    try {
        const response = await axios.get(url);
    
        return response.data;
      } catch (err) {
        console.log(err);
      }
   
}