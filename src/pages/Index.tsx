import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CoverScreen from "@/components/invitation/CoverScreen";
import HeroSection from "@/components/invitation/HeroSection";
import CoupleSection from "@/components/invitation/CoupleSection";
import CountdownSection from "@/components/invitation/CountdownSection";
import EventsSection from "@/components/invitation/EventsSection";
import StorySection from "@/components/invitation/StorySection";
import QuranVerseSection from "@/components/invitation/QuranVerseSection";
import GiftSection from "@/components/invitation/GiftSection";
import RSVPSection from "@/components/invitation/RSVPSection";
import ClosingSection from "@/components/invitation/ClosingSection";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import { invitationData } from "@/data/invitationData";

// 1. Terima props 'customData' dari Invitation.tsx
const Index = ({ customData }: { customData?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [guestName, setGuestName] = useState<string | undefined>();

  // 2. LOGIC SAKTI: Pilih data Supabase (customData) atau Default (invitationData)
  const data = customData || invitationData;

  useEffect(() => {
    const toParam = searchParams.get("to");
    if (toParam) {
      setGuestName(decodeURIComponent(toParam));
    }
  }, [searchParams]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 3. Title Tab Browser udah Dinamis! */}
      <title>{data.meta.title}</title>
      
      {/* Cover Screen */}
      <AnimatePresence>
        {/* UPDATED: Sekarang kita kirim 'data' ke CoverScreen */}
        {!isOpen && <CoverScreen onOpen={handleOpenInvitation} guestName={guestName} data={data} />}
      </AnimatePresence>

      {/* Main Content */}
      {isOpen && (
        <>
          <main className="animate-fade-in">
            {/* NOTE: Komponen di bawah ini masih pakai data lama (hardcode).
               Nanti pelan-pelan kita update satu per satu kayak CoverScreen tadi.
            */}
            <HeroSection guestName={guestName} />
            <CoupleSection />
            <CountdownSection />
            <EventsSection />
            <StorySection />
            <QuranVerseSection />
            <GiftSection />
            <RSVPSection />
            <ClosingSection />
          </main>
          <MusicPlayer />
        </>
      )}
    </div>
  );
};

export default Index;
