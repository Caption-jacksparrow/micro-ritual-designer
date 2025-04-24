import Card from '@/components/ui/Card';
import Link from 'next/link';

export default function Rituals() {
  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="mb-0">My Rituals</h1>
        <Link href="/create" className="btn-primary">
          Create New Ritual
        </Link>
      </div>
      
      <div className="mb-8">
        <div className="flex space-x-2 mb-6">
          <button className="px-3 py-1 bg-primary text-white rounded-full text-sm">All Rituals</button>
          <button className="px-3 py-1 bg-white border border-neutral rounded-full text-sm text-neutral-dark">Active</button>
          <button className="px-3 py-1 bg-white border border-neutral rounded-full text-sm text-neutral-dark">Paused</button>
          <button className="px-3 py-1 bg-white border border-neutral rounded-full text-sm text-neutral-dark">Archived</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="ritual-card" hoverable>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">Morning Threshold</h3>
              <span className="duration-indicator">30 sec</span>
            </div>
            <p className="text-neutral-dark mb-4">
              Touch doorframe, take three deep breaths, and set intention for the day.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <span className="value-tag">Presence</span>
                <span className="value-tag">Intention</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
          </Card>
          
          <Card className="ritual-card" hoverable>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">Midday Pause</h3>
              <span className="duration-indicator">1 min</span>
            </div>
            <p className="text-neutral-dark mb-4">
              Look out window, focus on distant object, take five deep breaths.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <span className="value-tag">Renewal</span>
                <span className="value-tag">Focus</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
          </Card>
          
          <Card className="ritual-card" hoverable>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">Work Closing</h3>
              <span className="duration-indicator">2 min</span>
            </div>
            <p className="text-neutral-dark mb-4">
              Write three accomplishments, close laptop while saying "Work is complete for today."
            </p>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <span className="value-tag">Boundaries</span>
                <span className="value-tag">Completion</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
          </Card>
          
          <Card className="ritual-card" hoverable>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">Gratitude Anchor</h3>
              <span className="duration-indicator">30 sec</span>
            </div>
            <p className="text-neutral-dark mb-4">
              When turning on kettle, name three things you're grateful for in this moment.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <span className="value-tag">Gratitude</span>
                <span className="value-tag">Awareness</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
          </Card>
          
          <Card className="ritual-card" hoverable>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">Evening Wind Down</h3>
              <span className="duration-indicator">3 min</span>
            </div>
            <p className="text-neutral-dark mb-4">
              Dim lights, light candle, and do gentle stretching before bed preparation.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <span className="value-tag">Rest</span>
                <span className="value-tag">Transition</span>
              </div>
              <span className="text-sm text-yellow-600 font-medium">Paused</span>
            </div>
          </Card>
          
          <Card className="ritual-card opacity-70" hoverable>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">Weekend Nature Connection</h3>
              <span className="duration-indicator">5 min</span>
            </div>
            <p className="text-neutral-dark mb-4">
              Sit outside with morning coffee, notice five natural elements around you.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <span className="value-tag">Nature</span>
                <span className="value-tag">Presence</span>
              </div>
              <span className="text-sm text-neutral-dark font-medium">Archived</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
