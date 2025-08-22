import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
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
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    
    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        
        const { data, error } = await supabase.storage
          .from('wedding-photos')
          .upload(fileName, file);

        if (error) {
          throw new Error(`Failed to upload ${file.name}: ${error.message}`);
        }

        return data;
      });

      const results = await Promise.all(uploadPromises);
      console.log('Upload successful:', results);
      
      toast({
        title: t('upload.success'),
        description: `${selectedFiles.length} photos uploaded successfully to Supabase Storage!`,
      });
      
      // Reset all states after successful upload
      setSelectedFiles([]);
      setIsDragOver(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      onUpload?.(selectedFiles);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: t('upload.error'),
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 px-2 sm:px-0">
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
        
        <div className="relative z-10 flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6 text-center">
          <div className="p-3 sm:p-4 rounded-full bg-primary/10 mb-3 sm:mb-4">
            <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
          
          {/* Title moved to page header to avoid duplication */}
          
          <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            {t('upload.dragdrop')} {t('upload.or').toLowerCase()}
          </p>
          
          <Button variant="outline" className="pointer-events-none gradient-button-light dark:gradient-button-dark border-0 text-black dark:text-black">
            <ImageIcon className="w-4 h-4 mr-2" />
            {t('upload.choose')}
          </Button>
        </div>
      </Card>

      {/* Hidden file input */}
      <input
        key={selectedFiles.length} // Force re-render when files change
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
          <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 dark:from-amber-400 dark:via-yellow-500 dark:to-orange-400 bg-clip-text text-transparent">
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
                  className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
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