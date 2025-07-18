import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer/Footer';
import CardListWall from '../Components/CardListWall/CardListWall';
import SearchBox from '../Components/SearchBar/SearchBar';
import '../Styles/CapsuleWall.css';

const CapsuleWall = () => {
  const [capsules, setCapsules] = useState([]);
  const [filteredCapsules, setFilteredCapsules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');

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

  const filterCapsules = (search = searchTerm, year = selectedYear, country = selectedCountry) => {
    const now = new Date();

    const filtered = capsules.filter(capsule => {
      const nameMatch = capsule.name.toLowerCase().includes(search.toLowerCase());
      const moodMatch = capsule.mood.toLowerCase().includes(search.toLowerCase());
      const yearMatch = year ? new Date(capsule.activationdate).getFullYear() === year : true;
      const countryMatch = country ? capsule.country?.toLowerCase() === country.toLowerCase() : true;

      return (
        capsule.status === 'public' &&
        new Date(capsule.activationdate) <= now &&
        (nameMatch || moodMatch) &&
        yearMatch &&
        countryMatch
      );
    });

    setFilteredCapsules(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterCapsules(value, selectedYear, selectedCountry);
  };

  const filterByYear = (year) => {
    setSelectedYear(year);
    filterCapsules(searchTerm, year, selectedCountry);
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    filterCapsules(searchTerm, selectedYear, value);
  };

  return (
    <div className="App">
      <div className="header">
        <select className="country-dropdown" onChange={handleCountryChange} value={selectedCountry}>
          <option value="">All Countries</option>
          <option value="lebanon">Lebanon</option>
          <option value="usa">USA</option>
          <option value="france">France</option>
        </select>

        <div className="year-filters">
          <div
            className={`year-box ${selectedYear === null ? 'active' : ''}`}
            onClick={() => filterByYear(null)}
          >
            All
          </div>
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

        <SearchBox
          placeholder="Search by name or mood..."
          onChangeHandler={handleSearch}
        />
      </div>

      <CardListWall listcomponent={filteredCapsules} />

      <div className="footer-placeholder">
        <Footer />
      </div>
    </div>
  );
};

export default CapsuleWall;