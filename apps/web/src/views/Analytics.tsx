import { useState, useEffect } from 'react';
import {
  Download,
  Building,
  BarChart3,
  Users,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { analyticsService } from '../api/analyticsService';
import type { AnalyticsData } from '../api/types';

export default function Analytics({ role = 'officer' }: { role?: 'officer' | 'student' }) {
  const isAdmin = role === 'officer';
  const [accreditationYear, setAccreditationYear] = useState('2026');
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await analyticsService.getDescriptiveAnalytics();
        setData(stats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDownloadReport = (type: 'NBA' | 'NAAC' | 'NIRF') => {
    alert(`Compiling and downloading the ${type} Accreditation Excel template report for academic year ${accreditationYear}...`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Placement Intelligence</h1>
          <p className="page-subtitle">Track descriptive metrics for branches, skills, and package distributions.</p>
        </div>
        {isAdmin && (
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <select
              className="filter-select"
              value={accreditationYear}
              onChange={(e) => setAccreditationYear(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
            >
              <option value="2026">AY 2025-2026 (Current)</option>
              <option value="2025">AY 2024-2025</option>
              <option value="2024">AY 2023-2024</option>
            </select>
            <button className="btn btn-primary btn-sm" onClick={() => handleDownloadReport('NBA')} style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Download size={16} />
              Export Report
            </button>
          </div>
        )}
      </div>

      {/* KPI Counters Grid */}
      <div className="applications-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building size={24} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.2' }}>{data?.totalCompanies || 0}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Total Companies</span>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.2' }}>{data?.totalPlacements || 0}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Total Placements</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="analytics-grid-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
        {/* Salary Ranges Histogram */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <BarChart3 size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontWeight: '600', fontSize: '15px' }}>Package Distribution</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
            {data?.packageDistribution && Object.entries(data.packageDistribution).map(([range, count]) => (
              <div key={range} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ minWidth: '80px', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>{range}</span>
                <div style={{ flex: 1, height: '10px', backgroundColor: 'var(--border)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (count / 250) * 100)}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '5px' }}></div>
                </div>
                <span style={{ minWidth: '40px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', textAlign: 'right' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Demand */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <BarChart3 size={18} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: '600', fontSize: '15px' }}>Skill Demand (Frequency)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '10px 0' }}>
            {data?.skillDemand && Object.entries(data.skillDemand).map(([skill, count]) => (
              <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ minWidth: '80px', fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>{skill}</span>
                <div style={{ flex: 1, height: '10px', backgroundColor: 'var(--border)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (count / 100) * 100)}%`, height: '100%', backgroundColor: 'var(--accent)', borderRadius: '5px' }}></div>
                </div>
                <span style={{ minWidth: '40px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', textAlign: 'right' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="analytics-grid-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
        {/* Branch Distribution */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', backgroundColor: 'var(--background)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GraduationCap size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontWeight: '600', fontSize: '15px' }}>Branch Distribution</span>
          </div>
          <div style={{ padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--secondary-light)' }}>
                  <th style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>Branch</th>
                  <th style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>Placements</th>
                </tr>
              </thead>
              <tbody>
                {data?.branchDistribution && Object.entries(data.branchDistribution).map(([branch, count]) => (
                  <tr key={branch} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{branch}</td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'right' }}>
                      <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontWeight: '600' }}>{count}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Year-wise Trends */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', backgroundColor: 'var(--background)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: '600', fontSize: '15px' }}>Year-wise Average Package Trends</span>
          </div>
          <div style={{ padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--secondary-light)' }}>
                  <th style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>Academic Year</th>
                  <th style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>Avg. Package (LPA)</th>
                </tr>
              </thead>
              <tbody>
                {data?.yearWiseTrends && Object.entries(data.yearWiseTrends).map(([year, avg]) => (
                  <tr key={year} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{year}</td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600, color: 'var(--primary)', textAlign: 'right' }}>{avg} LPA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
