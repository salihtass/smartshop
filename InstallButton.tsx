import React from 'react';
import Button from '@/components/ui/Button';

const InstallButton = () => {
  return (
    <Button 
      id="install-button" 
      variant="primary" 
      size="md" 
      className="hidden"
    >
      Install App
    </Button>
  );
};

export default InstallButton;
