import Input from '../ui/Input';
import Button from '../ui/Button';
import type { Item } from '../../types/invoice';

interface ItemListProps {
  items: Item[];
  onChange: (items: Item[]) => void;
}

const ItemList = ({ items, onChange }: ItemListProps) => {
  const addItem = () => {
    onChange([...items, { name: '', quantity: 1, price: 0, total: 0 }]);
  };

  const deleteItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof Item, value: any) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = Number(updatedItem.quantity || 0) * Number(updatedItem.price || 0);
        }
        return updatedItem;
      }
      return item;
    });
    onChange(updatedItems);
  };

  return (
    <div className="flex flex-col gap-6 mt-8">
      <h3 className="text-[#777F98] dark:text-[#7E88C3] text-[1.13rem] font-bold tracking-[-0.38px]">Item List</h3>

      <div className="flex flex-col gap-12 md:gap-4">
        {/* Desktop Headers */}
        <div className="hidden md:grid grid-cols-[3fr_1fr_1.5fr_1fr_auto] gap-4 text-[var(--color-text-accent)] text-[0.81rem] font-medium px-1">
          <p>Item Name</p>
          <p>Qty.</p>
          <p>Price</p>
          <p>Total</p>
          <div className="w-[1rem]"></div>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_1.5fr_1fr_auto] md:grid-cols-[3fr_1fr_1.5fr_1fr_auto] gap-4 items-end md:items-center">
            {/* Item Name - full width on mobile */}
            <div className="col-span-4 md:col-span-1">
              <Input
                label="Item Name"
                hideLabelOnDesktop={true}
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Quantity */}
            <div className="md:col-span-1">
              <Input
                label="Qty."
                hideLabelOnDesktop={true}
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              />
            </div>

            {/* Price */}
            <div className="md:col-span-1">
              <Input
                label="Price"
                hideLabelOnDesktop={true}
                type="number"
                step="0.01"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              />
            </div>

            {/* Total Display */}
            <div className="flex flex-col gap-[0.63rem] h-full justify-end md:justify-center">
              <p className="text-[var(--color-text-accent)] text-[0.81rem] font-medium md:hidden mb-2">Total</p>
              <div className="h-[3rem] md:h-auto flex items-center">
                <p className="font-bold text-[var(--color-text-accent)] text-[0.94rem] truncate">
                  {item.total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Delete Button */}
            <div className="h-full flex items-end md:items-center pb-3 md:pb-0">
                <button
                  type="button"
                  onClick={() => deleteItem(index)}
                  className="text-[var(--color-text-accent)] hover:text-[#EC5757] transition-colors"
                  aria-label="Delete item"
                >
                  <img src="/delete-item-icon.svg" alt="delete" className="w-[0.81rem] h-[1rem] cursor-pointer" />
                </button>
            </div>
          </div>
        ))}
      </div>

      <Button
        text="+ Add New Item"
        onClick={addItem}
        className="w-full bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] hover:bg-[#DFE3FA] dark:hover:bg-[#1E2139] py-[1.06rem] font-bold transition-colors duration-300 cursor-pointer"
      />
    </div>
  );
};

export default ItemList;
