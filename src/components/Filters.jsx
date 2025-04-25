// components/Filters.jsx
import React from 'react';

const specialties = [
  'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician', 'Gynaecologist',
  'ENT', 'Diabetologist', 'Cardiologist', 'Physiotherapist', 'Endocrinologist',
  'Orthopaedic', 'Ophthalmologist', 'Gastroenterologist', 'Pulmonologist',
  'Psychiatrist', 'Urologist', 'Dietitian/Nutritionist', 'Psychologist', 'Sexologist',
  'Nephrologist', 'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'
];

export default function Filters({ searchParams, setSearchParams }) {
  const handleRadioChange = (e) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('moc', e.target.value);
      return newParams;
    });
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      const current = newParams.getAll('specialty');
      if (checked) {
        newParams.append('specialty', value);
      } else {
        newParams.delete('specialty');
        current.filter(s => s !== value).forEach(s => newParams.append('specialty', s));
      }
      return newParams;
    });
  };

  const handleSortChange = (e) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('sort', e.target.value);
      return newParams;
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 data-testid="filter-header-moc" className="font-semibold">Consultation Mode</h4>
        <label>
          <input
            type="radio"
            name="moc"
            value="Video Consult"
            data-testid="filter-video-consult"
            onChange={handleRadioChange}
            checked={searchParams.get('moc') === 'Video Consult'}
          /> Video Consult
        </label><br />
        <label>
          <input
            type="radio"
            name="moc"
            value="In Clinic"
            data-testid="filter-in-clinic"
            onChange={handleRadioChange}
            checked={searchParams.get('moc') === 'In Clinic'}
          /> In Clinic
        </label>
      </div>

      <div>
        <h4 data-testid="filter-header-speciality" className="font-semibold">Speciality</h4>
        {specialties.map(s => (
          <div key={s}>
            <label>
              <input
                type="checkbox"
                value={s}
                data-testid={`filter-specialty-${s.replace(/\s|\//g, '-')}`}
                onChange={handleCheckboxChange}
                checked={searchParams.getAll('specialty').includes(s)}
              /> {s}
            </label>
          </div>
        ))}
      </div>

      <div>
        <h4 data-testid="filter-header-sort" className="font-semibold">Sort</h4>
        <label>
          <input
            type="radio"
            name="sort"
            value="fees"
            data-testid="sort-fees"
            onChange={handleSortChange}
            checked={searchParams.get('sort') === 'fees'}
          /> Fees (Low to High)
        </label><br />
        <label>
          <input
            type="radio"
            name="sort"
            value="experience"
            data-testid="sort-experience"
            onChange={handleSortChange}
            checked={searchParams.get('sort') === 'experience'}
          /> Experience (High to Low)
        </label>
      </div>
    </div>
  );
}
