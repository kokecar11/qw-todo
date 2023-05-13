import type { RequestEventBase } from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";

const PUBLIC_SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const PUBLIC_SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
export const supabaseClient = (requestEv:RequestEventBase) =>{
    return createServerClient( PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY,requestEv)
};