import { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import DatePicker from '../ui/DatePicker';
import ItemList from './ItemList';
import type { Item, Invoice } from '../../types/invoice';
import Button from '../ui/Button';
import Backdrop from '../ui/Backdrop';

interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const InvoiceForm = ({ isOpen, onClose, onSubmit, initialData }: InvoiceFormProps) => {
  const emptyState: Omit<Invoice, 'id' | 'status'> = {
    senderAddress: { street: '', city: '', postCode: '', country: '' },
    client: {
      name: '',
      email: '',
      address: { street: '', city: '', postCode: '', country: '' },
    },
    dates: {
      invoiceDate: new Date().toISOString().split('T')[0],
      paymentDue: '',
    },
    paymentTerms: 30,
    description: '',
    items: [] as Item[],
    total: 0
  };

  const [formData, setFormData] = useState(emptyState);

  // Load initial data for editing
  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        senderAddress: initialData.senderAddress,
        client: initialData.client,
        dates: initialData.dates,
        paymentTerms: initialData.paymentTerms || 30,
        description: initialData.description,
        items: initialData.items.map((item: any) => ({ ...item })),
        total: initialData.total
      });
    } else if (!initialData && isOpen) {
      setFormData(emptyState);
    }
  }, [initialData, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleClientAddressChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      client: {
        ...prev.client,
        address: { ...prev.client.address, [field]: value }
      }
    }));
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleFormSubmit = () => {
    const finalData = {
      ...formData,
      total: calculateTotal(),
      id: initialData?.id,
      status: initialData?.status || 'Pending'
    };
    onSubmit(finalData);
  };

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />
      
      <div className={`fixed top-[4.5rem] md:top-[5rem] lg:top-0 left-0 lg:left-[6.44rem] z-40 w-full max-w-[719px] h-[calc(100vh-4.5rem)] md:h-[calc(100vh-5rem)] lg:h-screen bg-white transition-transform duration-500 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } shadow-2xl overflow-hidden lg:rounded-r-[20px]`}>
        
        <div className="h-full flex flex-col pt-[1rem] md:pt-[2rem] lg:pt-[3.5rem]">
          <div className="flex-1 overflow-y-auto px-[1.5rem] md:px-[2.5rem] lg:px-[3.5rem] pb-[2rem]">
            <h2 className="text-[#0C0E16] text-[1.5rem] font-bold tracking-[-0.5px] uppercase mb-[3rem]">
              {initialData ? (
                <>Edit <span className="text-[#7E88C3]">#</span>{initialData.id}</>
              ) : 'New Invoice'}
            </h2>

            <form className="flex flex-col gap-10">
              {/* Bill From */}
              <section className="flex flex-col gap-6">
                <p className="text-[#7C5DFA] text-[0.81rem] font-bold">Bill From</p>
                <Input 
                  label="Street Address" 
                  value={formData.senderAddress.street} 
                  onChange={(e) => handleNestedChange('senderAddress', 'street', e.target.value)} 
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <Input 
                    label="City" 
                    value={formData.senderAddress.city} 
                    onChange={(e) => handleNestedChange('senderAddress', 'city', e.target.value)} 
                  />
                  <Input 
                    label="Post Code" 
                    value={formData.senderAddress.postCode} 
                    onChange={(e) => handleNestedChange('senderAddress', 'postCode', e.target.value)} 
                  />
                  <div className="col-span-2 md:col-span-1">
                    <Input 
                      label="Country" 
                      value={formData.senderAddress.country} 
                      onChange={(e) => handleNestedChange('senderAddress', 'country', e.target.value)} 
                    />
                  </div>
                </div>
              </section>

              {/* Bill To */}
              <section className="flex flex-col gap-6">
                <p className="text-[#7C5DFA] text-[0.81rem] font-bold">Bill To</p>
                <Input 
                  label="Client's Name" 
                  value={formData.client.name} 
                  onChange={(e) => handleNestedChange('client', 'name', e.target.value)} 
                />
                <Input 
                  label="Client's Email" 
                  value={formData.client.email} 
                  onChange={(e) => handleNestedChange('client', 'email', e.target.value)} 
                  placeholder="e.g. email@example.com"
                />
                <Input 
                  label="Street Address" 
                  value={formData.client.address.street} 
                  onChange={(e) => handleClientAddressChange('street', e.target.value)} 
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <Input 
                    label="City" 
                    value={formData.client.address.city} 
                    onChange={(e) => handleClientAddressChange('city', e.target.value)} 
                  />
                  <Input 
                    label="Post Code" 
                    value={formData.client.address.postCode} 
                    onChange={(e) => handleClientAddressChange('postCode', e.target.value)} 
                  />
                  <div className="col-span-2 md:col-span-1">
                    <Input 
                      label="Country" 
                      value={formData.client.address.country} 
                      onChange={(e) => handleClientAddressChange('country', e.target.value)} 
                    />
                  </div>
                </div>
              </section>

              {/* Invoice Meta */}
              <div className="grid md:grid-cols-2 gap-6">
                <DatePicker 
                  label="Invoice Date" 
                  value={formData.dates.invoiceDate} 
                  onChange={(e) => handleNestedChange('dates', 'invoiceDate', e.target.value)}
                />
                <Select 
                  label="Payment Terms" 
                  value={formData.paymentTerms}
                  options={[
                    { label: 'Net 1 Day', value: 1 },
                    { label: 'Net 7 Days', value: 7 },
                    { label: 'Net 14 Days', value: 14 },
                    { label: 'Net 30 Days', value: 30 }
                  ]}
                  onChange={(val) => handleChange('paymentTerms', Number(val))}
                />
              </div>

              <Input 
                label="Project Description" 
                value={formData.description} 
                onChange={(e) => handleChange('description', e.target.value)} 
                placeholder="e.g. Graphic Design Service"
              />

              <ItemList 
                items={formData.items} 
                onChange={(items) => handleChange('items', items)} 
              />
            </form>
          </div>

          {/* Sticky Footer */}
          <div className="bg-white p-[2rem] md:px-[3.5rem] flex justify-between items-center shadow-[0_-10px_20px_rgba(72,84,159,0.1)] md:rounded-br-[20px]">
             <div>
                {!initialData ? (
                    <Button 
                      text="Discard" 
                      variant="edit" 
                      onClick={onClose}
                    />
                ) : (
                    <Button 
                      text="Cancel" 
                      variant="edit" 
                      onClick={onClose}
                    />
                )}
             </div>
             
             <div className="flex gap-2">
                {!initialData && (
                    <Button 
                      text="Save as Draft" 
                      onClick={() => {
                        handleFormSubmit(); // Logic for Draft can be added later
                      }}
                      className="bg-[#373B53] text-[#888EB0] hover:bg-[#1E2139]"
                    />
                )}
                <Button 
                  text={initialData ? "Save Changes" : "Save & Send"} 
                  onClick={handleFormSubmit}
                />
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
