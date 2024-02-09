import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './App.css';

function Welcome() {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [state, setState] = useState(null);
    const [country, setCountry] = useState(null);
    const [stateOptions, setStateOptions] = useState([]);
    const [countryOptions, setCountryOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => response.json())
            .then(data => setCountryOptions(data.map(item => ({ value: item.alpha3Code, label: item.name }))));

        fetch('https://api.nal.usda.gov/ndb/list?format=json&lt=g&sort=n&api_key=DEMO_KEY')
            .then(response => response.json())
            .then(data => setStateOptions(data.list.item.map(item => ({ value: item.id, label: item.name }))));
    }, []);

    const saveProfile = () => {
        fetch('http://localhost:3000/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                dob,
                state: state ? state.value : '',
                country: country ? country.value : ''
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/home');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="welcome-container">
            <h2>Welcome to Movie Pass!</h2>
            <input className="welcome-input" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <input className="welcome-input" value={dob} onChange={e => setDob(e.target.value)} placeholder="Date of Birth" type="date" />
            <Select
                className="welcome-input"
                options={stateOptions}
                onChange={selectedOption => setState(selectedOption)}
                placeholder="State"
                isSearchable
            />
            <Select
                className="welcome-input"
                options={countryOptions}
                onChange={selectedOption => setCountry(selectedOption)}
                placeholder="Country"
                isSearchable
            />
            <button className="welcome-button" onClick={saveProfile}>Save Profile</button>
        </div>
    );
}

export default Welcome;