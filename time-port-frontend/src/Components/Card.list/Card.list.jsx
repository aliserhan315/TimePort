import './CardList.css';
import Card from '../Card/Card';

const CardList = ({listcomponent}) => (
    <div className='card-list'>
      {listcomponent.map((Capsule) => {
        
        return <Card Capsule={Capsule}/>
      })}
    </div>
  );

  export default CardList