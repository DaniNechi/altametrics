import { create } from 'zustand';
import invoiceApi, { Invoice, CreateInvoiceDto, UpdateInvoiceDto } from '../features/api/invoiceApi';

interface InvoiceState {
  invoices: Invoice[];
  selectedInvoice: Invoice | null;
  isLoading: boolean;
  error: string | null;
  fetchInvoices: () => Promise<void>;
  fetchInvoice: (id: string) => Promise<void>;
  createInvoice: (invoice: CreateInvoiceDto) => Promise<void>;
  updateInvoice: (id: string, invoice: UpdateInvoiceDto) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
}

const useInvoiceStore = create<InvoiceState>((set) => ({
  invoices: [],
  selectedInvoice: null,
  isLoading: false,
  error: null,

  fetchInvoices: async () => {
    try {
      set({ isLoading: true });
      const invoices = await invoiceApi.getAll();
      set({ invoices, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch invoices', isLoading: false });
    }
  },

  fetchInvoice: async (id: string) => {
    try {
      set({ isLoading: true });
      const invoice = await invoiceApi.getById(id);
      set({ selectedInvoice: invoice, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch invoice', isLoading: false });
    }
  },

  createInvoice: async (invoice: CreateInvoiceDto) => {
    try {
      set({ isLoading: true });
      const newInvoice = await invoiceApi.create(invoice);
      set((state) => ({
        invoices: [...state.invoices, newInvoice],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create invoice', isLoading: false });
    }
  },

  updateInvoice: async (id: string, invoice: UpdateInvoiceDto) => {
    try {
      set({ isLoading: true });
      const updatedInvoice = await invoiceApi.update(id, invoice);
      set((state) => ({
        invoices: state.invoices.map((inv) =>
          inv.id === id ? updatedInvoice : inv
        ),
        selectedInvoice: updatedInvoice,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update invoice', isLoading: false });
    }
  },

  deleteInvoice: async (id: string) => {
    try {
      set({ isLoading: true });
      await invoiceApi.delete(id);
      set((state) => ({
        invoices: state.invoices.filter((inv) => inv.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete invoice', isLoading: false });
    }
  },
}));

export default useInvoiceStore; 