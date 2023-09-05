import React from 'react';
import "./village.scss";

export default function Village({village}) {
  return (
    <div style={{backgroundImage: `url(${village.img})`}} className='village'>
        <div>
            <h3>{village.name}</h3>
            <p>Địa chỉ: {village.address}</p>
        </div>
    </div>
  );
}
