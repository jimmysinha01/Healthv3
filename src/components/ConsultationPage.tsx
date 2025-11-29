import { useState, useRef } from 'react';
import clinicInteriorImage from 'figma:asset/e8148214660f6e47b2177b19cfc258339a17e3b6.png';
import pathologyReportImage from 'figma:asset/c54e02bfbc9daeaf4d23040244c113e34e1aad76.png';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ArrowLeft, Upload, Eye, Video, FileText } from 'lucide-react';
import SignaturePad from './SignaturePad';
import type { PatientData } from '../App';

interface ConsultationPageProps {
  onBack: () => void;
  onSubmit: (data: PatientData) => void;
}

export default function ConsultationPage({ onBack, onSubmit }: ConsultationPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    bp: '',
    weight: '',
    temperature: '',
    diseaseHistory: '',
    doctorName: '',
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [videoSignature, setVideoSignature] = useState<string>('');
  const [doctorSignature, setDoctorSignature] = useState<string>('');
  const [followUpDate, setFollowUpDate] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    }
  };

  const handleSubmit = () => {
    const patientData: PatientData = {
      ...formData,
      doctorSignature,
      followUpDate,
    };
    onSubmit(patientData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-teal-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="text-white hover:bg-teal-600"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-white">Patient Consultation</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Clinic Interior Image */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-teal-600" />
                  Mobile Clinic Interior
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={clinicInteriorImage} 
                  alt="Mobile Clinic Interior" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Patient Form */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Patient Name</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter age"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="doctorName">Doctor Name</Label>
                  <Input 
                    id="doctorName"
                    value={formData.doctorName}
                    onChange={(e) => handleInputChange('doctorName', e.target.value)}
                    placeholder="Enter doctor name"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vitals */}
            <Card>
              <CardHeader>
                <CardTitle>Vitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bp">Blood Pressure (BP)</Label>
                    <Input 
                      id="bp"
                      value={formData.bp}
                      onChange={(e) => handleInputChange('bp', e.target.value)}
                      placeholder="e.g., 120/80"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="Enter weight"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input 
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                    placeholder="e.g., 98.6"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Disease History */}
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="diseaseHistory">Any Disease / Current Medications</Label>
                <Textarea 
                  id="diseaseHistory"
                  value={formData.diseaseHistory}
                  onChange={(e) => handleInputChange('diseaseHistory', e.target.value)}
                  placeholder="Please provide disease history and any current medications..."
                  rows={5}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            {/* Pathology Report Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  Pathology Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="application/pdf"
                    className="hidden"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload PDF Report
                  </Button>
                </div>
                {uploadedFile && (
                  <div className="flex items-center justify-between bg-teal-50 p-3 rounded-lg">
                    <span className="text-teal-800">{uploadedFile.name}</span>
                    <Button 
                      onClick={() => setShowReportDialog(true)}
                      variant="ghost"
                      size="sm"
                      className="text-teal-700 hover:text-teal-900"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Report
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Signatures */}
            <Card>
              <CardHeader>
                <CardTitle>Signatures</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Video Consultation Sign</Label>
                  <SignaturePad 
                    onSave={(signature) => setVideoSignature(signature)}
                    label="Video Consultation"
                  />
                </div>
                <div>
                  <Label>Doctor's Sign</Label>
                  <SignaturePad 
                    onSave={(signature) => setDoctorSignature(signature)}
                    label="Doctor"
                  />
                </div>
                <div>
                  <Label htmlFor="followUpDate">Follow-up Date</Label>
                  <Input 
                    id="followUpDate"
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              className="w-full bg-teal-600 hover:bg-teal-700"
              size="lg"
            >
              Submit Consultation
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
