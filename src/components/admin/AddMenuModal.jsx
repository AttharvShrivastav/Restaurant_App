import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddMenuModal = ({ isOpen, onClose, onAddItem, categories }) => {
  // State to hold form data, notice category_id
  const [formData, setFormData] = useState({
      name: '',
      price: '',
      category_id: '',
      description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category_id || !formData.price) {
      alert("Please fill out name, category, and price.");
      return;
    }
    // Pass the entire form data object up
    onAddItem({
        ...formData,
        price: parseFloat(formData.price)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-slate-500 hover:bg-slate-100">
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Add a New Menu Item</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Item Name</label>
              <input name="name" type="text" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
            {/* Category Dropdown */}
            <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-slate-700">Category</label>
                <select name="category_id" value={formData.category_id} onChange={handleChange} className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2">
                    <option value="" disabled>Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Price Input */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price ($)</label>
              <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2" />
            </div>
             {/* Description Textarea */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"></textarea>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={onClose} className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-200">Cancel</button>
                <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">Save Item</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;