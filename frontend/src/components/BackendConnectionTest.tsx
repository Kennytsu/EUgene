/**
 * Backend Connection Test Component
 * Verifies frontend can communicate with backend API
 */

import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react";

interface BackendInfo {
  health: {
    status: string;
    service: string;
    scheduler_enabled: boolean;
  };
  root: {
    message: string;
    supabase_configured: boolean;
  };
}

export function BackendConnectionTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [backendInfo, setBackendInfo] = useState<BackendInfo | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setStatus("idle");
    setMessage("");
    setBackendInfo(null);

    try {
      // Test 1: Health check
      const health = await apiClient.healthCheck();

      // Test 2: Root endpoint
      const root = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}/`
      );
      const rootData = await root.json();

      setStatus("success");
      setMessage("Successfully connected to backend!");
      setBackendInfo({
        health,
        root: rootData,
      });
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Failed to connect to backend"
      );
      console.error("Connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backend Connection Test</CardTitle>
        <CardDescription>
          Test the connection between frontend and backend API
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button onClick={testConnection} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Connection...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Test Connection
              </>
            )}
          </Button>

          {status === "success" && (
            <Badge variant="default" className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              Connected
            </Badge>
          )}

          {status === "error" && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <XCircle className="h-4 w-4" />
              Connection Failed
            </Badge>
          )}
        </div>

        {message && (
          <div
            className={`p-3 rounded-md text-sm ${
              status === "success"
                ? "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100"
                : "bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100"
            }`}
          >
            {message}
          </div>
        )}

        {backendInfo && (
          <div className="space-y-3 mt-4 p-4 bg-muted rounded-md">
            <div>
              <h4 className="font-semibold mb-2">Backend Information</h4>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-medium">Service:</span>{" "}
                  {backendInfo.health.service}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  {backendInfo.health.status}
                </div>
                <div>
                  <span className="font-medium">Scheduler:</span>{" "}
                  {backendInfo.health.scheduler_enabled
                    ? "Enabled"
                    : "Disabled"}
                </div>
                <div>
                  <span className="font-medium">Message:</span>{" "}
                  {backendInfo.root.message}
                </div>
                <div>
                  <span className="font-medium">Supabase:</span>{" "}
                  {backendInfo.root.supabase_configured
                    ? "Configured"
                    : "Not Configured"}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="text-xs text-muted-foreground space-y-1">
                <div>
                  <span className="font-medium">Frontend URL:</span>{" "}
                  {window.location.origin}
                </div>
                <div>
                  <span className="font-medium">Backend URL:</span>{" "}
                  {import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"}
                </div>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md text-sm">
            <p className="font-semibold mb-2">Troubleshooting Steps:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Make sure backend is running on port 8000</li>
              <li>Check VITE_BACKEND_URL in frontend/.env</li>
              <li>Verify CORS is configured in backend/main.py</li>
              <li>Check browser console for detailed errors</li>
              <li>Try accessing http://localhost:8000 directly</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
