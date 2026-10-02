import React, { useState } from 'react';
import ProfileSidebar from '../components/ProfileSidebar.jsx';
import AddressCard from '../components/AddressCard.jsx';
import AddressForm from '../components/AddressForm.jsx';
import Modal from '../components/Modal.jsx';
import { useUser } from '../context/UserContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { Plus } from 'lucide-react';

export default function Addresses() {
  const { addresses, addAddress, updateAddress, deleteAddress } = useUser();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (editingAddress) {
      updateAddress(editingAddress.id, formData);
      addToast('Address updated');
    } else {
      addAddress(formData);
      addToast('Address added');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteAddress(id);
    addToast('Address removed', 'info');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Saved Addresses
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Left: Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
          <ProfileSidebar />
        </div>

        {/* Right: Address Cards */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {addresses.length} {addresses.length === 1 ? 'address' : 'addresses'}
            </span>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                address={addr}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAddress ? 'Edit Address' : 'Add New Address'}
      >
        <AddressForm
          initialData={editingAddress}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
