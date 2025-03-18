import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useInvoiceStore from '../store/invoiceStore';
import InvoiceForm from '../components/InvoiceForm';
import { UpdateInvoiceDto } from '../features/api/invoiceApi';

export default function EditInvoice() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedInvoice, fetchInvoice, updateInvoice } = useInvoiceStore();

  useEffect(() => {
    if (id) {
      fetchInvoice(id);
    }
  }, [id, fetchInvoice]);

  const handleSubmit = async (data: UpdateInvoiceDto) => {
    try {
      if (id) {
        await updateInvoice(id, data);
        navigate('/invoices');
      }
    } catch (error) {
      console.error('Failed to update invoice:', error);
    }
  };

  if (!selectedInvoice) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Invoice</h1>
        </div>
        <InvoiceForm
          invoice={selectedInvoice}
          onSubmit={handleSubmit}
          submitLabel="Update Invoice"
        />
      </div>
    </div>
  );
} 