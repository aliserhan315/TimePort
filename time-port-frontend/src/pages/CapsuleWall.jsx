
import { useState, useEffect } from 'react';
import Footer from '../Components/Footer/Footer';
import CardListWall from '../Components/CardListWall/CardListWall';
import SearchBox from '../Components/SearchBar/SearchBar';
import '../Styles/CapsuleWall.css';
import { getAllCapsules, getAllUsers } from '../api';

const CapsuleWall = () => {
  const [capsules, setCapsules] = useState([]);
  const [filteredCapsules, setFilteredCapsules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [usersMap, setUsersMap] = useState({});

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {

        const usersRes = await getAllUsers();
        const usersData = usersRes.data.payload;
        const map = {};
        if (Array.isArray(usersData)) {
          usersData.forEach(user => {
          map[user.id] = { name: user.name, profile_photo: user.profile_photo };
          });
        }
        setUsersMap(map);


        const capsulesRes = await getAllCapsules();
        const allCapsulesData = capsulesRes.data.payload;
        const now = new Date();


        const visibleCapsules = allCapsulesData.filter(capsule =>
          capsule.is_public === 1 &&
          capsule.activation_date &&
          new Date(capsule.activation_date) <= now
        );

        setCapsules(visibleCapsules);
        setFilteredCapsules(visibleCapsules);
      } catch (err) {
        console.error('Failed to fetch capsules:', err);
      }
    };

    fetchInitialData();
  }, []);

  const filterCapsules = (search = searchTerm, year = selectedYear, country = selectedCountry) => {
    const now = new Date();

    const filtered = capsules.filter(capsule => {
      if (capsule.is_public !== 1 || !capsule.activation_date) return false;
      if (new Date(capsule.activation_date) > now) return false;

      const term = search.toLowerCase();
      const nameMatch = capsule.name.toLowerCase().includes(term);
      const moodMatch = capsule.mood.toLowerCase().includes(term);

      const activationYear = new Date(capsule.activation_date).getFullYear();
      const yearMatch = year ? activationYear === year : true;

      const countryMatch = country
        ? capsule.country.toLowerCase() === country.toLowerCase()
        : true;

      return (nameMatch || moodMatch) && yearMatch && countryMatch;
    });

    setFilteredCapsules(filtered);
  };

  const handleSearch = e => {
    const value = e.target.value;
    setSearchTerm(value);
    filterCapsules(value, selectedYear, selectedCountry);
  };

  const filterByYear = year => {
    setSelectedYear(year);
    filterCapsules(searchTerm, year, selectedCountry);
  };

  const handleCountryChange = e => {
    const value = e.target.value;
    setSelectedCountry(value);
    filterCapsules(searchTerm, selectedYear, value);
  };

  return (
    <div className="App">
      <div className="header">
        <select
          className="country-dropdown"
          onChange={handleCountryChange}
          value={selectedCountry}
        >
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

      <CardListWall
        listcomponent={filteredCapsules}
        usersMap={usersMap}
      />

      <div className="footer-placeholder">
        <Footer />
      </div>
    </div>
  );
};

export default CapsuleWall;
