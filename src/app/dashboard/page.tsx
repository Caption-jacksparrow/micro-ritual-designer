import Card from '@/components/ui/Card';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="fade-in">
      <h1>Your Ritual Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-primary/10">
          <h3 className="text-xl font-semibold mb-2">Today's Rituals</h3>
          <p className="text-2xl font-bold">3</p>
          <p className="text-sm text-neutral-dark">2 completed, 1 upcoming</p>
        </Card>
        
        <Card className="bg-secondary/10">
          <h3 className="text-xl font-semibold mb-2">Active Rituals</h3>
          <p className="text-2xl font-bold">5</p>
          <p className="text-sm text-neutral-dark">Out of 8 total rituals</p>
        </Card>
        
        <Card className="bg-accent/10">
          <h3 className="text-xl font-semibold mb-2">Reflection Streak</h3>
          <p className="text-2xl font-bold">7 days</p>
          <p className="text-sm text-neutral-dark">Last reflection: Yesterday</p>
        </Card>
      </div>
      
      <h2 className="mb-4">Today's Schedule</h2>
      <div className="space-y-4 mb-8">
        <Card className="border-l-4 border-l-green-500">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">Morning Threshold</h3>
              <p className="text-neutral-dark">As you leave home</p>
            </div>
            <div className="text-right">
              <span className="duration-indicator">30 sec</span>
              <p className="text-sm text-green-600 font-medium">Completed at 8:32 AM</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">Midday Pause</h3>
              <p className="text-neutral-dark">Before lunch</p>
            </div>
            <div className="text-right">
              <span className="duration-indicator">1 min</span>
              <p className="text-sm text-green-600 font-medium">Completed at 12:15 PM</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-l-primary">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">Work Closing</h3>
              <p className="text-neutral-dark">End of workday</p>
            </div>
            <div className="text-right">
              <span className="duration-indicator">2 min</span>
              <p className="text-sm text-primary font-medium">Upcoming at 5:30 PM</p>
            </div>
          </div>
        </Card>
      </div>
      
      <h2 className="mb-4">Recent Reflections</h2>
      <div className="space-y-4 mb-8">
        <Card>
          <p className="text-neutral-dark italic">
            "The morning threshold ritual helped me feel more centered today. I noticed I was less reactive in my first meeting."
          </p>
          <p className="text-sm text-neutral-dark mt-2">Yesterday</p>
        </Card>
        
        <Card>
          <p className="text-neutral-dark italic">
            "Struggled to maintain presence during the midday pause. Mind kept wandering to project deadlines."
          </p>
          <p className="text-sm text-neutral-dark mt-2">2 days ago</p>
        </Card>
      </div>
      
      <div className="flex justify-between">
        <Link href="/rituals" className="btn-outline">
          View All Rituals
        </Link>
        <Link href="/create" className="btn-primary">
          Create New Ritual
        </Link>
      </div>
    </div>
  );
}
