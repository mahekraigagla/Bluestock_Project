
import { IPO } from '@/types/ipo';

// Demo data based on the screenshots
const demoIpos: IPO[] = [
  {
    id: '1',
    companyLogo: '/lovable-uploads/8fd77441-07df-480b-a99d-0cfe8b93a299.png', // Nova logo
    companyName: 'Nova Agritech Ltd.',
    priceBand: '₹ 39 - 41',
    openDate: '2024-01-22',
    closeDate: '2024-01-24',
    issueSize: '143.81 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-01-30',
    status: 'Upcoming',
    ipoPrice: null,
    listingPrice: null,
    listingGain: null,
    currentMarketPrice: null,
    currentReturn: null,
    rhpUrl: 'https://example.com/rhp.pdf',
    drhpUrl: 'https://example.com/drhp.pdf'
  },
  {
    id: '2',
    companyLogo: '/lovable-uploads/3ee4e057-21e2-4b0c-b7f5-c48a2a1ccd34.png', // EPACK logo
    companyName: 'EPACK Durable Ltd.',
    priceBand: '₹ 218 - 230',
    openDate: '2024-01-19',
    closeDate: '2024-01-23',
    issueSize: '640.05 Cr.',
    issueType: 'Book Built',
    listingDate: '2024-01-29',
    status: 'Upcoming',
    ipoPrice: null,
    listingPrice: null,
    listingGain: null,
    currentMarketPrice: null,
    currentReturn: null,
    rhpUrl: 'https://example.com/rhp.pdf',
    drhpUrl: 'https://example.com/drhp.pdf'
  },
  {
    id: '3',
    companyLogo: '/lovable-uploads/c023e856-63f0-4462-bbe7-252425ab32c4.png', // RK Swamy logo
    companyName: 'RK Swamy Ltd.',
    priceBand: 'Not Issued',
    openDate: null,
    closeDate: null,
    issueSize: 'Not Issued',
    issueType: 'Book Built',
    listingDate: null,
    status: 'Upcoming',
    ipoPrice: null,
    listingPrice: null,
    listingGain: null,
    currentMarketPrice: null,
    currentReturn: null,
    rhpUrl: null,
    drhpUrl: 'https://example.com/drhp.pdf'
  },
  {
    id: '4',
    companyLogo: '/lovable-uploads/99ef5852-452f-47fd-b5a0-fea23c2d3b95.png', // OYO logo
    companyName: 'Oravel Stays Ltd.',
    priceBand: 'Not Issued',
    openDate: null,
    closeDate: null,
    issueSize: '8430 Cr.',
    issueType: 'Book Built',
    listingDate: null,
    status: 'Upcoming',
    ipoPrice: null,
    listingPrice: null,
    listingGain: null,
    currentMarketPrice: null,
    currentReturn: null,
    rhpUrl: null,
    drhpUrl: 'https://example.com/drhp.pdf'
  },
  {
    id: '5',
    companyLogo: '/lovable-uploads/68d1e5dd-f293-4982-b2f3-4bb98741651b.png', // BOAT logo
    companyName: 'Imagine Marketing Ltd.',
    priceBand: 'Not Issued',
    openDate: null,
    closeDate: null,
    issueSize: '2000 Cr.',
    issueType: 'Book Built',
    listingDate: null,
    status: 'Upcoming',
    ipoPrice: null,
    listingPrice: null,
    listingGain: null,
    currentMarketPrice: null,
    currentReturn: null,
    rhpUrl: null,
    drhpUrl: 'https://example.com/drhp.pdf'
  },
  {
    id: '6',
    companyName: 'Adani Power',
    priceBand: '₹ 329 - 136',
    openDate: '2023-06-03',
    closeDate: '2024-06-05',
    issueSize: '45530.15 Cr.',
    issueType: 'Book Built',
    listingDate: '2023-06-10',
    status: 'Ongoing',
    ipoPrice: 329,
    listingPrice: 362,
    listingGain: 10.03,
    currentMarketPrice: 380,
    currentReturn: 15.5,
    rhpUrl: 'https://example.com/rhp.pdf',
    drhpUrl: 'https://example.com/drhp.pdf'
  },
  {
    id: '7',
    companyName: 'Tata Motors',
    priceBand: '₹ 129.49 - 136',
    openDate: '2024-06-03',
    closeDate: '2024-06-05',
    issueSize: '1340.15 Cr.',
    issueType: 'Book Built',
    listingDate: '2016-06-10',
    status: 'New Listed',
    ipoPrice: 130,
    listingPrice: 152,
    listingGain: 17,
    currentMarketPrice: 165,
    currentReturn: 26.9,
    rhpUrl: 'https://example.com/rhp.pdf',
    drhpUrl: 'https://example.com/drhp.pdf'
  },
];

export const getIpos = async (): Promise<IPO[]> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(demoIpos);
    }, 500);
  });
};

export const getIpoById = async (id: string): Promise<IPO | undefined> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      const ipo = demoIpos.find(ipo => ipo.id === id);
      resolve(ipo);
    }, 500);
  });
};

let ipos = [...demoIpos];

export const addIpo = async (ipo: Omit<IPO, 'id'>): Promise<IPO> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      const newIpo = {
        id: Math.random().toString(36).substr(2, 9),
        ...ipo,
      };
      ipos.push(newIpo);
      resolve(newIpo);
    }, 500);
  });
};

export const updateIpo = async (id: string, ipo: Partial<IPO>): Promise<IPO> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = ipos.findIndex(i => i.id === id);
      if (index === -1) {
        reject(new Error('IPO not found'));
        return;
      }
      
      const updatedIpo = { ...ipos[index], ...ipo };
      ipos[index] = updatedIpo;
      resolve(updatedIpo);
    }, 500);
  });
};

export const deleteIpo = async (id: string): Promise<void> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = ipos.findIndex(i => i.id === id);
      if (index === -1) {
        reject(new Error('IPO not found'));
        return;
      }
      
      ipos.splice(index, 1);
      resolve();
    }, 500);
  });
};

export const searchIpos = async (query: string): Promise<IPO[]> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredIpos = ipos.filter(ipo => 
        ipo.companyName.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filteredIpos);
    }, 500);
  });
};

export const filterIposByStatus = async (status: string): Promise<IPO[]> => {
  // In a real app, this would call an API endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      if (status === 'All') {
        resolve(ipos);
        return;
      }
      
      const filteredIpos = ipos.filter(ipo => 
        ipo.status === status
      );
      resolve(filteredIpos);
    }, 500);
  });
};
