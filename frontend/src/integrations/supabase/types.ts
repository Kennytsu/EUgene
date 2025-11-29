export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string | null
          description: string
          embedding: string | null
          id: string
          is_active: boolean
          last_run_at: string | null
          relevancy_threshold: number
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description: string
          embedding?: string | null
          id?: string
          is_active?: boolean
          last_run_at?: string | null
          relevancy_threshold?: number
          title?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string
          embedding?: string | null
          id?: string
          is_active?: boolean
          last_run_at?: string | null
          relevancy_threshold?: number
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      austrian_parliament_meetings: {
        Row: {
          embedding_input: string
          id: string
          meeting_date: string
          meeting_location: string
          meeting_type: string
          meeting_url: string
          scraped_at: string
          title: string
          title_de: string
        }
        Insert: {
          embedding_input: string
          id?: string
          meeting_date: string
          meeting_location: string
          meeting_type: string
          meeting_url: string
          scraped_at?: string
          title: string
          title_de: string
        }
        Update: {
          embedding_input?: string
          id?: string
          meeting_date?: string
          meeting_location?: string
          meeting_type?: string
          meeting_url?: string
          scraped_at?: string
          title?: string
          title_de?: string
        }
        Relationships: []
      }
      belgian_parliament_meetings: {
        Row: {
          description: string | null
          description_en: string | null
          embedding_input: string
          id: string
          location: string
          meeting_date: string
          meeting_url: string
          scraped_at: string
          title: string
          title_en: string
        }
        Insert: {
          description?: string | null
          description_en?: string | null
          embedding_input: string
          id: string
          location: string
          meeting_date: string
          meeting_url: string
          scraped_at?: string
          title: string
          title_en: string
        }
        Update: {
          description?: string | null
          description_en?: string | null
          embedding_input?: string
          id?: string
          location?: string
          meeting_date?: string
          meeting_url?: string
          scraped_at?: string
          title?: string
          title_en?: string
        }
        Relationships: []
      }
      bt_documents: {
        Row: {
          datum: string | null
          drucksachetyp: string | null
          id: string
          scraped_at: string
          text: string | null
          titel: string | null
          title_english: string | null
        }
        Insert: {
          datum?: string | null
          drucksachetyp?: string | null
          id: string
          scraped_at?: string
          text?: string | null
          titel?: string | null
          title_english?: string | null
        }
        Update: {
          datum?: string | null
          drucksachetyp?: string | null
          id?: string
          scraped_at?: string
          text?: string | null
          titel?: string | null
          title_english?: string | null
        }
        Relationships: []
      }
      bt_plenarprotokolle: {
        Row: {
          datum: string | null
          id: string
          scraped_at: string
          sitzungsbemerkung: string | null
          text: string | null
          titel: string | null
          title_english: string | null
        }
        Insert: {
          datum?: string | null
          id: string
          scraped_at?: string
          sitzungsbemerkung?: string | null
          text?: string | null
          titel?: string | null
          title_english?: string | null
        }
        Update: {
          datum?: string | null
          id?: string
          scraped_at?: string
          sitzungsbemerkung?: string | null
          text?: string | null
          titel?: string | null
          title_english?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          author: string | null
          chat_session: string | null
          content: string | null
          date: string | null
          id: string
        }
        Insert: {
          author?: string | null
          chat_session?: string | null
          content?: string | null
          date?: string | null
          id?: string
        }
        Update: {
          author?: string | null
          chat_session?: string | null
          content?: string | null
          date?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_chat_sessions"
            columns: ["chat_session"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_size: string
          company_stage: string
          description: string
          id: string
          industry: string
          name: string
          role: string
        }
        Insert: {
          company_size: string
          company_stage: string
          description: string
          id?: string
          industry: string
          name: string
          role: string
        }
        Update: {
          company_size?: string
          company_stage?: string
          description?: string
          id?: string
          industry?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
      country_map_meetings: {
        Row: {
          country: string
          iso2: string
          source_table: string
        }
        Insert: {
          country: string
          iso2: string
          source_table: string
        }
        Update: {
          country?: string
          iso2?: string
          source_table?: string
        }
        Relationships: []
      }
      documents_embeddings: {
        Row: {
          content_column: string
          content_text: string
          created_at: string | null
          embedding: string
          id: string
          source_id: string
          source_table: string
        }
        Insert: {
          content_column: string
          content_text: string
          created_at?: string | null
          embedding: string
          id?: string
          source_id: string
          source_table: string
        }
        Update: {
          content_column?: string
          content_text?: string
          created_at?: string | null
          embedding?: string
          id?: string
          source_id?: string
          source_table?: string
        }
        Relationships: []
      }
      ec_res_inno_meetings: {
        Row: {
          description: string
          embedding_input: string | null
          end_date: string | null
          event_type: string
          id: string
          location: string
          meeting_url: string
          scraped_at: string
          start_date: string
          subjects: string[] | null
          title: string
        }
        Insert: {
          description: string
          embedding_input?: string | null
          end_date?: string | null
          event_type: string
          id?: string
          location: string
          meeting_url: string
          scraped_at?: string
          start_date: string
          subjects?: string[] | null
          title: string
        }
        Update: {
          description?: string
          embedding_input?: string | null
          end_date?: string | null
          event_type?: string
          id?: string
          location?: string
          meeting_url?: string
          scraped_at?: string
          start_date?: string
          subjects?: string[] | null
          title?: string
        }
        Relationships: []
      }
      ep_meetings: {
        Row: {
          datetime: string
          embedding_input: string | null
          id: string
          place: string | null
          scraped_at: string
          subtitles: string | null
          title: string
        }
        Insert: {
          datetime: string
          embedding_input?: string | null
          id?: string
          place?: string | null
          scraped_at?: string
          subtitles?: string | null
          title: string
        }
        Update: {
          datetime?: string
          embedding_input?: string | null
          id?: string
          place?: string | null
          scraped_at?: string
          subtitles?: string | null
          title?: string
        }
        Relationships: []
      }
      eu_law_procedures: {
        Row: {
          active_status: string | null
          embedding_input: string | null
          id: string
          scraped_at: string | null
          started_date: string | null
          status: string | null
          title: string
          topic_codes: string[]
          topic_labels: string[]
          updated_at: string | null
        }
        Insert: {
          active_status?: string | null
          embedding_input?: string | null
          id: string
          scraped_at?: string | null
          started_date?: string | null
          status?: string | null
          title: string
          topic_codes: string[]
          topic_labels: string[]
          updated_at?: string | null
        }
        Update: {
          active_status?: string | null
          embedding_input?: string | null
          id?: string
          scraped_at?: string | null
          started_date?: string | null
          status?: string | null
          title?: string
          topic_codes?: string[]
          topic_labels?: string[]
          updated_at?: string | null
        }
        Relationships: []
      }
      ipex_events: {
        Row: {
          embedding_input: string
          end_date: string | null
          id: string
          meeting_location: string | null
          scraped_at: string
          start_date: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          embedding_input: string
          end_date?: string | null
          id: string
          meeting_location?: string | null
          scraped_at?: string
          start_date?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          embedding_input?: string
          end_date?: string | null
          id?: string
          meeting_location?: string | null
          scraped_at?: string
          start_date?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      legislative_files: {
        Row: {
          committee: string | null
          details_link: string | null
          documentation_gateway: Json | null
          embedding_input: string | null
          id: string
          key_events: Json | null
          key_players: Json | null
          lastpubdate: string | null
          link: string | null
          rapporteur: string | null
          scraped_at: string
          status: string | null
          subjects: Json | null
          title: string | null
        }
        Insert: {
          committee?: string | null
          details_link?: string | null
          documentation_gateway?: Json | null
          embedding_input?: string | null
          id: string
          key_events?: Json | null
          key_players?: Json | null
          lastpubdate?: string | null
          link?: string | null
          rapporteur?: string | null
          scraped_at?: string
          status?: string | null
          subjects?: Json | null
          title?: string | null
        }
        Update: {
          committee?: string | null
          details_link?: string | null
          documentation_gateway?: Json | null
          embedding_input?: string | null
          id?: string
          key_events?: Json | null
          key_players?: Json | null
          lastpubdate?: string | null
          link?: string | null
          rapporteur?: string | null
          scraped_at?: string
          status?: string | null
          subjects?: Json | null
          title?: string | null
        }
        Relationships: []
      }
      legislative_procedure_files: {
        Row: {
          extracted_text: string
          id: string
          link: string
          scraped_at: string
        }
        Insert: {
          extracted_text: string
          id: string
          link: string
          scraped_at?: string
        }
        Update: {
          extracted_text?: string
          id?: string
          link?: string
          scraped_at?: string
        }
        Relationships: []
      }
      mec_prep_bodies_meeting: {
        Row: {
          embedding_input: string
          id: string
          meeting_location: string
          meeting_timestamp: string
          scraped_at: string
          title: string
          url: string
        }
        Insert: {
          embedding_input: string
          id?: string
          meeting_location: string
          meeting_timestamp: string
          scraped_at?: string
          title: string
          url: string
        }
        Update: {
          embedding_input?: string
          id?: string
          meeting_location?: string
          meeting_timestamp?: string
          scraped_at?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      mec_summit_ministerial_meeting: {
        Row: {
          category_abbr: string | null
          embedding_input: string | null
          id: string
          meeting_date: string
          meeting_end_date: string | null
          scraped_at: string
          title: string
          url: string
        }
        Insert: {
          category_abbr?: string | null
          embedding_input?: string | null
          id?: string
          meeting_date: string
          meeting_end_date?: string | null
          scraped_at?: string
          title: string
          url: string
        }
        Update: {
          category_abbr?: string | null
          embedding_input?: string | null
          id?: string
          meeting_date?: string
          meeting_end_date?: string | null
          scraped_at?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      meeting_embeddings: {
        Row: {
          content_column: string
          content_text: string
          created_at: string | null
          embedding: string
          id: string
          source_id: string
          source_table: string
        }
        Insert: {
          content_column: string
          content_text: string
          created_at?: string | null
          embedding: string
          id?: string
          source_id: string
          source_table: string
        }
        Update: {
          content_column?: string
          content_text?: string
          created_at?: string | null
          embedding?: string
          id?: string
          source_id?: string
          source_table?: string
        }
        Relationships: []
      }
      meeting_topic_assignments: {
        Row: {
          id: string
          source_id: string
          source_table: string
          topic_id: string
        }
        Insert: {
          id?: string
          source_id: string
          source_table: string
          topic_id: string
        }
        Update: {
          id?: string
          source_id?: string
          source_table?: string
          topic_id?: string
        }
        Relationships: []
      }
      meeting_topics: {
        Row: {
          id: string
          topic: string
        }
        Insert: {
          id?: string
          topic: string
        }
        Update: {
          id?: string
          topic?: string
        }
        Relationships: []
      }
      mep_meeting_attendee_mapping: {
        Row: {
          attendee_id: string
          meeting_id: string
        }
        Insert: {
          attendee_id: string
          meeting_id: string
        }
        Update: {
          attendee_id?: string
          meeting_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mep_meeting_attendee_mapping_attendee_id_fkey"
            columns: ["attendee_id"]
            isOneToOne: false
            referencedRelation: "mep_meeting_attendees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mep_meeting_attendee_mapping_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "mep_meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      mep_meeting_attendees: {
        Row: {
          id: string
          name: string
          transparency_register_url: string | null
        }
        Insert: {
          id?: string
          name: string
          transparency_register_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          transparency_register_url?: string | null
        }
        Relationships: []
      }
      mep_meetings: {
        Row: {
          associated_committee_or_delegation_code: string | null
          associated_committee_or_delegation_name: string | null
          embedding_input: string | null
          id: string
          meeting_date: string
          meeting_location: string
          member_capacity: string
          member_name: string
          procedure_reference: string | null
          scraped_at: string
          title: string
          title_en: string | null
        }
        Insert: {
          associated_committee_or_delegation_code?: string | null
          associated_committee_or_delegation_name?: string | null
          embedding_input?: string | null
          id?: string
          meeting_date: string
          meeting_location: string
          member_capacity: string
          member_name: string
          procedure_reference?: string | null
          scraped_at?: string
          title: string
          title_en?: string | null
        }
        Update: {
          associated_committee_or_delegation_code?: string | null
          associated_committee_or_delegation_name?: string | null
          embedding_input?: string | null
          id?: string
          meeting_date?: string
          meeting_location?: string
          member_capacity?: string
          member_name?: string
          procedure_reference?: string | null
          scraped_at?: string
          title?: string
          title_en?: string | null
        }
        Relationships: []
      }
      meps: {
        Row: {
          country_of_representation: string
          family_name: string
          given_name: string
          id: string
          label: string
          official_family_name: string | null
          official_given_name: string | null
          political_group: string
          scraped_at: string
          sort_label: string
          type: string
        }
        Insert: {
          country_of_representation: string
          family_name: string
          given_name: string
          id: string
          label: string
          official_family_name?: string | null
          official_given_name?: string | null
          political_group: string
          scraped_at?: string
          sort_label: string
          type: string
        }
        Update: {
          country_of_representation?: string
          family_name?: string
          given_name?: string
          id?: string
          label?: string
          official_family_name?: string | null
          official_given_name?: string | null
          political_group?: string
          scraped_at?: string
          sort_label?: string
          type?: string
        }
        Relationships: []
      }
      nl_twka_meetings: {
        Row: {
          agenda: Json | null
          attachments_url: Json | null
          attendees: Json | null
          commission: string | null
          embedding_input: string | null
          end_datetime: string | null
          end_time: string | null
          id: string
          link: string | null
          location: string | null
          meeting_type: string | null
          ministers: Json | null
          original_title: string | null
          scraped_at: string | null
          start_datetime: string | null
          start_time: string | null
          title: string | null
          translated_title: string | null
        }
        Insert: {
          agenda?: Json | null
          attachments_url?: Json | null
          attendees?: Json | null
          commission?: string | null
          embedding_input?: string | null
          end_datetime?: string | null
          end_time?: string | null
          id: string
          link?: string | null
          location?: string | null
          meeting_type?: string | null
          ministers?: Json | null
          original_title?: string | null
          scraped_at?: string | null
          start_datetime?: string | null
          start_time?: string | null
          title?: string | null
          translated_title?: string | null
        }
        Update: {
          agenda?: Json | null
          attachments_url?: Json | null
          attendees?: Json | null
          commission?: string | null
          embedding_input?: string | null
          end_datetime?: string | null
          end_time?: string | null
          id?: string
          link?: string | null
          location?: string | null
          meeting_type?: string | null
          ministers?: Json | null
          original_title?: string | null
          scraped_at?: string | null
          start_datetime?: string | null
          start_time?: string | null
          title?: string | null
          translated_title?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: number
          message: string | null
          message_subject: string | null
          relevance_score: number | null
          sent_at: string
          type: string
          user_id: string
        }
        Insert: {
          id?: number
          message?: string | null
          message_subject?: string | null
          relevance_score?: number | null
          sent_at?: string
          type: string
          user_id: string
        }
        Update: {
          id?: number
          message?: string | null
          message_subject?: string | null
          relevance_score?: number | null
          sent_at?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      polish_presidency_meeting: {
        Row: {
          embedding_input: string | null
          id: string
          meeting_date: string
          meeting_end_date: string | null
          meeting_location: string
          meeting_url: string
          scraped_at: string
          title: string
        }
        Insert: {
          embedding_input?: string | null
          id: string
          meeting_date: string
          meeting_end_date?: string | null
          meeting_location: string
          meeting_url: string
          scraped_at?: string
          title: string
        }
        Update: {
          embedding_input?: string | null
          id?: string
          meeting_date?: string
          meeting_end_date?: string | null
          meeting_location?: string
          meeting_url?: string
          scraped_at?: string
          title?: string
        }
        Relationships: []
      }
      politicians: {
        Row: {
          area_of_expertise: string[]
          further_information: string | null
          id: string
          institution: string
          role: string
        }
        Insert: {
          area_of_expertise?: string[]
          further_information?: string | null
          id?: string
          institution: string
          role: string
        }
        Update: {
          area_of_expertise?: string[]
          further_information?: string | null
          id?: string
          institution?: string
          role?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_id: string | null
          countries: string[]
          embedding: string
          embedding_input: string
          id: string
          name: string
          newsletter_frequency: string
          politician_id: string | null
          surname: string
          user_type: Database["public"]["Enums"]["user_type_enum"]
        }
        Insert: {
          company_id?: string | null
          countries?: string[]
          embedding: string
          embedding_input?: string
          id: string
          name: string
          newsletter_frequency?: string
          politician_id?: string | null
          surname: string
          user_type?: Database["public"]["Enums"]["user_type_enum"]
        }
        Update: {
          company_id?: string | null
          countries?: string[]
          embedding?: string
          embedding_input?: string
          id?: string
          name?: string
          newsletter_frequency?: string
          politician_id?: string | null
          surname?: string
          user_type?: Database["public"]["Enums"]["user_type_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_politician_id_fkey"
            columns: ["politician_id"]
            isOneToOne: false
            referencedRelation: "politicians"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_to_topics: {
        Row: {
          profile_id: string
          topic: string | null
          topic_id: string
        }
        Insert: {
          profile_id: string
          topic?: string | null
          topic_id: string
        }
        Update: {
          profile_id?: string
          topic?: string | null
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_to_topics_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_to_topics_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_to_topics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "meeting_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_job_runs: {
        Row: {
          error_msg: string | null
          id: number
          inserted_rows: number | null
          last_run_at: string | null
          name: string | null
          success: boolean | null
        }
        Insert: {
          error_msg?: string | null
          id?: number
          inserted_rows?: number | null
          last_run_at?: string | null
          name?: string | null
          success?: boolean | null
        }
        Update: {
          error_msg?: string | null
          id?: number
          inserted_rows?: number | null
          last_run_at?: string | null
          name?: string | null
          success?: boolean | null
        }
        Relationships: []
      }
      spanish_commission_meetings: {
        Row: {
          date: string
          description: string | null
          description_en: string | null
          embedding_input: string | null
          id: string
          links: Json | null
          location: string | null
          location_en: string | null
          scraped_at: string | null
          time: string | null
          title: string | null
          title_en: string | null
          url: string | null
        }
        Insert: {
          date: string
          description?: string | null
          description_en?: string | null
          embedding_input?: string | null
          id?: string
          links?: Json | null
          location?: string | null
          location_en?: string | null
          scraped_at?: string | null
          time?: string | null
          title?: string | null
          title_en?: string | null
          url?: string | null
        }
        Update: {
          date?: string
          description?: string | null
          description_en?: string | null
          embedding_input?: string | null
          id?: string
          links?: Json | null
          location?: string | null
          location_en?: string | null
          scraped_at?: string | null
          time?: string | null
          title?: string | null
          title_en?: string | null
          url?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          id: string
          legislation_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          legislation_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          legislation_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_legislation_id_fkey"
            columns: ["legislation_id"]
            isOneToOne: false
            referencedRelation: "legislative_files"
            referencedColumns: ["id"]
          },
        ]
      }
      tweets: {
        Row: {
          author: Json
          created_at: string
          embedding_input: string | null
          id: string
          like_count: number | null
          quote_count: number | null
          quoted_tweet: Json | null
          reply_count: number | null
          retweeted_tweet: Json | null
          scraped_at: string
          text: string
          view_count: number | null
        }
        Insert: {
          author: Json
          created_at: string
          embedding_input?: string | null
          id: string
          like_count?: number | null
          quote_count?: number | null
          quoted_tweet?: Json | null
          reply_count?: number | null
          retweeted_tweet?: Json | null
          scraped_at?: string
          text: string
          view_count?: number | null
        }
        Update: {
          author?: Json
          created_at?: string
          embedding_input?: string | null
          id?: string
          like_count?: number | null
          quote_count?: number | null
          quoted_tweet?: Json | null
          reply_count?: number | null
          retweeted_tweet?: Json | null
          scraped_at?: string
          text?: string
          view_count?: number | null
        }
        Relationships: []
      }
      weekly_agenda: {
        Row: {
          committee: string | null
          date: string
          description: string | null
          embedding_input: string | null
          id: string
          location: string | null
          scraped_at: string
          time: string | null
          title: string
          type: string
        }
        Insert: {
          committee?: string | null
          date: string
          description?: string | null
          embedding_input?: string | null
          id?: string
          location?: string | null
          scraped_at?: string
          time?: string | null
          title: string
          type: string
        }
        Update: {
          committee?: string | null
          date?: string
          description?: string | null
          embedding_input?: string | null
          id?: string
          location?: string | null
          scraped_at?: string
          time?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_meetings: {
        Row: {
          attendees: string | null
          description: string | null
          exact_location: string | null
          location: string | null
          meeting_end_datetime: string | null
          meeting_id: string | null
          meeting_start_datetime: string | null
          meeting_url: string | null
          member: Json | null
          scraped_at: string | null
          source_id: string | null
          source_table: string | null
          source_url: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          topic: string | null
        }
        Relationships: []
      }
      v_profiles: {
        Row: {
          company: Json | null
          countries: string[] | null
          embedding: string | null
          embedding_input: string | null
          id: string | null
          name: string | null
          newsletter_frequency: string | null
          politician: Json | null
          surname: string | null
          topic_ids: string[] | null
          user_type: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_countries: { Args: never; Returns: string[] }
      get_meeting_tables: {
        Args: never
        Returns: {
          source_table: string
        }[]
      }
      get_meetings_by_filter: {
        Args: {
          country?: string
          end_date?: string
          max_results: number
          source_ids: string[]
          source_tables: string[]
          start_date?: string
          topics?: string[]
        }
        Returns: {
          attendees: string | null
          description: string | null
          exact_location: string | null
          location: string | null
          meeting_end_datetime: string | null
          meeting_id: string | null
          meeting_start_datetime: string | null
          meeting_url: string | null
          member: Json | null
          scraped_at: string | null
          source_id: string | null
          source_table: string | null
          source_url: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          topic: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "v_meetings"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_meetings_without_embeddings: {
        Args: never
        Returns: {
          attendees: string | null
          description: string | null
          exact_location: string | null
          location: string | null
          meeting_end_datetime: string | null
          meeting_id: string | null
          meeting_start_datetime: string | null
          meeting_url: string | null
          member: Json | null
          scraped_at: string | null
          source_id: string | null
          source_table: string | null
          source_url: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          topic: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "v_meetings"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_user_by_id: { Args: { uid: string }; Returns: string }
      match_combined_filtered_embeddings: {
        Args: {
          content_columns?: string[]
          match_count: number
          query_embedding: string
          src_tables?: string[]
        }
        Returns: {
          content_text: string
          similarity: number
          source_id: string
          source_table: string
        }[]
      }
      match_filtered: {
        Args: {
          content_columns?: string[]
          match_count: number
          query_embedding: string
          source_id_param?: string
          src_tables?: string[]
        }
        Returns: {
          content_text: string
          similarity: number
          source_id: string
          source_table: string
        }[]
      }
      match_filtered_meetings: {
        Args: {
          allowed_countries?: string[]
          allowed_topic_ids?: string[]
          allowed_topics?: string[]
          content_columns?: string[]
          end_date?: string
          match_count: number
          query_embedding: string
          src_tables?: string[]
          start_date?: string
        }
        Returns: {
          content_text: string
          similarity: number
          source_id: string
          source_table: string
        }[]
      }
      search_legislation_suggestions: {
        Args: { search_text: string }
        Returns: {
          id: string
          similarity_score: number
          title: string
        }[]
      }
      search_meetings_suggestions: {
        Args: { search_text: string }
        Returns: {
          similarity_score: number
          title: string
        }[]
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      user_type_enum: "entrepreneur" | "politician"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_type_enum: ["entrepreneur", "politician"],
    },
  },
} as const
