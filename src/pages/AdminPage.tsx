import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Send, Check, Link2, MessageSquare, QrCode } from "lucide-react";
import { invitationData } from "@/data/invitationData";
import { useToast } from "@/hooks/use-toast";
import LocationQRCode from "@/components/invitation/LocationQRCode";

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
    const encodedName = encodeURIComponent(guestName.trim() || "Bapak/Ibu/Saudara/i");
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
    toast({ title: "Link disalin!", description: "Link undangan berhasil disalin" });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyText = async () => {
    const text = getWhatsAppText();
    await navigator.clipboard.writeText(text);
    setCopiedText(true);
    toast({ title: "Teks disalin!", description: "Teks undangan berhasil disalin" });
    setTimeout(() => setCopiedText(false), 2000);
  };

  const sendViaWhatsApp = () => {
    const text = encodeURIComponent(getWhatsAppText());
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 border border-primary/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-2xl text-primary">{invitationData.meta.logo}</span>
          </div>
          <h1 className="font-display text-3xl text-primary mb-2">Generator Undangan</h1>
          <p className="text-sm text-muted-foreground">
            Buat link undangan personal untuk setiap tamu
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Guest Name Input */}
          <div>
            <label className="block text-sm text-foreground/80 mb-2">
              Nama Tamu
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Masukkan nama tamu..."
              className="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm text-foreground/80 mb-2">
              Bahasa Undangan
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "indonesia", label: "Indonesia" },
                { value: "islami", label: "Islami" },
                { value: "english", label: "English" },
              ].map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value as Language)}
                  className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                    language === lang.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-primary/30 text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generated Link Preview */}
          <div>
            <label className="block text-sm text-foreground/80 mb-2 flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Link Undangan
            </label>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg break-all text-sm text-primary/80">
              {generateInvitationLink()}
            </div>
          </div>

          {/* WhatsApp Text Preview */}
          <div>
            <label className="block text-sm text-foreground/80 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Preview Teks WhatsApp
            </label>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm text-foreground/80 whitespace-pre-wrap max-h-60 overflow-y-auto">
              {getWhatsAppText()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3 pt-4">
            <button
              onClick={copyLink}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-primary/40 text-primary rounded-lg hover:bg-primary/10 transition-all"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? "Tersalin!" : "Copy Link"}
            </button>
            
            <button
              onClick={copyText}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-primary/40 text-primary rounded-lg hover:bg-primary/10 transition-all"
            >
              {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedText ? "Tersalin!" : "Copy Teks"}
            </button>
            
            <button
              onClick={sendViaWhatsApp}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              <Send className="w-4 h-4" />
              Kirim via WhatsApp
            </button>
          </div>

          {/* QR Code Section */}
          <div className="pt-6 border-t border-primary/20">
            <label className="block text-sm text-foreground/80 mb-4 flex items-center gap-2 justify-center">
              <QrCode className="w-4 h-4" />
              QR Code Lokasi
            </label>
            <div className="flex justify-center">
              <LocationQRCode mapsLink={events.ngunduhMantu.mapsLink} size={180} />
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Kembali ke Undangan
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
