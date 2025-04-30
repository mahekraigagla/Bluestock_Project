
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IPO, IPOStatus } from '@/types/ipo';
import { getIpoById, addIpo, updateIpo } from '@/services/ipoService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const IPOForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<IPO>>({
    companyName: '',
    companyLogo: '',
    priceBand: '',
    openDate: '',
    closeDate: '',
    issueSize: '',
    issueType: 'Book Built',
    listingDate: '',
    status: 'Upcoming',
    ipoPrice: null,
    listingPrice: null,
    listingGain: null,
    currentMarketPrice: null,
    currentReturn: null,
    rhpUrl: '',
    drhpUrl: '',
    subscriptionStatus: {
      qib: null,
      hni: null,
      retail: null,
      total: null
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchIpo = async () => {
      if (!isEditing) return;
      
      setIsFetching(true);
      try {
        const data = await getIpoById(id);
        if (data) {
          // Format dates for input fields
          setFormData({
            ...data,
            openDate: data.openDate ? new Date(data.openDate).toISOString().split('T')[0] : '',
            closeDate: data.closeDate ? new Date(data.closeDate).toISOString().split('T')[0] : '',
            listingDate: data.listingDate ? new Date(data.listingDate).toISOString().split('T')[0] : '',
            subscriptionStatus: data.subscriptionStatus || {
              qib: null,
              hni: null,
              retail: null,
              total: null
            }
          });
        }
      } catch (error) {
        console.error('Error fetching IPO:', error);
        toast({
          title: "Error",
          description: "Failed to load IPO data",
          variant: "destructive",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchIpo();
  }, [id, isEditing, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value ? parseFloat(value) : null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubscriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const subscriptionField = name.split('.')[1]; // Extract the field name after 'subscriptionStatus.'
    
    setFormData(prev => ({
      ...prev,
      subscriptionStatus: {
        ...prev.subscriptionStatus,
        [subscriptionField]: value ? parseFloat(value) : null
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isEditing && id) {
        await updateIpo(id, formData);
        toast({
          title: "Success",
          description: "IPO updated successfully",
        });
      } else {
        await addIpo(formData as Omit<IPO, 'id'>);
        toast({
          title: "Success",
          description: "New IPO created successfully",
        });
      }
      
      navigate('/admin/manage-ipo');
    } catch (error) {
      console.error('Error saving IPO:', error);
      toast({
        title: "Error",
        description: isEditing ? "Failed to update IPO" : "Failed to create IPO",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="p-8 text-center">
        <p>Loading IPO data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit IPO Information' : 'Create New IPO'}</h1>
        <p className="text-gray-500">{isEditing ? 'Update IPO Details' : 'Enter IPO Details'}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyLogo">Company Logo</Label>
              <div className="flex items-end gap-4">
                {formData.companyLogo && (
                  <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                    <img 
                      src={formData.companyLogo} 
                      alt="Company logo preview" 
                      className="h-full w-full object-contain" 
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input 
                    id="companyLogo" 
                    name="companyLogo" 
                    placeholder="Enter logo URL"
                    value={formData.companyLogo || ''} 
                    onChange={handleChange}
                  />
                </div>
                {formData.companyLogo && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-shrink-0"
                    onClick={() => setFormData(prev => ({ ...prev, companyLogo: '' }))}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName"
                name="companyName"
                placeholder="Vodafone Idea"
                value={formData.companyName} 
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priceBand">Price Band</Label>
              <Input 
                id="priceBand" 
                name="priceBand" 
                placeholder="Not Issued"
                value={formData.priceBand || ''} 
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="openDate">Open</Label>
              <Input 
                id="openDate" 
                name="openDate" 
                type="date"
                value={formData.openDate || ''} 
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="closeDate">Close</Label>
              <Input 
                id="closeDate" 
                name="closeDate" 
                type="date"
                value={formData.closeDate || ''} 
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issueSize">Issue Size</Label>
              <Input 
                id="issueSize" 
                name="issueSize" 
                placeholder="2300 Cr."
                value={formData.issueSize || ''} 
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issueType">Issue Type</Label>
              <Select 
                value={formData.issueType} 
                onValueChange={(value) => handleSelectChange('issueType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Book Built">Book Built</SelectItem>
                  <SelectItem value="Fixed Price">Fixed Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="listingDate">Listing Date</Label>
              <Input 
                id="listingDate" 
                name="listingDate" 
                type="date"
                value={formData.listingDate || ''} 
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value as IPOStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="New Listed">New Listed</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Commiting">Commiting</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border-t pt-6 mt-8">
            <h3 className="text-lg font-medium mb-4">SUBSCRIPTION STATUS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="subscriptionStatus.qib">QIB Subscription</Label>
                <Input 
                  id="subscriptionStatus.qib" 
                  name="subscriptionStatus.qib" 
                  type="number"
                  step="0.01"
                  placeholder="0.00x"
                  value={formData.subscriptionStatus?.qib === null ? '' : formData.subscriptionStatus?.qib} 
                  onChange={handleSubscriptionChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subscriptionStatus.hni">HNI Subscription</Label>
                <Input 
                  id="subscriptionStatus.hni" 
                  name="subscriptionStatus.hni" 
                  type="number"
                  step="0.01"
                  placeholder="0.00x"
                  value={formData.subscriptionStatus?.hni === null ? '' : formData.subscriptionStatus?.hni} 
                  onChange={handleSubscriptionChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subscriptionStatus.retail">Retail Subscription</Label>
                <Input 
                  id="subscriptionStatus.retail" 
                  name="subscriptionStatus.retail" 
                  type="number"
                  step="0.01"
                  placeholder="0.00x"
                  value={formData.subscriptionStatus?.retail === null ? '' : formData.subscriptionStatus?.retail} 
                  onChange={handleSubscriptionChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subscriptionStatus.total">Total Subscription</Label>
                <Input 
                  id="subscriptionStatus.total" 
                  name="subscriptionStatus.total" 
                  type="number"
                  step="0.01"
                  placeholder="0.00x"
                  value={formData.subscriptionStatus?.total === null ? '' : formData.subscriptionStatus?.total} 
                  onChange={handleSubscriptionChange}
                />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 mt-8">
            <h3 className="text-lg font-medium mb-4">NEW LISTED IPO DETAILS (WHEN IPO GET LISTED)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ipoPrice">IPO Price</Label>
                <Input 
                  id="ipoPrice" 
                  name="ipoPrice" 
                  type="number"
                  placeholder="383"
                  value={formData.ipoPrice === null ? '' : formData.ipoPrice} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="listingPrice">Listing Price</Label>
                <Input 
                  id="listingPrice" 
                  name="listingPrice" 
                  type="number"
                  placeholder="435"
                  value={formData.listingPrice === null ? '' : formData.listingPrice} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="listingGain">Listing Gain</Label>
                <Input 
                  id="listingGain" 
                  name="listingGain" 
                  type="number"
                  placeholder="13.58 %"
                  value={formData.listingGain === null ? '' : formData.listingGain} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentMarketPrice">CMP</Label>
                <Input 
                  id="currentMarketPrice" 
                  name="currentMarketPrice" 
                  type="number"
                  placeholder="410"
                  value={formData.currentMarketPrice === null ? '' : formData.currentMarketPrice} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentReturn">Current Return</Label>
                <Input 
                  id="currentReturn" 
                  name="currentReturn" 
                  type="number"
                  placeholder="7.05 %"
                  value={formData.currentReturn === null ? '' : formData.currentReturn} 
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 mt-8">
            <h3 className="text-lg font-medium mb-4">Upload Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="rhpUrl">RHP</Label>
                <Input 
                  id="rhpUrl" 
                  name="rhpUrl" 
                  placeholder="Enter RHP PDF Link"
                  value={formData.rhpUrl || ''} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="drhpUrl">DRHP</Label>
                <Input 
                  id="drhpUrl" 
                  name="drhpUrl" 
                  placeholder="Enter DRHP PDF Link"
                  value={formData.drhpUrl || ''} 
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/admin/manage-ipo')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update' : 'Register')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IPOForm;
