export type RouteType = 'boulder' | 'lead' | 'toprope';
export type ClimbStatus = 'completed' | 'failed' | 'practice';

export interface ClimbRecord {
  id: string;
  routeName: string;
  area: string;
  grade: string;
  routeType: RouteType;
  date: string;
  status: ClimbStatus;
  notes?: string;
  rating?: number; // 1-5 stars
  duration?: number; // minutes
  createdAt: string;
  updatedAt: string;
}

export interface ClimbRecordFormData {
  routeName: string;
  area: string;
  grade: string;
  routeType: RouteType;
  date: string;
  status: ClimbStatus;
  notes?: string;
  rating?: number;
  duration?: number;
}

export interface ClimbStats {
  totalRecords: number;
  completedCount: number;
  completionRate: number;
  bestGrade: string;
  recentActivity: {
    thisWeek: number;
    thisMonth: number;
  };
  gradeDistribution: Record<string, number>;
  routeTypeDistribution: Record<RouteType, number>;
  monthlyActivity: Array<{
    month: string;
    count: number;
  }>;
}

export interface SearchFilters {
  query?: string;
  routeType?: RouteType;
  status?: ClimbStatus;
  gradeMin?: string;
  gradeMax?: string;
  dateFrom?: string;
  dateTo?: string;
}