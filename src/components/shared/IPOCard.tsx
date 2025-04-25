
import React from 'react';
import { Link } from 'react-router-dom';
import { IPO } from '@/types/ipo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface IPOCardProps {
  ipo: IPO;
}

const IPOCard: React.FC<IPOCardProps> = ({ ipo }) => {
  const renderValue = (value: string | null) => {
    return value || 'Not Issued';
  };

  return (
    <Card className="overflow-hidden shadow-md border-0 h-full">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            {ipo.companyLogo ? (
              <img src={ipo.companyLogo} alt={ipo.companyName} className="h-16 w-auto object-contain" />
            ) : (
              <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                Logo
              </div>
            )}
            <Link to={`/ipo/${ipo.id}`} className="text-bluestock-600 hover:text-bluestock-700 text-lg font-medium">
              {ipo.companyName}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase font-medium text-gray-500">PRICE BAND</p>
              <p className="text-sm font-medium">{renderValue(ipo.priceBand)}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-medium text-gray-500">OPEN</p>
              <p className="text-sm font-medium">{renderValue(ipo.openDate ? new Date(ipo.openDate).toLocaleDateString() : null)}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-medium text-gray-500">CLOSE</p>
              <p className="text-sm font-medium">{renderValue(ipo.closeDate ? new Date(ipo.closeDate).toLocaleDateString() : null)}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-medium text-gray-500">ISSUE SIZE</p>
              <p className="text-sm font-medium">{renderValue(ipo.issueSize)}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-medium text-gray-500">ISSUE TYPE</p>
              <p className="text-sm font-medium">{ipo.issueType}</p>
            </div>
            <div>
              <p className="text-xs uppercase font-medium text-gray-500">LISTING DATE</p>
              <p className="text-sm font-medium">{renderValue(ipo.listingDate ? new Date(ipo.listingDate).toLocaleDateString() : null)}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-2 p-3 border-t">
          <Button
            variant="outline"
            className={`text-bluestock-600 border-bluestock-600 hover:bg-bluestock-600 hover:text-white ${!ipo.rhpUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!ipo.rhpUrl}
            onClick={(e) => {
              e.preventDefault();
              if (ipo.rhpUrl) window.open(ipo.rhpUrl, '_blank');
            }}
          >
            RHP
          </Button>
          <Button
            variant="outline"
            className={`bg-red-100 text-red-600 border-red-200 hover:bg-red-600 hover:text-white ${!ipo.drhpUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!ipo.drhpUrl}
            onClick={(e) => {
              e.preventDefault();
              if (ipo.drhpUrl) window.open(ipo.drhpUrl, '_blank');
            }}
          >
            DRHP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IPOCard;
