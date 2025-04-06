import { AntDesignDemo } from '@/components/AntDesignDemo';

export default function AntDesignDemoPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Ant Design Demo</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        This page demonstrates the integration of Ant Design components with our React 19 + Next.js
        15 + Tailwind CSS + TypeScript stack.
      </p>

      <AntDesignDemo />

      <div className="mt-8 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-medium mb-2">Documentation</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          For more details on how to use Ant Design in this project, check out the
          <a href="/docs/ANT_DESIGN_GUIDE.md" className="text-blue-500 hover:underline ml-1">
            Ant Design Integration Guide
          </a>
        </p>
      </div>
    </main>
  );
}
