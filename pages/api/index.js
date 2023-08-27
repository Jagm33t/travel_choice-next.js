import axios from 'axios';

const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';


export const getPlacesData = async ( type, sw, ne) => {

  // console.log("sw1:", sw);
  // console.log("ne1:", ne);
  // console.log("latitude", sw[0])
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw[1],
        bl_longitude: sw[0],
        tr_latitude: ne[1],
        tr_longitude: ne[0],
      },
      headers: {
        'X-RapidAPI-Key': '266c5c6b69msh6b6c2b79cf3b2cap13d821jsn0eea8dd28b55', // Replace with your RapidAPI key
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      },
    });

    // console.log("data1", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};






