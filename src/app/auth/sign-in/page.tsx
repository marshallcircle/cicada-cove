'use client';

import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth/AuthForm';

export default function SignInPage() {
  const router = useRouter();
  
  const handleSuccess = () => {
    // Redirect to home page after successful sign-in
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8 text-center">Sign In to Cicada Cove</h1>
        <AuthForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}