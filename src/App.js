import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // Fetch data from public/data/countries.json
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/countries.json');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Filter countries by country name or capital
    useEffect(() => {
        if (value.trim() === '') {
            setFilteredData([]); // Clear the dropdown if no input
        } else {
            const filtered = data.filter((country) =>
                country.country.toLowerCase().includes(value.toLowerCase()) ||
                country.capital.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [value, data]);

    return (
        <div className="App">
            <div className="container">
                <h1>Country Search</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by country or capital..."
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    {filteredData.length > 0 && (
                        <div className="dropdown">
                            {filteredData.map((country, index) => (
                                <div key={index} className="dropdown-item">
                                    <strong>{country.country}</strong> ({country.capital})
                                    <div>Population: {country.population.toLocaleString()}</div>
                                    <div>Official Language(s): {Array.isArray(country.official_language) ? country.official_language.join(', ') : country.official_language}</div>
                                    <div>Currency: {country.currency}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
