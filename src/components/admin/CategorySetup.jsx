import React, { useState } from 'react';

const CategorySetup = () => {
    const [categories, setCategories] = useState(['Main Course', 'Appetizer', 'Dessert']);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        }
    };

    const handleDeleteCategory = (categoryToDelete) => {
        setCategories(categories.filter(category => category !== categoryToDelete));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Category Setup</h1>
            <div className="mb-4 flex">
                <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                />
                <button onClick={handleAddCategory} className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-r">
                    Add Category
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                {categories.map(category => (
                    <div key={category} className="flex justify-between items-center mb-2 border-b pb-2">
                        <p>{category}</p>
                        <button onClick={() => handleDeleteCategory(category)} className="text-red-500 hover:underline">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySetup;