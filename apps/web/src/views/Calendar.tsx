import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Clock, 
  Users, 
  AlertCircle,
  CalendarDays
} from 'lucide-react';

interface CalendarEvent {
  id: number;
  title: string;
  category: 'ppt' | 'test' | 'interview' | 'deadline';
  date: string; // YYYY-MM-DD
  day: number; // Day of August
  time: string;
  venue: string;
  target: string;
  notes: string;
}

export const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'TCS Ninja Drive Open',
    category: 'deadline',
    date: '2026-08-01',
    day: 1,
    time: '10:00 AM',
    venue: 'PlaceIntel Portal',
    target: 'All CSPIT & DEPSTAR Branches',
    notes: 'Registration window opens for standard and D2D students.'
  },
  {
    id: 2,
    title: 'Google SDE Registration Deadline',
    category: 'deadline',
    date: '2026-08-02',
    day: 2,
    time: '11:59 PM',
    venue: 'Google Careers portal',
    target: 'CSE / IT / CE (Cutoff >= 8.0 CGPA)',
    notes: 'Submit verified resume files and GPAs.'
  },
  {
    id: 3,
    title: 'Microsoft PM Resume Screen',
    category: 'interview',
    date: '2026-08-03',
    day: 3,
    time: '02:00 PM',
    venue: 'T&P Office',
    target: 'Selected Candidates list',
    notes: 'Initial profile vetting and shortlist release.'
  },
  {
    id: 4,
    title: 'Goldman Sachs PPT Talk',
    category: 'ppt',
    date: '2026-08-04',
    day: 4,
    time: '11:00 AM',
    venue: 'CHARUSAT Auditorium 1',
    target: 'Open to All Branches (UG & PG)',
    notes: 'Pre-Placement Talk covering systems analyst profiles and internship stipends.'
  },
  {
    id: 5,
    title: 'TCS Ninja Online Test',
    category: 'test',
    date: '2026-08-05',
    day: 5,
    time: '09:00 AM',
    venue: 'CSPIT CC Lab 1 & 2',
    target: 'Registered Candidates',
    notes: 'Cognitive aptitude and programming challenge.'
  },
  {
    id: 6,
    title: 'Google SDE Online Assessment',
    category: 'test',
    date: '2026-08-12',
    day: 12,
    time: '04:00 PM',
    venue: 'HackerRank platform',
    target: 'Eligible shortlist (CGPA >= 8.0)',
    notes: 'Two coding challenges on arrays, graphs, and dynamic programming.'
  },
  {
    id: 7,
    title: 'Microsoft PM Final Interviews',
    category: 'interview',
    date: '2026-08-18',
    day: 18,
    time: '09:30 AM',
    venue: 'Online Teams Panel',
    target: 'Shortlisted candidates',
    notes: 'Product design, case study, and HR rounds.'
  },
  {
    id: 8,
    title: 'Goldman Sachs Tech Round 1',
    category: 'interview',
    date: '2026-08-25',
    day: 25,
    time: '10:00 AM',
    venue: 'DEPSTAR Seminar Hall',
    target: 'Cleared assessment candidates',
    notes: 'Face-to-face round covering DS, DBMS, and OOP concepts.'
  }
];

// Calendar grid setup for August 2026
// August 1, 2026 is Saturday.
// We offset 6 empty cells on the grid (Sun, Mon, Tue, Wed, Thu, Fri are July dates)
const offsetDays = 6;
const daysInAugust = 31;
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({ role = 'officer' }: { role?: 'officer' | 'student' }) {
  const isAdmin = role === 'officer';
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  
  // Selected Day & Selected Event State
  const [selectedDay, setSelectedDay] = useState<number>(5);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(5);

  // Form Panel Toggle
  const [isFormOpen, setIsFormOpen] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<'ppt' | 'test' | 'interview' | 'deadline'>('ppt');
  const [newEventDay, setNewEventDay] = useState('15');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventVenue, setNewEventVenue] = useState('');
  const [newEventTarget, setNewEventTarget] = useState('');
  const [newEventNotes, setNewEventNotes] = useState('');

  // Handle Event Creation
  const handleScheduleEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventTime || !newEventVenue) {
      alert('Please fill out all required fields.');
      return;
    }

    const dayNum = parseInt(newEventDay);
    const dateStr = `2026-08-${dayNum.toString().padStart(2, '0')}`;

    const eventObj: CalendarEvent = {
      id: events.length + 1,
      title: newEventTitle,
      category: newEventCategory,
      date: dateStr,
      day: dayNum,
      time: newEventTime,
      venue: newEventVenue,
      target: newEventTarget || 'All Eligible Students',
      notes: newEventNotes || 'No notes provided.'
    };

    setEvents([...events, eventObj]);
    setSelectedDay(dayNum);
    setSelectedEventId(eventObj.id);

    // Reset Form fields
    setNewEventTitle('');
    setNewEventCategory('ppt');
    setNewEventDay('15');
    setNewEventTime('');
    setNewEventVenue('');
    setNewEventTarget('');
    setNewEventNotes('');
    setIsFormOpen(false);
  };

  const handleSendAlert = (eventTitle: string) => {
    alert(`Broadcasting push notification & email reminders for "${eventTitle}" to all eligible candidate profiles...`);
  };

  // Get active day events
  const activeDayEvents = events.filter(e => e.day === selectedDay);
  const selectedEvent = events.find(e => e.id === selectedEventId);

  // Calendar cells generation
  const renderCalendarCells = () => {
    const cells = [];
    
    // July trailing dates
    for (let i = offsetDays; i > 0; i--) {
      const prevDay = 31 - i + 1;
      cells.push(
        <div key={`july-${prevDay}`} className="calendar-day-cell outside">
          <span className="calendar-day-number">{prevDay}</span>
        </div>
      );
    }

    // August dates
    for (let dayNum = 1; dayNum <= daysInAugust; dayNum++) {
      const dayEvents = events.filter(e => e.day === dayNum);
      const isToday = dayNum === 5; // Let's mock "today" as August 5th (TCS test date)

      cells.push(
        <div 
          key={`august-${dayNum}`} 
          className={`calendar-day-cell ${isToday ? 'today' : ''}`}
          onClick={() => {
            setSelectedDay(dayNum);
            if (dayEvents.length > 0) {
              setSelectedEventId(dayEvents[0].id);
            } else {
              setSelectedEventId(null);
            }
          }}
          style={{ border: selectedDay === dayNum ? '1px solid var(--primary)' : '1px solid var(--border)' }}
        >
          <span className="calendar-day-number">{dayNum}</span>
          
          <div className="calendar-event-pills-list">
            {dayEvents.map(ev => (
              <span 
                key={ev.id} 
                className={`calendar-event-pill ${ev.category}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDay(dayNum);
                  setSelectedEventId(ev.id);
                }}
                title={ev.title}
              >
                {ev.title}
              </span>
            ))}
          </div>
        </div>
      );
    }

    // September leading dates
    const totalCells = cells.length;
    const remaining = 42 - totalCells; // 6 rows grid
    for (let i = 1; i <= remaining; i++) {
      cells.push(
        <div key={`september-${i}`} className="calendar-day-cell outside">
          <span className="calendar-day-number">{i}</span>
        </div>
      );
    }

    return cells;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Placement Calendar</h1>
          <p className="page-subtitle">Schedule Pre-Placement Talks (PPT), program online assessments, and trace interview timelines.</p>
        </div>
        {isAdmin && (
          <button 
            className="btn btn-primary"
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            <Plus size={16} />
            {isFormOpen ? 'Close Form' : 'Schedule Placement Event'}
          </button>
        )}
      </div>

      {/* Main layout */}
      <div className="calendar-layout">
        
        {/* Left Calendar Grid */}
        <div className="calendar-grid-container">
          
          {/* Calendar Navigation header */}
          <div className="calendar-month-header">
            <span className="calendar-month-title">August 2026</span>
            <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
              <button className="icon-btn" onClick={() => alert('Viewing July 2026')}>
                <ChevronLeft size={16} />
              </button>
              <button className="icon-btn" onClick={() => alert('Viewing September 2026')}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday headers & days grid */}
          <div className="calendar-grid">
            {weekDays.map(day => (
              <div key={day} className="calendar-weekday-header">{day}</div>
            ))}
            {renderCalendarCells()}
          </div>

        </div>

        {/* Right Detail Sidebar */}
        {!isFormOpen && (
          <div className="card application-drawer-pane" style={{ position: 'static', width: '360px', boxShadow: 'none', border: '1px solid var(--border)' }}>
            <div className="card-title" style={{ display: 'flex', gap: '6px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)' }}>
              <CalendarDays size={16} style={{ color: 'var(--primary)' }} />
              <span>Agenda for August {selectedDay}</span>
            </div>

            {activeDayEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-xl) var(--space-md)' }}>
                <AlertCircle size={28} style={{ color: 'var(--text-tertiary)', margin: '0 auto var(--space-sm)' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block' }}>No recruitment events scheduled on this day.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-sm)' }}>
                
                {/* Day Agenda List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                  <span className="detail-label">Today's Schedule</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {activeDayEvents.map(ev => (
                      <div 
                        key={ev.id}
                        className="recruiter-row"
                        style={{ padding: '8px 12px', cursor: 'pointer', border: selectedEventId === ev.id ? '1px solid var(--primary)' : '1px solid var(--border)' }}
                        onClick={() => setSelectedEventId(ev.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                          <span className={`calendar-event-pill ${ev.category}`} style={{ width: '12px', height: '12px', padding: 0, borderRadius: 'var(--radius-full)' }}></span>
                          <span style={{ fontWeight: '600', fontSize: '12.5px', color: 'var(--text-primary)' }}>{ev.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Event Details Panel */}
                {selectedEvent && (
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="detail-label">Active Event</span>
                      <span style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>{selectedEvent.title}</span>
                      <span className={`badge ${selectedEvent.category}`} style={{ width: 'fit-content', marginTop: 'var(--space-xs)', fontSize: '10px' }}>
                        {selectedEvent.category.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={12} style={{ color: 'var(--text-tertiary)' }} />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={12} style={{ color: 'var(--text-tertiary)' }} />
                        <span>{selectedEvent.venue}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={12} style={{ color: 'var(--text-tertiary)' }} />
                        <span>{selectedEvent.target}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                      <span className="detail-label">Event Description</span>
                      <div className="resume-text-box" style={{ maxHeight: '100px', fontSize: '12px', lineHeight: '1.5' }}>
                        {selectedEvent.notes}
                      </div>
                    </div>

                    {/* Action buttons — admin only */}
                    {isAdmin && (
                      <div style={{ display: 'flex', gap: 'var(--space-xs)', marginTop: 'var(--space-sm)' }}>
                        <button 
                          className="btn btn-secondary btn-sm"
                          style={{ flex: 1, padding: '6px' }}
                          onClick={() => alert(`Opening rescheduling panel for ${selectedEvent.title}...`)}
                        >
                          Reschedule
                        </button>
                        <button 
                          className="btn btn-primary btn-sm"
                          style={{ flex: 1, padding: '6px', backgroundColor: 'var(--secondary)' }}
                          onClick={() => handleSendAlert(selectedEvent.title)}
                        >
                          Broadcast Alert
                        </button>
                      </div>
                    )}

                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* Schedule Placement Event Panel Form — admin only */}
        {isAdmin && isFormOpen && (
          <div className="card drives-form-pane" style={{ position: 'static', width: '360px', boxShadow: 'none', border: '1px solid var(--border)' }}>
            <div className="card-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)' }}>
              <span>Schedule Placement Event</span>
            </div>

            <form onSubmit={handleScheduleEvent} style={{ marginTop: 'var(--space-md)' }}>
              
              <div className="form-group">
                <label className="form-label">Event Title *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Google HR Interview Panel" 
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Event Category *</label>
                <select 
                  className="form-control"
                  value={newEventCategory}
                  onChange={(e) => setNewEventCategory(e.target.value as any)}
                >
                  <option value="ppt">Pre-Placement Talk (PPT)</option>
                  <option value="test">Online Assessment (OA)</option>
                  <option value="interview">Interview Round</option>
                  <option value="deadline">Registration Deadline</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Day of August (1-31) *</label>
                  <input 
                    type="number" 
                    min="1"
                    max="31"
                    className="form-control" 
                    value={newEventDay}
                    onChange={(e) => setNewEventDay(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Event Time *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. 02:00 PM"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Venue / Link *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. CC Lab 3 or Teams Link" 
                  value={newEventVenue}
                  onChange={(e) => setNewEventVenue(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Audience</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. DEPSTAR CSE & IT students" 
                  value={newEventTarget}
                  onChange={(e) => setNewEventTarget(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Coordinator Notes</label>
                <textarea 
                  className="form-control" 
                  placeholder="Additional notes for students or HR panels..." 
                  value={newEventNotes}
                  onChange={(e) => setNewEventNotes(e.target.value)}
                  rows={2}
                  style={{ fontFamily: 'var(--font-sans)', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setIsFormOpen(false)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                >
                  Save Event
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
