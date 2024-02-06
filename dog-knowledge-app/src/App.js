import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const DogKnowledgeApp = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [breedInfo, setBreedInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = 'live_J7V220qmQGYP0o2wblbGv1jQj8OzmBn5xLt9aOGSWAIBiA8a7jRvkTAe5bQU6e9Q';

  const fetchData = async () => {
    if (selectedBreed) {
      setLoading(true);

      try {
        const detailsResponse = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${selectedBreed}`, {
          headers: {
            'x-api-key': apiKey,
          },
        });

        if (detailsResponse.status === 200 && detailsResponse.data.length > 0) {
          const breedDetails = detailsResponse.data[0];

          console.log('Breed Details:', breedDetails);

          setBreedInfo({
            name: breedDetails.name,
            image: { url: breedDetails.image.url },
            description: breedDetails.temperament || 'No description available',
          });
        } else {
          console.error(`Failed to fetch breed information`);
          setBreedInfo(null);
        }
      } catch (error) {
        console.error('Error fetching breed information:', error);
        setBreedInfo(null);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();

    axios.get('https://api.thedogapi.com/v1/breeds', {
      headers: {
        'x-api-key': apiKey,
      },
    })
      .then(response => {
        setBreeds(response.data.map(breed => breed.name));
      })
      .catch(error => {
        console.error('Error fetching dog breeds:', error);
      });
  }, [selectedBreed]);

  console.log('Breeds:', breeds);
  console.log('Selected Breed:', selectedBreed);
  console.log('Breed Info:', breedInfo);

  return (
    <div className="app-container">
      <h1>Know a Dog</h1>

      <label>Select a dog breed:</label>
      <select
        value={selectedBreed}
        onChange={e => setSelectedBreed(e.target.value)}
      >
        <option value="">Select Breed</option>
        {breeds.map(breed => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {loading && <p>Loading...</p>}

      {breedInfo && (
        <div>
          <h2>{breedInfo.name}</h2>
          <img src={breedInfo.image.url} alt={breedInfo.name} style={{ maxWidth: '300px' }} />
          <p>{breedInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default DogKnowledgeApp;
