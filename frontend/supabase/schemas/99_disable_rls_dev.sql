-- Add updated_at column to chat_sessions if it doesn't exist
ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Disable RLS on chat tables to allow anonymous access for development
-- Run this in Supabase SQL editor if RLS is blocking access

ALTER TABLE chat_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages DISABLE ROW LEVEL SECURITY;

-- Or if you want to keep RLS, add policies for anonymous access:
-- 
-- CREATE POLICY "Allow anonymous read chat_sessions" 
-- ON chat_sessions FOR SELECT
-- TO anon
-- USING (true);
--
-- CREATE POLICY "Allow anonymous insert chat_sessions" 
-- ON chat_sessions FOR INSERT
-- TO anon
-- WITH CHECK (true);
--
-- CREATE POLICY "Allow anonymous update chat_sessions" 
-- ON chat_sessions FOR UPDATE
-- TO anon
-- USING (true)
-- WITH CHECK (true);
--
-- CREATE POLICY "Allow anonymous delete chat_sessions" 
-- ON chat_sessions FOR DELETE
-- TO anon
-- USING (true);
--
-- CREATE POLICY "Allow anonymous read chat_messages" 
-- ON chat_messages FOR SELECT
-- TO anon
-- USING (true);
--
-- CREATE POLICY "Allow anonymous insert chat_messages" 
-- ON chat_messages FOR INSERT
-- TO anon
-- WITH CHECK (true);
