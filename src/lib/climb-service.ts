import { supabase } from './supabase';
import type { ClimbRecord, ClimbRecordFormData, SearchFilters } from '@/types/climb';
import { v4 as uuidv4 } from 'uuid';

export class ClimbService {
  static async getRecords(filters?: SearchFilters): Promise<ClimbRecord[]> {
    let query = supabase
      .from('climb_records')
      .select('*')
      .order('date', { ascending: false });

    if (filters?.query) {
      query = query.or(`route_name.ilike.%${filters.query}%,area.ilike.%${filters.query}%`);
    }

    if (filters?.routeType) {
      query = query.eq('route_type', filters.routeType);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.dateFrom) {
      query = query.gte('date', filters.dateFrom);
    }

    if (filters?.dateTo) {
      query = query.lte('date', filters.dateTo);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch records: ${error.message}`);
    }

    return (data || []).map(this.mapDbRecordToClimbRecord);
  }

  static async getRecord(id: string): Promise<ClimbRecord | null> {
    const { data, error } = await supabase
      .from('climb_records')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Record not found
      }
      throw new Error(`Failed to fetch record: ${error.message}`);
    }

    return this.mapDbRecordToClimbRecord(data);
  }

  static async createRecord(data: ClimbRecordFormData): Promise<ClimbRecord> {
    const id = uuidv4();
    const now = new Date().toISOString();

    const record = {
      id,
      route_name: data.routeName,
      area: data.area,
      grade: data.grade,
      route_type: data.routeType,
      date: data.date,
      status: data.status,
      notes: data.notes || null,
      rating: data.rating || null,
      duration: data.duration || null,
      created_at: now,
      updated_at: now,
    };

    const { data: insertedData, error } = await supabase
      .from('climb_records')
      .insert(record)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create record: ${error.message}`);
    }

    return this.mapDbRecordToClimbRecord(insertedData);
  }

  static async updateRecord(id: string, data: Partial<ClimbRecordFormData>): Promise<ClimbRecord> {
    const now = new Date().toISOString();

    const updateData: any = {
      updated_at: now,
    };

    if (data.routeName !== undefined) updateData.route_name = data.routeName;
    if (data.area !== undefined) updateData.area = data.area;
    if (data.grade !== undefined) updateData.grade = data.grade;
    if (data.routeType !== undefined) updateData.route_type = data.routeType;
    if (data.date !== undefined) updateData.date = data.date;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.notes !== undefined) updateData.notes = data.notes || null;
    if (data.rating !== undefined) updateData.rating = data.rating || null;
    if (data.duration !== undefined) updateData.duration = data.duration || null;

    const { data: updatedData, error } = await supabase
      .from('climb_records')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update record: ${error.message}`);
    }

    return this.mapDbRecordToClimbRecord(updatedData);
  }

  static async deleteRecord(id: string): Promise<void> {
    const { error } = await supabase
      .from('climb_records')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete record: ${error.message}`);
    }
  }

  private static mapDbRecordToClimbRecord(dbRecord: any): ClimbRecord {
    return {
      id: dbRecord.id,
      routeName: dbRecord.route_name,
      area: dbRecord.area,
      grade: dbRecord.grade,
      routeType: dbRecord.route_type,
      date: dbRecord.date,
      status: dbRecord.status,
      notes: dbRecord.notes,
      rating: dbRecord.rating,
      duration: dbRecord.duration,
      createdAt: dbRecord.created_at,
      updatedAt: dbRecord.updated_at,
    };
  }
}