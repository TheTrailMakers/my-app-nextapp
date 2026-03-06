'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: 'ADMIN' | 'MODERATOR' | 'USER' | 'SUPER_ADMIN';
  isActive: boolean;
  isLocked: boolean;
  isDenied: boolean;
  accountLockedUntil?: string;
  lastLoginAt?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'USER' | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'audit-logs' | 'settings'>('users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRole, setEditRole] = useState('USER');

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/api/user/profile');
      if (!res.ok) return;
      const data = await res.json();
      if (data?.user) {
        if (data.user.role) setCurrentUserRole(data.user.role);
        if (data.user.id) setCurrentUserId(data.user.id);
      }
    } catch (err) {
      console.error('Failed to fetch current user', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        if (response.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: editRole })
      });

      if (!response.ok) throw new Error('Failed to update role');

      await fetchUsers();
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update user role');
    }
  };

  const handleUnlockAccount = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/unlock`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Failed to unlock account');

      await fetchUsers();
    } catch (error) {
      console.error('Error unlocking account:', error);
      alert('Failed to unlock account');
    }
  };

  const handleToggleActive = async (userId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive })
      });

      if (!response.ok) throw new Error('Failed to update user status');

      await fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user status');
    }
  };

  const handleToggleDenyAccess = async (userId: string, isDenied: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/deny`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deny: !isDenied })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update access');
      }

      await fetchUsers();
    } catch (error) {
      console.error('Error toggling deny access:', error);
      alert(error instanceof Error ? error.message : 'Failed to update access');
    }
  };

  const canManageUser = (targetUser: User): boolean => {
    if (!currentUserRole) return false;
    // Prevent managing self
    if (currentUserId && targetUser.id === currentUserId) return false;
    // Super Admin can manage everyone
    if (currentUserRole === 'SUPER_ADMIN') return true;
    // Admin can manage moderators and users
    if (currentUserRole === 'ADMIN') return targetUser.role === 'MODERATOR' || targetUser.role === 'USER';
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage users, roles, and system settings</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          {['users', 'audit-logs', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-2 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Users</h2>
              {currentUserRole === 'ADMIN' || currentUserRole === 'SUPER_ADMIN' ? (
                <div className="flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    Add User
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                    IP Restrictions
                  </button>
                </div>
              ) : null}
            </div>

            {loading ? (
              <div className="p-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Loading users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">User</th>
                      <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">Role</th>
                      <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">Last Login</th>
                      <th className="px-6 py-3 text-center text-gray-900 dark:text-white font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'ADMIN'
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                              : user.role === 'MODERATOR'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 flex-wrap">
                            {user.isDenied && (
                              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded text-xs font-medium">
                                🚫 Denied
                              </span>
                            )}
                            {user.isLocked && (
                              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded text-xs font-medium">
                                🔒 Locked
                              </span>
                            )}
                            {!user.isActive && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400 rounded text-xs font-medium">
                                Inactive
                              </span>
                            )}
                            {user.isActive && !user.isLocked && !user.isDenied && (
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded text-xs font-medium">
                                ✓ Active
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-xs">
                          {user.lastLoginAt
                            ? new Date(user.lastLoginAt).toLocaleDateString()
                            : 'Never'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-1 flex-nowrap items-center overflow-x-auto">
                            {canManageUser(user) && (
                              <>
                                <button onClick={() => { setSelectedUser(user); setEditRole(user.role); setIsModalOpen(true); }} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 whitespace-nowrap">Edit Role</button>
                                {user.isLocked && <button onClick={() => handleUnlockAccount(user.id)} className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-medium hover:bg-yellow-200 dark:hover:bg-yellow-900/50 whitespace-nowrap">Unlock</button>}
                                {(currentUserRole === 'ADMIN' || currentUserRole === 'SUPER_ADMIN') && user.id !== currentUserId && <button onClick={async () => { if (!confirm('Reset password for this user? This will set a temporary password.')) return; try { const r = await fetch(`/api/admin/users/${user.id}/reset`, { method: 'POST' }); if (!r.ok) throw new Error('Failed'); alert('Password reset — temporary password set.'); } catch (e) { console.error(e); alert('Failed to reset password'); } }} className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 whitespace-nowrap">Reset Pwd</button>}
                                <button onClick={() => handleToggleActive(user.id, user.isActive)} className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${user.isActive ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200'}`}>{user.isActive ? 'Deactivate' : 'Activate'}</button>
                              </>
                            )}
                            {currentUserRole === 'SUPER_ADMIN' && user.id !== currentUserId && <button onClick={() => handleToggleDenyAccess(user.id, user.isDenied)} className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${user.isDenied ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200'}`}>{user.isDenied ? 'Allow' : 'Deny'}</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Audit Logs Tab */}
        {activeTab === 'audit-logs' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Audit Logs</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Recent failed login attempts</p>
            <LoginAttempts />
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
          </div>
        )}
      </div>

      {/* Role Edit Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Update Role for {selectedUser.username}
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Role
              </label>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="USER">User</option>
                <option value="MODERATOR">Moderator</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN" disabled={currentUserRole !== 'SUPER_ADMIN'}>Super Admin</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateRole}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Lazy-load client component to fetch attempts
const LoginAttempts = dynamic(() => import('./login-attempts-client'), { ssr: false });
