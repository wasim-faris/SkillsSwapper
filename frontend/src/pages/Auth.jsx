import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiLightningBolt, HiEye, HiEyeOff, HiX, HiChevronRight } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useFormErrors } from '../hooks/useFormErrors';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin, getProfile } from '../api/auth';
import api from '../api/axios';
import AuthShowcase from '../components/ui/AuthShowcase';

const StyledInput = ({ label, error, type = 'text', id, onChange, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col w-full animate-fade-in shrink-0">
      {label && (
        <label htmlFor={id} className="label-premium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          onChange={onChange}
          className={`input-premium ${error ? 'border-red-500 focus:border-red-500' : ''}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-slide-left">
          <HiX size={12} /> {error}
        </span>
      )}
    </div>
  );
};

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { fieldError, generalError, setApiErrors, clearFieldError, clearAll } = useFormErrors();
  const [loading, setLoading] = useState(false);
  
  // Determine initial mode from URL
  const [mode, setMode] = useState(location.pathname === '/register' ? 'register' : 'login');
  const isLogin = mode === 'login';

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    language: '',
  });

  const [clientErrors, setClientErrors] = useState({});

  useEffect(() => {
    // Clear errors when switching modes
    setClientErrors({});
    clearAll();
  }, [mode]);

  const validate = () => {
    const errs = {};
    if (!isLogin && !form.name.trim()) errs.name = 'Full name is required';
    
    if (!form.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email';
    }
    
    if (!form.password) {
      errs.password = 'Password is required';
    } else if (form.password.length < 8) {
      errs.password = 'Min 8 characters';
    }

    if (!isLogin) {
      if (form.password !== form.confirmPassword) {
        errs.confirmPassword = 'Passwords do not match';
      }
      if (!form.city.trim()) errs.city = 'City is required';
      if (!form.language.trim()) errs.language = 'Language is required';
    }
    
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setClientErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    clearFieldError(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setClientErrors(errs);
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const res = await apiLogin({ email: form.email, password: form.password });
        const tokens = res.data;
        const profileRes = await getProfile();
        login(tokens, profileRes.data);
        navigate('/dashboard', { replace: true });
      } else {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('city', form.city);
        formData.append('language', form.language);

        const res = await register(formData);
        const tokens = res.data;
        const profileRes = await getProfile();
        login(tokens, profileRes.data);
        toast.success('Welcome to SkillSwap! 🎉');
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      if (!err.response) {
        toast.error('Network error. Please try again.');
      } else {
        const errorMsg = err.response.data?.message;
        if (typeof errorMsg === 'string') {
          toast.error(errorMsg);
        } else if (isLogin) {
          toast.error('Invalid email or password');
        } else {
          toast.error('Please check the form for errors');
        }
        setApiErrors(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const fe = (f) => clientErrors[f] || fieldError(f);

  const toggleMode = (newMode) => {
    if (mode === newMode) return;
    setMode(newMode);
    window.history.pushState({}, '', `/${newMode}`);
  };

  return (
    <div className="h-screen w-full flex bg-[var(--bg-primary)] overflow-hidden">
      <div className="w-full h-full flex flex-col md:flex-row bg-[var(--bg-secondary)] overflow-hidden">
        
        {/* Left Side (Fixed) */}
        <div className="hidden md:flex flex-col w-5/12 lg:w-[40%] p-12 border-r border-[var(--border-default)] relative bg-[#0D0D0D] shrink-0 h-full">
          <Link to="/" className="flex items-center gap-3 mb-12 group w-max shrink-0">
            <div className="w-10 h-10 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <HiLightningBolt className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">SkillSwap</span>
          </Link>
          
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
              Exchange skills.<br />Grow together.
            </h2>
            <p className="text-[var(--text-secondary)] mb-12 text-lg leading-relaxed">
              Join the premium community of professionals trading expertise peer-to-peer.
            </p>

            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-[var(--text-secondary)] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] ring-4 ring-[var(--accent-primary)]/20"></span>
                Connect with vetted experts
              </li>
              <li className="flex items-center gap-4 text-[var(--text-secondary)] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] ring-4 ring-[var(--accent-primary)]/20"></span>
                Learn new skills for free
              </li>
              <li className="flex items-center gap-4 text-[var(--text-secondary)] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] ring-4 ring-[var(--accent-primary)]/20"></span>
                Build your professional network
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-[var(--border-default)] shrink-0">
            <p className="text-sm text-[var(--text-muted)] italic">
              "SkillSwap changed how our team learns. The quality of peers is unmatched."
            </p>
          </div>
        </div>

        {/* Right Side - Stacked Showcase + Form */}
        <div className="flex-1 flex flex-col h-full bg-[var(--bg-secondary)] overflow-hidden">
          
          {/* Scrollable Container for Right Side */}
          <div className="flex-1 overflow-y-auto w-full flex flex-col px-8 sm:px-16 py-10 lg:px-24">
            
            {/* Animated UI Showcase */}
            <AuthShowcase />

            {/* Top Toggle Buttons */}
            <div className="flex mb-8 border-b border-[var(--border-default)] shrink-0">
              <button
                type="button"
                onClick={() => toggleMode('login')}
                className={`flex-1 pb-3 text-sm font-medium transition-colors duration-200 ${isLogin ? 'text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => toggleMode('register')}
                className={`flex-1 pb-3 text-sm font-medium transition-colors duration-200 ${!isLogin ? 'text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                Register
              </button>
            </div>

            {/* Form Area */}
            <div className="flex-1 relative shrink-0 min-h-[400px]">
              <form onSubmit={handleSubmit} noValidate className="relative w-full h-full">
                <div className="grid">
                  
                  {/* Login Form */}
                  <div className={`col-start-1 row-start-1 w-full space-y-5 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isLogin ? 'opacity-100 translate-x-0 z-10 pointer-events-auto visible' : 'opacity-0 -translate-x-8 z-0 pointer-events-none invisible'}`}>
                    <StyledInput
                      label="Email Address"
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={handleChange('email')}
                      error={fe('email')}
                      autoComplete="email"
                    />

                    <StyledInput
                      label="Password"
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange('password')}
                      error={fe('password')}
                      autoComplete="current-password"
                    />
                    
                    <div className="flex justify-end pb-1">
                      <Link to="/forgot-password" size="sm" className="text-[13px] text-[var(--accent-primary)] font-medium hover:brightness-110 mb-3 ml-1 transition-all">
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {/* Register Form */}
                  <div className={`col-start-1 row-start-1 w-full space-y-5 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${!isLogin ? 'opacity-100 translate-x-0 z-10 pointer-events-auto visible' : 'opacity-0 translate-x-8 z-0 pointer-events-none invisible'}`}>
                    <StyledInput
                      label="Full Name"
                      id="register-name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange('name')}
                      error={fe('name')}
                      autoComplete="name"
                    />

                    <StyledInput
                      label="Email Address"
                      id="register-email"
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={handleChange('email')}
                      error={fe('email')}
                      autoComplete="email"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <StyledInput
                        label="Password"
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange('password')}
                        error={fe('password')}
                        autoComplete="new-password"
                      />
                      <StyledInput
                        label="Confirm"
                        id="register-confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={form.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        error={fe('confirmPassword')}
                        autoComplete="new-password"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <StyledInput
                        label="City"
                        id="register-city"
                        placeholder="e.g. London"
                        value={form.city}
                        onChange={handleChange('city')}
                        error={fe('city')}
                      />
                      <StyledInput
                        label="Language"
                        id="register-language"
                        placeholder="e.g. English"
                        value={form.language}
                        onChange={handleChange('language')}
                        error={fe('language')}
                      />
                    </div>
                  </div>
                  
                </div>

                {generalError && (
                  <div className="flex items-center gap-3 bg-[rgba(255,68,68,0.1)] border border-[var(--error)] rounded-lg p-4 animate-fade-in mt-5">
                    <div className="w-8 h-8 rounded-full bg-[var(--error)] flex items-center justify-center shrink-0">
                      <HiX className="text-white" size={16} />
                    </div>
                    <p className="text-sm text-[var(--error)] font-medium">{generalError}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full h-[52px] text-[15px] flex items-center justify-center gap-2 mt-8 absolute bottom-0 left-0 right-0 z-20"
                  style={{ position: 'relative' }}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <HiChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
