import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer/Footer';
import CardList from '../Components/Card.list/Card.list';
import SearchBox from '../Components/SearchBar/SearchBar';
import '../Styles/CapsuleWall.css';  

const CapsuleWall = () => {
  const [capsules, setCapsules] = useState([]);
  const [filteredCapsules, setFilteredCapsules] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const res = await axios.get('/data/capsules.json');
        const now = new Date();

        const filtered = res.data.filter(capsule =>
          capsule.status === 'public' &&
          new Date(capsule.activationdate) <= now
        );

        setCapsules(filtered);
        setFilteredCapsules(filtered);
      } catch (err) {
        console.error('Failed to fetch capsules:', err);
      }
    };

    fetchCapsules();
  }, []);

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setSelectedYear(null);

    const filtered = capsules.filter(capsule =>
      capsule.name.toLowerCase().includes(value) ||
      capsule.mood.toLowerCase().includes(value)
    );
    setFilteredCapsules(filtered);
  };

  const filterByYear = (year) => {
    setSelectedYear(year);
    setSearchTerm('');
    const now = new Date();

    const filtered = capsules.filter(capsule => {
      const capsuleYear = new Date(capsule.activationdate).getFullYear();
      return (
        capsule.status === 'public' &&
        new Date(capsule.activationdate) <= now &&
        capsuleYear === year
      );
    });

    setFilteredCapsules(filtered);
  };

  return (
    <div className="App">
      <div className="header">
      
      

      {!searchTerm && (
        <div className="year-filters">
          <div
            className={`year-box ${selectedYear === currentYear ? 'active' : ''}`}
            onClick={() => filterByYear(currentYear)}
          >
            {currentYear}
          </div>
          <div
            className={`year-box ${selectedYear === lastYear ? 'active' : ''}`}
            onClick={() => filterByYear(lastYear)}
          >
            {lastYear}
          </div>
        </div>
      )}
      <SearchBox
        placeholder="Search by name or mood..."
        onChangeHandler={searchHandler}
      />
      </div>

      <CardList listcomponent={filteredCapsules} />
      <div className="footer-placeholder">
      <Footer />
      </div>
    </div>
  );
};

export default CapsuleWall;
