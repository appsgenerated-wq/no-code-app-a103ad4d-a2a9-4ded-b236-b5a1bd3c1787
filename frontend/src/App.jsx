import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import config from './constants';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const manifest = new Manifest(config.APP_ID);

  useEffect(() => {
    // Check if a user session exists on initial load
    manifest.from('users').me()
      .then(userData => {
        if (userData) {
          setUser(userData);
          loadRecipes();
        }
      })
      .catch(() => {
        // No user logged in, which is a normal state
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await manifest.login('users', email, password);
      const loggedInUser = await manifest.from('users').me();
      setUser(loggedInUser);
      await loadRecipes();
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setRecipes([]);
    setError(null);
  };

  const loadRecipes = async () => {
    setIsLoading(true);
    try {
      const response = await manifest.from('recipes').find({
        include: ['owner'],
        filter: { status: 'published' },
        sort: { createdAt: 'desc' }
      });
      setRecipes(response.data);
    } catch (err) {
      console.error('Failed to load recipes:', err);
      setError('Could not load recipes.');
    }
    setIsLoading(false);
  };

  const createRecipe = async (recipeData) => {
    try {
      const newRecipe = await manifest.from('recipes').create(recipeData, { include: ['owner'] });
      setRecipes([newRecipe, ...recipes]);
    } catch (err) {
      console.error('Failed to create recipe:', err);
      setError('Could not create the recipe. Please check your inputs.');
      // Re-throw to inform the form component
      throw err;
    }
  };

  if (isLoading && !user) { // Show a simple loader on initial app load
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><p>Loading FlavorFind...</p></div>;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {!user ? (
        <LandingPage onLogin={login} error={error} isLoading={isLoading} />
      ) : (
        <DashboardPage
          user={user}
          recipes={recipes}
          onLogout={logout}
          onCreateRecipe={createRecipe}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
