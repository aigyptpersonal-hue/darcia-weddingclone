// =====================================================
// DARCIA WEDDING INVITATION - SIGNATURE 01
// Edit semua konten undangan di file ini
// =====================================================

export const invitationData = {
  // === META & BRANDING ===
  meta: {
    title: "Darcia Wedding Invitation – Signature 01",
    tagline: "THE WEDDING OF",
    logo: "D&C", // Inisial pasangan
  },

  // === PASANGAN ===
  couple: {
    groom: {
      fullName: "Daru Fahmaa Muliawan Lc",
      shortName: "Daru",
      childOrder: "Putra Tunggal dari",
      fatherName: "Bpk. Asep Muliawan S.ST",
      motherName: "Ibu Euis Akmaliyah Amd",
      instagram: "https://www.instagram.com/dfmaa",
      photo: "/images/groom.jpg", // Ganti dengan foto pengantin pria
    },
    bride: {
      fullName: "Syazkia Lathiifa",
      shortName: "Cia",
      childOrder: "Putri Kedua dari",
      fatherName: "Bpk. Zul Besmara S.pd",
      motherName: "Ibu Elnida Yanti",
      instagram: "https://www.instagram.com/Syazkia_cia",
      photo: "/images/bride.jpg", // Ganti dengan foto pengantin wanita
    },
    quote: "Dua jiwa namun satu pikiran, dua hati namun satu perasaan",
  },

  // === ACARA ===
  events: {
    mainEvent: "NGUNDUH MANTU",
    mainDate: "August 6th 2025",
    akadNikah: {
      title: "Akad Nikah",
      day: "Rabu",
      date: "0",
      month: "November",
      year: "2024",
      time: "Telah Terlaksana",
      venue: "Masjid Manarul Ilmi, Islamic Center Padang Panjang",
      mapsLink: "https://maps.app.goo.gl/jzA7EepUWjeF93Zu5",
      isCompleted: true,
    },
    ngunduhMantu: {
      title: "Ngunduh Mantu",
      day: "Rabu",
      date: "6",
      month: "Agustus",
      year: "2025",
      time: "10.00 - 16.00 WIB",
      venue: "Rumah Makan Bambu Oju Kota Tangerang",
      mapsLink: "https://maps.app.goo.gl/hL1VcizWmmUzM32JA",
      isCompleted: false,
    },
    // Tanggal target untuk countdown (format: YYYY-MM-DD)
    countdownTarget: "2025-08-06T10:00:00",
  },

  // === OPENING TEXT ===
  opening: {
    eventType: "Resepsi Ngunduh Mantu",
    bismillah: "Bismillahirrahmanirrahim",
    mainText:
      "Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, kami memohon kehadiran Bapak/Ibu/Saudara/i pada acara ngunduh mantu kami:",
  },

  // === STORY / PERJALANAN CINTA ===
  story: {
    title: "Story of Our Journey",
    chapters: [
      {
        year: "2022",
        title: "The First Meeting",
        description:
          "We first met in Cairo during a Graphic Design Class organized by the Minangkabau Student Association. Daru was the mentor, and Cia was one of the participants. That's where everything began.",
      },
      {
        year: "2023",
        title: "A Growing Connection",
        description:
          "As time passed, our bond grew stronger. Not only between us, but also between our families. With shared values and dreams, we decided to commit to a more serious journey together.",
      },
      {
        year: "2024",
        title: "Engagement & Marriage",
        description:
          'By His will, an unexpected meeting turned into a beautiful path toward a sacred union. We held our engagement in October 2024, and God willing, will celebrate our wedding in November. As Imam Ali ibn Abi Thalib once said: "What is meant for you will find its way to you."',
      },
    ],
  },

  // === AYAT AL-QURAN ===
  quranVerse: {
    arabic: "",
    translation:
      "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    source: "QS. Ar Rum ayat 21",
  },

  // === WEDDING GIFT / REKENING ===
  gift: {
    title: "Wedding Gift",
    description:
      "Doa restu anda merupakan karunia yang sangat berarti bagi kami dan jika memberi adalah ungkapan tanda terima kasih anda, anda dapat memberi kado secara cashless",
    accounts: [
      {
        bankName: "BSI",
        bankLogo: "/images/bsi-logo.png",
        accountName: "Syazkia Lathiifa",
        accountNumber: "007055456746",
      },
      {
        bankName: "BCA",
        bankLogo: "/images/bca-logo.png",
        accountName: "Daru Fahmaa Muliawan",
        accountNumber: "100598361895",
      },
    ],
  },

  // === GALERI FOTO ===
  gallery: {
    title: "Our Gallery",
    photos: [
      "/images/gallery-1.jpg",
      "/images/gallery-2.jpg",
      "/images/gallery-3.jpg",
      "/images/gallery-4.jpg",
    ],
  },

  // === RSVP / DOA & UCAPAN ===
  rsvp: {
    title: "Doa & Ucapan",
    whatsappLink: "https://api.whatsapp.com/send/?phone=6287779611567",
    whatsappText: "Kirim ucapan via WhatsApp",
  },

  // === CLOSING ===
  closing: {
    thankYouText: "Thank You",
    credit: "Made with ❤️",
    creditLink: "#",
  },
};

export type InvitationData = typeof invitationData;
