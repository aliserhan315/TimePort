import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer/Footer';
import CardList from '../Components/Card.list/Card.list';
import SearchBox from '../Components/SearchBar/SearchBar';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Buttons/Buttons';
import '../Styles/UserPage.css';

function UserPage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [capsules, setCapsules] = useState([]);
  const [filteredCapsules, setFilteredCapsules] = useState([]);

  useEffect(() => {
    const fetchCapsules = async () => {
      if (!currentUser || !currentUser.id) return;

      try {
        const res = await axios.get('/data/capsules.json');
        const userCapsules = res.data.filter(
          capsule => capsule.ownerId === currentUser.id
        );

        setCapsules(userCapsules);
        setFilteredCapsules(userCapsules);
      } catch (err) {
        console.error('Failed to fetch capsules:', err);
      }
    };

    fetchCapsules();
  }, [currentUser]);

  const searchHandler = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = capsules.filter(
      capsule =>
        capsule.name.toLowerCase().includes(term) ||
        capsule.mood.toLowerCase().includes(term)
    );
    setFilteredCapsules(filtered);
  };

  return (
    <div className="App">
      <SearchBox
        placeholder="Search by name or mood..."
        onChangeHandler={searchHandler}
      />
      <CardList listcomponent={filteredCapsules} />
      {filteredCapsules.length === 0 && (
        <p className="no-capsules-message">No capsules found.</p>
      )}
      <Button className={'base button Createcapsulebtn'} onClick={()=>navigate('/CreateCapsule')}> Create Capsule </Button>
      <Footer />
    </div>
  );
}

export default UserPage;
