import { useState } from 'react';
import pathologyReportImage from 'figma:asset/c54e02bfbc9daeaf4d23040244c113e34e1aad76.png';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ArrowLeft, Eye, FileText, Calendar, User, Stethoscope, Activity } from 'lucide-react';
import type { PatientData } from '../App';

interface ConsultationSummaryProps {
  patientData: PatientData;
  onBack: () => void;
}

export default function ConsultationSummary({ patientData, onBack }: ConsultationSummaryProps) {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-teal-700 text-white p-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="text-white hover:bg-teal-600"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-white">Consultation Summary</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="space-y-6">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Stethoscope className="w-8 h-8" />
                <div>
                  <h2 className="text-white">Health on Wheels - Mobility Clinic</h2>
                  <p className="text-teal-100">Consultation Report</p>
                </div>
              </div>
              <div className="text-teal-100">
                Date: {currentDate}
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card>
            <CardHeader className="bg-teal-50">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-1">Patient Name</p>
                  <p className="text-gray-900">{patientData.name || 'xxxx'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Age</p>
                  <p className="text-gray-900">{patientData.age || 'xx'} years</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600 mb-1">Address</p>
                  <p className="text-gray-900">{patientData.address || 'yyy'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Doctor Name</p>
                  <p className="text-gray-900">{patientData.doctorName || 'zzzz'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vitals */}
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Vital Signs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Blood Pressure (BP)</span>
                  <span className="text-gray-900">{patientData.bp || '120/80'}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Weight</span>
                  <span className="text-gray-900">{patientData.weight ? `${patientData.weight} kg` : '68 kg'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Temperature</span>
                  <span className="text-gray-900">{patientData.temperature ? `${patientData.temperature}°F` : '99°F'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card>
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Medical History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div>
                  <p className="text-gray-600 mb-2">Disease History / Medications</p>
                  <p className="text-gray-900">
                    {patientData.diseaseHistory || 'NA'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pathology Report */}
          <Card>
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                Pathology Report
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Button 
                onClick={() => setShowReportDialog(true)}
                variant="outline"
                className="w-full md:w-auto"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Report
              </Button>
            </CardContent>
          </Card>

          {/* Follow Up */}
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Follow Up
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {patientData.followUpDate && (
                  <div>
                    <p className="text-gray-600 mb-1">Next Appointment</p>
                    <p className="text-gray-900">
                      {new Date(patientData.followUpDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
                
                {patientData.doctorSignature && (
                  <div className="border-t pt-6">
                    <p className="text-gray-600 mb-3">Doctor's Signature</p>
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 inline-block">
                      <img 
                        src={patientData.doctorSignature} 
                        alt="Doctor Signature" 
                        className="h-20"
                      />
                    </div>
                    <p className="text-gray-600 mt-3">Date: {currentDate}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={() => window.print()}
              variant="outline"
              className="flex-1"
            >
              Print Report
            </Button>
            <Button 
              onClick={onBack}
              className="flex-1 bg-teal-600 hover:bg-teal-700"
            >
              New Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Report View Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Pathology Report</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <img 
              src={pathologyReportImage} 
              alt="Pathology Report" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
