/**
 * Supabase Client Configuration
 * 
 * Handles authentication for theLABEL marketing website
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tmulakisqpwwqyqotill.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdWxha2lzcXB3d3F5cW90aWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwNjk1NTYsImV4cCI6MjA1MTY0NTU1Nn0.ChxuF3D28ok7Qo7kGAVMZtsTy5fM9uKhxeB8XhSYSxE";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured. Auth will not work.');
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
        emailRedirectTo: `${window.location.origin}/auth/callback`
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
