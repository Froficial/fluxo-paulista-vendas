export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ab_test_results: {
        Row: {
          conversions: number | null
          created_at: string | null
          id: number
          updated_at: string | null
          variant_id: number | null
          visitors: number | null
        }
        Insert: {
          conversions?: number | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          variant_id?: number | null
          visitors?: number | null
        }
        Update: {
          conversions?: number | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          variant_id?: number | null
          visitors?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ab_test_results_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "ab_test_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      ab_test_variants: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          is_control: boolean | null
          name: string
          test_id: number | null
          traffic_percentage: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          is_control?: boolean | null
          name: string
          test_id?: number | null
          traffic_percentage?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          is_control?: boolean | null
          name?: string
          test_id?: number | null
          traffic_percentage?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ab_test_variants_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "ab_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      ab_tests: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: number
          name: string
          page_url: string
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          name: string
          page_url: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          name?: string
          page_url?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          account_locked_until: string | null
          created_at: string | null
          email: string
          failed_login_attempts: number | null
          id: string
          password_hash: string
          password_last_changed: string | null
          password_reset_expires: string | null
          password_reset_token: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          account_locked_until?: string | null
          created_at?: string | null
          email: string
          failed_login_attempts?: number | null
          id: string
          password_hash: string
          password_last_changed?: string | null
          password_reset_expires?: string | null
          password_reset_token?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          account_locked_until?: string | null
          created_at?: string | null
          email?: string
          failed_login_attempts?: number | null
          id?: string
          password_hash?: string
          password_last_changed?: string | null
          password_reset_expires?: string | null
          password_reset_token?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      analytics_settings: {
        Row: {
          analytics_endpoint: string | null
          created_at: string | null
          custom_tracking_code: string | null
          enable_ecommerce_tracking: boolean | null
          enable_event_tracking: boolean | null
          enable_user_tracking: boolean | null
          facebook_pixel_id: string | null
          google_analytics_id: string | null
          google_tag_manager_id: string | null
          hotjar_id: string | null
          id: number
          linkedin_insight_tag: string | null
          updated_at: string | null
        }
        Insert: {
          analytics_endpoint?: string | null
          created_at?: string | null
          custom_tracking_code?: string | null
          enable_ecommerce_tracking?: boolean | null
          enable_event_tracking?: boolean | null
          enable_user_tracking?: boolean | null
          facebook_pixel_id?: string | null
          google_analytics_id?: string | null
          google_tag_manager_id?: string | null
          hotjar_id?: string | null
          id?: number
          linkedin_insight_tag?: string | null
          updated_at?: string | null
        }
        Update: {
          analytics_endpoint?: string | null
          created_at?: string | null
          custom_tracking_code?: string | null
          enable_ecommerce_tracking?: boolean | null
          enable_event_tracking?: boolean | null
          enable_user_tracking?: boolean | null
          facebook_pixel_id?: string | null
          google_analytics_id?: string | null
          google_tag_manager_id?: string | null
          hotjar_id?: string | null
          id?: number
          linkedin_insight_tag?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["slug"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      conversion_funnels: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      diagnostics: {
        Row: {
          challenges_goals: string | null
          company_name: string
          company_size: string
          created_at: string | null
          customer_acquisition_score: number
          data_analytics_score: number
          digital_presence_score: number
          email: string
          id: string
          industry: string
          marketing_strategy_score: number
          status: string | null
        }
        Insert: {
          challenges_goals?: string | null
          company_name: string
          company_size: string
          created_at?: string | null
          customer_acquisition_score: number
          data_analytics_score: number
          digital_presence_score: number
          email: string
          id?: string
          industry: string
          marketing_strategy_score: number
          status?: string | null
        }
        Update: {
          challenges_goals?: string | null
          company_name?: string
          company_size?: string
          created_at?: string | null
          customer_acquisition_score?: number
          data_analytics_score?: number
          digital_presence_score?: number
          email?: string
          id?: string
          industry?: string
          marketing_strategy_score?: number
          status?: string | null
        }
        Relationships: []
      }
      ebook_leads: {
        Row: {
          created_at: string
          email: string
          email_sent: boolean | null
          email_sent_at: string | null
          id: string
          name: string
          whatsapp: string | null
        }
        Insert: {
          created_at?: string
          email: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          name: string
          whatsapp?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          name?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      external_integrations: {
        Row: {
          created_at: string | null
          credentials: Json | null
          id: number
          last_sync: string | null
          name: string
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credentials?: Json | null
          id?: number
          last_sync?: string | null
          name: string
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credentials?: Json | null
          id?: number
          last_sync?: string | null
          name?: string
          status?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      funnel_analytics: {
        Row: {
          created_at: string | null
          date: string
          funnel_id: number | null
          id: number
          step_id: number | null
          updated_at: string | null
          visitors: number | null
        }
        Insert: {
          created_at?: string | null
          date: string
          funnel_id?: number | null
          id?: number
          step_id?: number | null
          updated_at?: string | null
          visitors?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          funnel_id?: number | null
          id?: number
          step_id?: number | null
          updated_at?: string | null
          visitors?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_analytics_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "conversion_funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funnel_analytics_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "funnel_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_steps: {
        Row: {
          created_at: string | null
          funnel_id: number | null
          id: number
          name: string
          step_order: number
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          funnel_id?: number | null
          id?: number
          name: string
          step_order: number
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          funnel_id?: number | null
          id?: number
          name?: string
          step_order?: number
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_steps_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "conversion_funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      password_history: {
        Row: {
          created_at: string | null
          id: number
          password_hash: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          password_hash: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          password_hash?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "password_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_settings: {
        Row: {
          canonical_domain: string | null
          created_at: string | null
          custom_meta_tags: string | null
          default_og_image: string | null
          enable_robots: boolean | null
          enable_sitemap: boolean | null
          enable_structured_data: boolean | null
          facebook_pixel_id: string | null
          google_analytics_id: string | null
          google_tag_manager_id: string | null
          id: number
          site_description: string | null
          site_title: string | null
          updated_at: string | null
        }
        Insert: {
          canonical_domain?: string | null
          created_at?: string | null
          custom_meta_tags?: string | null
          default_og_image?: string | null
          enable_robots?: boolean | null
          enable_sitemap?: boolean | null
          enable_structured_data?: boolean | null
          facebook_pixel_id?: string | null
          google_analytics_id?: string | null
          google_tag_manager_id?: string | null
          id?: number
          site_description?: string | null
          site_title?: string | null
          updated_at?: string | null
        }
        Update: {
          canonical_domain?: string | null
          created_at?: string | null
          custom_meta_tags?: string | null
          default_og_image?: string | null
          enable_robots?: boolean | null
          enable_sitemap?: boolean | null
          enable_structured_data?: boolean | null
          facebook_pixel_id?: string | null
          google_analytics_id?: string | null
          google_tag_manager_id?: string | null
          id?: number
          site_description?: string | null
          site_title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sitemap_logs: {
        Row: {
          created_at: string | null
          entry_count: number | null
          id: number
          status: string | null
        }
        Insert: {
          created_at?: string | null
          entry_count?: number | null
          id?: number
          status?: string | null
        }
        Update: {
          created_at?: string | null
          entry_count?: number | null
          id?: number
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_admin_tables: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
