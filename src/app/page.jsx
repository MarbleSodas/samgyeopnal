import Feed from '@/components/Feed'

export default function Home() {
  return (
    <section className="w-full flex-col flex-center">
      <div className="head_text orange_gradient text-center">
        <h1>Sam</h1>
        <h1>Gyeop</h1>
        <h1>Nal</h1>
      </div>
      <p className="desc text-center">Samgyeopnal is a place to rediscover, explore, and share home recipes</p>

      <Feed />
    </section>
  );
}
