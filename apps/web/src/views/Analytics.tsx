import { useState, useEffect } from 'react';
import {
  Download,
  Building,
  BarChart3,
  Users
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
      <div className="page-header">
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
              style={{ padding: '6px 12px' }}
            >
              <option value="2026">AY 2025-2026 (Current)</option>
              <option value="2025">AY 2024-2025</option>
              <option value="2024">AY 2023-2024</option>
            </select>
            <button className="btn btn-primary btn-sm" onClick={() => handleDownloadReport('NBA')}>
              <Download size={14} />
              Export Report
            </button>
          </div>
        )}
      </div>

      {/* KPI Counters Grid */}
      <div className="applications-metrics-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Building size={20} />
          </div>
          <div>
            <span className="kpi-value">{data?.totalCompanies || 0}</span>
            <span className="kpi-label">Total Companies</span>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-primary)' }}>
            <Users size={20} />
          </div>
          <div>
            <span className="kpi-value">{data?.totalPlacements || 0}</span>
            <span className="kpi-label">Total Placements</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="analytics-grid-two">
        {/* Salary Ranges Histogram */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title">
            <BarChart3 size={16} style={{ color: 'var(--primary)' }} />
            <span>Package Distribution</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '10px 0' }}>
            {data?.packageDistribution && Object.entries(data.packageDistribution).map(([range, count]) => (
              <div key={range} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '80px', fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>{range}</span>
                <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (count / 250) * 100)}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
                </div>
                <span style={{ width: '30px', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', textAlign: 'right' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Demand */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title">
            <BarChart3 size={16} style={{ color: 'var(--accent)' }} />
            <span>Skill Demand (Frequency)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '10px 0' }}>
            {data?.skillDemand && Object.entries(data.skillDemand).map(([skill, count]) => (
              <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '80px', fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>{skill}</span>
                <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (count / 100) * 100)}%`, height: '100%', backgroundColor: 'var(--accent)' }}></div>
                </div>
                <span style={{ width: '30px', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', textAlign: 'right' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-grid-two">
        {/* Branch Distribution */}
        <div className="card" style={{ padding: 0 }}>
          <div className="card-title" style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--border)' }}>
            <span>Branch Distribution</span>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Placements</th>
                </tr>
              </thead>
              <tbody>
                {data?.branchDistribution && Object.entries(data.branchDistribution).map(([branch, count]) => (
                  <tr key={branch}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{branch}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Year-wise Trends */}
        <div className="card" style={{ padding: 0 }}>
          <div className="card-title" style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--border)' }}>
            <span>Year-wise Average Package Trends</span>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Avg. Package (LPA)</th>
                </tr>
              </thead>
              <tbody>
                {data?.yearWiseTrends && Object.entries(data.yearWiseTrends).map(([year, avg]) => (
                  <tr key={year}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{year}</td>
                    <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{avg} LPA</td>
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
