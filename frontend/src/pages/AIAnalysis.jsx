import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LockedFeature from '../components/LockedFeature';

const AIAnalysis = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalViews, setTotalViews] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [monthlyTraffic, setMonthlyTraffic] = useState([]);
  const [daily, setDaily] = useState([]);
  const [countries, setCountries] = useState([]);
  const [devices, setDevices] = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [referrers, setReferrers] = useState([]);

  const hasProAccess = user?.subscription?.tier === 'pro';

  useEffect(() => {
    if (!hasProAccess) {
      setLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get('/analytics/summary');
        const data = response.data.data || {};
        setTotalViews(data.totalViews || 0);
        setTodayViews(data.todayViews || 0);
        setMonthlyTraffic(data.monthly || []);
        setDaily(data.daily || []);
        setCountries(data.countries || []);
        setDevices(data.devices || []);
        setBrowsers(data.browsers || []);
        setReferrers(data.referrers || []);
      } catch (err) {
        setError('Unable to load analytics data right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [hasProAccess]);

  if (!hasProAccess) {
    return (
      <div className="min-h-screen bg-background p-6 lg:pl-72">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary mb-8">AI Analysis</h1>
          <LockedFeature 
            title="Unlock AI Analysis" 
            description="Get powerful insights into your portfolio performance with our Pro plan. Track views, visitor locations, and more." 
            ctaText="Upgrade to Pro - ₹199" 
            onUpgrade={() => navigate('/subscription')} 
          />
        </div>
      </div>
    );
  }

  const totalLastMonth =
    monthlyTraffic.length > 0 ? monthlyTraffic[monthlyTraffic.length - 1].views : 0;

  const last30Total = daily.reduce((sum, d) => sum + d.views, 0);
  const maxDailyViews = daily.reduce((max, d) => Math.max(max, d.views), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 lg:pl-72 flex items-center justify-center">
        <div className="text-text-primary text-sm">Loading analytics…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:pl-72">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">AI Analysis</h1>
          <p className="mt-2 text-sm text-text-secondary max-w-2xl">
            Live overview of how your portfolio is performing based on real visitor data: views,
            traffic trends, and top countries.
          </p>
          {error && (
            <p className="mt-2 text-xs text-red-400 bg-red-500/10 border border-red-500/40 rounded-md px-3 py-2 inline-block">
              {error}
            </p>
          )}
        </div>

        {/* Summary cards: Today / 30 Days / 6 Months */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl border border-zinc-800 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
              Today
            </p>
            <p className="mt-3 text-3xl font-semibold text-text-primary">
              {todayViews.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] text-text-secondary">
              Unique views recorded since midnight.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-zinc-800 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
              Last 30 Days
            </p>
            <p className="mt-3 text-3xl font-semibold text-text-primary">
              {last30Total.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] text-text-secondary">
              Daily trend chart below shows how these views are distributed.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-zinc-800 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
              Last 6 Months
            </p>
            <p className="mt-3 text-3xl font-semibold text-text-primary">
              {/* Placeholder for 6 months data */}
              0
            </p>
            <p className="mt-1 text-[11px] text-text-secondary">
              Long-term traffic analysis.
            </p>
          </div>
        </div>
        
        {/* Placeholder for Charts - In a real app, integrate Chart.js or Recharts here */}
        <div className="bg-card rounded-xl border border-zinc-800 p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Traffic Overview</h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-lg">
                <p className="text-zinc-500">Traffic Chart Visualization</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Top Countries</h3>
                <ul className="space-y-3">
                    {countries.length > 0 ? countries.map((c, i) => (
                        <li key={i} className="flex justify-between items-center text-sm">
                            <span className="text-zinc-300">{c._id || 'Unknown'}</span>
                            <span className="text-zinc-500">{c.count} views</span>
                        </li>
                    )) : (
                        <li className="text-zinc-500 text-sm">No data available</li>
                    )}
                </ul>
            </div>
             <div className="bg-card rounded-xl border border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Top Devices</h3>
                 <ul className="space-y-3">
                    {devices.length > 0 ? devices.map((d, i) => (
                        <li key={i} className="flex justify-between items-center text-sm">
                            <span className="text-zinc-300">{d._id || 'Unknown'}</span>
                            <span className="text-zinc-500">{d.count} views</span>
                        </li>
                    )) : (
                        <li className="text-zinc-500 text-sm">No data available</li>
                    )}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
