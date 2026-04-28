import { G } from '../theme';

let MOCK_CONTACTS = [
  { id: 1, name: "Priya Sharma",    phone: "+91 98300 11234", type: "Salon",        status: "active",   lastVisit: "3 days ago",  visits: 12, tag: "VIP",        avatar: "PS", color: "#a78bfa" },
  { id: 2, name: "Rohit Das",       phone: "+91 70443 88901", type: "Gym",          status: "lapsed",   lastVisit: "42 days ago", visits: 5,  tag: "At Risk",    avatar: "RD", color: "#fb923c" },
  { id: 3, name: "Sneha Mukherjee", phone: "+91 90461 05790", type: "Dental",       status: "active",   lastVisit: "1 week ago",  visits: 8,  tag: "Regular",    avatar: "SM", color: G.green },
  { id: 4, name: "Arjun Bose",      phone: "+91 83350 44210", type: "Salon",        status: "new",      lastVisit: "Today",       visits: 1,  tag: "New",        avatar: "AB", color: G.teal },
  { id: 5, name: "Kavita Roy",      phone: "+91 77890 23456", type: "Gym",          status: "lapsed",   lastVisit: "60 days ago", visits: 3,  tag: "At Risk",    avatar: "KR", color: "#f87171" },
  { id: 6, name: "Tanmoy Ghosh",    phone: "+91 98765 43210", type: "Dental",       status: "active",   lastVisit: "5 days ago",  visits: 6,  tag: "Regular",    avatar: "TG", color: G.amber },
  { id: 7, name: "Mitu Banerjee",   phone: "+91 62910 77654", type: "Salon",        status: "active",   lastVisit: "2 days ago",  visits: 20, tag: "VIP",        avatar: "MB", color: "#c084fc" },
  { id: 8, name: "Suman Pal",       phone: "+91 91630 55432", type: "Gym",          status: "new",      lastVisit: "Yesterday",   visits: 2,  tag: "New",        avatar: "SP", color: G.teal },
];

let MOCK_CAMPAIGNS = [
  {
    id: 1, name: "Post-Visit Thank You", type: "Follow-up", icon: "💬",
    color: G.green, status: "live", sent: 248, opened: 191, replied: 44,
    trigger: "2 hrs after appointment", template: "Hi {name}! 😊 Thank you for visiting us today. Hope you're happy with our service! Book your next appointment: {link}",
    segment: "All customers",
  },
  {
    id: 2, name: "Appointment Reminder", type: "Reminder", icon: "🔔",
    color: G.teal, status: "live", sent: 310, opened: 289, replied: 12,
    trigger: "24 hrs before appointment", template: "Hi {name}, friendly reminder — your appointment is tomorrow at {time}. Reply CONFIRM or CANCEL. See you! 🙏",
    segment: "Upcoming appointments",
  },
  {
    id: 3, name: "Win-Back Lapsed Clients", type: "Reactivation", icon: "🔁",
    color: G.amber, status: "live", sent: 89, opened: 61, replied: 22,
    trigger: "30 days since last visit", template: "Hey {name}! We miss you 🥺 It's been a while. Come back this week & get 20% OFF your next visit. Valid till {date}. Book now: {link}",
    segment: "Lapsed (30+ days)",
  },
  {
    id: 4, name: "Festival Promo — Durga Puja", type: "Broadcast", icon: "🎉",
    color: "#c084fc", status: "scheduled", sent: 0, opened: 0, replied: 0,
    trigger: "Oct 10, 9:00 AM", template: "Subho Bijoya, {name}! 🙏✨ Celebrate the festive season with our special Puja offer — Flat ₹200 OFF on all services. Book today: {link}",
    segment: "All contacts",
  },
  {
    id: 5, name: "Birthday Surprise", type: "Broadcast", icon: "🎂",
    color: "#fb923c", status: "live", sent: 34, opened: 31, replied: 18,
    trigger: "Day of birthday", template: "Happy Birthday {name}! 🎂🎉 Wishing you a wonderful day! Here's a special gift from us — FREE hair wash on your next visit. Show this msg to redeem!",
    segment: "Contacts with birthday",
  },
  {
    id: 6, name: "AI Auto-Reply Bot", type: "AI Reply", icon: "🤖",
    color: G.teal, status: "live", sent: 0, opened: 0, replied: 156,
    trigger: "Any incoming message", template: "Handles: appointment queries, pricing, timings, directions — automatically via AI.",
    segment: "All incoming",
  },
];

const MOCK_INBOX = [
  { id: 1, name: "Priya Sharma",    avatar: "PS", color: "#a78bfa", msg: "Can I book for Saturday?",            time: "2m",  unread: true,  type: "query" },
  { id: 2, name: "Rohit Das",       avatar: "RD", color: "#fb923c", msg: "What's the monthly gym fee?",         time: "14m", unread: true,  type: "query" },
  { id: 3, name: "Arjun Bose",      avatar: "AB", color: G.teal,   msg: "CONFIRM ✅",                           time: "1h",  unread: false, type: "confirm" },
  { id: 4, name: "Kavita Roy",      avatar: "KR", color: "#f87171", msg: "Is the Puja offer still valid?",      time: "2h",  unread: false, type: "query" },
  { id: 5, name: "Tanmoy Ghosh",    avatar: "TG", color: G.amber,  msg: "Thank you! See you soon 🙏",           time: "3h",  unread: false, type: "positive" },
  { id: 6, name: "Mitu Banerjee",   avatar: "MB", color: "#c084fc", msg: "Book me for Sunday facial please",   time: "5h",  unread: false, type: "query" },
];

const MOCK_AI_REPLIES = [
  { q: "What are your timings?",            a: "We're open Mon–Sat, 10 AM – 8 PM & Sun 11 AM – 6 PM. 😊" },
  { q: "How much for a haircut?",           a: "Haircuts start at ₹150 for gents and ₹250 for ladies. Full price list: {link}" },
  { q: "Where are you located?",            a: "We're at Park Street, Kolkata. Drop a pin? I'll send directions 📍" },
  { q: "Can I book for tomorrow?",          a: "Sure! What time works for you? I'll check availability right away 🗓️" },
];

export const DEMO_USER_EMAIL = "admin@msgdrop.com";

let userContacts: any[] = JSON.parse(localStorage.getItem('demo_userContacts') || '[]');
let userCampaigns: any[] = JSON.parse(localStorage.getItem('demo_userCampaigns') || '[]');
let userFaqs: any[] = [];
const EMPTY_ARRAY: any[] = [];

// Export functions to add items globally
export const addContactToStore = (contact: any) => {
  userContacts = [contact, ...userContacts];
  localStorage.setItem('demo_userContacts', JSON.stringify(userContacts));
};

export const addCampaignToStore = (campaign: any) => {
  userCampaigns = [campaign, ...userCampaigns];
  localStorage.setItem('demo_userCampaigns', JSON.stringify(userCampaigns));
};

export const addFaqToStore = (faq: any) => userFaqs.push(faq);

export const deleteContactFromStore = (id: number) => {
  MOCK_CONTACTS = MOCK_CONTACTS.filter(c => c.id !== id);
  userContacts = userContacts.filter(c => c.id !== id);
  localStorage.setItem('demo_userContacts', JSON.stringify(userContacts));
};

export const deleteCampaignFromStore = (id: number) => {
  MOCK_CAMPAIGNS = MOCK_CAMPAIGNS.filter(c => c.id !== id);
  userCampaigns = userCampaigns.filter(c => c.id !== id);
  localStorage.setItem('demo_userCampaigns', JSON.stringify(userCampaigns));
};

export const updateCampaignInStore = (id: number, data: any) => {
  const mIdx = MOCK_CAMPAIGNS.findIndex(c => c.id === id);
  if (mIdx !== -1) MOCK_CAMPAIGNS[mIdx] = { ...MOCK_CAMPAIGNS[mIdx], ...data };
  
  const uIdx = userCampaigns.findIndex(c => c.id === id);
  if (uIdx !== -1) {
    userCampaigns[uIdx] = { ...userCampaigns[uIdx], ...data };
    localStorage.setItem('demo_userCampaigns', JSON.stringify(userCampaigns));
  }
};

export function useCRMData() {
  const userEmail = localStorage.getItem('userEmail');
  const isDemoUser = userEmail === DEMO_USER_EMAIL;

  // We memoize the contacts to prevent infinite loops in useEffect
  // but we also want it to reflect newly added contacts when remounting.
  // In a real app this is handled by Redux/Context/React Query.
  const allContacts = isDemoUser ? [...MOCK_CONTACTS, ...userContacts] : userContacts;
  return {
    isDemoUser,
    CONTACTS: allContacts,
    CAMPAIGNS: isDemoUser ? MOCK_CAMPAIGNS.concat(userCampaigns) : userCampaigns,
    INBOX: isDemoUser ? MOCK_INBOX : EMPTY_ARRAY,
    AI_REPLIES: isDemoUser ? MOCK_AI_REPLIES.concat(userFaqs) : userFaqs,
    
    // Overall stats
    stats: {
      totalContacts: isDemoUser ? (847 + userContacts.length).toString() : userContacts.length.toString(),
      messagesSent: isDemoUser ? "2,341" : "0",
      campaignsLive: isDemoUser ? "4" : "0",
      revenueRecovered: isDemoUser ? "₹38K" : "₹0",
    }
  };
}
