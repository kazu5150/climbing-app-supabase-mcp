import { MainLayout } from '@/components/layout/main-layout';
import { RecordForm } from '@/components/records/record-form';

export default function NewRecordPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">新しい記録を追加</h1>
          <p className="text-gray-600 mt-1">
            クライミングルートの詳細を記録しましょう
          </p>
        </div>
        
        <RecordForm />
      </div>
    </MainLayout>
  );
}