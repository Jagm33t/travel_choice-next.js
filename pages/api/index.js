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
        'X-RapidAPI-Key': 'd3bed30b57msh4ab4c094d00e0acp185766jsn500c92fab4a2', // Replace with your RapidAPI key
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      },
    });

    // console.log("data1", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};






