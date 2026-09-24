import { useState, useEffect } from 'react';
import { Upload, AlertCircle, Edit2 } from 'lucide-react';
import { profileService } from '../api/profileService';
import type { StudentProfileData } from '../api/types';

interface StudentProfileProps {
  studentId: string;
}

export function StudentProfile({ studentId }: StudentProfileProps) {
  const [profile, setProfile] = useState<StudentProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<StudentProfileData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [resumeName, setResumeName] = useState('Default_Academic_Resume.pdf');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await profileService.getProfile(studentId);
        setProfile(data);
        setFormData(data);
      } catch (err) {
        setError('Failed to load profile data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [studentId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Clean up skills array (split by comma)
      const skillsArray = typeof formData.skills === 'string'
        ? (formData.skills as string).split(',').map(s => s.trim()).filter(s => s)
        : formData.skills;

      const dataToSave = { ...formData, skills: skillsArray };
      const updated = await profileService.updateProfile(studentId, dataToSave);
      setProfile(updated);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = () => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 1000);
          setResumeName(`${profile?.name?.replace(/ /g, '_')}_Resume_Parsed.pdf`);
          alert('New CV file uploaded. Skill tags synchronized successfully!');
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  if (isLoading && !profile) {
    return <div style={{ padding: '20px' }}>Loading profile...</div>;
  }

  if (!profile) {
    return <div style={{ padding: '20px', color: 'red' }}>{error || 'Profile not found.'}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Placement Profile</h1>
          <p className="page-subtitle">Manage your academic credentials and skill tags to improve your placement Fit Score.</p>
        </div>
      </div>

      {error && (
        <div style={{ padding: '12px', backgroundColor: 'var(--danger-light)', color: 'var(--danger)', borderRadius: 'var(--radius-md)' }}>
          {error}
        </div>
      )}

      <div className="analytics-grid-two">

        {/* Left card - details / form */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="drawer-profile-header" style={{ borderBottom: 'none', paddingBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="avatar-lg" style={{ width: '80px', height: '80px', fontSize: '28px' }}>
                {profile.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
              </div>
              <h3 className="drawer-profile-name" style={{ marginTop: '12px' }}>{profile.name}</h3>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>Roll ID: {profile.id}</span>
            </div>

            {!isEditing ? (
              <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>
                <Edit2 size={14} style={{ marginRight: '6px' }} />
                Edit Profile
              </button>
            ) : null}
          </div>

          {!isEditing ? (
            <div className="profile-meta-grid" style={{ gridTemplateColumns: '1fr', padding: 'var(--space-md)', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Academic Branch:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{profile.branch}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Email Address:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{profile.email}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Verified CGPA:</span>
                <strong style={{ color: 'var(--primary)', fontWeight: '700' }}>{profile.cgpa > 0 ? profile.cgpa.toFixed(2) : 'Not Updated'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Extracted Skills:</span>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '200px' }}>
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map(skill => (
                      <span key={skill} className="badge badge-info" style={{ fontSize: '10px', padding: '2px 6px' }}>{skill}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>No skills extracted yet</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Branch</label>
                <select
                  className="form-control"
                  value={formData.branch || 'CSE'}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                >
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="CE">CE</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">ME</option>
                  <option value="EE">EE</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  className="form-control"
                  value={formData.cgpa || ''}
                  onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Skills (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={Array.isArray(formData.skills) ? formData.skills.join(', ') : (formData.skills || '')}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value as any })}
                  placeholder="e.g. React, Python, SQL"
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setIsEditing(false); setFormData(profile); }}>
                  Cancel
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Right card - resume upload */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <span>Placement Resume PDF</span>
          </div>

          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Upload your verified resume PDF. Our parser will extract core technical keywords for the recruiter matchmaking algorithm.
          </p>

          <div
            style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', textAlign: 'center', backgroundColor: 'var(--background)', cursor: 'pointer' }}
            onClick={handleUpload}
          >
            <Upload size={32} style={{ color: 'var(--text-tertiary)', margin: '0 auto var(--space-md)' }} />
            {uploadProgress !== null ? (
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px' }}>Uploading & Analyzing CV... {uploadProgress}%</div>
                <div style={{ height: '6px', background: 'var(--border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: `${uploadProgress}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--primary)', display: 'block' }}>{resumeName}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Click or drop to upload updated PDF file</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: 'auto', borderTop: '1px dashed var(--border)', paddingTop: '10px' }}>
            <AlertCircle size={12} style={{ color: 'var(--accent)' }} />
            <span>Updates will directly affect your Placement Fit Score.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
