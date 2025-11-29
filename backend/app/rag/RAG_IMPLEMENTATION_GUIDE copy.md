# RAG Integration Implementation Guide

## Overview
This document captures the complete RAG (Retrieval-Augmented Generation) system that has been implemented in the RegEU project. Use this guide to rebuild or fix any broken RAG integration.

## System Architecture

### Backend Stack
- **Framework**: FastAPI
- **LLM**: OpenAI GPT-4o
- **Embeddings**: OpenAI text-embedding-ada-002
- **Vector Search**: Supabase pgvector
- **Database**: Supabase PostgreSQL with pgvector extension

### Frontend Stack
- **Framework**: React + TypeScript
- **HTTP Client**: Fetch API
- **State Management**: React Query (TanStack Query)
- **UI Framework**: shadcn/ui + Tailwind CSS

## Files That Have Been Created/Modified

### Backend Files

#### 1. `/backend/app/api/rag.py` (NEW)
**Purpose**: FastAPI endpoint for RAG queries

**Key Components**:
- `RAGQueryRequest`: Pydantic model with fields `query` (str) and `top_k` (int, default=10)
- `SourceDocument`: Pydantic model for source documents with `content`, `source_table`, `similarity`
- `RAGResponse`: Response model with `success`, `query`, `llm_answer`, `source_documents`, `metadata`
- `@router.post("/query")`: Main endpoint that:
  1. Takes a user query
  2. Calls RAGService to retrieve relevant documents
  3. Generates an LLM answer using context
  4. Returns formatted response with sources

**Error Handling**: Returns RAGResponse with success=False and error metadata if retrieval or generation fails

#### 2. `/backend/app/services/rag_service.py` (NEW)
**Purpose**: Core RAG business logic and document retrieval

**Key Methods**:

```python
class RAGService:
    def __init__(self):
        # Initializes Supabase and OpenAI clients
        
    def embed_query(self, query: str) -> list[float]:
        # Generates embedding for user query using text-embedding-ada-002
        
    def retrieve_relevant_chunks(self, query: str, top_k: int = 10) -> tuple[str, list[dict]]:
        # 1. Embeds the query
        # 2. Calls Supabase RPC function "match_documents_v2" with pgvector similarity
        # 3. Returns formatted context string and list of source documents
        # Source documents contain: content_text, source_table, similarity score
        
    def generate_answer(self, query: str, context: str) -> str:
        # Calls GPT-4o with system prompt for structured regulatory answers
        # System prompt: Instructs model to provide clear, actionable regulatory insights
        # Returns LLM-generated answer string
```

**Database Dependency**: Requires `match_documents_v2` RPC function in Supabase that:
- Takes: query_embedding (vector), match_count (int)
- Returns: Similar documents with similarity scores using pgvector

#### 3. `/backend/main.py` (MODIFIED)
**Changes Made**:
```python
# Added import
from app.api.rag import router as rag_router

# Added router registration
app.include_router(rag_router)
```

**Location**: Around line 64-66 after other router registrations

#### 4. `/backend/.env` (MODIFIED)
**Environment Variables Required**:
```
OPENAI_API_KEY=sk-...
SUPABASE_PROJECT_URL=https://....supabase.co
SUPABASE_API_KEY=eyJhbGc...
```

### Frontend Files

#### 1. `/frontend/src/hooks/use-rag-query.ts` (NEW)
**Purpose**: React Query mutation hook for RAG endpoint

**Exports**:
- `useRagQuery()`: Returns useMutation hook that calls `/rag/query` endpoint
- `RAGResponse`: Interface matching backend RAGResponse
- `RAGQueryRequest`: Interface with `query` (str) and optional `top_k` (number)
- `SourceDocument`: Interface with `content`, `source_table`, `similarity`

**Key Features**:
- Uses `VITE_BACKEND_URL` env var (defaults to http://localhost:8000)
- Makes POST request to `{BACKEND_URL}/rag/query`
- Sends JSON body with query and top_k
- Returns RAGResponse or throws error

#### 2. `/frontend/src/pages/Chat.tsx` (MODIFIED)
**Changes Made**:

1. **Import the hook** (line ~25):
```typescript
import { useRagQuery } from "@/hooks/use-rag-query";
```

2. **Initialize RAG query hook** (in component body, around line 50):
```typescript
const ragQuery = useRagQuery();
```

3. **Update `handleSend` function** (around line 130-170):
```typescript
const handleSend = async () => {
  // ... existing user message creation code ...
  
  // Replace the mock response section with:
  setInput("");
  setIsLoading(true);

  try {
    const result = await ragQuery.mutateAsync({ 
      query: messageText,
      top_k: 10 
    });

    if (result.success && currentSessionId) {
      // Format the response to include both the answer and source documents
      let formattedResponse = result.llm_answer;
      
      if (result.source_documents && result.source_documents.length > 0) {
        formattedResponse += "\n\n**📚 Sources Referenced:**\n";
        result.source_documents.slice(0, 3).forEach((doc, index) => {
          formattedResponse += `${index + 1}. ${doc.source_table} (Similarity: ${(doc.similarity * 100).toFixed(1)}%)\n`;
        });
      }

      await addMessage.mutateAsync({
        sessionId: currentSessionId,
        content: formattedResponse,
        author: "assistant",
      });
    } else if (currentSessionId) {
      await addMessage.mutateAsync({
        sessionId: currentSessionId,
        content: "I encountered an issue retrieving regulatory information. Please try again.",
        author: "assistant",
      });
    }
  } catch (error) {
    console.error("RAG query error:", error);
    if (currentSessionId) {
      await addMessage.mutateAsync({
        sessionId: currentSessionId,
        content: "I encountered an error while processing your query. Please try again later.",
        author: "assistant",
      });
    }
  } finally {
    setIsLoading(false);
  }
};
```

## How It Works (End-to-End Flow)

1. **User Input**: User types a question in Chat component and clicks send
2. **Frontend**: `handleSend()` calls `ragQuery.mutateAsync({ query, top_k: 10 })`
3. **API Call**: Frontend sends POST to `http://localhost:8000/rag/query`
4. **Backend Processing**:
   - RAGService.embed_query() converts query to embedding
   - RAGService.retrieve_relevant_chunks() searches Supabase for similar documents
   - RAGService.generate_answer() calls GPT-4o with query + context
5. **Response**: Backend returns RAGResponse with LLM answer + source documents
6. **Frontend Display**: Answer and sources formatted and added to chat history
7. **User Sees**: Question, AI answer with document sources and similarity scores

## Environment Setup Required

### Backend
1. Create `.env` file in `/backend/` with OPENAI_API_KEY and Supabase credentials
2. Ensure Supabase has `match_documents_v2` RPC function for pgvector similarity search
3. Install dependencies: `pip install openai python-dotenv postgrest-py supabase`

### Frontend
1. Create `.env.local` file in `/frontend/` with:
   ```
   VITE_BACKEND_URL=http://localhost:8000
   ```
2. Install dependencies: `npm install`

## Testing the Integration

### Backend Test
```bash
cd backend
source ../.venv/bin/activate
python main.py
# Test with curl:
curl -X POST http://localhost:8000/rag/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the AI Act?", "top_k": 10}'
```

### Frontend Test
```bash
cd frontend
npm run dev
# Navigate to http://localhost:8081
# Go to Chat page and type a question
```

## Known Issues & Debugging

### Issue: "No relevant documents found"
- **Cause**: Supabase embeddings table is empty or `match_documents_v2` RPC not working
- **Fix**: Verify RPC function exists and test it directly in Supabase dashboard

### Issue: TypeScript errors in Chat.tsx
- **Cause**: Missing import or RAG hook not properly initialized
- **Fix**: Ensure `import { useRagQuery } from "@/hooks/use-rag-query"` is present and hook is called before use

### Issue: CORS errors when calling backend
- **Cause**: Backend CORS settings not allowing frontend origin
- **Fix**: Verify CORS middleware is configured in main.py with correct allowed origins

### Issue: Frontend won't load after RAG changes
- **Cause**: Chat.tsx TypeScript compilation error
- **Fix**: Run `npm run dev` and check console for specific error, then review Chat.tsx imports

## File Locations Summary
```
/backend/
  ├── app/
  │   ├── api/
  │   │   └── rag.py .................. RAG endpoint (NEW)
  │   └── services/
  │       └── rag_service.py .......... RAG service logic (NEW)
  ├── main.py ......................... Modified to include RAG router
  └── .env ............................ Must have OPENAI_API_KEY

/frontend/
  ├── src/
  │   ├── hooks/
  │   │   └── use-rag-query.ts ........ RAG query hook (NEW)
  │   └── pages/
  │       └── Chat.tsx ............... Modified to use RAG
  └── .env.local ..................... Must have VITE_BACKEND_URL
```

## Next Steps After Reverting
1. Use `git reset --hard` to revert uncommitted changes
2. Use this guide to rebuild the RAG integration step-by-step
3. Test each file independently before integrating
4. Once working, create proper commit with RAG implementation

## Questions This Guide Answers
- ✅ Where are all RAG files located?
- ✅ What does each file do?
- ✅ How do files communicate?
- ✅ What environment setup is needed?
- ✅ How to test if it's working?
- ✅ Common errors and fixes?
