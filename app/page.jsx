import Link from 'next/link';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';

export default async function HomePage() {

  const review = await getReviews();

  console.log('[HomePage] rendering');
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">
        Only the best indie games, reviewed for you.
      </p>
      <div className="bg-white border rounded shadow w-80
                      hover:shadow-xl sm:w-full">
        <Link href={`/reviews/${review[0].slug}`}>
            <img src={review[0].image} alt=""
              width="320" height="180" className="rounded-t"
            />
            <h2 className="font-orbitron font-semibold py-1 text-center">
              {review[0].title}
            </h2>
          </Link>
      </div>
    </>
  );
}
