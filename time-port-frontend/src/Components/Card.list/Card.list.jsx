import './CardList.css';
import Card from '../Card/Card';

import { useRef } from 'react';

const CardList = ({ listcomponent }) => {
  const containerRef = useRef(null);

 

  return (
    <div className='card-list-wrapper'>
      <div className='card-list' ref={containerRef}>
        {listcomponent.map((Capsule, idx) => (
          <Card  Capsule={Capsule} />
        ))}
      </div>
     
    </div>
  );
};

export default CardList;
