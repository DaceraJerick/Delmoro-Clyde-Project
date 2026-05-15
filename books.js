import { supabase } from './auth.js';

export const books = {
    async list() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { data: [], error: 'Not authenticated' };

        const { data, error } = await supabase
            .from('books')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
        
        return { data, error };
    },

    async create(title, author) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { error: { message: 'Not authenticated' } };

        const { data, error } = await supabase
            .from('books')
            .insert([{ title, author, user_id: user.id }])
            .select();
        
        return { data, error };
    },

    async update(id, title, author) {
        const { data, error } = await supabase
            .from('books')
            .update({ title, author })
            .eq('id', id)
            .select();
        
        return { data, error };
    },

    async delete(id) {
        const { error } = await supabase
            .from('books')
            .delete()
            .eq('id', id);
        
        return { error };
    }
};
