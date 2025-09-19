import Results from '@/components/Results';

export const dynamic = 'force-dynamic'; // prevents static build

export default async function Home() {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    console.error('API_KEY is missing');
    return <div>API Key is missing</div>;
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    const results = data.results;

    return (
      <div>
        <Results results={results} />
      </div>
    );
  } catch (err) {
    console.error(err);
    return <div>Failed to load data</div>;
  }
}
