// =====================================================
// DARCIA WEDDING INVITATION - SIGNATURE 01
// Edit semua konten undangan di file ini
// =====================================================

export const invitationData = {
  // === META & BRANDING ===
  meta: {
    title: "Siska & Ridho Wedding Invitation",
    tagline: "THE WEDDING OF",
    logo: "S&R", // Inisial pasangan
  },

  // === PASANGAN ===
  couple: {
    groom: {
      fullName: "Siska Nur Hendri, A.Md.Keb",
      shortName: "Siska",
      childOrder: "Putri dari",
      fatherName: "Bpk. Hendriko",
      motherName: "Ibu Nur Azizah",
      instagram: "https://www.instagram.com/dfmaa",
      photo: "/images/groom.jpg", // Ganti dengan foto pengantin pria
    },
    bride: {
      fullName: "Ridho Rahmat Fauzi",
      shortName: "Ridho",
      childOrder: "Putra dari",
      fatherName: "Bpk. Henisto",
      motherName: "Ibu Yenni",
      instagram: "https://www.instagram.com/Syazkia_cia",
      photo: "/images/bride.jpg", // Ganti dengan foto pengantin wanita
    },
    quote: "Dua jiwa namun satu pikiran, dua hati namun satu perasaan",
  },

  // === ACARA ===
  events: {
    mainEvent: "Wedding",
    mainDate: "December 26th 2025",
    akadNikah: {
      title: "Akad Nikah",
      day: "Jum'at",
      date: "26",
      month: "December",
      year: "2025",
      time: "10.00 WIB s/d Selesai",
      venue: "KUA Banuhampu Sungai Pua Kabupaten Agam",
      mapsLink: "https://maps.app.goo.gl/xALBDwR4hAMYqeEU6",
      isCompleted: false,
    },
    ngunduhMantu: {
      title: "Resepsi",
      day: "Ahad",
      date: "28",
      month: "December",
      year: "2025",
      time: "10.00 WIB s/d Selesai",
      venue: "Jl. Labuah Gadang Nagari Kubang Putiah Banuhampu Sungai Pua",
      mapsLink: "https://maps.app.goo.gl/RmXYEFsiH5PYsLHJ6?g_st=ipc",
      isCompleted: false,
    },
    // Tanggal target untuk countdown (format: YYYY-MM-DD)
    countdownTarget: "2025-12-26T10:00:00",
  },

  // === OPENING TEXT ===
  opening: {
    eventType: "Wedding",
    bismillah: "Bismillahirrahmanirrahim",
    mainText:
      "Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, kami memohon kehadiran Bapak/Ibu/Saudara/i pada acara pernikahan kami:",
  },

  // === STORY / PERJALANAN CINTA ===
  story: {
    title: "Story of Our Journey",
    chapters: [
      {
        year: "April 2025",
        title: "Awal Pertemuan",
        description:
          "Tidak ada yang menyangka bahwa pertemuan kami pada awal April 2025 itu akan membawa kami pada suatu ikatan suatu hari nanti, semua sudah tersusun rapih oleh sang maha kuasa. Kita tidak bisa memilih kepada siapa kita akan jatuh cinta.",
      },
      {
        year: "2025",
        title: "Menjalin Hubungan",
        description:
          "Katanya cinta dapat tumbuh dengan kebersamaan, seiring berjalannya waktu kami memutuskan untuk menjalin hubungan yang lebih serius.",
      },
      {
        year: "December 2025",
        title: "Menikah",
        description:
          'Kehendak-Nya menuntun kamu pada sebuah pertemuan yang tak pernah disangka hingga akhirnya membawa kami pada sebuah ikatan suci. Bukan karena bertemu lalu berjodoh, tapi karena berjodoh maka kami dipertemukan. Kami memutuskan untuk mengikrarkan janji suci pernikahan kami.',
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
        accountNumber: "3603313510",
      },
      {
        bankName: "DANA",
        bankLogo: "/images/bca-logo.png",
        accountName: "Siska Nur Hendri",
        accountNumber: "082172770953",
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
