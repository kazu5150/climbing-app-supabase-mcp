'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClimbService } from '@/lib/climb-service';
import type { ClimbRecord, SearchFilters, RouteType, ClimbStatus } from '@/types/climb';

const routeTypeLabels: Record<RouteType, string> = {
  boulder: 'ボルダリング',
  lead: 'リード',
  toprope: 'トップロープ',
};

const statusLabels: Record<ClimbStatus, string> = {
  completed: '完登',
  failed: '失敗',
  practice: '練習',
};

const statusColors: Record<ClimbStatus, string> = {
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  practice: 'bg-yellow-100 text-yellow-800',
};

export function RecordsList() {
  const [records, setRecords] = useState<ClimbRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});

  const loadRecords = async () => {
    try {
      setIsLoading(true);
      const data = await ClimbService.getRecords(filters);
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '記録の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, [filters]);

  const handleDelete = async (id: string) => {
    if (!confirm('この記録を削除しますか？')) return;

    try {
      await ClimbService.deleteRecord(id);
      await loadRecords();
    } catch (err) {
      setError(err instanceof Error ? err.message : '削除に失敗しました');
    }
  };

  const updateFilters = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <Button onClick={loadRecords} className="mt-4">
              再試行
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            検索・フィルター
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="ルート名・エリア名で検索"
                value={filters.query || ''}
                onChange={(e) => updateFilters('query', e.target.value)}
              />
            </div>
            
            <div>
              <Select
                value={filters.routeType || ''}
                onValueChange={(value) => updateFilters('routeType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="ルートタイプ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">すべて</SelectItem>
                  {Object.entries(routeTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={filters.status || ''}
                onValueChange={(value) => updateFilters('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="ステータス" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">すべて</SelectItem>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button
                variant="outline"
                onClick={() => setFilters({})}
                className="w-full"
              >
                フィルターをクリア
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records Grid */}
      {isLoading ? (
        <div className="text-center py-8">
          <p>読み込み中...</p>
        </div>
      ) : records.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">
              {Object.keys(filters).length > 0 
                ? '条件に一致する記録が見つかりません'
                : 'まだ記録がありません'
              }
            </p>
            <Link href="/records/new">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                最初の記録を追加
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record) => (
            <Card key={record.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{record.routeName}</CardTitle>
                    <p className="text-sm text-gray-600">{record.area}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
                    {statusLabels[record.status]}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">グレード:</span> {record.grade}
                  </div>
                  <div>
                    <span className="font-medium">タイプ:</span> {routeTypeLabels[record.routeType]}
                  </div>
                  <div>
                    <span className="font-medium">日付:</span> {format(new Date(record.date), 'yyyy/MM/dd')}
                  </div>
                  {record.rating && (
                    <div>
                      <span className="font-medium">難易度:</span> {'★'.repeat(record.rating)}
                    </div>
                  )}
                </div>

                {record.notes && (
                  <div className="text-sm text-gray-600 border-t pt-2">
                    <p className="line-clamp-2">{record.notes}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Link href={`/records/${record.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full flex items-center gap-1">
                      <Edit className="h-3 w-3" />
                      編集
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(record.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                    削除
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}