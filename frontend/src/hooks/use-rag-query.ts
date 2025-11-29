/**
 * React Query hook for RAG (Retrieval-Augmented Generation) queries
 */
import { useMutation } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export interface SourceDocument {
  content: string;
  source_table: string;
  similarity: number;
}

export interface RAGResponse {
  success: boolean;
  query: string;
  llm_answer: string;
  source_documents: SourceDocument[];
  metadata: Record<string, any>;
}

export interface RAGQueryRequest {
  query: string;
  top_k?: number;
}

/**
 * Hook for querying the RAG endpoint
 */
export function useRagQuery() {
  return useMutation<RAGResponse, Error, RAGQueryRequest>({
    mutationFn: async (request: RAGQueryRequest) => {
      const response = await fetch(`${BACKEND_URL}/rag/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: request.query,
          top_k: request.top_k || 10,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to query RAG endpoint');
      }

      return response.json();
    },
  });
}
