import React from 'react';
import { FireIcon, UserGroupIcon, BookOpenIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin, error, isLoading }) => {
  const handleDemoLogin = (e) => {
    e.preventDefault();
    onLogin('admin@manifest.build', 'admin');
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FireIcon className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">FlavorFind</span>
          </div>
          <button 
            onClick={handleDemoLogin}
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? 'Logging in...' : 'Try Demo'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              Discover & Share
              <span className="block text-blue-600">Amazing Recipes</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
              Join a community of food lovers. Find inspiration for your next meal and share your culinary creations with the world.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <button 
                onClick={handleDemoLogin}
                className="inline-flex items-center bg-blue-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get Started <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
              <a 
                href="/admin" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-gray-900 font-bold px-8 py-3 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-transform hover:scale-105 transform"
              >
                Admin Panel
              </a>
            </div>
            {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Everything You Need to Cook</h2>
              <p className="mt-4 text-lg text-gray-600">FlavorFind makes cooking fun and simple.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto">
                  <BookOpenIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Share Your Creations</h3>
                <p className="mt-2 text-base text-gray-600">Easily upload your favorite recipes with photos, ingredients, and step-by-step instructions.</p>
              </div>
              <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto">
                  <UserGroupIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Community Driven</h3>
                <p className="mt-2 text-base text-gray-600">Discover what others are cooking, get inspired, and find your next favorite dish.</p>
              </div>
              <div className="text-center p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mx-auto">
                  <FireIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Endless Inspiration</h3>
                <p className="mt-2 text-base text-gray-600">With a growing library of recipes, you'll never run out of ideas for breakfast, lunch, or dinner.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} FlavorFind. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-400">Powered by Manifest</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
