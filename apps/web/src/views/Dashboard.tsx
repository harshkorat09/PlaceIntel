import { 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Coins,
  Sparkles,
  Lightbulb,
  Send,
  Calendar as CalendarIcon,
  Upload,
  ArrowUpRight,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Welcome Section */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, Dr. Amit</h1>
          <p className="page-subtitle">Here is the active summary for the 2026 Placement Season. Today is {currentDate}.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <button className="btn btn-secondary btn-sm">Export Report</button>
          <button className="btn btn-primary btn-sm">AI Season Predictor</button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        {/* Placed Students */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Placed Students</span>
            <div className="kpi-icon-container" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Users size={16} />
            </div>
          </div>
          <div>
            <div className="kpi-value">631 / 842</div>
            <div className="kpi-trend up" style={{ marginTop: '4px' }}>
              <ArrowUpRight size={14} />
              <span>74.9% complete</span>
            </div>
          </div>
        </div>

        {/* Recruiter Partners */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Active Recruiters</span>
            <div className="kpi-icon-container" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--secondary)' }}>
              <Building2 size={16} />
            </div>
          </div>
          <div>
            <div className="kpi-value">156</div>
            <div className="kpi-trend up" style={{ marginTop: '4px' }}>
              <ArrowUpRight size={14} />
              <span>+12 new this month</span>
            </div>
          </div>
        </div>

        {/* Placement Drives */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Placement Drives</span>
            <div className="kpi-icon-container" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
              <Briefcase size={16} />
            </div>
          </div>
          <div>
            <div className="kpi-value">56</div>
            <div className="kpi-trend up" style={{ marginTop: '4px' }}>
              <span>8 ongoing · 14 upcoming</span>
            </div>
          </div>
        </div>

        {/* Placement Rate */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Placement Rate</span>
            <div className="kpi-icon-container" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <div className="kpi-value">75.0%</div>
            <div className="kpi-trend up" style={{ marginTop: '4px' }}>
              <ArrowUpRight size={14} />
              <span>+3.2% vs last year</span>
            </div>
          </div>
        </div>

        {/* Highest Package */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Highest Package</span>
            <div className="kpi-icon-container" style={{ backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }}>
              <Award size={16} />
            </div>
          </div>
          <div>
            <div className="kpi-value">₹48.5 LPA</div>
            <div className="kpi-trend neutral" style={{ marginTop: '4px' }}>
              <span>Offered by Amazon</span>
            </div>
          </div>
        </div>

        {/* Average Package */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Average Package</span>
            <div className="kpi-icon-container" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
              <Coins size={16} />
            </div>
          </div>
          <div>
            <div className="kpi-value">₹12.4 LPA</div>
            <div className="kpi-trend up" style={{ marginTop: '4px' }}>
              <ArrowUpRight size={14} />
              <span>+14.8% increase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Analytics Block */}
      <div className="dashboard-grid">
        {/* Left Column (Charts, Placement Drives, Recent Placements) */}
        <div className="left-column">
          {/* Placement Trend Chart */}
          <div className="card">
            <div className="card-title">
              <span>Placement Velocity Curve</span>
              <span style={{ fontSize: '12px', fontWeight: 'normal', color: 'var(--text-secondary)' }}>Cumulative offers over time</span>
            </div>
            
            <div className="chart-container">
              {/* Responsive SVG Spline Curve */}
              <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal Grid lines */}
                <line x1="40" y1="25.8" x2="580" y2="25.8" stroke="var(--border)" strokeDasharray="3,3" />
                <line x1="40" y1="60.3" x2="580" y2="60.3" stroke="var(--border)" strokeDasharray="3,3" />
                <line x1="40" y1="99.2" x2="580" y2="99.2" stroke="var(--border)" strokeDasharray="3,3" />
                <line x1="40" y1="147.6" x2="580" y2="147.6" stroke="var(--border)" strokeDasharray="3,3" />
                <line x1="40" y1="170" x2="580" y2="170" stroke="var(--border)" strokeWidth="1" />
                
                {/* Area under the path */}
                <path 
                  d="M 40,170 C 40,170 80,159.7 117,147.6 C 154,135.5 174,129.8 194,129.8 C 214,129.8 251,119.7 271,119.7 C 291,119.7 328,99.2 348,99.2 C 368,99.2 405,60.3 425,60.3 C 445,60.3 482,42 502,42 C 522,42 560,25.8 580,25.8 L 580,170 Z" 
                  fill="url(#chartGradient)" 
                />
                
                {/* Curve line */}
                <path 
                  d="M 40,170 C 40,170 80,159.7 117,147.6 C 154,135.5 174,129.8 194,129.8 C 214,129.8 251,119.7 271,119.7 C 291,119.7 328,99.2 348,99.2 C 368,99.2 405,60.3 425,60.3 C 445,60.3 482,42 502,42 C 522,42 560,25.8 580,25.8" 
                  fill="none" 
                  stroke="var(--primary)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />

                {/* Point Circles */}
                <circle cx="40" cy="170" r="4" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="117" cy="147.6" r="4" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="194" cy="129.8" r="4" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="271" cy="119.7" r="4" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="348" cy="99.2" r="4" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="425" cy="60.3" r="4" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="502" cy="42" r="4" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                <circle cx="580" cy="25.8" r="4" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                
                {/* Labels (Months) */}
                <text x="40" y="190" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">Sep</text>
                <text x="117" y="190" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">Oct</text>
                <text x="194" y="190" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">Nov</text>
                <text x="271" y="190" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">Dec</text>
                <text x="348" y="190" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">Jan</text>
                <text x="425" y="190" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">Feb</text>
                <text x="502" y="190" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">Mar</text>
                <text x="580" y="190" fontSize="10" fill="var(--text-secondary)" textAnchor="middle">Apr</text>
                
                {/* Values y-axis labels */}
                <text x="30" y="30" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">600</text>
                <text x="30" y="65" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">450</text>
                <text x="30" y="103" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">300</text>
                <text x="30" y="151" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">150</text>
                <text x="30" y="174" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">0</text>
              </svg>
            </div>
          </div>

          {/* Upcoming Placement Drives */}
          <div className="card">
            <div className="card-title">
              <span>Upcoming Placement Drives</span>
              <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }}>View Calendar</button>
            </div>
            
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Compensation</th>
                    <th>Drive Date</th>
                    <th>Eligibility</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: '500' }}>Google India</td>
                    <td>Software Engineer</td>
                    <td>₹32.0 LPA</td>
                    <td>Aug 12, 2026</td>
                    <td>CSE, IT (CGPA &gt; 8.0)</td>
                    <td><span className="badge badge-info">Registration Open</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '500' }}>Microsoft</td>
                    <td>Program Manager</td>
                    <td>₹28.0 LPA</td>
                    <td>Aug 18, 2026</td>
                    <td>All Branches (CGPA &gt; 7.5)</td>
                    <td><span className="badge badge-info">Shortlisting</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '500' }}>Goldman Sachs</td>
                    <td>Systems Analyst</td>
                    <td>₹22.0 LPA</td>
                    <td>Aug 25, 2026</td>
                    <td>CSE, IT, ECE</td>
                    <td><span className="badge badge-warning">PPT Uploaded</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '500' }}>Deloitte US</td>
                    <td>Technology Consultant</td>
                    <td>₹14.0 LPA</td>
                    <td>Sep 02, 2026</td>
                    <td>All Branches</td>
                    <td><span className="badge badge-success">Schedule Confirmed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Placements */}
          <div className="card">
            <div className="card-title">
              <span>Recent Placement Offers</span>
              <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }}>See All</button>
            </div>
            
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Department</th>
                    <th>Selected By</th>
                    <th>CTC Offered</th>
                    <th>Verification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: '500' }}>Rohan Sharma</td>
                    <td>CSE</td>
                    <td>Google India</td>
                    <td>₹32.0 LPA</td>
                    <td><span className="badge badge-success">Offer Accepted</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '500' }}>Priya Patel</td>
                    <td>IT</td>
                    <td>Microsoft</td>
                    <td>₹28.0 LPA</td>
                    <td><span className="badge badge-success">Offer Accepted</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '500' }}>Aman Verma</td>
                    <td>ECE</td>
                    <td>Deloitte US</td>
                    <td>₹14.0 LPA</td>
                    <td><span className="badge badge-warning">Pending Approval</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '500' }}>Sneha Reddy</td>
                    <td>CSE</td>
                    <td>Goldman Sachs</td>
                    <td>₹22.0 LPA</td>
                    <td><span className="badge badge-success">Offer Accepted</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '500' }}>Vikram Singh</td>
                    <td>ME</td>
                    <td>Tata Motors</td>
                    <td>₹8.5 LPA</td>
                    <td><span className="badge badge-info">Interview Cleared</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (AI Insights, Quick Actions, Department Placements, Outreach, Activity Log) */}
        <div className="right-column">
          
          {/* Quick Actions */}
          <div className="card">
            <div className="card-title">Quick Actions</div>
            <div className="quick-actions-grid">
              <div className="action-tile">
                <CalendarIcon />
                <span>Schedule Drive</span>
              </div>
              <div className="action-tile">
                <Building2 />
                <span>Add Recruiter</span>
              </div>
              <div className="action-tile">
                <Upload />
                <span>Upload Students</span>
              </div>
              <div className="action-tile">
                <Sparkles />
                <span>AI Campaign</span>
              </div>
            </div>
          </div>

          {/* AI Insights Widget */}
          <div className="card ai-insights-widget">
            <div className="ai-header">
              <Sparkles size={16} className="ai-sparkle" />
              <span>PlaceIntel AI Insights</span>
            </div>
            
            <div className="ai-insight-card">
              <Lightbulb size={16} className="ai-insight-icon" />
              <div className="ai-insight-text">
                <strong>ECE Interview Prep Needed:</strong> Electronics (ECE) students show an 83.2% placement rate, lagging 11% behind CSE. Action recommended: Run SDE interview bootcamps before the Aug 25 Intel drive.
              </div>
            </div>

            <div className="ai-insight-card">
              <TrendingUp size={16} className="ai-insight-icon" style={{ color: 'var(--accent)' }} />
              <div className="ai-insight-text">
                <strong>Fintech Boost:</strong> The average CTC has risen by <strong>₹1.6 LPA</strong> (14.8% increase) driven by high-value fintech partner recruitment.
              </div>
            </div>

            <div className="ai-insight-card">
              <Clock size={16} className="ai-insight-icon" style={{ color: 'var(--primary)' }} />
              <div className="ai-insight-text">
                <strong>Predictive Placement Rate:</strong> AI models project a season-end final placement rate of <strong>89.5%</strong>, pacing 4.1% ahead of last season.
              </div>
            </div>
          </div>

          {/* Department-wise Placements */}
          <div className="card">
            <div className="card-title">Department Placements</div>
            <div className="dept-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              
              {/* DEPSTAR Section */}
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-xs)' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  DEPSTAR (Devang Patel Institute)
                </span>
              </div>
              
              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>Computer Science & Eng. (CSE)</span>
                  <span className="dept-value">120/125 · 96.0%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '96.0%', backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>

              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>Information Technology (IT)</span>
                  <span className="dept-value">118/130 · 90.7%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '90.7%', backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>

              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>Computer Engineering (CE)</span>
                  <span className="dept-value">88/95 · 92.6%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '92.6%', backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>

              {/* CSPIT Section */}
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-xs)', marginTop: 'var(--space-sm)' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  CSPIT (Chandubhai S. Patel Institute)
                </span>
              </div>

              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>Computer Science & Eng. (CSE)</span>
                  <span className="dept-value">165/180 · 91.6%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '91.6%', backgroundColor: 'var(--secondary)' }}></div>
                </div>
              </div>

              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>Information Technology (IT)</span>
                  <span className="dept-value">92/105 · 87.6%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '87.6%', backgroundColor: 'var(--secondary)' }}></div>
                </div>
              </div>

              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>Computer Engineering (CE)</span>
                  <span className="dept-value">110/125 · 88.0%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '88.0%', backgroundColor: 'var(--secondary)' }}></div>
                </div>
              </div>

              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>AI & ML Engineering</span>
                  <span className="dept-value">42/45 · 93.3%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '93.3%', backgroundColor: 'var(--accent)' }}></div>
                </div>
              </div>

              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>Electronics & Comm. (EC)</span>
                  <span className="dept-value">154/185 · 83.2%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '83.2%', backgroundColor: 'var(--secondary)' }}></div>
                </div>
              </div>

              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>Mechanical Engineering (ME)</span>
                  <span className="dept-value">72/125 · 57.6%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '57.6%', backgroundColor: 'var(--secondary)' }}></div>
                </div>
              </div>

              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>Electrical Engineering (EE)</span>
                  <span className="dept-value">42/92 · 45.6%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '45.6%', backgroundColor: 'var(--secondary)' }}></div>
                </div>
              </div>

              <div className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>Civil Engineering (CL)</span>
                  <span className="dept-value">22/55 · 40.0%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '40.0%', backgroundColor: 'var(--secondary)' }}></div>
                </div>
              </div>

            </div>
          </div>

          {/* Email Automation Campaigns Summary */}
          <div className="card">
            <div className="card-title">
              <span>Outreach Automation</span>
              <Send size={14} style={{ color: 'var(--text-secondary)' }} />
            </div>
            
            <div className="email-campaign-list">
              <div className="campaign-item">
                <div className="campaign-info">
                  <span className="campaign-name">Recruiter Outreach (Batch 2)</span>
                  <span className="campaign-meta">Sent to 45 company HRs</span>
                </div>
                <div className="campaign-stats">
                  <div className="stat-block">
                    <span className="stat-num">28</span>
                    <span className="stat-label">Opened</span>
                  </div>
                  <div className="stat-block">
                    <span className="stat-num" style={{ color: 'var(--accent)' }}>12</span>
                    <span className="stat-label">Replied</span>
                  </div>
                </div>
              </div>

              <div className="campaign-item">
                <div className="campaign-info">
                  <span className="campaign-name">Google Eligibility Notice</span>
                  <span className="campaign-meta">Sent to 112 students</span>
                </div>
                <div className="campaign-stats">
                  <div className="stat-block">
                    <span className="stat-num">105</span>
                    <span className="stat-label">Opened</span>
                  </div>
                  <div className="stat-block">
                    <span className="stat-num" style={{ color: 'var(--primary)' }}>98</span>
                    <span className="stat-label">Applied</span>
                  </div>
                </div>
              </div>

              <div className="campaign-item">
                <div className="campaign-info">
                  <span className="campaign-name">Pre-Placement Talk Invite</span>
                  <span className="campaign-meta">Sent to 842 students</span>
                </div>
                <div className="campaign-stats">
                  <div className="stat-block">
                    <span className="stat-num">780</span>
                    <span className="stat-label">Opened</span>
                  </div>
                  <div className="stat-block">
                    <span className="stat-num" style={{ color: 'var(--primary)' }}>550</span>
                    <span className="stat-label">Attending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="card">
            <div className="card-title">Recent Activity</div>
            <div className="list-feed">
              <div className="feed-item">
                <div className="feed-marker primary"></div>
                <div className="feed-content">
                  <div className="feed-title">Microsoft SDE-1 Drive scheduled for Aug 18, 2026.</div>
                  <div className="feed-time">2 hours ago · by Amit Das</div>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-marker accent"></div>
                <div className="feed-content">
                  <div className="feed-title">14 new student profiles approved for eligibility.</div>
                  <div className="feed-time">4 hours ago · by System Bot</div>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-marker primary"></div>
                <div className="feed-content">
                  <div className="feed-title">Amazon India registered for campus recruitment visit.</div>
                  <div className="feed-time">1 day ago · by Amit Das</div>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-marker warning"></div>
                <div className="feed-content">
                  <div className="feed-title">5 new placement offers confirmed for Deloitte.</div>
                  <div className="feed-time">1 day ago · by Neha Shah</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
