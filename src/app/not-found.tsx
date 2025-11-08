import Link from 'next/link';
import { headers } from 'next/headers';

export default async function NotFound() {
  const headerList = await headers();
  const pathname =
    headerList.get('x-request-pathname') ??
    headerList.get('x-invoke-path') ??
    headerList.get('next-url') ??
    headerList.get('x-next-pathname') ??
    'unknown';

  console.error('404 Error: User attempted to access non-existent route:', pathname);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <Link href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

