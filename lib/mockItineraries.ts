export interface ItineraryStop {
  id: string;
  name: string;
  timeSlot: string;
  description: string;
  crowdLevel: "Low crowd" | "Moderate crowd" | "High crowd";
  crowdStatus: "low" | "moderate" | "high";
  category: string;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  stops: ItineraryStop[];
}

export interface DestinationItinerary {
  destination: string;
  tagline: string;
  days: DayItinerary[];
}

export const MOCK_ITINERARIES: Record<string, DestinationItinerary> = {
  varanasi: {
    destination: "Varanasi",
    tagline: "Sacred Ghats, Ancient Traditions & Spiritual Heritage",
    days: [
      {
        dayNumber: 1,
        title: "Sacred Ghats & Evening Ganga Aarti",
        stops: [
          {
            id: "v-1",
            name: "Subah-e-Banaras at Assi Ghat",
            timeSlot: "05:30 AM - 07:30 AM",
            description: "Morning Vedic chanting, classical ragas, and sunrise boat ride along northern ghats.",
            crowdLevel: "Low crowd",
            crowdStatus: "low",
            category: "Spiritual",
          },
          {
            id: "v-2",
            name: "Kashi Vishwanath Temple Corridor",
            timeSlot: "08:30 AM - 10:30 AM",
            description: "Explore the ancient Jyotirlinga shrine and newly restored heritage walkway.",
            crowdLevel: "High crowd",
            crowdStatus: "high",
            category: "Heritage",
          },
          {
            id: "v-3",
            name: "Heritage Alley Food Walk",
            timeSlot: "12:30 PM - 02:00 PM",
            description: "Sample authentic Banarasi Kachori Sabzi, Malaiyyo, and traditional Lassi.",
            crowdLevel: "Moderate crowd",
            crowdStatus: "moderate",
            category: "Food",
          },
          {
            id: "v-4",
            name: "Dashashwamedh Ganga Aarti",
            timeSlot: "06:00 PM - 07:30 PM",
            description: "Synchronized brass lamp ceremony on the main riverbank steps.",
            crowdLevel: "High crowd",
            crowdStatus: "high",
            category: "Spiritual",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Buddhist Legacy & Heritage Silk Craft",
        stops: [
          {
            id: "v-5",
            name: "Sarnath Archaeological Complex",
            timeSlot: "08:00 AM - 11:00 AM",
            description: "Visit Dhamek Stupa where Buddha delivered his first sermon.",
            crowdLevel: "Low crowd",
            crowdStatus: "low",
            category: "Heritage",
          },
          {
            id: "v-6",
            name: "Madanpura Silk Weavers Hub",
            timeSlot: "02:00 PM - 04:30 PM",
            description: "Observe master artisans hand-weaving authentic Banarasi brocade sarees.",
            crowdLevel: "Moderate crowd",
            crowdStatus: "moderate",
            category: "Culture",
          },
          {
            id: "v-7",
            name: "Ramnagar Fort Sunset View",
            timeSlot: "05:00 PM - 06:30 PM",
            description: "18th-century sandstone fortress overlooking the Ganges river curve.",
            crowdLevel: "Low crowd",
            crowdStatus: "low",
            category: "Heritage",
          },
        ],
      },
    ],
  },
  jaipur: {
    destination: "Jaipur",
    tagline: "Royal Fortresses, Palaces & Rajasthani Culinary Trails",
    days: [
      {
        dayNumber: 1,
        title: "Amer Fort & Royal Palace Quarter",
        stops: [
          {
            id: "j-1",
            name: "Amer Fort & Sheesh Mahal",
            timeSlot: "08:00 AM - 11:00 AM",
            description: "Sandstone hilltop fortress featuring intricate mirror work galleries.",
            crowdLevel: "Moderate crowd",
            crowdStatus: "moderate",
            category: "Heritage",
          },
          {
            id: "j-2",
            name: "City Palace & Jantar Mantar",
            timeSlot: "11:30 AM - 02:00 PM",
            description: "Royal residence complex and UNESCO astronomical observatory.",
            crowdLevel: "High crowd",
            crowdStatus: "high",
            category: "Heritage",
          },
          {
            id: "j-3",
            name: "Johari Bazaar Dal Baati Trail",
            timeSlot: "02:30 PM - 04:00 PM",
            description: "Relish authentic Rajasthani Thali, Ghevar, and Pyaz Kachori.",
            crowdLevel: "Moderate crowd",
            crowdStatus: "moderate",
            category: "Food",
          },
          {
            id: "j-4",
            name: "Hawa Mahal Sunset View",
            timeSlot: "05:30 PM - 06:30 PM",
            description: "Iconic 953-window honeycomb façade illuminated by sunset rays.",
            crowdLevel: "Low crowd",
            crowdStatus: "low",
            category: "Heritage",
          },
        ],
      },
      {
        dayNumber: 2,
        title: "Hill Forts & Artisan Craft Villages",
        stops: [
          {
            id: "j-5",
            name: "Nahargarh Fort Panorama",
            timeSlot: "09:00 AM - 11:30 AM",
            description: "Sweeping views of Pink City skyline from Aravalli ridge.",
            crowdLevel: "Low crowd",
            crowdStatus: "low",
            category: "Adventure",
          },
          {
            id: "j-6",
            name: "Sanganer Block Printing Village",
            timeSlot: "01:30 PM - 04:00 PM",
            description: "Watch traditional wooden block textile printing by hereditary craftsmen.",
            crowdLevel: "Low crowd",
            crowdStatus: "low",
            category: "Culture",
          },
          {
            id: "j-7",
            name: "Albert Hall Museum Evening Light",
            timeSlot: "06:00 PM - 07:30 PM",
            description: "Indo-Saracenic architecture showcasing royal artifacts and metalware.",
            crowdLevel: "Moderate crowd",
            crowdStatus: "moderate",
            category: "Heritage",
          },
        ],
      },
    ],
  },
};

export function getItinerary(destinationName: string): DestinationItinerary {
  const normalized = destinationName.trim().toLowerCase();
  if (normalized.includes("jaipur")) {
    return MOCK_ITINERARIES.jaipur;
  }
  return MOCK_ITINERARIES.varanasi;
}
