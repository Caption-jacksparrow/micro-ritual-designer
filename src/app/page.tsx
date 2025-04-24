import Link from 'next/link';

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Ordinary Moments Into <span className="text-primary">Meaningful Rituals</span>
          </h1>
          <p className="text-xl mb-8 text-neutral-dark">
            Create tiny, personalized daily rituals based on your values, schedule, and environment to build meaning into everyday moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create" className="btn-primary text-center">
              Create Your First Ritual
            </Link>
            <Link href="/guide" className="btn-outline text-center">
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-neutral-light dark:bg-neutral rounded-xl my-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Micro-Rituals Enhance Your Life</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="ritual-icon mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Design</h3>
              <p className="text-neutral-dark">
                Create rituals that align with your unique values, schedule constraints, and physical environment.
              </p>
            </div>
            
            <div className="card">
              <div className="ritual-icon mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Brief & Sustainable</h3>
              <p className="text-neutral-dark">
                Each micro-ritual takes just 1-5 minutes, making them easy to integrate into even the busiest days.
              </p>
            </div>
            
            <div className="card">
              <div className="ritual-icon mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Meaning Over Metrics</h3>
              <p className="text-neutral-dark">
                Focus on depth and significance rather than streaks or quantifiable outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Rituals Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Example Micro-Rituals</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="ritual-card">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Morning Threshold</h3>
                <span className="duration-indicator">30 sec</span>
              </div>
              <p className="text-neutral-dark mb-4">
                A brief practice of touching a specific object by your door before leaving home, paired with three conscious breaths and setting an intention for the day.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="value-tag">Presence</span>
                <span className="value-tag">Intention</span>
              </div>
            </div>
            
            <div className="ritual-card">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Work Transition</h3>
                <span className="duration-indicator">2 min</span>
              </div>
              <p className="text-neutral-dark mb-4">
                A short ritual to close your workday by writing down three things you completed, then physically closing your workspace or computer with a specific phrase.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="value-tag">Boundaries</span>
                <span className="value-tag">Completion</span>
              </div>
            </div>
            
            <div className="ritual-card">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Connection Moment</h3>
                <span className="duration-indicator">1 min</span>
              </div>
              <p className="text-neutral-dark mb-4">
                A daily practice of holding a meaningful object while sending thoughts to a loved one at the same time each day.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="value-tag">Connection</span>
                <span className="value-tag">Love</span>
              </div>
            </div>
            
            <div className="ritual-card">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Gratitude Anchor</h3>
                <span className="duration-indicator">30 sec</span>
              </div>
              <p className="text-neutral-dark mb-4">
                A ritual tied to a common daily activity (like turning on a kettle) that becomes a trigger for naming three specific things you appreciate in that moment.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="value-tag">Gratitude</span>
                <span className="value-tag">Awareness</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/examples" className="btn-outline">
              Explore More Examples
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary/10 rounded-xl my-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Own Micro-Ritual?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start small, stay consistent, and watch as tiny moments of intention transform your daily experience.
          </p>
          <Link href="/create" className="btn-primary">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
