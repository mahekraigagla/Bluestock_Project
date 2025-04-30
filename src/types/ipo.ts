
export type IPOStatus = 'Upcoming' | 'New Listed' | 'Ongoing' | 'Commiting' | 'Closed';

export interface IPO {
  id: string;
  companyLogo?: string;
  companyName: string;
  priceBand: string | null;
  openDate: string | null;
  closeDate: string | null;
  issueSize: string | null;
  issueType: 'Book Built' | 'Fixed Price';
  listingDate: string | null;
  status: IPOStatus;
  ipoPrice: number | null;
  listingPrice: number | null;
  listingGain: number | null;
  currentMarketPrice: number | null;
  currentReturn: number | null;
  rhpUrl: string | null;
  drhpUrl: string | null;
  subscriptionStatus?: {
    qib?: number | null;
    hni?: number | null;
    retail?: number | null;
    total?: number | null;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
}

export interface IPODocument {
  name: string;
  description: string;
  url: string;
  type: 'RHP' | 'DRHP';
}
