import './CardListWall.css';
import Card from '../Card/Card';

import { useRef } from 'react';

const CardListWall = ({ listcomponent }) => {
  const containerRef = useRef(null);

 

  return (
    <div className='capsule-wall-wraper'>
      <div className='card-list-wall' ref={containerRef}>
          {listcomponent.slice(-50).map((Capsule, idx) => (
          <Card key={idx} Capsule={Capsule} className={"cardinwall"} />
        ))}
      </div>
     
    </div>
  );
};

export default CardListWall;
