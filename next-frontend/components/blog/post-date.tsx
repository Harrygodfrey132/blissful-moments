import { format } from 'date-fns';

export default function PostDate({ dateString }: { dateString: string }) {
  const date = new Date(dateString); // Use JavaScript's Date instead of parseISO
  return <time dateTime={dateString}>{format(date, 'MMMM d, yyyy')}</time>;
}