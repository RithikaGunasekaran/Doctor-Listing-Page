// App.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Autocomplete from './components/Autocomplete';
import Filters from './components/Filters';
import DoctorList from './components/DoctorList';

export default function App() {
  const [doctors, setDoctors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  return (
    <div className=" bg-white-100">
      {/* Top Search Bar */}
      <div className="bg-blue-800 p-4 flex justify-center">
        <div className="w-full max-w-4xl">
          <Autocomplete doctors={doctors} setSearchParams={setSearchParams} />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="w-full lg:w-1/4">
            <Filters setSearchParams={setSearchParams} searchParams={searchParams} />
          </div>

          {/* Doctor Listings */}
          <div className="w-full lg:w-3/4">
            <DoctorList doctors={doctors} searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  );
}
