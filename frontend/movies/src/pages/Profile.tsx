import { useState } from 'react';
import { User, Clock, Film, Bookmark, Pencil, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useChangePasswordMutation, useChangeNameMutation } from '../store/api/profileApi';

function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [displayName, setDisplayName] = useState(user?.username || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempDisplayName, setTempDisplayName] = useState(displayName);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const [changePassword] = useChangePasswordMutation();
  const [changeName] = useChangeNameMutation();

  const handleSaveName = async () => {
    try {
      await changeName({ username: tempDisplayName }).unwrap();
      setDisplayName(tempDisplayName);
      setIsEditingName(false);
      setError('');
    } catch (err) {
      setError('Failed to update display name');
    }
  };

  const handleChangePassword = async () => {
    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      setShowPasswordModal(false);
      setOldPassword('');
      setNewPassword('');
      setError('');
    } catch (err) {
      setError('Failed to change password');
    }
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log('Delete account');
    setShowDeleteConfirm(false);
  };

  if (!user) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-12">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <User size={48} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{displayName}</h1>
          <p className="text-gray-400">{user.email}</p>
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
                {user.email}
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
                onClick={() => setShowPasswordModal(true)}
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

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-6">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setOldPassword('');
                    setNewPassword('');
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;