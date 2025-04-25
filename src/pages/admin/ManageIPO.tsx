
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { IPO, IPOStatus } from '@/types/ipo';
import { getIpos, deleteIpo } from '@/services/ipoService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import StatusBadge from '@/components/shared/StatusBadge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const ManageIPO = () => {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [filteredIpos, setFilteredIpos] = useState<IPO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ipoToDelete, setIpoToDelete] = useState<IPO | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchIpos = async () => {
      setIsLoading(true);
      try {
        const data = await getIpos();
        setIpos(data);
        setFilteredIpos(data);
      } catch (error) {
        console.error('Error fetching IPOs:', error);
        toast({
          title: "Error",
          description: "Failed to load IPO data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchIpos();
  }, [toast]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredIpos(ipos);
    } else {
      const filtered = ipos.filter(ipo => 
        ipo.companyName.toLowerCase().includes(query)
      );
      setFilteredIpos(filtered);
    }
  };

  const handleDeleteClick = (ipo: IPO) => {
    setIpoToDelete(ipo);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!ipoToDelete) return;
    
    try {
      await deleteIpo(ipoToDelete.id);
      
      // Update the state to remove the deleted IPO
      const updatedIpos = ipos.filter(ipo => ipo.id !== ipoToDelete.id);
      setIpos(updatedIpos);
      setFilteredIpos(updatedIpos);
      
      toast({
        title: "Success",
        description: `${ipoToDelete.companyName} has been deleted`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete IPO",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setIpoToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Upcoming IPO | Dashboard</h1>
          <p className="text-gray-500">Manage your IPO Details</p>
        </div>
        
        <Button asChild>
          <Link to="/admin/create-ipo">Register IPO</Link>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Input
            type="text"
            placeholder="Search by company name..."
            value={searchQuery}
            onChange={handleSearch}
            className="max-w-md"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price Band
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Close
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delete/View
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="px-6 py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredIpos.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-4 text-center">
                    No IPOs found
                  </td>
                </tr>
              ) : (
                filteredIpos.map((ipo) => (
                  <tr key={ipo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ipo.companyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ipo.priceBand || 'Not Issued'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {ipo.openDate ? new Date(ipo.openDate).toLocaleDateString() : 'Not Issued'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {ipo.closeDate ? new Date(ipo.closeDate).toLocaleDateString() : 'Not Issued'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ipo.issueSize || 'Not Issued'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ipo.issueType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {ipo.listingDate ? new Date(ipo.listingDate).toLocaleDateString() : 'Not Issued'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={ipo.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-bluestock-600 hover:bg-bluestock-700"
                        asChild
                      >
                        <Link to={`/admin/edit-ipo/${ipo.id}`}>
                          Update
                        </Link>
                      </Button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800 hover:bg-red-50" onClick={() => handleDeleteClick(ipo)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800 hover:bg-gray-50" asChild>
                          <Link to={`/ipo/${ipo.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>9</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>10</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {ipoToDelete?.companyName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageIPO;
