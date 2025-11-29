import clinicImage from 'figma:asset/e97b896a7d57953c5d08a2d1b458f88339b80dbf.png';
import { Button } from './ui/button';
import { Stethoscope } from 'lucide-react';

interface HomePageProps {
  onConsultClick: () => void;
}

export default function HomePage({ onConsultClick }: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 p-8">
      <div className="max-w-6xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope className="w-12 h-12 text-teal-600" />
            <h1 className="text-teal-700">Health on Wheels</h1>
          </div>
          <h2 className="text-gray-600">Mobile Healthcare at Your Doorstep</h2>
        </div>

        {/* Main Image */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <img 
            src={clinicImage} 
            alt="Health on Wheels Mobile Clinic" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* CTA Button */}
        <div className="text-center space-y-4">
          <Button 
            onClick={onConsultClick}
            size="lg"
            className="bg-teal-600 hover:bg-teal-700 text-white px-12 py-6 shadow-lg hover:shadow-xl transition-all"
          >
            Click to Consult
          </Button>
          <p className="text-gray-600">
            Connect with our healthcare professionals today
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-teal-600 mb-2">🏥</div>
            <h3 className="text-gray-800 mb-2">Complete Check-up</h3>
            <p className="text-gray-600">Full health assessment in our mobile clinic</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-teal-600 mb-2">📹</div>
            <h3 className="text-gray-800 mb-2">Video Consultation</h3>
            <p className="text-gray-600">Connect with experts remotely</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-teal-600 mb-2">📊</div>
            <h3 className="text-gray-800 mb-2">Digital Reports</h3>
            <p className="text-gray-600">Access your medical records anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}
