export interface Address {
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export interface Item {
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface Invoice {
    id: string;
    status: string;
    description: string;
    senderAddress: Address;
    client: {
        name: string;
        email: string;
        address: Address;
    };
    dates: {
        invoiceDate: string;
        paymentDue: string;
    };
    paymentTerms: number;
    items: Item[];
    total: number;
}
