import { supabase } from '../config/supabase';

// get all toys
export const getToys = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
};

// get toy by id
export const getToyById = async (id) => {
  const { data, error } = await supabase.from('toys').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};


// Đăng ký user trực tiếp lên Supabase Auth
export const registerUser = async ({ email, password, fullName, phone }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
      },
    },
  });
  if (error) throw error;
  return data;
};

// Đăng nhập user trực tiếp lên Supabase Auth
export const loginUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};