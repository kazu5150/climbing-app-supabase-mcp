'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Target, Calendar, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsService } from '@/lib/stats-service';
import type { ClimbStats } from '@/types/climb';

export function StatsOverview() {
  const [stats, setStats] = useState<ClimbStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await StatsService.getStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '統計の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-red-600">
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">総記録数</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRecords}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalRecords === 0 ? 'まだ記録がありません' : `完登: ${stats.completedCount}件`}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">完登率</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalRecords === 0 ? '0%' : `${Math.round(stats.completionRate)}%`}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.totalRecords === 0 ? '記録を追加してください' : `${stats.completedCount}/${stats.totalRecords} 完登`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">今月の活動</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recentActivity.thisMonth}</div>
          <p className="text-xs text-muted-foreground">
            今週: {stats.recentActivity.thisWeek}件
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">最高グレード</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.bestGrade}</div>
          <p className="text-xs text-muted-foreground">
            完登した最高難易度
          </p>
        </CardContent>
      </Card>
    </div>
  );
}