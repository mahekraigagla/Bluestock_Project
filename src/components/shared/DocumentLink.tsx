
import React from 'react';
import { Download, FileText } from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';

interface DocumentLinkProps {
  title: string;
  description: string;
  url: string | null;
  type: 'RHP' | 'DRHP';
  className?: string;
}

const DocumentLink: React.FC<DocumentLinkProps> = ({ title, description, url, type, className }) => {
  if (!url) {
    return (
      <Button variant="outline" disabled className={`flex items-center gap-2 opacity-50 ${className}`}>
        <FileText size={16} />
        {type === 'RHP' ? 'RHP Not Available' : 'DRHP Not Available'}
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={className}
          >
            <Button variant="outline" className="flex items-center gap-2">
              <FileText size={16} />
              <span>{title}</span>
              <Download size={14} className="ml-1" />
            </Button>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DocumentLink;
