// src/components/MapaEntregas.tsx
import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { clients } from '../../data/clients';
import { loadGoogleMaps } from '../../utils/loadGoogleMaps';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAh69aB0J68QSWJF5Kto72TAHuG878x6Ms'; // 🔑 Substitua pela sua chave


const MapaEntregas: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const route = directions?.routes[0].legs
  console.log(directions)
  console.log(route)
  useEffect(() => {
    const carregarRota = () => {
      const directionsService = new google.maps.DirectionsService();

      const origem = 'R. Moraes Barros, 1470 - Alto, Piracicaba - SP'; // Ponto de partida (ex: sua loja)
      const destino = origem;

      const waypoints = clients.map((cliente) => ({
        location: cliente.address,
        stopover: true,
      }));

      directionsService.route(
        {
          origin: origem,
          destination: destino,
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setDirections(result);
          } else {
            console.error('Erro ao buscar rota: ', status);
          }
        }
      );
    };

    loadGoogleMaps().then(() => carregarRota())
  }, []);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '600px' }}
        center={{ lat: -22.7196, lng: -47.6485 }}
        zoom={13}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <ul>
        {
          route?.map((item) => {
            return (
              <li>
                <span>{item.start_address}</span>
                <span>{item.distance?.text} - {item.duration?.text}</span>
                {/* <span>{(clients.filter(client => client.address === item.end_address))[0].name}</span> */}
              </li>
            )
          })
        }
      </ul>
    </LoadScript>
  );
};

export default MapaEntregas;
