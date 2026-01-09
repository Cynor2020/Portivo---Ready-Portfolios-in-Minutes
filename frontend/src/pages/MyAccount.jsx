import { useState } from 'react';
import { User, Mail, Calendar, Shield, CreditCard, Bell, Globe, Lock, Edit3 } from 'lucide-react';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    bio: 'Full Stack Developer passionate about creating amazing digital experiences',
    joinDate: 'January 2024',
    plan: 'Pro Plan',
    subscriptionStatus: 'Active',
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    username: user.username,
    bio: user.bio
  });

  const [showEdit, setShowEdit] = useState(false);

  const handleSave = () => {
    setUser({
      ...user,
      ...formData
    });
    setShowEdit(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio
    });
    setShowEdit(false);
  };

  const toggleNotification = (type) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [type]: !user.notifications[type]
      }
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-8">My Account</h1>

        <div className="bg-card rounded-xl p-6 border border-zinc-800 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">{user.name}</h2>
              <p className="text-text-secondary">{user.email}</p>
              <p className="text-sm text-text-secondary">Member since {user.joinDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-zinc-900 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-purple-500" />
                <span className="font-medium text-text-primary">Subscription</span>
              </div>
              <p className="text-text-secondary text-sm">{user.plan}</p>
              <p className="text-green-500 text-sm font-medium">{user.subscriptionStatus}</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-text-primary">Account Created</span>
              </div>
              <p className="text-text-secondary text-sm">{user.joinDate}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-purple-main text-white'
                : 'bg-zinc-800 text-text-secondary hover:bg-zinc-700'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'security'
                ? 'bg-purple-main text-white'
                : 'bg-zinc-800 text-text-secondary hover:bg-zinc-700'
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'notifications'
                ? 'bg-purple-main text-white'
                : 'bg-zinc-800 text-text-secondary hover:bg-zinc-700'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'billing'
                ? 'bg-purple-main text-white'
                : 'bg-zinc-800 text-text-secondary hover:bg-zinc-700'
            }`}
          >
            Billing
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="bg-card rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Profile Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary">Profile Picture</h3>
                  <p className="text-text-secondary text-sm">Upload a new profile picture</p>
                </div>
                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg transition-all">
                  Change
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                  {showEdit ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-main focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-secondary">
                      {user.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Username</label>
                  {showEdit ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-main focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-secondary">
                      {user.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
                  {showEdit ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-main focus:border-transparent"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-secondary">
                      {user.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Join Date</label>
                  <p className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-secondary">
                    {user.joinDate}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Bio</label>
                {showEdit ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-purple-main focus:border-transparent"
                  />
                ) : (
                  <p className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-text-secondary">
                    {user.bio}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                {showEdit ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-purple-main hover:bg-purple-600 text-white rounded-lg font-medium transition-all"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg font-medium transition-all"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowEdit(true)}
                    className="px-6 py-3 bg-purple-main hover:bg-purple-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-card rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <h3 className="font-medium text-text-primary">Change Password</h3>
                  <p className="text-text-secondary text-sm">Update your account password</p>
                </div>
                <button className="px-4 py-2 bg-purple-main hover:bg-purple-600 text-white rounded-lg transition-all">
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <h3 className="font-medium text-text-primary">Two-Factor Authentication</h3>
                  <p className="text-text-secondary text-sm">Add an extra layer of security</p>
                </div>
                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg transition-all">
                  Configure
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <h3 className="font-medium text-text-primary">Login History</h3>
                  <p className="text-text-secondary text-sm">View recent login activity</p>
                </div>
                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg transition-all">
                  View
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-card rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Notification Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <h3 className="font-medium text-text-primary">Email Notifications</h3>
                  <p className="text-text-secondary text-sm">Receive important updates via email</p>
                </div>
                <button
                  onClick={() => toggleNotification('email')}
                  className={`w-12 h-6 rounded-full p-1 transition-all ${
                    user.notifications.email ? 'bg-purple-main' : 'bg-zinc-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      user.notifications.email ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <h3 className="font-medium text-text-primary">Push Notifications</h3>
                  <p className="text-text-secondary text-sm">Receive notifications in your browser</p>
                </div>
                <button
                  onClick={() => toggleNotification('push')}
                  className={`w-12 h-6 rounded-full p-1 transition-all ${
                    user.notifications.push ? 'bg-purple-main' : 'bg-zinc-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      user.notifications.push ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <h3 className="font-medium text-text-primary">Marketing Communications</h3>
                  <p className="text-text-secondary text-sm">Receive promotional emails and updates</p>
                </div>
                <button
                  onClick={() => toggleNotification('marketing')}
                  className={`w-12 h-6 rounded-full p-1 transition-all ${
                    user.notifications.marketing ? 'bg-purple-main' : 'bg-zinc-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      user.notifications.marketing ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="bg-card rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Billing Information</h2>
            
            <div className="space-y-6">
              <div className="bg-zinc-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-text-primary">Current Plan</h3>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">
                    {user.subscriptionStatus}
                  </span>
                </div>
                <p className="text-2xl font-bold text-text-primary mb-2">{user.plan}</p>
                <p className="text-text-secondary mb-4">Renews on March 1, 2024</p>
                <button className="px-4 py-2 bg-purple-main hover:bg-purple-600 text-white rounded-lg transition-all">
                  Manage Subscription
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <h3 className="font-medium text-text-primary">Payment Method</h3>
                  <p className="text-text-secondary text-sm">Visa ending in 1234</p>
                </div>
                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg transition-all">
                  Update
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <h3 className="font-medium text-text-primary">Billing History</h3>
                  <p className="text-text-secondary text-sm">View your payment history</p>
                </div>
                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg transition-all">
                  View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;