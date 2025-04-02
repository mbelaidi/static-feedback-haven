
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <Link to="/" className="flex items-center mb-4">
              <div className="bg-feedback-blue text-white rounded-md w-8 h-8 flex items-center justify-center font-bold text-lg mr-2">
                F
              </div>
              <span className="font-bold text-xl text-gray-800 dark:text-white">
                FeedbackHub
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              A platform where users can submit and vote on feedback, feature requests, and bug reports.
            </p>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-500 hover:text-feedback-blue dark:text-gray-400 dark:hover:text-feedback-lightBlue text-sm">
                Home
              </Link>
              <Link to="/about" className="text-gray-500 hover:text-feedback-blue dark:text-gray-400 dark:hover:text-feedback-lightBlue text-sm">
                About
              </Link>
              <Link to="/dashboard" className="text-gray-500 hover:text-feedback-blue dark:text-gray-400 dark:hover:text-feedback-lightBlue text-sm">
                Dashboard
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Legal</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/privacy" className="text-gray-500 hover:text-feedback-blue dark:text-gray-400 dark:hover:text-feedback-lightBlue text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-feedback-blue dark:text-gray-400 dark:hover:text-feedback-lightBlue text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {year} FeedbackHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
