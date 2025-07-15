'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ClimbService } from '@/lib/climb-service';
import type { ClimbRecordFormData, RouteType, ClimbStatus } from '@/types/climb';

const recordSchema = z.object({
  routeName: z.string().min(1, 'ルート名は必須です'),
  area: z.string().min(1, 'エリア名は必須です'),
  grade: z.string().min(1, 'グレードは必須です'),
  routeType: z.enum(['boulder', 'lead', 'toprope'], {
    required_error: 'ルートタイプを選択してください',
  }),
  date: z.string().min(1, '日付は必須です'),
  status: z.enum(['completed', 'failed', 'practice'], {
    required_error: 'ステータスを選択してください',
  }),
  notes: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  duration: z.number().min(1).optional(),
});

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

interface RecordFormProps {
  initialData?: Partial<ClimbRecordFormData>;
  recordId?: string;
}

export function RecordForm({ initialData, recordId }: RecordFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClimbRecordFormData>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      ...initialData,
    },
  });

  const onSubmit = async (data: ClimbRecordFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (recordId) {
        await ClimbService.updateRecord(recordId, data);
      } else {
        await ClimbService.createRecord(data);
      }
      router.push('/records');
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {recordId ? '記録を編集' : '新しい記録を追加'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="routeName">ルート名 *</Label>
              <Input
                id="routeName"
                {...register('routeName')}
                placeholder="例: The Nose"
              />
              {errors.routeName && (
                <p className="text-sm text-red-600">{errors.routeName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">エリア/ジム名 *</Label>
              <Input
                id="area"
                {...register('area')}
                placeholder="例: エルキャピタン"
              />
              {errors.area && (
                <p className="text-sm text-red-600">{errors.area.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">グレード *</Label>
              <Input
                id="grade"
                {...register('grade')}
                placeholder="例: 5.9, V4, 6a"
              />
              {errors.grade && (
                <p className="text-sm text-red-600">{errors.grade.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>ルートタイプ *</Label>
              <Select
                value={watch('routeType')}
                onValueChange={(value: RouteType) => setValue('routeType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(routeTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.routeType && (
                <p className="text-sm text-red-600">{errors.routeType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">日付 *</Label>
              <Input
                id="date"
                type="date"
                {...register('date')}
              />
              {errors.date && (
                <p className="text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>ステータス *</Label>
              <Select
                value={watch('status')}
                onValueChange={(value: ClimbStatus) => setValue('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">体感難易度 (1-5)</Label>
              <Select
                value={watch('rating')?.toString()}
                onValueChange={(value) => setValue('rating', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">所要時間 (分)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                {...register('duration', { valueAsNumber: true })}
                placeholder="例: 30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">メモ・感想</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="このルートについての感想やメモを記録できます..."
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '保存中...' : recordId ? '更新' : '保存'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}