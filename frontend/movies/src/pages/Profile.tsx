import React, { useState } from 'react';
import { User, Clock, Film, Bookmark, Pencil, X } from 'lucide-react';

function Profile() {
  const [displayName, setDisplayName] = useState('John Doe');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempDisplayName, setTempDisplayName] = useState(displayName);
  const [email] = useState('john.doe@example.com');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveName = () => {
    setDisplayName(tempDisplayName);
    setIsEditingName(false);
    // Handle API call to save name
    console.log('Saving name:', tempDisplayName);
  };

  const handleChangePassword = () => {
    // Handle password change
    console.log('Change password clicked');
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log('Delete account');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <User size={48} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{displayName}</h1>
          <p className="text-gray-400">Member since 2024</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bookmark className="text-red-500" />
              <h3 className="font-semibold">Movies Saved</h3>
            </div>
            <p className="text-3xl font-bold">18</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Film className="text-red-500" />
              <h3 className="font-semibold">Movies Watched</h3>
            </div>
            <p className="text-3xl font-bold">127</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-red-500" />
              <h3 className="font-semibold">Watch Time</h3>
            </div>
            <p className="text-3xl font-bold">256h</p>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Email</label>
              <div className="bg-gray-700/50 text-gray-400 px-4 py-2 rounded-lg">
                {email}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">Display Name</label>
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <>
                    <input 
                      type="text" 
                      value={tempDisplayName}
                      onChange={(e) => setTempDisplayName(e.target.value)}
                      className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                    <button 
                      onClick={handleSaveName}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditingName(false);
                        setTempDisplayName(displayName);
                      }}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 bg-gray-700/50 text-white px-4 py-2 rounded-lg">
                      {displayName}
                    </div>
                    <button 
                      onClick={() => setIsEditingName(true)}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <button 
                onClick={handleChangePassword}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Change Password
              </button>
              {showDeleteConfirm ? (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <X size={16} />
                    Confirm Delete
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Delete Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;