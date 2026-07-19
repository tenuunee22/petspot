import { supabase } from './supaIndex.ts';

export async function addPetInfo(name: string, age: number) {
	const { data, error } = await supabase
		  .from('pets')
		  .insert([{ Pet_name: name, Age: age }])
		  .select();
	return { data, error };
}

export async function getInfo() {
    const { data, error } = await supabase.from('pets').select('*');
    return { data, error };
}
