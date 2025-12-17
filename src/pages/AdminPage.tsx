import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Send, Check, Link2, MessageSquare, QrCode } from "lucide-react";
import { invitationData } from "@/data/invitationData";
import { useToast } from "@/hooks/use-toast";
import QRCode from "react-qr-code"; // Pastikan install: npm install react-qr-code

type Language = "indonesia" | "islami" | "english";

const AdminPage = () => {
  const [guestName, setGuestName] = useState("");
  const [language, setLanguage] = useState<Language>("indonesia");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const { toast } = useToast();

  const { couple, events } = invitationData;
  const baseUrl = window.location.origin;
  
  const generateInvitationLink = () => {
    const encodedName = encodeURIComponent(guestName.trim() || "Tamu Undangan");
    return `${baseUrl}/?to=${encodedName}`;
  };

  const getWhatsAppText = () => {
    const link = generateInvitationLink();
    const groomName = couple.groom.shortName;
    const brideName = couple.bride.shortName;
    const eventDate = events.mainDate;
    const venue = events.ngunduhMantu.venue;
    const guest = guestName.trim() || "Bapak/Ibu/Saudara/i";

    const templates: Record<Language, string> = {
      indonesia: `Kepada Yth. ${guest}

Dengan hormat,
Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

💍 ${groomName} & ${brideName}

📅 ${eventDate}
📍 ${venue}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Untuk informasi lebih lanjut, silakan kunjungi:
${link}

Terima kasih atas perhatiannya. 🙏`,

      islami: `بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم

Assalamu'alaikum Warahmatullahi Wabarakatuh

Kepada Yth. ${guest}

Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

💍 ${groomName} & ${brideName}

📅 ${eventDate}
📍 ${venue}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Untuk informasi lebih lanjut:
${link}

Wassalamu'alaikum Warahmatullahi Wabarakatuh 🤲`,

      english: `Dear ${guest},

You are cordially invited to celebrate the wedding of:

💍 ${groomName} & ${brideName}

📅 ${eventDate}
📍 ${venue}

It would be our honor and joy to have you join us on our special day.

For more details, please visit:
${link}

We look forward to celebrating with you! 💐`,
    };

    return templates[language];
  };

  const copyLink = async () => {
    const link = generateInvitationLink();
    await navigator.clipboard.writeText(link);
    setCopiedLink(true);
    toast({ title: "Link Disalin!", description: "Link undangan siap dibagikan." });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyText = async () => {
    const text = getWhatsAppText();
    await navigator.clipboard.writeText(text);
    setCopiedText(true);
    toast({ title: "Teks Disalin!", description: "Template pesan berhasil disalin." });
    setTimeout(() => setCopiedText(false), 2000);
  };

  const sendViaWhatsApp = () => {
    const text = encodeURIComponent(getWhatsAppText());
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    // BACKGROUND: Sama kayak section lain, gradient cream
    <div className="min-h-screen bg-gradient-to-b from-[#F8F0E5] to-[#F9F7F2] py-10 px-4 font-sans text-[#3A5A40]">
      <div className="max-w-lg mx-auto">
        
        {/* --- HEADER --- */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 border border-[#3A5A40]/30 bg-white/40 rounded-full flex items-center justify-center mx-auto mb-4 text-[#3A5A40] shadow-sm">
             <span className="text-3xl" style={{ fontFamily: "'Sinera', serif" }}>
                {invitationData.meta.logo}
             </span>
          </div>
          <h1 className="text-3xl md:text-4xl text-[#3A5A40] mb-2" style={{ fontFamily: "'Sinera', serif" }}>
            Generator Undangan
          </h1>
          <p className="text-sm text-[#3A5A40]/70">
            Buat link khusus untuk tamu spesialmu
          </p>
        </motion.div>

        {/* --- MAIN FORM CONTAINER (ARCH STYLE) --- */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm border border-[#3A5A40]/10 p-6 md:p-8 rounded-t-[50px] rounded-b-[20px] shadow-sm space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          
          {/* 1. INPUT NAMA TAMU */}
          <div>
            <label className="block text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-2 ml-1">
              Nama Tamu
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Contoh: Bpk. Jokowi & Keluarga"
              className="w-full px-4 py-3 bg-white/50 border border-[#3A5A40]/20 rounded-xl text-[#3A5A40] placeholder:text-[#3A5A40]/40 focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40] transition-all text-sm"
            />
          </div>

          {/* 2. PILIH BAHASA */}
          <div>
            <label className="block text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-2 ml-1">
              Bahasa Pengantar
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "indonesia", label: "ID" },
                { value: "islami", label: "Islami" },
                { value: "english", label: "EN" },
              ].map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value as Language)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    language === lang.value
                      ? "bg-[#3A5A40] text-[#F9F7F2] shadow-md"
                      : "bg-white/50 border border-[#3A5A40]/20 text-[#3A5A40] hover:bg-[#3A5A40]/5"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. PREVIEW LINK */}
          <div>
            <label className="block text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
              <Link2 className="w-3.5 h-3.5" />
              Link Undangan
            </label>
            <div className="p-4 bg-[#3A5A40]/5 border border-[#3A5A40]/10 rounded-xl break-all text-xs text-[#3A5A40] font-mono">
              {generateInvitationLink()}
            </div>
          </div>

          {/* 4. PREVIEW WHATSAPP */}
          <div>
            <label className="block text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" />
              Preview Pesan
            </label>
            <div className="p-4 bg-[#3A5A40]/5 border border-[#3A5A40]/10 rounded-xl text-xs text-[#3A5A40]/80 whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar leading-relaxed">
              {getWhatsAppText()}
            </div>
          </div>

          {/* 5. ACTION BUTTONS */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            <button
              onClick={copyLink}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-[#3A5A40]/30 text-[#3A5A40] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#3A5A40] hover:text-[#F9F7F2] transition-all duration-300"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? "Link Tersalin!" : "Salin Link"}
            </button>
            
            <button
              onClick={copyText}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-[#3A5A40]/30 text-[#3A5A40] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#3A5A40] hover:text-[#F9F7F2] transition-all duration-300"
            >
              {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedText ? "Teks Tersalin!" : "Salin Teks Pesan"}
            </button>
            
            <button
              onClick={sendViaWhatsApp}
              className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#25D366] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-green-500/20"
            >
              <Send className="w-4 h-4" />
              Kirim via WhatsApp
            </button>
          </div>

          {/* 6. QR CODE LOKASI */}
          <div className="pt-6 border-t border-[#3A5A40]/10 text-center">
            <label className="block text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-4 flex items-center gap-2 justify-center">
              <QrCode className="w-4 h-4" />
              Scan Lokasi Acara
            </label>
            <div className="flex justify-center bg-white p-4 rounded-xl shadow-sm border border-[#3A5A40]/10 inline-block mx-auto">
               <QRCode
                  value={events.ngunduhMantu.mapsLink} // Link maps dari data
                  size={150}
                  fgColor="#3A5A40"
                  bgColor="#FFFFFF"
                  level="M"
               />
            </div>
          </div>

        </motion.div>

        {/* --- BACK LINK --- */}
        <motion.div
          className="text-center mt-8 pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#3A5A40]/60 hover:text-[#3A5A40] transition-colors font-medium uppercase tracking-widest px-4 py-2 border border-transparent hover:border-[#3A5A40]/20 rounded-full"
          >
            ← Kembali ke Undangan
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminPage;
