
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Breadcrumb from '@/components/shared/Breadcrumb';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IPO } from '@/types/ipo';
import { getIpoById } from '@/services/ipoService';

const IPODetail = () => {
  const { id } = useParams<{ id: string }>();
  const [ipo, setIpo] = useState<IPO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIpo = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await getIpoById(id);
        setIpo(data || null);
      } catch (error) {
        console.error('Error fetching IPO:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIpo();
  }, [id]);

  const renderDetail = (label: string, value: string | number | null) => {
    const displayValue = value !== null && value !== undefined ? value : 'Not Issued';
    return (
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-semibold">{displayValue}</p>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto mt-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!ipo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <h1 className="text-2xl font-bold mb-4">IPO Not Found</h1>
            <p className="mb-6">The IPO you're looking for does not exist or has been removed.</p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: 'Bluestock', href: '/' },
              { label: 'IPO', href: '/' },
              { label: ipo.companyName }
            ]}
          />
        </div>
        
        <Link to="/" className="inline-flex items-center text-bluestock-600 hover:text-bluestock-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to IPOs
        </Link>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              {ipo.companyLogo ? (
                <img 
                  src={ipo.companyLogo} 
                  alt={ipo.companyName} 
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                  Logo
                </div>
              )}
              
              <div>
                <h1 className="text-2xl font-bold">{ipo.companyName}</h1>
                {ipo.status && <StatusBadge status={ipo.status} className="mt-1" />}
              </div>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button
                variant="outline"
                className={`text-bluestock-600 border-bluestock-600 hover:bg-bluestock-600 hover:text-white ${!ipo.rhpUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!ipo.rhpUrl}
                onClick={() => {
                  if (ipo.rhpUrl) window.open(ipo.rhpUrl, '_blank');
                }}
              >
                Download RHP
              </Button>
              <Button
                variant="outline"
                className={`bg-red-100 text-red-600 border-red-200 hover:bg-red-600 hover:text-white ${!ipo.drhpUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!ipo.drhpUrl}
                onClick={() => {
                  if (ipo.drhpUrl) window.open(ipo.drhpUrl, '_blank');
                }}
              >
                Download DRHP
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderDetail("Price Band", ipo.priceBand)}
            {renderDetail("Opening Date", ipo.openDate ? new Date(ipo.openDate).toLocaleDateString() : null)}
            {renderDetail("Closing Date", ipo.closeDate ? new Date(ipo.closeDate).toLocaleDateString() : null)}
            {renderDetail("Issue Size", ipo.issueSize)}
            {renderDetail("Issue Type", ipo.issueType)}
            {renderDetail("Listing Date", ipo.listingDate ? new Date(ipo.listingDate).toLocaleDateString() : null)}
          </div>
          
          {ipo.status === 'New Listed' || ipo.status === 'Ongoing' ? (
            <Card className="mt-8 bg-gray-50">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Listed IPO Performance</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {renderDetail("IPO Price", ipo.ipoPrice ? `₹ ${ipo.ipoPrice}` : null)}
                  {renderDetail("Listing Price", ipo.listingPrice ? `₹ ${ipo.listingPrice}` : null)}
                  {renderDetail("Listing Gain", ipo.listingGain ? `${ipo.listingGain} %` : null)}
                  {renderDetail("Current Market Price (CMP)", ipo.currentMarketPrice ? `₹ ${ipo.currentMarketPrice}` : null)}
                  {renderDetail("Current Return", ipo.currentReturn ? `${ipo.currentReturn} %` : null)}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default IPODetail;
