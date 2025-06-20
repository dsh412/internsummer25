'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-blue-900 text-white py-16 px-6 md:px-20">
        <h1
          className={`${lusitana.className} text-3xl md:text-5xl font-bold`}
        >
          NHL Central Database
        </h1>
        <p className="mt-4 text-md md:text-xl max-w-xl text-blue-100">
          Search decades of NHL players, teams, and game history — all in one place.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center gap-3 rounded-lg bg-blue-500 px-6 py-3 text-sm md:text-base font-medium text-white transition-colors hover:bg-blue-400"
        >
          View Data
          <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
    </main>
  );
}
