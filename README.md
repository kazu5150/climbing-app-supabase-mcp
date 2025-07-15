# ClimbTracker

クライミング記録を管理するWebアプリケーションです。ルートの記録、統計の表示、進歩の追跡ができます。

## 特徴

- ✅ クライミング記録のCRUD操作（作成・読み取り・更新・削除）
- ✅ 検索・フィルタリング機能
- ✅ 統計情報とダッシュボード
- ✅ レスポンシブデザイン
- ✅ Supabase MCPによるデータベース統合
- ✅ TypeScript対応

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **データベース**: Supabase (MCP統合)
- **状態管理**: React Context + useReducer
- **フォーム**: React Hook Form + Zod
- **言語**: TypeScript

## セットアップ

### 前提条件

- Node.js 18.0以上
- npm または yarn
- [Claude Code](https://claude.ai/code) (Supabase MCP使用のため)

### 1. リポジトリのクローン

```bash
git clone https://github.com/your-username/climbing-app.git
cd climbing-app
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Supabase MCPを使用したプロジェクトのセットアップ

**重要**: このプロジェクトはSupabase MCPを使用して構築されています。以下の手順でセットアップを行ってください。

#### 3.1 Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)でアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトの設定から以下の情報を取得：
   - Project URL
   - API Keys (anon public key)

#### 3.2 Claude CodeでSupabase MCPを設定

1. Claude Codeを開く
2. 以下のコマンドを実行してSupabase MCPを設定：

```bash
# Supabase MCPの設定
# Claude Codeで以下を実行
npm install @supabase/supabase-js
```

#### 3.3 データベーススキーマの作成

Supabase MCPを使用してデータベースを作成：

```sql
-- supabase/migrations/20250715_create_climb_records_table.sql
CREATE TABLE climb_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_name TEXT NOT NULL,
  area TEXT NOT NULL,
  grade TEXT NOT NULL,
  route_type TEXT NOT NULL CHECK (route_type IN ('boulder', 'lead', 'toprope')),
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('completed', 'failed', 'practice')),
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  duration INTEGER CHECK (duration > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- トリガーでupdated_atを自動更新
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_climb_records_updated_at
  BEFORE UPDATE ON climb_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### 3.4 環境変数の設定

```bash
cp .env.example .env.local
```

`.env.local`にSupabaseの認証情報を設定：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

### 5. ブラウザでアクセス

[http://localhost:3000](http://localhost:3000)を開いてアプリケーションを確認

## Supabase MCPの利点

このプロジェクトでSupabase MCPを使用することで以下の利点があります：

- **自動設定**: データベーススキーマの自動生成
- **型安全性**: TypeScript型定義の自動生成
- **リアルタイム更新**: Supabaseのリアルタイム機能の簡単な統合
- **認証連携**: 将来的な認証機能の簡単な追加
- **効率的な開発**: Claude Codeとの統合による高速な開発体験

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