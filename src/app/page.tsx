import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, List, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ClimbTracker
          </h1>
          <p className="text-xl text-gray-600">
            あなたのクライミング記録を追跡しましょう
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                新しい記録
              </CardTitle>
              <CardDescription>
                クライミングルートの記録を追加
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/records/new">
                <Button className="w-full">
                  記録を追加
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5 text-green-600" />
                記録一覧
              </CardTitle>
              <CardDescription>
                すべての記録を閲覧・管理
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/records">
                <Button variant="outline" className="w-full">
                  記録を見る
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                統計
              </CardTitle>
              <CardDescription>
                進歩と統計を確認
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                統計を見る
              </Button>
              <p className="text-xs text-gray-500 mt-2">近日対応予定</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>🎉 ClimbTracker へようこそ！</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                このアプリケーションでクライミング記録を管理できます。
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 text-sm">📝 記録管理</h3>
                  <p className="text-blue-700 text-sm">ルート名、グレード、完登状況などの詳細記録</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 text-sm">📊 統計分析</h3>
                  <p className="text-green-700 text-sm">完登率、進歩の追跡、グレード分布の可視化</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-900 text-sm">🔍 検索・フィルター</h3>
                  <p className="text-purple-700 text-sm">ルートタイプ、日付、ステータス別の絞り込み</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>🚀 セットアップ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">✓</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Supabaseデータベース</p>
                    <p className="text-xs text-green-600">設定済み</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">✓</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">環境変数</p>
                    <p className="text-xs text-green-600">設定済み</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">最初の記録を追加</p>
                    <p className="text-xs">クライミング記録を追加して開始</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
