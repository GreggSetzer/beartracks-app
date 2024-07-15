import { Map, Marker } from '@vis.gl/react-google-maps';
import { Position } from '../../../common/types/apiTypes';

interface CustomMapProps {
  position: Position;
}

const CustomMap = ({ position }: CustomMapProps) => {
  return (
    <>
      {position && (
        <Map defaultCenter={position} center={position} defaultZoom={10}>
          <Marker position={position} />
        </Map>
      )}
    </>
  );
};

export default CustomMap;
