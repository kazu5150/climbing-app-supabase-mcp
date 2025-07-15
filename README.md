# ClimbTracker

クライミング記録を管理するWebアプリケーションです。ルートの記録、統計の表示、進歩の追跡ができます。

## 特徴

- ✅ クライミング記録のCRUD操作（作成・読み取り・更新・削除）
- ✅ 検索・フィルタリング機能
- ✅ 統計情報とダッシュボード
- ✅ レスポンシブデザイン
- ✅ Supabaseデータベース統合
- ✅ TypeScript対応

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **データベース**: Supabase
- **状態管理**: React Context + useReducer
- **フォーム**: React Hook Form + Zod
- **言語**: TypeScript

## セットアップ

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **Supabaseプロジェクトの設定**
   - [Supabase](https://supabase.com)でプロジェクトを作成
   - SQLエディタで`supabase-schema.sql`を実行してテーブルを作成

3. **環境変数の設定**
   ```bash
   cp .env.example .env.local
   ```
   `.env.local`にSupabaseの認証情報を設定してください：
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

5. **ブラウザでアクセス**
   [http://localhost:3000](http://localhost:3000)を開いてアプリケーションを確認

## 主な機能

### 記録管理
- ルート名、エリア、グレード、ルートタイプの記録
- 完登ステータス（完登・失敗・練習）の管理
- メモや体感難易度、所要時間の記録

### 検索・フィルター
- ルート名・エリア名でのテキスト検索
- ルートタイプ別フィルター
- ステータス別フィルター
- 日付範囲での絞り込み

### 統計・分析
- 総記録数と完登率
- 最高グレードの表示
- 月間活動量の追跡
- グレード分布とルートタイプ分布

## データ構造

### ClimbRecord
```typescript
interface ClimbRecord {
  id: string;
  routeName: string;
  area: string;
  grade: string;
  routeType: 'boulder' | 'lead' | 'toprope';
  date: string;
  status: 'completed' | 'failed' | 'practice';
  notes?: string;
  rating?: number; // 1-5 stars
  duration?: number; // minutes
  createdAt: string;
  updatedAt: string;
}
```

## コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# リント実行
npm run lint
```

## ディレクトリ構造

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reactコンポーネント
│   ├── ui/             # 基本UIコンポーネント
│   ├── layout/         # レイアウトコンポーネント
│   ├── records/        # 記録管理コンポーネント
│   └── dashboard/      # ダッシュボードコンポーネント
├── lib/                # ユーティリティとサービス
├── types/              # TypeScript型定義
└── hooks/              # カスタムReactフック
```

## ライセンス

MIT License

## 開発者向け情報

このプロジェクトは以下の設計原則に従って開発されています：

- **MVPアプローチ**: 認証機能は後のフェーズで実装予定
- **拡張性**: 将来的なソーシャル機能追加に対応
- **型安全性**: TypeScriptによる型安全な開発
- **レスポンシブ**: モバイルファーストのデザイン