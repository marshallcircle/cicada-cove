'use client';

import { useState } from 'react';
import AuthForm from '@/components/auth/AuthForm';

export default function SignUpPage() {
  const [registered, setRegistered] = useState(false);
  
  const handleSuccess = () => {
    setRegistered(true);
  };
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8 text-center">Join Cicada Cove</h1>
        
        {registered ? (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Check Your Email</h2>
            <p className="text-gray-600 mb-6 text-center">
              We've sent a confirmation link to your email address. 
              Please check your inbox and click the link to complete your registration.
            </p>
            <p className="text-sm text-gray-500 text-center">
              If you don't see the email, check your spam folder.
            </p>
          </div>
        ) : (
          <AuthForm onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
}