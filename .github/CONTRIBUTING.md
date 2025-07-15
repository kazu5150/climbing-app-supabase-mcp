# Contributing to ClimbTracker

ClimbTrackerプロジェクトへの貢献を歓迎します！このドキュメントでは、プロジェクトに貢献するためのガイドラインを説明します。

## 貢献の方法

### 1. Issue の報告

バグを発見したり、新機能を提案したい場合は、まずIssueを作成してください。

- **バグ報告**: [Bug report template](.github/ISSUE_TEMPLATE/bug_report.md)を使用
- **機能要求**: [Feature request template](.github/ISSUE_TEMPLATE/feature_request.md)を使用

### 2. プルリクエストの作成

1. **フォーク**: このリポジトリをフォークしてください
2. **ブランチ作成**: 機能やバグ修正用のブランチを作成
   ```bash
   git checkout -b feature/your-feature-name
   # または
   git checkout -b fix/your-bug-fix
   ```
3. **実装**: 変更を実装してください
4. **テスト**: 変更をテストしてください
5. **コミット**: 明確なコミットメッセージで変更をコミット
6. **プッシュ**: フォークしたリポジトリにプッシュ
7. **PR作成**: プルリクエストを作成

## 開発環境のセットアップ

### 必要なツール

- Node.js 18.0以上
- npm または yarn
- Git

### セットアップ手順

1. **リポジトリをフォーク・クローン**
   ```bash
   git clone https://github.com/your-username/climbing-app.git
   cd climbing-app
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **環境変数を設定**
   ```bash
   cp .env.example .env.local
   ```

4. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

## コーディング規約

### TypeScript

- 型安全性を重視し、`any`型の使用は避ける
- インターフェースと型定義を適切に使用
- JSDocコメントを適切に記述

### React

- 関数コンポーネントを使用
- カスタムフックを活用
- propsには適切な型定義を設定

### CSS/Styling

- Tailwind CSSを使用
- shadcn/uiコンポーネントを活用
- レスポンシブデザインを考慮

### ファイル構成

- コンポーネントは`src/components/`に配置
- 共通のUIコンポーネントは`src/components/ui/`に配置
- 型定義は`src/types/`に配置
- ユーティリティは`src/lib/`に配置

## コミットメッセージ

Conventional Commitsフォーマットを使用してください：

```
<type>(<scope>): <description>

<body>

<footer>
```

### Type

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: スタイリング
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: 雑務

### 例

```
feat(records): add search functionality

Add search functionality to records list component.
Users can now search records by route name and area.

Fixes #123
```

## テスト

### 実行方法

```bash
# リント
npm run lint

# 型チェック
npm run build

# テスト実行
npm test
```

### テストの書き方

- 新機能には適切なテストを追加
- バグ修正には再発防止のテストを追加
- カバレッジを意識したテストを作成

## プルリクエストのガイドライン

### 前提条件

- [ ] 関連するIssueがある（または作成済み）
- [ ] 適切なブランチ名を使用
- [ ] テストが通る
- [ ] リントエラーがない

### レビュー項目

- コードの品質
- 機能の動作確認
- パフォーマンスへの影響
- セキュリティ上の問題
- ドキュメントの更新

## 質問・サポート

質問がある場合は、以下の方法でお気軽にお問い合わせください：

1. **Issue**: GitHub Issueで質問を作成
2. **Discussion**: GitHub Discussionsを使用
3. **Email**: メンテナーに直接連絡

## ライセンス

このプロジェクトに貢献することで、あなたの貢献がMITライセンスの下で公開されることに同意したものとみなされます。

## 行動規範

すべての貢献者は、建設的で協力的な環境を維持するために、以下の行動規範を遵守してください：

- 他の貢献者を尊重する
- 建設的なフィードバックを提供する
- 異なる視点や意見を歓迎する
- プロジェクトの改善に焦点を当てる

ご貢献いただき、ありがとうございます！