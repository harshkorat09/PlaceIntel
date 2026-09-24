import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { placementService } from '../api/placementService';
import type { Placement } from '../api/types';

interface StudentJobsProps {
  studentId: string;
}

export function StudentJobs({ studentId }: StudentJobsProps) {
  const [drives, setDrives] = useState<Placement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        setIsLoading(true);
        const data = await placementService.getPlacements();
        setDrives(data);
      } catch (err) {
        setError('Failed to fetch placement drives.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrives();
  }, [studentId]);

  const filteredDrives = useMemo(() => {
    return drives.filter(drive => {
      const matchSearch = drive.companyName.toLowerCase().includes(search.toLowerCase()) ||
        drive.role.toLowerCase().includes(search.toLowerCase());
      const matchBranch = branchFilter ? drive.eligibleBranches.includes(branchFilter) : true;
      const matchSkill = skillFilter ? drive.requiredSkills.includes(skillFilter) : true;
      return matchSearch && matchBranch && matchSkill;
    });
  }, [drives, search, branchFilter, skillFilter]);

  if (isLoading) return <div style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>Loading opportunities...</div>;
  if (error) return <div style={{ padding: 'var(--space-xl)', color: 'var(--danger)', textAlign: 'center' }}>{error}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Placement Discovery</h1>
          <p className="page-subtitle">Explore active placement opportunities and review your AI-generated Fit Score.</p>
        </div>
      </div>

      {/* Filter search bar */}
      <div className="filters-bar" style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', backgroundColor: 'var(--card)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>

        <div className="filter-input-group" style={{ flex: 2, minWidth: '200px', display: 'flex', alignItems: 'center', backgroundColor: 'var(--background)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <Search size={16} style={{ color: 'var(--text-tertiary)', marginRight: '8px' }} />
          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }}
          />
        </div>

        <div className="filter-input-group" style={{ flex: 1, minWidth: '150px' }}>
          <select
            className="form-control"
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '13px', width: '100%' }}
          >
            <option value="">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="CE">CE</option>
            <option value="ECE">ECE</option>
          </select>
        </div>

        <div className="filter-input-group" style={{ flex: 1, minWidth: '150px' }}>
          <select
            className="form-control"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '13px', width: '100%' }}
          >
            <option value="">All Skills</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Algorithms">Algorithms</option>
            <option value="Java">Java</option>
            <option value="SQL">SQL</option>
          </select>
        </div>
      </div>

      {/* Drives Grid */}
      <div className="drives-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
        {filteredDrives.length === 0 ? (
          <div style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>
            No placement drives match your filters.
          </div>
        ) : (
          filteredDrives.map(drive => (
            <div key={drive.id} className="card drive-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

              <div className="drive-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="company-logo-badge" style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                    {drive.companyName[0]}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', margin: 0, color: 'var(--text-primary)' }}>{drive.companyName}</h3>
                    <p style={{ fontSize: '13px', margin: 0, color: 'var(--text-secondary)' }}>{drive.role}</p>
                  </div>
                </div>
                {drive.fitScore !== undefined && (
                  <div style={{ textAlign: 'right' }}>
                    <div className="badge badge-success" style={{ fontSize: '12px', padding: '4px 8px' }}>
                      Fit Score: {drive.fitScore}%
                    </div>
                  </div>
                )}
              </div>

              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {drive.description}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', padding: '12px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Package</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{drive.packageRange}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Deadline</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{new Date(drive.deadline).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Min CGPA</span>
                  <span style={{ fontWeight: 600, color: 'var(--danger)' }}>{drive.cgpaRequirement}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Branches</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{drive.eligibleBranches.join(', ')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {drive.requiredSkills.map(skill => (
                  <span key={skill} className="badge" style={{ fontSize: '10px', backgroundColor: 'var(--background)', color: 'var(--text-secondary)' }}>
                    {skill}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-secondary btn-sm">View Details</button>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
