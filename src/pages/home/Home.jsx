import React from 'react';
import Navbar from '../navbar/Navbar';
import { home1 } from '../../assets';

const Home = () => {
  return (
    <div>
      <Navbar />
      <img
        src={home1}
        alt=""
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'calc(100vh)',
        }}
      />
    </div>
  );
};

export default Home;
