// components/DoctorList.jsx
import React, { useMemo } from 'react';

export default function DoctorList({ doctors, searchParams }) {
  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    // Search by name
    const name = searchParams.get('name');
    if (name) {
      result = result.filter(doc =>
        doc.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    // Filter by mode of consultation
    const moc = searchParams.get('moc');
    if (moc) {
      result = result.filter(doc => doc.mode === moc);
    }

    // Filter by specialties
// Filter by specialties
const selectedSpecialties = searchParams.getAll('specialty');
if (selectedSpecialties.length > 0) {
  result = result.filter(doc =>
    Array.isArray(doc.speciality) &&
    selectedSpecialties.some(spec => doc.speciality.includes(spec))
  );
}



    // Sort
    const sort = searchParams.get('sort');
    if (sort === 'fees') {
      result.sort((a, b) => a.fees - b.fees);
    } else if (sort === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    }

    return result;
  }, [doctors, searchParams]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredDoctors.map((doc, idx) => (
        <div key={idx} className="border p-4 rounded shadow" data-testid="doctor-card">
          <h3 className="text-lg font-semibold" data-testid="doctor-name">{doc.name}</h3>
          <span data-testid="doctor-specialty" className="text-sm text-gray-500">
            {Array.isArray(doc.speciality) ? doc.speciality.join(', ') : ''}
          </span>
          <p className="text-sm" data-testid="doctor-experience">
            Experience: {doc.experience} years
          </p>
          <p className="text-sm" data-testid="doctor-fee">
            Fee: ₹{doc.fees}
          </p>
        </div>
      ))}
    </div>
  );
}
