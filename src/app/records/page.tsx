import { MainLayout } from '@/components/layout/main-layout';
import { RecordsList } from '@/components/records/records-list';

export default function RecordsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">記録一覧</h1>
            <p className="text-gray-600 mt-1">
              あなたのクライミング記録を確認・管理できます
            </p>
          </div>
        </div>
        
        <RecordsList />
      </div>
    </MainLayout>
  );
}