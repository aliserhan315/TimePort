import './CardList.css';
import Card from '../Card/Card';

import { useRef ,useContext} from 'react';
import { UserContext } from '../../Context/UserContext';

const CardList = ({ listcomponent }) => {
  const { currentUser } = useContext(UserContext);
  const containerRef = useRef(null);

 

  const visibleCards = listcomponent.slice(-30).reverse();;
  return (
    <div className='card-list-wrapper'>
      <div className='card-list' ref={containerRef}>
        {visibleCards.map((Capsule, idx) => (
          <Card  capsule={Capsule} owner={currentUser} />
        ))}
      </div>
     
    </div>
  );
};

export default CardList;
