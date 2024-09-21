import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="block transition duration-150 ease-in-out" aria-label="Cruip">
      <img src="/images/logo.png" alt="Company Logo" className="w-12 h-12" />
    </Link>
  );
}
