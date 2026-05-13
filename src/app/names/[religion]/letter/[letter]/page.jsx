import { redirect } from 'next/navigation';

export default function LetterLetterPage({ params }) {
  const religion = params?.religion || 'islamic';
  const letter = params?.letter || 'A';
  redirect(`/names/${religion}/letter/${letter.toUpperCase()}/1`);
}
