
import React from 'react';
import { FileText } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const DocumentInfo = () => {
  return (
    <>
      <Navbar />
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">IPO Documents Guide</h1>
          
          <p className="text-gray-600 mb-8">
            When investing in Initial Public Offerings (IPOs), it's essential to review key documents that 
            provide detailed information about the company, its business model, financials, risks, and the 
            offering parameters.
          </p>
          
          <div className="grid gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-bluestock-600" />
                </div>
                <h2 className="text-2xl font-bold">Draft Red Herring Prospectus (DRHP)</h2>
              </div>
              
              <Separator className="mb-6" />
              
              <p className="text-gray-700 mb-4">
                The Draft Red Herring Prospectus (DRHP) is the preliminary registration document that 
                a company files with SEBI (Securities and Exchange Board of India) before launching an IPO.
              </p>
              
              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What does the DRHP contain?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Company history and background</li>
                      <li>Business description and model</li>
                      <li>Industry overview</li>
                      <li>Financial statements for the past few years</li>
                      <li>Management discussion and analysis</li>
                      <li>Risk factors</li>
                      <li>Objects of the issue (how the company plans to use IPO proceeds)</li>
                      <li>Management team and their background</li>
                      <li>Outstanding litigations and material developments</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Why is the DRHP important?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      The DRHP gives investors their first detailed look at the company's operations, financials, 
                      and risks. It's called a "draft" because SEBI and the public can provide feedback, and 
                      the company may need to make revisions before the final prospectus. Investors can use 
                      this document to make an initial assessment of the company's prospects and potential 
                      investment value.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>What are the limitations of the DRHP?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      The DRHP does not contain the price band of the IPO or the issue size. These details 
                      are finalized later. It's a preliminary document subject to changes based on SEBI's 
                      observations and market conditions.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Red Herring Prospectus (RHP)</h2>
              </div>
              
              <Separator className="mb-6" />
              
              <p className="text-gray-700 mb-4">
                The Red Herring Prospectus (RHP) is filed with SEBI and the Registrar of Companies (ROC) 
                after incorporating SEBI's observations on the DRHP. It's released when the company 
                is ready to launch its IPO.
              </p>
              
              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="item-4">
                  <AccordionTrigger>What additional information does the RHP provide?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Price band for the IPO (floor and cap prices)</li>
                      <li>Issue size (number of shares being offered)</li>
                      <li>Bid/issue opening and closing dates</li>
                      <li>Updates to financial information (more recent financials)</li>
                      <li>Changes based on SEBI's feedback on the DRHP</li>
                      <li>Final details about the offering structure</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Why is the RHP important for investors?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      The RHP contains the most up-to-date and comprehensive information about the company 
                      and the IPO before bidding opens. It includes the price band, allowing investors to 
                      make informed decisions about whether to subscribe and at what price. It's a crucial 
                      document for IPO investment decision-making.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>How is the RHP different from the final Prospectus?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      The RHP doesn't contain the final issue price. After the bidding process is complete, 
                      the company files a Prospectus that includes the final issue price, the number of 
                      shares allotted, and the final issue size. The Prospectus is filed after the IPO 
                      price is determined but before the shares are listed.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">How to Analyze IPO Documents</h2>
              
              <Separator className="mb-6" />
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  When reviewing an IPO's DRHP or RHP, focus on these key areas:
                </p>
                
                <ul className="list-decimal pl-5 space-y-3">
                  <li>
                    <strong>Business Model:</strong> Understand how the company makes money and its growth strategy.
                  </li>
                  <li>
                    <strong>Financials:</strong> Analyze revenue growth, profit margins, debt levels, and cash flow.
                  </li>
                  <li>
                    <strong>Use of Proceeds:</strong> Check how the company plans to use the money raised from the IPO.
                  </li>
                  <li>
                    <strong>Risk Factors:</strong> Pay close attention to the risks section, which outlines potential threats to the business.
                  </li>
                  <li>
                    <strong>Promoters and Management:</strong> Research the background and experience of key personnel.
                  </li>
                  <li>
                    <strong>Valuation:</strong> Compare the proposed valuation with industry peers and assess if it's reasonable.
                  </li>
                  <li>
                    <strong>Corporate Governance:</strong> Evaluate the board structure and related party transactions.
                  </li>
                </ul>
                
                <p className="text-gray-700 mt-4">
                  Remember that both documents are legally binding, and the company can be held liable for 
                  any misrepresentations or material omissions. Always conduct thorough research before 
                  investing in any IPO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentInfo;
