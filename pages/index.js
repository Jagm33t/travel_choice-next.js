import { Flex } from "@chakra-ui/react";
import Header from "@/components/Header";
import List from "@/components/List";
import Map from "@/components/Map";
import React, { useEffect, useState } from 'react';
import { getPlacesData } from "./api";
// import * as sass from 'sass';



const Home = () => {
  const[places, setPlaces]= useState([]);
  const[coordinates, setCoordinates]= useState({ });
  const[type, setType]= useState('restaurants');
  const [ratings, setRatings]= useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bounds, setBounds] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  
  useEffect(()=> {

    navigator.geolocation.getCurrentPosition(({coords :{latitude,longitude}})=>{

      setCoordinates({lat : latitude, lng : longitude})
    })
  }, [])

 

  useEffect(()=>{
    setIsLoading(true)
    getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
  // console.log("data", data)
  // console.log("bounds",bounds)
  setPlaces(data)
  setIsLoading(false)

})
  },[type, coordinates,bounds])

  useEffect(() => {
    const filteredData = places.filter((place) => place.rating > ratings);
    setFilteredPlaces(filteredData);
    console.log({ ratings });
  }, [ratings]);

  return (
    <Flex
    justifyContent={"center"}
    alignItems={"center"}
    width={"100vw"}
    height={"100vh"}
    maxWidth={"100vw"}
    maxHeight={"100vh"}
    position={"relative"}
    >
      <Header 
      setType={setType}
      setRatings={setRatings}
      setCoordinates={setCoordinates} 
      searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Map coordinates={coordinates}
       setCoordinates={setCoordinates}
       setBounds={setBounds}
       places={filteredPlaces.length ? filteredPlaces : places}
       />
       <List
        places={filteredPlaces.length ? filteredPlaces : places}
        isLoading={isLoading}
        searchInput={searchInput}
      />
      
    
    </Flex>
  )
};

export default Home;