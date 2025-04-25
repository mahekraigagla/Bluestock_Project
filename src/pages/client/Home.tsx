
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import IPOCard from '@/components/shared/IPOCard';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { IPO } from '@/types/ipo';
import { getIpos, searchIpos, filterIposByStatus } from '@/services/ipoService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Home = () => {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [filteredIpos, setFilteredIpos] = useState<IPO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchIpos = async () => {
      setIsLoading(true);
      try {
        const data = await getIpos();
        setIpos(data);
        setFilteredIpos(data);
      } catch (error) {
        console.error('Error fetching IPOs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIpos();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredIpos(ipos);
      return;
    }
    
    try {
      const results = await searchIpos(query);
      setFilteredIpos(results);
    } catch (error) {
      console.error('Error searching IPOs:', error);
    }
  };

  const handleTabChange = async (value: string) => {
    setActiveTab(value);
    
    try {
      if (value === 'all') {
        setFilteredIpos(ipos);
      } else {
        const results = await filterIposByStatus(value);
        setFilteredIpos(results);
      }
    } catch (error) {
      console.error('Error filtering IPOs:', error);
    }
  };

  const faqItems = [
    {
      question: "How to Subscribe to an IPO?",
      answer: (
        <div className="space-y-2">
          <ul className="list-disc pl-5">
            <li>Step 1: Login to your respective service provider.</li>
            <li>Step 2: Click on the IPO button.</li>
            <li>Step 3: Select the IPO you want to bid and enter the relevant details.</li>
            <li>Step 4: Your subscription will be completed once you make the payment or give permission.</li>
          </ul>
        </div>
      )
    },
    {
      question: "Should I buy an IPO first day?",
      answer: "It depends on your investment strategy and risk tolerance. IPOs can be volatile on the first day of trading. Some investors prefer waiting for a few days to see how the market reacts to the new listing."
    },
    {
      question: "How do you know if an IPO is good?",
      answer: "Factors to consider include the company's financial health, growth prospects, management team, industry outlook, valuation, and the planned use of IPO proceeds. Research through the RHP or DRHP documents provides this information."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showSearch onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: 'Bluestock', href: '/' },
              { label: 'IPO' },
              { label: 'UPCOMING IPO' }
            ]}
          />
          
          <div className="mt-4">
            <h1 className="text-3xl font-bold">Upcoming IPO</h1>
            <p className="text-gray-600 mt-2">
              Companies that have filed for an IPO with SEBI. 
              Few details might be disclosed by the companies later on.
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="New Listed">New Listed</TabsTrigger>
              <TabsTrigger value="Ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="Commiting">Commiting</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 h-72 animate-pulse">
                    <div className="bg-gray-200 h-16 w-1/2 mb-4 rounded"></div>
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(6)].map((_, j) => (
                        <div key={j} className="space-y-2">
                          <div className="bg-gray-200 h-3 w-20 rounded"></div>
                          <div className="bg-gray-200 h-6 w-full rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredIpos.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No IPOs found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIpos.map((ipo) => (
                  <IPOCard key={ipo.id} ipo={ipo} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions?</h2>
          <p className="text-gray-600 mb-6">
            Find answers to common questions that come in your mind related to IPO.
          </p>
          
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  );
};

export default Home;
