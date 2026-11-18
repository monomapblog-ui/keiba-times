export const metadata = {
  title: "競馬タイムズが選ばれる理由 | 競馬タイムズ",
  description: "人間の予想家の視点と、自分たちで検証した実データ。競馬タイムズが大切にしていること。",
};

const REASONS = [
  {
    title: "AIではなく、個性のある「人間の予想家」が斬る",
    body: "追分太一(血統・重賞分析)、万馬券平八(穴馬・高配当狙い)、佐藤恵子(パドック・地方競馬)。同じレースでも、視点が違えば予想はこんなに変わる。予想家それぞれの偏り・こだわりを隠さず出すのが競馬タイムズです。",
  },
  {
    title: "当たっても外れても、予想家自身が振り返る",
    body: "予想が外れたとき、多くのメディアは静かに次のレースへ進みます。競馬タイムズでは、予想家が自分の評価のどこが甘かったのかを正直に書く「振り返りコラム」を掲載しています。結果だけでなく、思考のプロセスごと公開します。",
  },
  {
    title: "統計コラムは全部、自分たちでJRA公式データを遡って検証",
    body: "「1番人気vs最低人気」「武豊39年検証」のようなデータコラムは、どこかの数字を引用するのではなく、JRA公式サイトのレース結果を1戦ずつ自分たちで集計して作っています。食い違いが見つかれば、訂正履歴ごと正直に公開します。",
  },
  {
    title: "煽らない、盛らない、ミニマルな設計",
    body: "派手な的中実績バナーや会員登録の煽りを並べるのではなく、中身で勝負するシンプルな設計にしています。情報を探しやすく、読みやすいことを何より優先しています。",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <p className="mb-2 text-xs font-bold text-emerald-800">ABOUT</p>
      <h1 className="mb-10 font-serif text-2xl font-bold leading-snug text-neutral-900">
        競馬タイムズが選ばれる理由
      </h1>

      <div className="flex flex-col gap-10">
        {REASONS.map((reason, i) => (
          <div key={reason.title} className="flex gap-5">
            <span className="shrink-0 font-serif text-2xl font-bold text-neutral-300">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="mb-2 font-serif text-lg font-bold text-neutral-900">{reason.title}</h2>
              <p className="text-sm leading-relaxed text-neutral-700">{reason.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
