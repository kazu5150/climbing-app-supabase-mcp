'use client';

import { useState, useEffect } from 'react';
import { ClimbService } from '@/lib/climb-service';
import { RecordForm } from './record-form';
import type { ClimbRecord } from '@/types/climb';

interface EditRecordFormProps {
  recordId: string;
}

export function EditRecordForm({ recordId }: EditRecordFormProps) {
  const [record, setRecord] = useState<ClimbRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const data = await ClimbService.getRecord(recordId);
        if (!data) {
          setError('記録が見つかりません');
          return;
        }
        setRecord(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '記録の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    loadRecord();
  }, [recordId]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="text-center py-8">
        <p>記録が見つかりません</p>
      </div>
    );
  }

  const initialData = {
    routeName: record.routeName,
    area: record.area,
    grade: record.grade,
    routeType: record.routeType,
    date: record.date,
    status: record.status,
    notes: record.notes || '',
    rating: record.rating,
    duration: record.duration,
  };

  return <RecordForm initialData={initialData} recordId={recordId} />;
}