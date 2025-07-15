export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      climb_records: {
        Row: {
          id: string
          route_name: string
          area: string
          grade: string
          route_type: 'boulder' | 'lead' | 'toprope'
          date: string
          status: 'completed' | 'failed' | 'practice'
          notes: string | null
          rating: number | null
          duration: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          route_name: string
          area: string
          grade: string
          route_type: 'boulder' | 'lead' | 'toprope'
          date: string
          status: 'completed' | 'failed' | 'practice'
          notes?: string | null
          rating?: number | null
          duration?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          route_name?: string
          area?: string
          grade?: string
          route_type?: 'boulder' | 'lead' | 'toprope'
          date?: string
          status?: 'completed' | 'failed' | 'practice'
          notes?: string | null
          rating?: number | null
          duration?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}