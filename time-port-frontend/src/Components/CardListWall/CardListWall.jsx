import './CardListWall.css';
import Card from '../Card/Card';

import { useRef } from 'react';

const CardListWall = ({ listcomponent, usersMap}) => {
  const containerRef = useRef(null);

 

  return (
    <div className='capsule-wall-wraper'>
      <div className='card-list-wall' ref={containerRef}>
          {listcomponent.slice(-50).reverse().map((Capsule, idx) => (
          <Card key={idx} capsule={Capsule}      owner={usersMap[Capsule.user_id]} className={"cardinwall"} />
        ))}
      </div>
     
    </div>
  );
};

export default CardListWall;
