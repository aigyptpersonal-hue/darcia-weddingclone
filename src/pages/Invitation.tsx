import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase"; 
import Index from "./Index"; 

const Invitation = () => {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitation = async () => {
      // Logic ambil data dari tabel 'invitations' berdasarkan slug
      const { data: dbData, error } = await supabase
        .from("invitations")
        .select("content")
        .eq("slug", slug)
        .single();

      if (dbData) {
        setData(dbData.content);
      }
      setLoading(false);
    };

    if (slug) fetchInvitation();
  }, [slug]);

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  
  // Kita panggil tampilan Index, tapi kita titipin data dari database
  return <Index customData={data} />;
};

export default Invitation;
