import { useState, useMemo } from 'react';
import COUNTRIES, { getBaseCountry } from './CountrySelect';
import { SERVICES } from '../constants';
import ServiceLogo from './ServiceLogo';

export default function PhoneSelector({ onSelect, loading }) {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('any');
  const [selectedArea, setSelectedArea]    = useState('');
  const [searchService, setSearchService] = useState('');
  const [searchCountry, setSearchCountry] = useState('');

  const filteredServices = useMemo(() => 
    SERVICES.filter(s => s.name.toLowerCase().includes(searchService.toLowerCase())),
    [searchService]
  );
  
  const filteredCountries = useMemo(() => 
    COUNTRIES.filter(c => c.name.toLowerCase().includes(searchCountry.toLowerCase()) || c.code.toLowerCase().includes(searchCountry.toLowerCase())),
    [searchCountry]
  );

  const countryData = useMemo(() => 
    COUNTRIES.find(c => c.code === selectedCountry), 
    [selectedCountry]
  );

  const handleBuy = () => {
    if (!selectedService) return;
    // For area codes, we send the area-code specific slug (e.g. us_ny)
    // The backend uses getBaseCountry to resolve the pricing
    const countryToSubmit = selectedArea || selectedCountry;
    onSelect(selectedService, countryToSubmit);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
      {/* 1. Service Selection */}
      <div className="card" style={{ padding: 24 }}>
        <h3 className="font-display" style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--primary-100)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>1</span>
          Select Service
        </h3>
        <input className="input" type="search" placeholder="Search 200+ services..." value={searchService} onChange={e => setSearchService(e.target.value)} style={{ marginBottom: 16 }} />
        <div style={{ maxHeight: 400, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filteredServices.map(s => (
            <button key={s.id} onClick={() => setSelectedService(s)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, border: '1.5px solid', background: selectedService?.id === s.id ? 'var(--primary-50)' : 'transparent',
              borderColor: selectedService?.id === s.id ? 'var(--primary-200)' : 'var(--slate-100)', cursor: 'pointer', textAlign: 'left', transition: '0.15s'
            }}>
              <ServiceLogo service={s.id} size={28} />
              <span style={{ fontSize: 14, fontWeight: selectedService?.id === s.id ? 700 : 500, color: selectedService?.id === s.id ? 'var(--primary-700)' : 'var(--slate-800)' }}>{s.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--slate-400)', fontWeight: 600 }}>${s.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Country & Buy */}
      <div className="card" style={{ padding: 24 }}>
        <h3 className="font-display" style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--primary-100)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>2</span>
          Choose Region
        </h3>
        <input className="input" type="search" placeholder="Search 170+ countries..." value={searchCountry} onChange={e => setSearchCountry(e.target.value)} style={{ marginBottom: 16 }} />
        <div style={{ maxHeight: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
          {filteredCountries.map(c => (
            <button key={c.code} onClick={() => { setSelectedCountry(c.code); setSelectedArea(''); }} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, border: '1.5px solid', background: selectedCountry === c.code ? 'var(--primary-50)' : 'transparent',
              borderColor: selectedCountry === c.code ? 'var(--primary-200)' : 'var(--slate-100)', cursor: 'pointer', textAlign: 'left', transition: '0.15s'
            }}>
              <span style={{ fontSize: 20 }}>{c.flag}</span>
              <span style={{ fontSize: 14, fontWeight: selectedCountry === c.code ? 700 : 500, color: selectedCountry === c.code ? 'var(--primary-700)' : 'var(--slate-800)' }}>{c.name}</span>
            </button>
          ))}
        </div>

        {/* 2b. Area Codes (if any) */}
        {countryData?.areaCodes && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8, display: 'block' }}>Optional Area Code / State</label>
            <select className="input" value={selectedArea} onChange={e => setSelectedArea(e.target.value)}>
              <option value="">Any region in {countryData.name}</option>
              {countryData.areaCodes.map(a => <option key={a.code} value={a.code}>{a.label}</option>)}
            </select>
          </div>
        )}

        <div style={{ borderTop: '1.5px solid var(--slate-100)', paddingTop: 24, marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--slate-400)', fontWeight: 600 }}>TOTAL PRICE</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--slate-900)' }}>${selectedService?.price || '0.00'}</div>
            </div>
            {selectedService && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--slate-400)', fontWeight: 600 }}>PLATFORM</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                  <ServiceLogo service={selectedService.id} size={18} />
                  {selectedService.name}
                </div>
              </div>
            )}
          </div>
          <button onClick={handleBuy} disabled={loading || !selectedService} className="btn-purple" style={{ width: '100%' }}>
            {loading ? 'Processing...' : selectedService ? 'Purchase Number' : 'Select a Service'}
          </button>
        </div>
      </div>
    </div>
  );
}
