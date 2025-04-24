import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-light border-t border-neutral py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="text-primary text-xl font-semibold">Micro-Ritual</span>
              <span className="ml-1 text-secondary text-xl font-light">Designer</span>
            </Link>
            <p className="mt-2 text-sm text-neutral-dark">
              Create tiny, personalized daily rituals based on your values, schedule, and environment to build meaning into everyday moments.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-neutral-dark hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-neutral-dark hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-neutral-dark hover:text-primary transition-colors">
                  Example Rituals
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-neutral-dark hover:text-primary transition-colors">
                  Research
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-neutral-dark hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-dark hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-dark hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-neutral">
          <p className="text-sm text-neutral-dark text-center">
            &copy; {new Date().getFullYear()} Micro-Ritual Designer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
