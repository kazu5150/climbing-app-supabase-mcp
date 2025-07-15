'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClimbService } from '@/lib/climb-service';
import type { ClimbRecord, ClimbStatus, RouteType } from '@/types/climb';

const statusColors: Record<ClimbStatus, string> = {
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  practice: 'bg-yellow-100 text-yellow-800',
};

const statusLabels: Record<ClimbStatus, string> = {
  completed: '完登',
  failed: '失敗',
  practice: '練習',
};

const routeTypeLabels: Record<RouteType, string> = {
  boulder: 'ボルダリング',
  lead: 'リード',
  toprope: 'トップロープ',
};

export function RecentRecords() {
  const [records, setRecords] = useState<ClimbRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecentRecords = async () => {
      try {
        const allRecords = await ClimbService.getRecords();
        // Get the 5 most recent records
        setRecords(allRecords.slice(0, 5));
      } catch (err) {
        setError(err instanceof Error ? err.message : '記録の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    loadRecentRecords();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            最近の記録
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            最近の記録
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          最近の記録
        </CardTitle>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="mb-4">まだ記録がありません</p>
            <Link href="/records/new">
              <Button size="sm">最初の記録を追加</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{record.routeName}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
                      {statusLabels[record.status]}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {record.area} • {record.grade} • {routeTypeLabels[record.routeType]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(record.date), 'yyyy/MM/dd')}
                  </div>
                </div>
                <Link href={`/records/${record.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
            
            {records.length > 0 && (
              <div className="pt-4 border-t">
                <Link href="/records">
                  <Button variant="outline" className="w-full">
                    すべての記録を見る
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}