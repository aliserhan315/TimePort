import '../Styles/CardList.css';
import Card from './Card';

const CardList = ({listcomponent}) => (
    <div className='card-list'>
      {listcomponent.map((Capsule) => {
        
        return <Card Capsule={Capsule}/>
      })}
    </div>
  );

  export default CardList