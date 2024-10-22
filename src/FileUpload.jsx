import React, { useState, useRef } from "react";
import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Slider } from "./components/ui/slider";
import { Label } from "./components/ui/label";

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [complexity, setComplexity] = useState(1);
  const [summary, setSummary] = useState(""); // State to hold the summary
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); 

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', { // Update this to your back-end URL if needed
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const summaryText = await response.text(); // Get the summary text
      setSummary(summaryText); // Set the summary
      navigate('/summary', { state: { summary: summaryText } }); // Navigate to summary with state
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // The rest of your component remains unchanged...
};
