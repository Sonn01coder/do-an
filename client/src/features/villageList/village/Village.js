import React from 'react';
import "./village.scss";

export default function Village({village}) {

  const images = JSON.parse(village.image);

  return (
    <div className='village'>
      <div style={{backgroundImage: `url(${images[0]})`}}  >
      </div>
        <section>
            <h3>{village.name}</h3>
            <p>Địa chỉ: {village.address}</p>
        </section>
    </div>
  );
}
