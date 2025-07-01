import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Using axios directly
import { Plus, Trash2, Edit } from 'lucide-react';
import AddMenuModal from './AddMenuModal';

// Define your backend's base URL
const API_URL = 'http://localhost:5000/api';

const MenuSetup = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
        const [menuRes, catRes] = await Promise.all([
            axios.get(`${API_URL}/menu`),
            axios.get(`${API_URL}/categories`)
        ]);
        setMenuItems(menuRes.data.data.data || []);
        setCategories(catRes.data.data.data || []);
    } catch (err) {
        console.error("Failed to fetch data", err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = async (newItem) => {
    try {
        const payload = {
            name: newItem.name,
            description: newItem.description || `${newItem.name} description.`,
            price: newItem.price,
            category_id: newItem.category_id,
            restaurant_id: 1, 
            item_type: 'regular',
            status: 'available',
        };
        await axios.post(`${API_URL}/menu`, payload);
        fetchData(); 
    } catch (err) {
        console.error("Failed to add menu item", err);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
        await axios.delete(`${API_URL}/menu/${id}`);
        fetchData();
    } catch (err) {
        console.error("Failed to delete menu item", err);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Menu Setup</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            <Plus size={16} />
            Add New Item
          </button>
        </div>
        
        {loading ? <p>Loading menu...</p> : (
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Item Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Price</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                    {menuItems.map((item) => {
                        // Find the category name from the categories array
                        const categoryName = categories.find(c => c.id === item.category_id)?.name || 'N/A';
                        return (
                            <tr key={item.id}>
                                <td className="whitespace-nowrap px-6 py-4"><div className="text-sm font-medium text-slate-900">{item.name}</div></td>
                                <td className="whitespace-nowrap px-6 py-4"><div className="text-sm text-slate-600">{categoryName}</div></td>
                                <td className="whitespace-nowrap px-6 py-4"><div className="text-sm text-slate-600">${item.price}</div></td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-4">
                                        <button className="text-slate-500 hover:text-blue-600"><Edit size={16} /></button>
                                        <button onClick={() => handleDeleteItem(item.id)} className="text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        )}
      </div>

      <AddMenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
        categories={categories}
      />
    </>
  );
};

export default MenuSetup;