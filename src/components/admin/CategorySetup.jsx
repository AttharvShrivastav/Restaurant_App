import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Using axios directly
import { Trash2 } from 'lucide-react';

// Define your backend's base URL
const API_URL = 'http://localhost:5001/api';

const CategorySetup = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/categories`);
            // Your API returns { status: 'success', data: { data: [...] } }
            setCategories(response.data.data.data || []); 
        } catch (err) {
            setError('Failed to fetch categories.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName) return;

        try {
            await axios.post(`${API_URL}/category`, { 
                name: newCategoryName,
                description: `${newCategoryName} category`
            });
            fetchCategories(); 
            setNewCategoryName('');
        } catch (err) {
            setError('Failed to add category.');
            console.error(err);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await axios.delete(`${API_URL}/categories/${id}`);
            fetchCategories();
        } catch (err) {
            setError('Failed to delete category. It might be in use by a menu item.');
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Category Management</h1>
            {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                {/* Add Category Form */}
                <div className="lg:col-span-1">
                    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-900">Add New Category</h3>
                        <form onSubmit={handleAddCategory} className="mt-4 space-y-4">
                            <div>
                                <label htmlFor="categoryName" className="block text-sm font-medium text-slate-700">Category Name</label>
                                <input
                                    id="categoryName"
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="e.g., Appetizers"
                                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                                />
                            </div>
                            <button type="submit" className="w-full justify-center rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                                Save Category
                            </button>
                        </form>
                    </div>
                </div>

                {/* Existing Categories List */}
                <div className="lg:col-span-2">
                     <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                         <div className="p-6">
                            <h3 className="text-lg font-semibold text-slate-900">Existing Categories</h3>
                         </div>
                        <div className="space-y-2 p-6 pt-0">
                            {loading ? <p>Loading...</p> : categories.map(category => (
                                <div key={category.id} className="flex items-center justify-between rounded-md border border-slate-100 p-3">
                                    <span className="font-medium text-slate-800">{category.name}</span>
                                    <button onClick={() => handleDeleteCategory(category.id)} className="text-slate-500 hover:text-red-600">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySetup;