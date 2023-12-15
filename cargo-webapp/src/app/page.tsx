'use client'

import React, { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader';

const containerStyle = {
  // width: '400px',
  height: '100%'
};

function HomeMap() {

  const mapRef = useRef<any>();

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyDWTx7bREpM5B6JKdbzOvMW-RRlhkukmVE",
        version: 'weekly'
      })

      const { Map } = await loader.importLibrary("maps");

      const options: google.maps.MapOptions = {
        center: {
          lat: -3.745,
          lng: -38.523
        },
        zoom: 17,
        mapId: 'AIzaSyDWTx7bREpM5B6JKdbzOvMW-RRlhkukmVE'
      }
      new Map(mapRef.current, options);
    }

    initMap();
  }, []);

  return <div style={containerStyle} ref={mapRef}></div>
}

export default React.memo(HomeMap)