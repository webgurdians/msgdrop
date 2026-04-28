import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const endpoint = isLogin ? '/api/v1/auth/login' : '/api/v1/auth/register';
    const body = isLogin 
      ? { email, password } 
      : { email, password, phone: phone || undefined };

    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          throw new Error(data.details[0]?.message || data.error);
        }
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
        setSuccess('Successfully logged in! Redirecting...');
        localStorage.setItem('token', data.data.access_token);
        localStorage.setItem('userEmail', data.data.user.email);
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        setSuccess('Account created successfully! You can now sign in.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-card flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground font-heading">
          <span className="text-gradient">Msg</span>Drop
        </h1>
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-foreground font-heading">
          {isLogin ? 'Sign in to your account' : 'Start your free trial'}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {isLogin ? 'Or ' : 'Already have an account? '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="font-medium text-primary hover:text-primary-light transition-colors"
          >
            {isLogin ? 'start your 14-day free trial' : 'sign in instead'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border">
          {error && (
            <div className="mb-4 p-3 rounded bg-destructive/10 border border-destructive text-destructive text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded bg-primary/10 border border-primary text-primary text-sm">
              {success}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground">Phone number</label>
                <div className="mt-1">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-input bg-card px-3 py-2 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-ring sm:text-sm transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full appearance-none rounded-md border border-input bg-card px-3 py-2 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-ring sm:text-sm transition-all"
                  placeholder="hello@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full appearance-none rounded-md border border-input bg-card px-3 py-2 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-ring sm:text-sm transition-all"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-input bg-card text-primary focus:ring-ring focus:ring-offset-background"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary-light transition-colors">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Create Account')}
              </button>
            </div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => window.location.href = 'http://localhost:3001/api/v1/auth/google'}
                  className="inline-flex w-full justify-center rounded-md border border-border bg-card py-2 px-4 text-sm font-medium text-foreground shadow-sm hover:bg-secondary focus:outline-none transition-all"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => window.location.href = 'http://localhost:3001/api/v1/auth/facebook'}
                  className="inline-flex w-full justify-center rounded-md border border-border bg-card py-2 px-4 text-sm font-medium text-foreground shadow-sm hover:bg-secondary focus:outline-none transition-all"
                >
                  <span className="sr-only">Sign in with Meta</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
