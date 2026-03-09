'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  totalBookingsThisMonth: number;
  revenueThisMonth: number;
  upcomingTreksNext30Days: number;
  occupancyRate: number;
  cancellationRate: number;
  refundPending: number;
}

interface Trek {
  id: string;
  name: string;
  slug: string;
  state: string;
  difficulty: string;
  basePrice: number;
  departures: {
    id: string;
    startDate: string;
    endDate: string;
    totalSeats: number;
    seatsAvailable: number;
    waitlistCount: number;
    status: string;
    trekLeader?: {
      firstName: string;
      lastName: string;
    };
  }[];
}

interface Participant {
  id: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  numberOfPeople: number;
  totalAmount: number;
  status: string;
  medicalFormSubmitted: boolean;
  idVerified: boolean;
  waiverSigned: boolean;
  isRepeatTrekker: boolean;
  departure: {
    startDate: string;
    trek: {
      name: string;
    };
  };
  payment?: {
    status: string;
    amount: number;
    paymentMethod?: string;
  };
}

interface FinanceData {
  totalRevenue: number;
  advanceCollected: number;
  balancePending: number;
  gstCollected: number;
  paymentMethodSplit: { method: string; amount: number; count: number }[];
  trekLeaderPayouts: {
    pending: number;
    paid: number;
    pendingCount: number;
    paidCount: number;
  };
}

interface MarketingData {
  websiteVisitors: number;
  conversionRate: number;
  instagramClicks: number;
  repeatCustomerPercent: number;
  referralBookings: number;
  topTreks: { trekName: string; bookingCount: number; revenue: number }[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [treks, setTreks] = useState<Trek[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [finance, setFinance] = useState<FinanceData | null>(null);
  const [marketing, setMarketing] = useState<MarketingData | null>(null);

  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUserRole && ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(currentUserRole)) {
      loadDashboardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserRole, activeTab]);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/api/user/profile', { credentials: 'include' });
      if (!res.ok) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      if (data?.user) {
        setCurrentUserRole(data.user.role);
      } else {
        router.push('/login');
      }
    } catch (err) {
      console.error('Failed to fetch current user', err);
      router.push('/login');
    }
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load data based on active tab
      if (activeTab === 'overview') {
        const res = await fetch('/api/admin/dashboard', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setStats(data.data);
        }
      } else if (activeTab === 'treks') {
        const res = await fetch('/api/admin/treks', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setTreks(data.treks || []);
        }
      } else if (activeTab === 'participants') {
        const res = await fetch('/api/admin/participants', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setParticipants(data.participants || []);
        }
      } else if (activeTab === 'finance') {
        const res = await fetch('/api/admin/finance', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setFinance(data.data);
        }
      } else if (activeTab === 'marketing') {
        const res = await fetch('/api/admin/marketing', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setMarketing(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to load data', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount / 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'OPEN':
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
      case 'FULL':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canViewFinance = currentUserRole === 'SUPER_ADMIN' || currentUserRole === 'ADMIN';
  const canViewMarketing = currentUserRole === 'SUPER_ADMIN' || currentUserRole === 'ADMIN';
  const canManageTreks = currentUserRole === 'SUPER_ADMIN' || currentUserRole === 'ADMIN';
  const canManageUsers = currentUserRole === 'SUPER_ADMIN';

  if (!currentUserRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                {currentUserRole}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                Go to User Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quick Overview
            </button>
            <button
              onClick={() => setActiveTab('treks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'treks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trek Management
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'participants'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Participants
            </button>
            {canViewFinance && (
              <button
                onClick={() => setActiveTab('finance')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'finance'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Finance
              </button>
            )}
            {canViewMarketing && (
              <button
                onClick={() => setActiveTab('marketing')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'marketing'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Marketing
              </button>
            )}
            {canManageUsers && (
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Total Bookings (This Month)</div>
                  <div className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalBookingsThisMonth}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Revenue (This Month)</div>
                  <div className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(stats.revenueThisMonth)}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Upcoming Treks (Next 30 days)</div>
                  <div className="mt-2 text-3xl font-semibold text-gray-900">{stats.upcomingTreksNext30Days}</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Occupancy Rate</div>
                  <div className="mt-2 text-3xl font-semibold text-gray-900">{stats.occupancyRate}%</div>
                  <div className="mt-1 text-sm text-gray-500">of total capacity filled</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Cancellation Rate</div>
                  <div className="mt-2 text-3xl font-semibold text-gray-900">{stats.cancellationRate}%</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="text-sm font-medium text-gray-500">Refund Pending</div>
                  <div className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(stats.refundPending)}</div>
                </div>
              </div>
            )}

            {/* Trek Management Tab */}
            {activeTab === 'treks' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Trek Management</h2>
                  {canManageTreks && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Add New Trek
                    </button>
                  )}
                </div>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trek Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departures</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {treks.map((trek) => (
                        <tr key={trek.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{trek.name}</div>
                            <div className="text-sm text-gray-500">{trek.slug}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trek.state}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              trek.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                              trek.difficulty === 'MODERATE' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {trek.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(trek.basePrice)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {trek.departures?.length || 0} upcoming
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button className="text-gray-600 hover:text-gray-900">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Participants Tab */}
            {activeTab === 'participants' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Participant Management</h2>
                </div>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trek</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medical</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Verified</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waiver</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {participants.map((participant) => (
                        <tr key={participant.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{participant.contactName}</div>
                            <div className="text-sm text-gray-500">{participant.contactEmail}</div>
                            {participant.isRepeatTrekker && (
                              <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                Repeat Trekker
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {participant.departure?.trek?.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(participant.status)}`}>
                              {participant.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {participant.medicalFormSubmitted ? (
                              <span className="text-green-600">✓ Submitted</span>
                            ) : (
                              <span className="text-yellow-600">Pending</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {participant.idVerified ? (
                              <span className="text-green-600">✓ Verified</span>
                            ) : (
                              <span className="text-yellow-600">Pending</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {participant.waiverSigned ? (
                              <span className="text-green-600">✓ Signed</span>
                            ) : (
                              <span className="text-yellow-600">Pending</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(participant.payment?.status || 'PENDING')}`}>
                              {participant.payment?.status || 'PENDING'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Finance Tab */}
            {activeTab === 'finance' && finance && canViewFinance && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Finance Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm font-medium text-gray-500">Total Revenue</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(finance.totalRevenue)}</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm font-medium text-gray-500">Advance Collected</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(finance.advanceCollected)}</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm font-medium text-gray-500">Balance Pending</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(finance.balancePending)}</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm font-medium text-gray-500">GST Collected</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900">{formatCurrency(finance.gstCollected)}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-4">Payment Method Split</h3>
                    {finance.paymentMethodSplit.map((method) => (
                      <div key={method.method} className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">{method.method || 'Unknown'}</span>
                        <span className="font-medium">{formatCurrency(method.amount)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-4">Trek Leader Payouts</h3>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-medium text-yellow-600">{formatCurrency(finance.trekLeaderPayouts.pending)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Paid</span>
                      <span className="font-medium text-green-600">{formatCurrency(finance.trekLeaderPayouts.paid)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Marketing Tab */}
            {activeTab === 'marketing' && marketing && canViewMarketing && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Marketing Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm font-medium text-gray-500">Website Visitors</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900">{marketing.websiteVisitors}</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm font-medium text-gray-500">Conversion Rate</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900">{marketing.conversionRate}%</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm font-medium text-gray-500">Instagram Clicks</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900">{marketing.instagramClicks}</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm font-medium text-gray-500">Repeat Customer %</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900">{marketing.repeatCustomerPercent}%</div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm font-medium text-gray-500">Referral Bookings</div>
                    <div className="mt-2 text-3xl font-semibold text-gray-900">{marketing.referralBookings}</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium mb-4">Top Performing Treks</h3>
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase">Trek Name</th>
                        <th className="text-right text-xs font-medium text-gray-500 uppercase">Bookings</th>
                        <th className="text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketing.topTreks.map((trek, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="py-3">{trek.trekName}</td>
                          <td className="py-3 text-right">{trek.bookingCount}</td>
                          <td className="py-3 text-right">{formatCurrency(trek.revenue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && canManageUsers && (
              <div>
                <h2 className="text-xl font-semibold mb-6">User Management</h2>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600">User management features are available in the main admin panel.</p>
                  <button 
                    onClick={() => router.push('/admin')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Go to User Management
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
