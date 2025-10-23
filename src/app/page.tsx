import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid gap-6">
      <section className="card">
        <h1 className="text-2xl font-bold">FE Knowledge Cards</h1>
        <p className="text-slate-300 mt-2">
          日本 基本情報技術者試験（FE）— 三语（中文 / 日本語 / English）知识卡片平台。
          通过卡片化学习 + 复习计划，帮助你高效备考。
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/cards" className="btn">Start Learning</Link>
          <Link href="/review" className="btn">Review Today</Link>
          <Link href="/graph" className="btn">Knowledge Graph</Link>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">What’s inside</h2>
        <ul className="mt-3 grid gap-2 list-disc list-inside text-slate-300">
          <li>三语题卡：中文 / 日本語 / English</li>
          <li>可翻转卡片：题面 / 解答</li>
          <li>收藏与复习标记</li>
          <li>本地持久化（localStorage + IndexedDB stub）</li>
          <li>示例知识图谱</li>
        </ul>
      </section>
    </div>
  );
}
