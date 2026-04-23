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
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      setErrors({});
    } else if (!initialData && isOpen) {
      setFormData(emptyState);
      setErrors({});
    }
  }, [initialData, isOpen]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
    const errorKey = `${parent}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const handleClientAddressChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      client: {
        ...prev.client,
        address: { ...prev.client.address, [field]: value }
      }
    }));
    const errorKey = `client.address.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.senderAddress.street) newErrors['senderAddress.street'] = "can't be empty";
    if (!formData.senderAddress.city) newErrors['senderAddress.city'] = "can't be empty";
    if (!formData.senderAddress.postCode) newErrors['senderAddress.postCode'] = "can't be empty";
    if (!formData.senderAddress.country) newErrors['senderAddress.country'] = "can't be empty";

    if (!formData.client.name) newErrors['client.name'] = "can't be empty";
    if (!formData.client.email) newErrors['client.email'] = "can't be empty";
    if (!formData.client.address.street) newErrors['client.address.street'] = "can't be empty";
    if (!formData.client.address.city) newErrors['client.address.city'] = "can't be empty";
    if (!formData.client.address.postCode) newErrors['client.address.postCode'] = "can't be empty";
    if (!formData.client.address.country) newErrors['client.address.country'] = "can't be empty";

    if (!formData.description) newErrors['description'] = "can't be empty";
    if (!formData.dates.invoiceDate) newErrors['dates.invoiceDate'] = "can't be empty";

    if (formData.items.length === 0) {
      newErrors['items'] = "An item must be added";
    } else {
      formData.items.forEach((item, index) => {
        if (!item.name || !item.quantity || !item.price) {
          newErrors[`item-${index}`] = "All fields must be added";
        } else if (Number(item.quantity) <= 0 || Number(item.price) <= 0) {
          newErrors[`item-${index}-pos`] = "Quantity and price must be positive";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (isDraft = false) => {
    if (!isDraft && !validateForm()) {
      return;
    }

    const finalData = {
      ...formData,
      total: calculateTotal(),
      id: initialData?.id,
      status: isDraft ? 'Draft' : (initialData?.status === 'Draft' ? 'Pending' : (initialData?.status || 'Pending'))
    };
    onSubmit(finalData);
  };

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={onClose} />
      
      <div className={`fixed top-[4.5rem] md:top-[5rem] lg:top-0 left-0 lg:left-[6.44rem] z-40 w-full max-w-[719px] h-[calc(100vh-4.5rem)] md:h-[calc(100vh-5rem)] lg:h-screen bg-[var(--color-bg)] transition-transform duration-500 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } shadow-2xl overflow-hidden lg:rounded-r-[20px]`}>
        
        <div className="h-full flex flex-col pt-[1rem] md:pt-[2rem] lg:pt-[3.5rem]">
          <div className="flex-1 overflow-y-auto px-[1.5rem] md:px-[2.5rem] lg:px-[3.5rem] pb-[2rem]">
            <h2 className="text-[var(--color-text-primary)] text-[1.5rem] font-bold tracking-[-0.5px] uppercase mb-[3rem]">
              {initialData ? (
                <>Edit <span className="text-[#7E88C3]">#</span>{initialData.id}</>
              ) : 'New Invoice'}
            </h2>

            <form className="flex flex-col gap-10">
              <section className="flex flex-col gap-6">
                <p className="text-[#7C5DFA] text-[0.81rem] font-bold">Bill From</p>
                <Input 
                  label="Street Address" 
                  value={formData.senderAddress.street} 
                  onChange={(e) => handleNestedChange('senderAddress', 'street', e.target.value)} 
                  error={errors['senderAddress.street']}
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <Input 
                    label="City" 
                    value={formData.senderAddress.city} 
                    onChange={(e) => handleNestedChange('senderAddress', 'city', e.target.value)} 
                    error={errors['senderAddress.city']}
                  />
                  <Input 
                    label="Post Code" 
                    value={formData.senderAddress.postCode} 
                    onChange={(e) => handleNestedChange('senderAddress', 'postCode', e.target.value)} 
                    error={errors['senderAddress.postCode']}
                  />
                  <div className="col-span-2 md:col-span-1">
                    <Input 
                      label="Country" 
                      value={formData.senderAddress.country} 
                      onChange={(e) => handleNestedChange('senderAddress', 'country', e.target.value)} 
                      error={errors['senderAddress.country']}
                    />
                  </div>
                </div>
              </section>

              <section className="flex flex-col gap-6">
                <p className="text-[#7C5DFA] text-[0.81rem] font-bold">Bill To</p>
                <Input 
                  label="Client's Name" 
                  value={formData.client.name} 
                  onChange={(e) => handleNestedChange('client', 'name', e.target.value)} 
                  error={errors['client.name']}
                />
                <Input 
                  label="Client's Email" 
                  value={formData.client.email} 
                  onChange={(e) => handleNestedChange('client', 'email', e.target.value)} 
                  placeholder="e.g. email@example.com"
                  error={errors['client.email']}
                />
                <Input 
                  label="Street Address" 
                  value={formData.client.address.street} 
                  onChange={(e) => handleClientAddressChange('street', e.target.value)} 
                  error={errors['client.address.street']}
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <Input 
                    label="City" 
                    value={formData.client.address.city} 
                    onChange={(e) => handleClientAddressChange('city', e.target.value)} 
                    error={errors['client.address.city']}
                  />
                  <Input 
                    label="Post Code" 
                    value={formData.client.address.postCode} 
                    onChange={(e) => handleClientAddressChange('postCode', e.target.value)} 
                    error={errors['client.address.postCode']}
                  />
                  <div className="col-span-2 md:col-span-1">
                    <Input 
                      label="Country" 
                      value={formData.client.address.country} 
                      onChange={(e) => handleClientAddressChange('country', e.target.value)} 
                      error={errors['client.address.country']}
                    />
                  </div>
                </div>
              </section>

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
                error={errors['description']}
              />

              <ItemList 
                items={formData.items} 
                onChange={(items) => handleChange('items', items)} 
              />
            </form>
          </div>

          <div className="flex flex-col px-[1.5rem] md:px-[2.5rem] lg:px-[3.5rem] gap-2 mb-4">
              {Object.values(errors).length > 0 && (
                  <div className="text-[#EC5757] text-[0.63rem] font-semibold flex flex-col gap-1">
                      {errors['items'] && <p>- {errors['items']}</p>}
                      {Object.keys(errors).some(k => k.startsWith('item-') && !k.endsWith('-pos')) && <p>- All fields must be added</p>}
                      {Object.keys(errors).some(k => k.endsWith('-pos')) && <p>- Quantity and price must be positive</p>}
                      {Object.keys(errors).some(k => (k.includes('.') || k === 'description') && !k.startsWith('item-')) && <p>- All fields must be added</p>}
                  </div>
              )}
          </div>

          <div className="bg-[var(--color-surface)] p-[2rem] md:px-[3.5rem] flex justify-between items-center shadow-[0_-10px_20px_rgba(72,84,159,0.1)] md:rounded-br-[20px] transition-colors duration-300">
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
                       onClick={() => handleFormSubmit(true)}
                       variant="dark"
                     />
                 )}
                <Button 
                  text={initialData ? "Save Changes" : "Save & Send"} 
                  onClick={() => handleFormSubmit(false)}
                />
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
