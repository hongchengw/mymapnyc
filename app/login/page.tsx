'use client';
    
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
    const supabase = createClient();
    console.log('Supabase client:', supabase);
    console.warn('CLIENT INITIALIZED');

    return <div>Login</div>;
}