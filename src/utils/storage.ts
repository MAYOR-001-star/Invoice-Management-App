import type { Invoice } from "../types/invoice";

const STORAGE_KEY = 'invoices_app_data';

const dummyData: Invoice[] = [
    {
        id: "RT3080",
        status: "Paid",
        description: "Re-branding",
        senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
        client: {
            name: "Jensen Huang",
            email: "jensen@nvidia.com",
            address: { street: "106 Kendell Street", city: "Sharrington", postCode: "NR24 2PN", country: "United Kingdom" }
        },
        dates: { invoiceDate: "2021-08-18", paymentDue: "2021-08-19" },
        paymentTerms: 1,
        items: [{ name: "Brand Guidelines", quantity: 1, price: 1800.90, total: 1800.90 }],
        total: 1800.90
    },
    {
        id: "XM9141",
        status: "Pending",
        description: "Graphic Design",
        senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
        client: {
            name: "Alex Grim",
            email: "alexgrim@mail.com",
            address: { street: "84 Church Way", city: "Bradford", postCode: "BD1 9PB", country: "United Kingdom" }
        },
        dates: { invoiceDate: "2021-08-20", paymentDue: "2021-09-20" },
        paymentTerms: 30,
        items: [{ name: "Banner Design", quantity: 1, price: 156, total: 156 }, { name: "Email Design", quantity: 2, price: 200, total: 400 }],
        total: 556
    }
];

export const getInvoices = (): Invoice[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
        return dummyData;
    }
    return JSON.parse(data);
};

export const getInvoiceById = (id: string): Invoice | undefined => {
    const invoices = getInvoices();
    return invoices.find(inv => inv.id === id);
};

export const saveInvoice = (invoice: Invoice) => {
    const invoices = getInvoices();
    const index = invoices.findIndex(inv => inv.id === invoice.id);
    if (index > -1) {
        invoices[index] = invoice;
    } else {
        invoices.unshift(invoice);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
};

export const deleteInvoice = (id: string) => {
    const invoices = getInvoices().filter(inv => inv.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
};

export const updateInvoiceStatus = (id: string, status: string) => {
    const invoices = getInvoices().map(inv => {
        if (inv.id === id) {
            return { ...inv, status };
        }
        return inv;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
};

export const generateId = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const prefix = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
    const suffix = Math.floor(1000 + Math.random() * 9000).toString();
    return prefix + suffix;
};
