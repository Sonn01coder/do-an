import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Map from './map/Map';
import "./Layout.scss";

export default function Layout() {
  return (
    <section className='layout'>
        <Sidebar />
        <Map />
    </section>
  )
}
