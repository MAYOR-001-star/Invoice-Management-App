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
    },
    {
        id: "RG0314",
        status: "Paid",
        description: "Website Redesign",
        senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
        client: {
            name: "John Morrison",
            email: "john@morrison.com",
            address: { street: "71 Pilgrim Avenue", city: "Tiverton", postCode: "EX16 7LL", country: "United Kingdom" }
        },
        dates: { invoiceDate: "2021-09-24", paymentDue: "2021-10-01" },
        paymentTerms: 7,
        items: [{ name: "Design Phase", quantity: 1, price: 14002.33, total: 14002.33 }],
        total: 14002.33
    },
    {
        id: "RT2080",
        status: "Pending",
        description: "Logo Design",
        senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
        client: {
            name: "Alysa Werner",
            email: "alysa@werner.com",
            address: { street: "63 Warwick Road", city: "Carlisle", postCode: "CA1 1DJ", country: "United Kingdom" }
        },
        dates: { invoiceDate: "2021-10-11", paymentDue: "2021-10-12" },
        paymentTerms: 1,
        items: [{ name: "Logo Concepts", quantity: 1, price: 102.04, total: 102.04 }],
        total: 102.04
    },
    {
        id: "AA1449",
        status: "Pending",
        description: "App Development",
        senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
        client: {
            name: "Melissa Clarke",
            email: "melissa@clarke.com",
            address: { street: "46 Abbey Row", city: "Burntisland", postCode: "KY3 9AY", country: "United Kingdom" }
        },
        dates: { invoiceDate: "2021-10-07", paymentDue: "2021-10-14" },
        paymentTerms: 7,
        items: [{ name: "iOS App Phase 1", quantity: 1, price: 4032.33, total: 4032.33 }],
        total: 4032.33
    },
    {
        id: "TY9141",
        status: "Pending",
        description: "Marketing Suite",
        senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
        client: {
            name: "Thomas Wayne",
            email: "thomas@wayne.com",
            address: { street: "3964 Queens Lane", city: "Gotham", postCode: "GT1 9BB", country: "United Kingdom" }
        },
        dates: { invoiceDate: "2021-10-01", paymentDue: "2021-10-31" },
        paymentTerms: 30,
        items: [{ name: "SEO Optimization", quantity: 1, price: 6155.91, total: 6155.91 }],
        total: 6155.91
    },
    {
        id: "FV2353",
        status: "Draft",
        description: "Illustration Service",
        senderAddress: { street: "19 Union Terrace", city: "London", postCode: "E1 3EZ", country: "United Kingdom" },
        client: {
            name: "Anita Wainwright",
            email: "anita@wainwright.com",
            address: { street: "15 Lowfield Street", city: "Dartford", postCode: "DA1 1EW", country: "United Kingdom" }
        },
        dates: { invoiceDate: "2021-11-05", paymentDue: "2021-11-12" },
        paymentTerms: 7,
        items: [{ name: "Custom Illustrations", quantity: 1, price: 3102.04, total: 3102.04 }],
        total: 3102.04
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
