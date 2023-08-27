import { Box } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorLayer from 'ol/layer/Vector';
import 'ol/ol.css';
import Overlay from 'ol/overlay';
import { closestOnCircle } from 'ol/coordinate';

const MapComponent = ({ coordinates, setBounds, places }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const popupRef = useRef(null);
  const [popContent, setPopContent] = useState('');
  const mapAndVectorLayerRef = useRef({ map: null, vectorLayer: null, popup:null });

  const [vectorLayerAdded, setVectorLayerAdded] = useState(false);
  const vectorSourceRef = useRef(null);



  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=Thxk6BDcMwaorh3uQicq', // MapTiler's "Basic" map style
          }),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [coordinates.lng, coordinates.lat],
        zoom: 15,
      }),
    });

    const updateBounds = () => {
      const extent = map.getView().calculateExtent(map.getSize());
      const [minX, minY, maxX, maxY] = extent;
      setBounds({
        sw: [minX, minY],
        ne: [maxX, maxY],
      });
    };
    mapAndVectorLayerRef.current.map = map;

    map.on('moveend', updateBounds);

  const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;
    if (places) {
      places.forEach(place => {
        const marker = new Feature({
          geometry: new Point([parseFloat(place.longitude), parseFloat(place.latitude)]),
        });
        vectorSource.addFeature(marker);
      });
    }

 
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: '#f54240' }),
          stroke: new Stroke({
            width: 3,
          }),
        }),
      }),
    });


    const popup = new Overlay({
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
 

    mapAndVectorLayerRef.current.popup = popup;
      mapAndVectorLayerRef.current.vectorLayer = vectorLayer;

      
      console.log("maplayeradded")


    return () => {
      map.un('moveend', updateBounds);
      map.dispose();
    };

    
  }, [coordinates, setBounds]);

  const { map, vectorLayer } = mapAndVectorLayerRef.current;
  if(map){
  map.on('click', event => {
        
    const feature = map.forEachFeatureAtPixel(event.pixel, feature => feature);
    if (feature) {
      const clickedCoordinate = feature.getGeometry().getCoordinates();
      setSelectedPlace(clickedCoordinate);
      console.log("clicked",clickedCoordinate)
      console.log("places",places)
      if (places && places.length > 0)  {
        // Find a place with coordinates close to the clicked coordinates
        const clickedPlace = places.find(place => {
          const clickedLat = parseFloat(clickedCoordinate[1]).toFixed(6);
          const clickedLng = parseFloat(clickedCoordinate[0]).toFixed(6);
          const placeLat = parseFloat(place.latitude).toFixed(6);
          const placeLng = parseFloat(place.longitude).toFixed(6);
          
          return clickedLat === placeLat && clickedLng === placeLng;
          
        });
        
        if (clickedPlace) {
          // Set popup content and position using place details
      
          const content = `
          <div>
            <img style="width: full" src="${
              clickedPlace.photo
                ? clickedPlace.photo.images.small.url
                : "https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg"
            }" alt="${clickedPlace.name}" />
            <h2 style="font-weight: bold">${clickedPlace.name}</h2>
            ${
              clickedPlace.address
                ? `<p style="font-size: 14px">${clickedPlace.address}</p>`
                : ""
            }
            ${
              clickedPlace.phone
                ? `<p style="font-size: 14px">${clickedPlace.phone}</p>`
                : ""
            }
            ${clickedPlace.open_now_text
              ? `<p style="font-size: 12px; color: green">${clickedPlace.open_now_text}</p>`
              : ""
          }
         
          </div>
        `;
        const { popup} = mapAndVectorLayerRef.current;
        map.addOverlay(popup);
          setPopContent(content);
          console.log(clickedPlace.name)
          
          popup.setPosition(clickedCoordinate);
          document.getElementById("popup-content").innerHTML = content;
        
      }
    } 
  }});
 
  }

  const updateVectorSource = (newPlaces) => {
    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    if (newPlaces) {
      newPlaces.forEach(place => {
        const marker = new Feature({
          geometry: new Point([parseFloat(place.longitude), parseFloat(place.latitude)]),
        });

        vectorSource.addFeature(marker);
      });
    }

    const { vectorLayer } = mapAndVectorLayerRef.current;
    vectorLayer.setSource(vectorSource);
  };
  
  useEffect(() => {
    updateVectorSource(places);
  }, [places]);

  const handleAddVectorLayer = () => {
    const { map, vectorLayer } = mapAndVectorLayerRef.current;
    if (map && vectorLayer) {
      if (!vectorLayerAdded) {
        map.addLayer(vectorLayer);
        setVectorLayerAdded(true);
      }

      vectorLayer.setVisible(!vectorLayer.getVisible());
     
    }
  };

  console.log("places",places)
  const mapContainerStyle = {
    height: '100vh',
    width: '100%',
  };
// Inside your MapComponent component

const buttonStyle = {
  position: 'absolute',
  top: '10%', // Adjust this value as needed for the top spacing
  left: '70%',
  transform: 'translateX(-50%)', // Center the button horizontally
  zIndex: 1000,
  border:"1px solid white",
  borderRadius:"5px",
  color: '#4989f3', // Text color
  padding: '5px 15px',
  backgroundColor:"white",
};

  const popupStyle = {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    whiteSpace: 'wrap',
    height: 'auto',
    width: '200px',
    zIndex: 100,
  };


  return (
    <Box width="full" position="relative">
      <div id="map" className="map-container" style={mapContainerStyle}>
        <button onClick={handleAddVectorLayer} style={buttonStyle}>
          Search here..
        </button>
      </div>
      <div ref={popupRef} id="popup" className="ol-popup" style={popupStyle}>
        <a href="#" id="popup-closer" className="ol-popup-closer"></a>
        <div id="popup-content" className="popup-content"></div>
      </div>
    </Box>
  );
}

export default MapComponent;
