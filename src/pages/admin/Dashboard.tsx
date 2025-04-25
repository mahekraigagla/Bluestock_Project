
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { IPO } from '@/types/ipo';
import { getIpos } from '@/services/ipoService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIpos = async () => {
      setIsLoading(true);
      try {
        const data = await getIpos();
        setIpos(data);
      } catch (error) {
        console.error('Error fetching IPOs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIpos();
  }, []);

  const getStatusCounts = () => {
    const statusMap: Record<string, number> = {
      'Upcoming': 0,
      'New Listed': 0, 
      'Ongoing': 0,
      'Commiting': 0,
      'Closed': 0
    };
    
    ipos.forEach(ipo => {
      if (ipo.status in statusMap) {
        statusMap[ipo.status]++;
      }
    });
    
    return Object.entries(statusMap).map(([status, count]) => ({
      name: status,
      value: count
    }));
  };

  const quickLinks = [
    { name: 'NSE India', url: 'https://www.nseindia.com/' },
    { name: 'BSE India', url: 'https://www.bseindia.com/' },
    { name: 'SEBI', url: 'https://www.sebi.gov.in/' },
    { name: 'Money Control', url: 'https://www.moneycontrol.com/ipo/' }
  ];

  const pieColors = ['#4F46E5', '#EF4444', '#10B981', '#F59E0B', '#6B7280'];

  const statusData = getStatusCounts();
  const totalIPOs = ipos.length;
  const upcomingCount = statusData.find(item => item.name === 'Upcoming')?.value || 0;
  const newListedCount = statusData.find(item => item.name === 'New Listed')?.value || 0;
  const ongoingCount = statusData.find(item => item.name === 'Ongoing')?.value || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>IPO Dashboard India</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center justify-center p-4 bg-blue-100 rounded-full h-24 w-24">
                <div className="text-center">
                  <p className="text-sm text-blue-600">IPOs in Loss</p>
                  <p className="text-2xl font-bold text-blue-800">9</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center p-4 bg-orange-100 rounded-full h-32 w-32">
                <div className="text-center">
                  <p className="text-sm text-orange-600">Total IPOs</p>
                  <p className="text-3xl font-bold text-orange-800">{totalIPOs}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center p-4 bg-cyan-100 rounded-full h-24 w-24">
                <div className="text-center">
                  <p className="text-sm text-cyan-600">IPOs in Gain</p>
                  <p className="text-2xl font-bold text-cyan-800">20</p>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {link.name[0]}
                  </div>
                  <span>{link.name}</span>
                </div>
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    Visit Now
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Main Board IPO</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/manage-ipo">View Report</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { name: 'Upcoming', value: upcomingCount },
                { name: 'New Listed', value: newListedCount },
                { name: 'Ongoing', value: ongoingCount },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Count">
                  {[
                    <Cell key="cell-0" fill="#4F46E5" />,
                    <Cell key="cell-1" fill="#EF4444" />,
                    <Cell key="cell-2" fill="#10B981" />,
                  ]}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                <span className="text-sm">Upcoming: {upcomingCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                <span className="text-sm">New Listed: {newListedCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-600"></div>
                <span className="text-sm">Ongoing: {ongoingCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Afternoon IPO Belt & BSE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-52">
              <div className="absolute inset-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'BSE', value: 70 },
                        { name: 'NSE', value: 30 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#4F46E5" />
                      <Cell fill="#818CF8" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <p className="text-4xl font-bold">15</p>
                  <p className="text-sm text-gray-500">Today</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">IPO BELT at BSE</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
