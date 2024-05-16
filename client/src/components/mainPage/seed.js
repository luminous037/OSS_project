import React, { useState, useEffect } from 'react';
import './seed.css'; 
import jam from '../image/jam.png';
import sprout from '../image/chick2.png'; 

function Seed() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSeed, setSelectedSeed] = useState(null);

  const seeds = [
    { id: 1, name: '해바라기 씨앗', imageUrl: jam },
    { id: 2, name: '장미 씨앗', imageUrl: jam },
    { id: 3, name: '튤립 씨앗', imageUrl: jam }
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

}

export default Seed;
