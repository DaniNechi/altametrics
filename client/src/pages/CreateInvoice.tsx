import { useNavigate } from 'react-router-dom';
import useInvoiceStore from '../store/invoiceStore';
import InvoiceForm from '../components/InvoiceForm';
import { CreateInvoiceDto } from '../features/api/invoiceApi';

export default function CreateInvoice() {
  const navigate = useNavigate();
  const { createInvoice } = useInvoiceStore();

  const handleSubmit = async (data: CreateInvoiceDto) => {
    try {
      await createInvoice(data);
      navigate('/invoices');
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
        </div>
        <InvoiceForm onSubmit={handleSubmit} submitLabel="Create Invoice" />
      </div>
    </div>
  );
} 