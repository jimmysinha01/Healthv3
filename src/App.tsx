import { useState } from 'react';
import HomePage from './components/HomePage';
import ConsultationPage from './components/ConsultationPage';
import ConsultationSummary from './components/ConsultationSummary';

export type PatientData = {
  name: string;
  age: string;
  address: string;
  bp: string;
  weight: string;
  temperature: string;
  diseaseHistory: string;
  doctorName: string;
  doctorSignature: string;
  followUpDate: string;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'consultation' | 'summary'>('home');
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  const handleConsultationSubmit = (data: PatientData) => {
    setPatientData(data);
    setCurrentPage('summary');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' && (
        <HomePage onConsultClick={() => setCurrentPage('consultation')} />
      )}
      {currentPage === 'consultation' && (
        <ConsultationPage 
          onBack={() => setCurrentPage('home')} 
          onSubmit={handleConsultationSubmit}
        />
      )}
      {currentPage === 'summary' && patientData && (
        <ConsultationSummary 
          patientData={patientData}
          onBack={() => setCurrentPage('home')}
        />
      )}
    </div>
  );
}
