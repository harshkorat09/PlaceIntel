import { useEffect, useState } from 'react';
import { placementService } from '../api/placementService';
import type { Placement } from '../api/types';

export default function PlacementCalendar() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await placementService.getPlacements();
        // Sort by deadline ascending
        const sorted = data
          .filter(p => p.deadline)
          .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        setPlacements(sorted);
      } catch (e) {
        setError('Failed to load placement calendar');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-space-xl text-center">Loading calendar...</div>;
  }
  if (error) {
    return <div className="p-space-xl text-danger">{error}</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto p-space-xl">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-space-md">Placement Calendar</h1>
      {placements.length === 0 ? (
        <div className="text-center text-secondary">No upcoming placement deadlines.</div>
      ) : (
        <div className="grid gap-space-md md:grid-cols-2 lg:grid-cols-3">
          {placements.map(p => (
            <div key={p.id} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-title-sm text-title-sm text-primary">{p.companyName}</span>
                <span className="font-label-regular text-label-regular text-secondary">{new Date(p.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="font-body-md text-body-md text-secondary">{p.role}</div>
              <div className="mt-space-xs font-label-regular text-label-regular text-primary">Package: {p.packageRange}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
