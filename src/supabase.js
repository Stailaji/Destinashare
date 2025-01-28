import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jcdzxckznjoycsivwmzb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjZHp4Y2t6bmpveWNzaXZ3bXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMTIzOTMsImV4cCI6MjA1MzU4ODM5M30.oqi-nGcekkh7dR8F3D5MdwXTB5pyL0ZrdnB_60HdKns";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
