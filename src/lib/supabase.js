/**
 * Supabase Client Configuration
 * 
 * Handles authentication for theLABEL marketing website.
 * 
 * IMPORTANT (Feb 2026): 
 * - Credentials MUST come from environment variables, not hardcoded
 * - Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel project settings
 * - OAuth is delegated to the dashboard - this client is only for email/password auth
 */
import { createClient } from '@supabase/supabase-js';

// Read from environment variables (Vite uses VITE_ prefix)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables in development
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ Supabase environment variables not configured.\n' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.\n' +
    'For local dev: create .env.local file\n' +
    'For production: set in Vercel project settings'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

/**
 * Sign up a new user with email and password
 * @param {Object} userData - User registration data
 * @returns {Promise<{user, session, error}>}
 */
export const signUpUser = async ({ email, password, firstName, lastName, artistName, genre, location }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          artist_name: artistName,
          genre: genre,
          location: location,
          full_name: artistName || `${firstName} ${lastName}`
        },
        // Redirect to dashboard for email confirmation
        emailRedirectTo: 'https://app.thelabelai.com/auth/callback'
      }
    });

    if (error) {
      throw error;
    }

    return { user: data.user, session: data.session, error: null };
  } catch (error) {
    console.error('Signup error:', error);
    return { user: null, session: null, error };
  }
};

/**
 * Sign in a user with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{user, session, error}>}
 */
export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return { user: data.user, session: data.session, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, session: null, error };
  }
};

/**
 * Sign out the current user
 * @returns {Promise<{error}>}
 */
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
};

/**
 * Get the current session
 * @returns {Promise<{session, error}>}
 */
export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  } catch (error) {
    console.error('Get session error:', error);
    return { session: null, error };
  }
};

/**
 * Get the current user
 * @returns {Promise<{user, error}>}
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  } catch (error) {
    console.error('Get user error:', error);
    return { user: null, error };
  }
};

/**
 * Listen to auth state changes
 * @param {Function} callback 
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  
  return () => subscription.unsubscribe();
};

export default supabase;
