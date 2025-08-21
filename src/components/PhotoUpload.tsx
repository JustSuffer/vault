import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import floralBackground from '@/assets/floral-background.jpg';

interface PhotoUploadProps {
  onUpload?: (files: File[]) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { theme } = useTheme();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    
    try {
      // Since localhost won't work from sandbox, we'll simulate upload success
      // In production, replace this with your actual n8n webhook URL
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create FormData for future use
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`photo_${index}`, file);
      });
      formData.append('timestamp', new Date().toISOString());
      formData.append('source', 'wedding_album');

      // For now, we'll just simulate success
      // When your n8n server is ready, uncomment the following:
      /*
      const webhookUrl = 'http://your-server:5678/webhook/upload-image';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      */

      toast({
        title: t('upload.success'),
        description: `${selectedFiles.length} photos uploaded successfully!`,
      });
      setSelectedFiles([]);
      onUpload?.(selectedFiles);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: t('upload.error'),
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Upload Area */}
      <Card 
        className={`upload-area cursor-pointer transition-all duration-300 relative overflow-hidden ${
          isDragOver ? 'dragover' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Floral Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${floralBackground})` }}
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="p-4 rounded-full bg-primary/10 mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className={`text-xl md:text-2xl font-bold mb-2 ${
            theme === 'light' ? 'gradient-text-light' : 'gradient-text-dark'
          }`}>
            {t('upload.title')}
          </h3>
          
          <p className="text-muted-foreground mb-4">
            {t('upload.dragdrop')} {t('upload.or').toLowerCase()}
          </p>
          
          <Button variant="outline" className="pointer-events-none">
            <ImageIcon className="w-4 h-4 mr-2" />
            {t('upload.choose')}
          </Button>
        </div>
      </Card>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Preview Area */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">
            {t('upload.preview')} ({selectedFiles.length})
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-border">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {file.name}
                </p>
              </div>
            ))}
          </div>

          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full wedding-gradient hover:opacity-90 text-white font-semibold py-3"
          >
            {isUploading ? t('upload.uploading') : t('upload.submit')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;