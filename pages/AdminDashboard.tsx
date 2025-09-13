import React, { useState } from 'react';
import { BOOKINGS, COMMISSIONS, SUBSCRIPTION_PLANS, OTA_INTEGRATIONS } from '../constants';
import { Booking, Commission, SubscriptionPlan, OTAIntegration, BookingStatus, CommissionStatus } from '../types';
import { CheckCircle, XCircle, Clock, ExternalLink, BarChart2, List, IndianRupee, Hash, BedDouble } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';


const getBookingStatusIcon = (status: BookingStatus) => {
    switch (status) {
        case BookingStatus.Confirmed: return <CheckCircle className="text-green-500" size={16} />;
        case BookingStatus.Pending: return <Clock className="text-yellow-500" size={16} />;
        case BookingStatus.Cancelled: return <XCircle className="text-red-500" size={16} />;
    }
};

const getCommissionStatusChip = (status: CommissionStatus) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
        case CommissionStatus.Paid: return <span className={`${baseClasses} bg-green-100 text-green-800`}>{status}</span>;
        case CommissionStatus.Pending: return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>{status}</span>;
    }
};

const Card: React.FC<{title: string; children: React.ReactNode; className?: string}> = ({ title, children, className }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        {children}
    </div>
);

const KpiCard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-5 flex items-center">
        <div className="p-3 rounded-full bg-gray-100 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

// --- Analytics Data Processing ---
const totalRevenue = BOOKINGS.filter(b => b.status === BookingStatus.Confirmed).reduce((acc, b) => acc + b.amount, 0);
const totalBookings = BOOKINGS.length;
const avgBookingValue = totalRevenue / BOOKINGS.filter(b => b.status === BookingStatus.Confirmed).length;

const monthlyRevenueData = [
    { name: 'Apr', revenue: 65000 },
    { name: 'May', revenue: 78000 },
    { name: 'Jun', revenue: 92000 },
    { name: 'Jul', revenue: 81000 },
    { name: 'Aug', revenue: totalRevenue },
];

const bookingStatusData = [
    { name: 'Confirmed', value: BOOKINGS.filter(b => b.status === BookingStatus.Confirmed).length },
    { name: 'Pending', value: BOOKINGS.filter(b => b.status === BookingStatus.Pending).length },
    { name: 'Cancelled', value: BOOKINGS.filter(b => b.status === BookingStatus.Cancelled).length },
];
const COLORS = ['#22c55e', '#facc15', '#ef4444'];


export const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'analytics'>('overview');

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">व्यवस्थापक डैशबोर्ड</h1>
                <p className="text-gray-600 mt-1">अपने होटल व्यवसाय का अवलोकन और प्रबंधन करें।</p>
            </header>

            {/* Tabs */}
            <div className="mb-8 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('overview')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                       <List size={16} className="inline mr-2" /> अवलोकन
                    </button>
                    <button onClick={() => setActiveTab('analytics')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        <BarChart2 size={16} className="inline mr-2" />एनालिटिक्स
                    </button>
                </nav>
            </div>

            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card title="नवीनतम बुकिंग">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Booking ID</th>
                                            <th scope="col" className="px-6 py-3">ग्राहक</th>
                                            <th scope="col" className="px-6 py-3">होटल</th>
                                            <th scope="col" className="px-6 py-3">दिनांक</th>
                                            <th scope="col" className="px-6 py-3">राशि</th>
                                            <th scope="col" className="px-6 py-3">स्थिति</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {BOOKINGS.map((booking: Booking) => (
                                            <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{booking.id}</td>
                                                <td className="px-6 py-4">{booking.customer}</td>
                                                <td className="px-6 py-4">{booking.hotel}</td>
                                                <td className="px-6 py-4">{booking.date}</td>
                                                <td className="px-6 py-4">₹{booking.amount.toLocaleString('en-IN')}</td>
                                                <td className="px-6 py-4 flex items-center gap-2">
                                                    {getBookingStatusIcon(booking.status)}
                                                    {booking.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        <Card title="कमीशन अवलोकन">
                             <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">होटल</th>
                                            <th scope="col" className="px-6 py-3">बुकिंग</th>
                                            <th scope="col" className="px-6 py-3">कमीशन राशि</th>
                                            <th scope="col" className="px-6 py-3">स्थिति</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {COMMISSIONS.map((commission: Commission) => (
                                            <tr key={commission.hotel} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{commission.hotel}</td>
                                                <td className="px-6 py-4">{commission.bookings}</td>
                                                <td className="px-6 py-4">₹{commission.commissionAmount.toLocaleString('en-IN')} ({commission.commissionPercentage}%)</td>
                                                <td className="px-6 py-4">{getCommissionStatusChip(commission.status)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Card title="सदस्यता योजना">
                            <div className="space-y-4">
                            {SUBSCRIPTION_PLANS.filter(p => p.isPopular).map((plan: SubscriptionPlan) => (
                                <div key={plan.name} className="border border-indigo-500 rounded-lg p-4 bg-indigo-50">
                                    <h4 className="font-bold text-indigo-800">आपकी वर्तमान योजना: {plan.name}</h4>
                                    <p className="text-sm text-indigo-600 mt-1">₹{plan.price}/माह</p>
                                    <button className="mt-4 w-full text-sm bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                                        योजना अपग्रेड करें
                                    </button>
                                </div>
                            ))}
                            </div>
                        </Card>
                        <Card title="OTA एकीकरण">
                            <ul className="space-y-3">
                                {OTA_INTEGRATIONS.map((ota: OTAIntegration) => (
                                    <li key={ota.name} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-800">{ota.name}</p>
                                            <p className="text-sm text-gray-500">{ota.description}</p>
                                        </div>
                                        {ota.connected ? (
                                            <span className="text-sm font-medium text-green-600 flex items-center"><CheckCircle size={16} className="mr-1"/>जुड़ा हुआ</span>
                                        ) : (
                                            <button className="text-sm text-blue-600 hover:underline">कनेक्ट</button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            )}
            
            {activeTab === 'analytics' && (
                <div className="space-y-8 animate-fade-in">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <KpiCard title="कुल राजस्व" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={<IndianRupee className="text-green-500" />} />
                        <KpiCard title="कुल बुकिंग" value={totalBookings.toString()} icon={<Hash className="text-blue-500" />} />
                        <KpiCard title="औसत बुकिंग मूल्य" value={`₹${Math.round(avgBookingValue).toLocaleString('en-IN')}`} icon={<BedDouble className="text-indigo-500" />} />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                       <div className="lg:col-span-3">
                           <Card title="मासिक राजस्व अवलोकन">
                               <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <LineChart data={monthlyRevenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
                                            <Legend />
                                            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#4f46e5" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                               </div>
                           </Card>
                       </div>
                       <div className="lg:col-span-2">
                           <Card title="बुकिंग स्थिति वितरण">
                               <div style={{ width: '100%', height: 300 }}>
                                   <ResponsiveContainer>
                                        <PieChart>
                                            <Pie data={bookingStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={(entry) => `${entry.name} (${entry.value})`}>
                                                {bookingStatusData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                   </ResponsiveContainer>
                               </div>
                           </Card>
                       </div>
                    </div>
                </div>
            )}
        </div>
    );
};