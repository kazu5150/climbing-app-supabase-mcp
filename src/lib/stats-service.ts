import { ClimbService } from './climb-service';
import type { ClimbStats, ClimbRecord } from '@/types/climb';
import { format, subWeeks, subMonths, startOfMonth } from 'date-fns';

export class StatsService {
  static async getStats(): Promise<ClimbStats> {
    const records = await ClimbService.getRecords();
    
    const totalRecords = records.length;
    const completedCount = records.filter(r => r.status === 'completed').length;
    const completionRate = totalRecords > 0 ? (completedCount / totalRecords) * 100 : 0;

    const now = new Date();
    const oneWeekAgo = subWeeks(now, 1);
    const oneMonthAgo = subMonths(now, 1);

    const thisWeek = records.filter(r => new Date(r.date) >= oneWeekAgo).length;
    const thisMonth = records.filter(r => new Date(r.date) >= oneMonthAgo).length;

    const bestGrade = this.findBestGrade(records);
    const gradeDistribution = this.calculateGradeDistribution(records);
    const routeTypeDistribution = this.calculateRouteTypeDistribution(records);
    const monthlyActivity = this.calculateMonthlyActivity(records);

    return {
      totalRecords,
      completedCount,
      completionRate,
      bestGrade,
      recentActivity: {
        thisWeek,
        thisMonth,
      },
      gradeDistribution,
      routeTypeDistribution,
      monthlyActivity,
    };
  }

  private static findBestGrade(records: ClimbRecord[]): string {
    if (records.length === 0) return 'N/A';

    const completedRecords = records.filter(r => r.status === 'completed');
    if (completedRecords.length === 0) return 'N/A';

    // Simple grade comparison - this could be improved with proper grade parsing
    const grades = completedRecords.map(r => r.grade);
    return grades.sort().pop() || 'N/A';
  }

  private static calculateGradeDistribution(records: ClimbRecord[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    
    records.forEach(record => {
      distribution[record.grade] = (distribution[record.grade] || 0) + 1;
    });

    return distribution;
  }

  private static calculateRouteTypeDistribution(records: ClimbRecord[]): Record<string, number> {
    const distribution = {
      boulder: 0,
      lead: 0,
      toprope: 0,
    };

    records.forEach(record => {
      distribution[record.routeType]++;
    });

    return distribution;
  }

  private static calculateMonthlyActivity(records: ClimbRecord[]): Array<{ month: string; count: number }> {
    const monthlyData: Record<string, number> = {};

    records.forEach(record => {
      const month = format(new Date(record.date), 'yyyy-MM');
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    // Get last 12 months
    const result = [];
    for (let i = 11; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const month = format(startOfMonth(date), 'yyyy-MM');
      const monthName = format(date, 'MMM yyyy');
      
      result.push({
        month: monthName,
        count: monthlyData[month] || 0,
      });
    }

    return result;
  }
}