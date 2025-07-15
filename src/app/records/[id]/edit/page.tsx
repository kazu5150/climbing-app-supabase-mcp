import { MainLayout } from '@/components/layout/main-layout';
import { EditRecordForm } from '@/components/records/edit-record-form';

interface EditRecordPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRecordPage({ params }: EditRecordPageProps) {
  const { id } = await params;
  
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">記録を編集</h1>
          <p className="text-gray-600 mt-1">
            クライミング記録の詳細を更新できます
          </p>
        </div>
        
        <EditRecordForm recordId={id} />
      </div>
    </MainLayout>
  );
}