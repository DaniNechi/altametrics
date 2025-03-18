import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Invoice {
  id: string;
  customer_name: string;
  description: string;
  amount: number;
  due_date: string;
  status: string;
  notes?: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateInvoiceDto = Omit<Invoice, 'id' | 'user_id' | 'createdAt' | 'updatedAt'>;
export type UpdateInvoiceDto = Partial<CreateInvoiceDto>;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

const invoiceApi = {
  getAll: async (): Promise<Invoice[]> => {
    const response = await axios.get(`${API_URL}/invoices`, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  getById: async (id: string): Promise<Invoice> => {
    const response = await axios.get(`${API_URL}/invoices/${id}`, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  create: async (invoice: CreateInvoiceDto): Promise<Invoice> => {
    const response = await axios.post(`${API_URL}/invoices`, invoice, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  update: async (id: string, invoice: UpdateInvoiceDto): Promise<Invoice> => {
    const response = await axios.patch(`${API_URL}/invoices/${id}`, invoice, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/invoices/${id}`, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      },
    });
  },
};

export default invoiceApi; 