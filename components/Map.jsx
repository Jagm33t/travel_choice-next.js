import { Box } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
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
import Icon from 'ol/style/icon';
import pin from "../assests/images/location.png"

const MapComponent = ({ coordinates, setBounds, places }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const popupRef = useRef(null);
  const [popContent, setPopContent] = useState('');
  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [coordinates.lng, coordinates.lat],
        zoom: 12,
      }),
    });

    const updateBounds = () => {
      const extent = map.getView().calculateExtent(map.getSize());
      const [minX, minY, maxX, maxY] = extent;
      setBounds({
        sw: [minX, minY],
        ne: [maxX, maxY],
      });
      console.log('Southwest (sw) corner:', [minX, minY]);
      console.log('Northeast (ne) corner:', [maxX, maxY]);
    };

    map.on('moveend', updateBounds);

    const vectorSource = new VectorSource();

    const storedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    const markerCoordinates = storedMarkers.map(place => [
      parseFloat(place[0]),
      parseFloat(place[1]),
    ]);

    markerCoordinates.forEach(coordinate => {
      const marker = new Feature({
        geometry: new Point(coordinate),
      });

      vectorSource.addFeature(marker);
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: 'red' }),
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
    map.addOverlay(popup);
    map.addLayer(vectorLayer);

    map.on('click', event => {
      const feature = map.forEachFeatureAtPixel(event.pixel, feature => feature);
      if (feature) {
        const clickedCoordinate = feature.getGeometry().getCoordinates();
        setSelectedPlace(clickedCoordinate);
    
        if (Array.isArray(places)) {
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
          
            setPopContent(content);
            console.log(clickedPlace.name)
            console.log(clickedPlace)
            popup.setPosition(clickedCoordinate);
            document.getElementById("popup-content").innerHTML = content;
          //   popup.setPosition(clickedCoordinate);
          // } else {
          //   // No matching place found for the clicked marker
          //   popup.setPosition(undefined);
          //   setPopupContent(null);
          //   console.log("No matching place found for the clicked marker")
          // }
        }
      } 
    }});
    
    

    return () => {
      map.un('moveend', updateBounds);
      map.dispose();
    };
  }, [coordinates, setBounds]);

  useEffect(() => {
    if (Array.isArray(places) && places.length > 0) {
      const storedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
      const markerCoordinates = places.map(place => [
        parseFloat(place.longitude),
        parseFloat(place.latitude),
      ]);

      storedMarkers.push(...markerCoordinates);

      localStorage.setItem('markers', JSON.stringify(storedMarkers));
    }
  }, [places]);

  const mapContainerStyle = {
    height: '100vh',
    width: '100%',
  };
  const popupStyle = {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    whiteSpace: 'wrap',
    height:'auto',
    width:'200px',
    zIndex: 100,
  };
  return (
    <Box width="full">
      <div id="map" className="map-container" style={mapContainerStyle}></div>
      <div ref={popupRef} id="popup" className="ol-popup" style={popupStyle}>
  <a href="#" id="popup-closer" className="ol-popup-closer"></a>
  <div id="popup-content" className="popup-content">
    </div>
  </div>

    </Box>
  );
};

export default MapComponent;
