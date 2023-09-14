import React from 'react';
import "./village.scss";

export default function Village({village}) {

  const images = JSON.parse(village.image);

  return (
    <div style={{backgroundImage: `url(${images[0]})`}} className='village' >
        <div>
            <h3>{village.name}</h3>
            <p>Địa chỉ: {village.address}</p>
        </div>
    </div>
  );
}
