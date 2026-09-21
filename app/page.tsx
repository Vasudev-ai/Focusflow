'use client';

import dynamic from 'next/dynamic';

// Dynamically import the App component with ssr disabled to prevent SSR hydration mismatches with localStorage
const FocusFlowApp = dynamic(() => import('../src/App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-2 border-zinc-900 dark:border-zinc-100 border-t-transparent dark:border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-zinc-500 font-medium">Loading FocusFlow...</p>
      </div>
    </div>
  ),
});

export default function Page() {
  return <FocusFlowApp />;
}
