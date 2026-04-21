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
      <h3 className="text-[#777F98] text-[1.13rem] font-bold tracking-[-0.38px]">Item List</h3>

      <div className="flex flex-col gap-12 md:gap-4">
        <div className="hidden md:grid grid-cols-[3fr_1fr_1.5fr_1fr_auto] gap-4 text-[var(--color-text-accent)] text-[0.81rem] font-medium px-1">
          <p>Item Name</p>
          <p>Qty.</p>
          <p>Price</p>
          <p>Total</p>
          <div className="w-[1rem]"></div>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_1.5fr_1fr_auto] md:grid-cols-[3fr_1fr_1.5fr_1fr_auto] gap-4 items-end md:items-center">
            <div className="col-span-4 md:col-span-1">
              <Input
                label={index === 0 ? "Item Name" : ""}
                hideLabel={index > 0}
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="md:col-span-1">
              <Input
                label={index === 0 ? "Qty." : ""}
                hideLabel={index > 0}
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
              />
            </div>

            <div className="md:col-span-1">
              <Input
                label={index === 0 ? "Price" : ""}
                hideLabel={index > 0}
                type="number"
                step="0.01"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-[1rem] justify-center h-full pb-[1.06rem] md:pb-0">
              {index === 0 && <p className="text-[var(--color-text-accent)] text-[0.81rem] font-medium md:hidden mb-[1.25rem]">Total</p>}
              <p className="font-bold text-[var(--color-text-accent)] text-[0.94rem] pt-[1.06rem] md:pt-0 truncate">
                {item.total.toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => deleteItem(index)}
              className="p-3 mb-2 md:mb-0 text-[var(--color-text-accent)] hover:text-[#EC5757] transition-colors"
              aria-label="Delete item"
            >
              <svg width="13" height="16" viewBox="0 0 13 16" fill="currentColor">
                <path d="M11.583 3.556v10.667c0 .896-.728 1.623-1.623 1.623H3.04c-.896 0-1.623-.727-1.623-1.623V3.556h10.166zm-2.032-3.556A1.018 1.018 0 0 1 10.567 1h2.433v2.028H0V1h2.433a1.018 1.018 0 0 1 1.016-1h6.102z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <Button
        text="+ Add New Item"
        onClick={addItem}
        className="w-full bg-[var(--color-faded-bg)] text-[var(--color-text-accent)] hover:bg-[#DFE3FA] py-[1.06rem] font-bold transition-colors duration-300"
      />
    </div>
  );
};

export default ItemList;
