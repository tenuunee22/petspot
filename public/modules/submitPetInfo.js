import { supabase } from './supabase.js';

export async function submitPetInfo(Pet_name, Age) {
    const { data, error } = await supabase
          .from('pets')
          .insert([ { Pet_name, Age } ]);
    
    if (error) { console.log("something went wrong", error); return { success: false, error } }
    else { console.log("success"); return { success: true, data } }
}

const form = document.getElementById('petForm');

if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('petName').value;
        const age = Number(document.getElementById('petAge').value);

        const result = await submitPetInfo(name, age);
        if(result.success) { form.reset(); }
    });
}
