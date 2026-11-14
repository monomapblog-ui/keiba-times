export const metadata = { title: "確認メールを送信しました | 競馬タイムズ" };

export default function SignupConfirmPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-16 text-center">
      <h1 className="mb-4 font-serif text-xl font-bold text-neutral-900">確認メールを送信しました</h1>
      <p className="text-sm leading-relaxed text-neutral-600">
        ご入力いただいたメールアドレスに確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。
      </p>
    </div>
  );
}
