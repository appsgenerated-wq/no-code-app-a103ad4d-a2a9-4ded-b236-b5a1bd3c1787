import React, { useState } from 'react';
import { ClockIcon, UserIcon, PlusCircleIcon, PhotoIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, recipes, onLogout, onCreateRecipe, isLoading }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ 
    title: '', 
    description: '', 
    prepTime: 30, 
    cookTime: 45, 
    ingredients: '', 
    instructions: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const ingredientsArray = newRecipe.ingredients.split('\n').filter(ing => ing.trim() !== '');
      await onCreateRecipe({ ...newRecipe, ingredients: ingredientsArray });
      setNewRecipe({ title: '', description: '', prepTime: 30, cookTime: 45, ingredients: '', instructions: '' });
      setShowCreateForm(false);
    } catch (err) {
      setError('Failed to create recipe. Please try again.');
    }
    setIsSubmitting(false);
  };

  const RecipeCard = ({ recipe }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        {recipe.image ? (
            <img src={recipe.image.url} alt={recipe.title} className="w-full h-full object-cover" />
        ) : (
            <PhotoIcon className="h-16 w-16 text-gray-400" />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600">{recipe.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
            <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center space-x-1 truncate">
                <UserIcon className="h-4 w-4" />
                <span className="truncate">{recipe.owner?.name || 'Unknown Chef'}</span>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            </div>
            <div className="space-x-4">
              <a 
                href="/admin" 
                target="_blank"
                className="hidden sm:inline-block bg-green-100 text-green-800 font-medium px-4 py-2 rounded-lg text-sm hover:bg-green-200 transition-colors"
              >
                Admin Panel
              </a>
              <button 
                onClick={onLogout}
                className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Community Recipes</h2>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="inline-flex items-center bg-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" />
            New Recipe
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8 animate-fade-in-down">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Add a New Recipe</h3>
            <form onSubmit={handleCreateRecipe} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" value={newRecipe.title} onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea value={newRecipe.description} onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required></textarea>
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700">Prep Time (mins)</label>
                <input type="number" value={newRecipe.prepTime} onChange={(e) => setNewRecipe({...newRecipe, prepTime: parseInt(e.target.value)})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required min="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cook Time (mins)</label>
                <input type="number" value={newRecipe.cookTime} onChange={(e) => setNewRecipe({...newRecipe, cookTime: parseInt(e.target.value)})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required min="1" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Ingredients (one per line)</label>
                <textarea value={newRecipe.ingredients} onChange={(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})} rows="5" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required></textarea>
              </div>
               <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Instructions</label>
                <textarea value={newRecipe.instructions} onChange={(e) => setNewRecipe({...newRecipe, instructions: e.target.value})} rows="5" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required></textarea>
              </div>
              {error && <p className="text-red-500 text-sm md:col-span-2">{error}</p>}
              <div className="md:col-span-2 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowCreateForm(false)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">{isSubmitting ? 'Saving...' : 'Save Recipe'}</button>
              </div>
            </form>
          </div>
        )}

        {isLoading && recipes.length === 0 ? (
            <p className="text-center text-gray-500">Loading recipes...</p>
        ) : recipes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <h3 className="text-lg font-medium text-gray-900">No recipes yet!</h3>
                <p className="mt-1 text-sm text-gray-500">Be the first to share a recipe with the community.</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
