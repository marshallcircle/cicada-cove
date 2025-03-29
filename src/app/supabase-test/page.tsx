'use client';

import { useState, useEffect } from 'react';
import { testConnection, supabase } from '@/lib/supabase';

export default function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<{
    success?: boolean;
    message: string;
    loading: boolean;
  }>({
    message: 'Testing connection...',
    loading: true
  });

  useEffect(() => {
    async function verifyConnection() {
      try {
        const result = await testConnection();
        setConnectionStatus({
          success: result.success,
          message: result.message,
          loading: false
        });
      } catch (error) {
        setConnectionStatus({
          success: false,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
          loading: false
        });
      }
    }

    verifyConnection();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
      
      <div className={`p-4 rounded-md mb-6 ${
        connectionStatus.loading
          ? 'bg-gray-100'
          : connectionStatus.success
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
      }`}>
        {connectionStatus.loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-600 mr-2"></div>
            <span>Testing connection...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <span className="mr-2">
              {connectionStatus.success ? '✅' : '❌'}
            </span>
            <span>{connectionStatus.message}</span>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4">Supabase Configuration</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="font-medium">URL:</p>
            <p className="text-gray-700 break-all">{process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
          </div>
          <div>
            <p className="font-medium">Keys:</p>
            <p className="text-gray-700">
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
                ? '✅ Anon Key is configured'
                : '❌ Anon Key is missing'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}