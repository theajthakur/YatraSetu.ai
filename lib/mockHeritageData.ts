export interface HeritagePlaceDetails {
  audioDuration: string;
  English: {
    title: string;
    summary: string;
    keyFact: string;
  };
  Hindi: {
    title: string;
    summary: string;
    keyFact: string;
  };
}

export const MOCK_HERITAGE_DATA: Record<string, HeritagePlaceDetails> = {
  "Kashi Vishwanath Temple Corridor": {
    audioDuration: "3:15 mins",
    English: {
      title: "Kashi Vishwanath Temple",
      summary:
        "Reconstructed in 1780 by Queen Ahilyabai Holkar of Indore, Kashi Vishwanath stands as one of the twelve sacred Jyotirlinga shrines of Lord Shiva. The newly restored 50,000-square-metre heritage corridor directly connects the ancient temple to the holy banks of the Ganges.",
      keyFact: "Its twin spires were gilded with 800 kilograms of gold donated by Maharaja Ranjit Singh in 1835.",
    },
    Hindi: {
      title: "काशी विश्वनाथ मंदिर",
      summary:
        "1780 में इंदौर की महारानी अहिल्याबाई होल्कर द्वारा पुनर्निर्मित, काशी विश्वनाथ भगवान शिव के बारह पवित्र ज्योतिर्लिंगों में से एक है। 50,000 वर्ग मीटर का नया धरोहर गलियारा प्राचीन मंदिर को सीधे पवित्र गंगा तट से जोड़ता है।",
      keyFact: "इसके जुड़वां शिखरों को 1835 में महाराजा रणजीत सिंह द्वारा दान किए गए 800 किलोग्राम सोने से मढ़ा गया था।",
    },
  },
  "Dashashwamedh Ganga Aarti": {
    audioDuration: "2:50 mins",
    English: {
      title: "Dashashwamedh Ghat",
      summary:
        "Dashashwamedh is one of the oldest and most prominent ghats along the Ganges in Varanasi. Every evening at dusk, trained Vedic priests perform a synchronized ritual featuring multi-tiered brass lamps, incense, and rhythmic conch blowing.",
      keyFact: "Mythology holds that Lord Brahma performed the ten-horse sacrifice (Dasa-Ashwamedha) at this sacred riverbank.",
    },
    Hindi: {
      title: "दशाश्वमेध घाट",
      summary:
        "दशाश्वमेध वाराणसी में गंगा किनारे स्थित सबसे प्राचीन और प्रमुख घाटों में से एक है। हर शाम यहाँ प्रशिक्षित वैदिक पुजारियों द्वारा पीतल के दीपकों, धूप और शंखनाद के साथ भव्य आरती की जाती है।",
      keyFact: "पौराणिक मान्यता के अनुसार भगवान ब्रह्मा ने इस तट पर दस घोड़ों का महायज्ञ किया था।",
    },
  },
  "Amer Fort & Sheesh Mahal": {
    audioDuration: "4:10 mins",
    English: {
      title: "Amer Fort & Sheesh Mahal",
      summary:
        "Built in 1592 by Raja Man Singh I, Amer Fort is a hilltop fortress blending traditional Rajput courtyard planning with Mughal floral carvings. The famed Sheesh Mahal (Hall of Mirrors) is lined with convex glass tiles that reflect single candlelight into a constellation of sparkles.",
      keyFact: "The fort overlooks Maota Lake, which historically served as the primary water reservoir for the royal garrison.",
    },
    Hindi: {
      title: "आमेर किला और शीश महल",
      summary:
        "1592 में राजा मानसिंह प्रथम द्वारा निर्मित, आमेर किला एक यूनेस्को विश्व धरोहर पहाड़ी किला है। इसका शीश महल अवतल कांच की टाइलों से सजा है जो एक सिंगल मोमबत्ती की लौ को सितारों से भरे आसमान की तरह चमका देता है।",
      keyFact: "किला मावठा झील के ऊपर स्थित है, जो ऐतिहासिक रूप से शाही सेना के लिए जल का मुख्य स्रोत था।",
    },
  },
  "Sarnath Archaeological Complex": {
    audioDuration: "3:40 mins",
    English: {
      title: "Sarnath Heritage Site",
      summary:
        "Located 10 km north of Varanasi, Sarnath is the sacred deer park where Gautama Buddha delivered his first sermon (Dhammacakkappavattana Sutta). The site features the massive 43.6-metre Dhamek Stupa built by Emperor Ashoka in 249 BCE.",
      keyFact: "The polished sandstone Ashoka Pillar found here bore the Lion Capital, which is today the National Emblem of India.",
    },
    Hindi: {
      title: "सारनाथ पुरातात्विक परिसर",
      summary:
        "वाराणसी से 10 किमी उत्तर में स्थित सारनाथ वह पवित्र स्थान है जहाँ गौतम बुद्ध ने ज्ञान प्राप्ति के बाद पहला उपदेश दिया था। यहाँ 249 ईसा पूर्व में सम्राट अशोक द्वारा निर्मित 43.6 मीटर ऊँचा धमेख स्तूप स्थित है।",
      keyFact: "यहाँ प्राप्त अशोक स्तंभ का सिंह शीर्ष आज भारत का राष्ट्रीय प्रतीक (National Emblem) है।",
    },
  },
};

export function getHeritageData(placeName: string): HeritagePlaceDetails {
  if (MOCK_HERITAGE_DATA[placeName]) {
    return MOCK_HERITAGE_DATA[placeName];
  }
  // Default fallback for any other place
  return {
    audioDuration: "3:00 mins",
    English: {
      title: placeName,
      summary: `${placeName} is a significant heritage landmark preserved under Indian cultural preservation frameworks. It represents centuries of architectural craftsmanship and local traditions.`,
      keyFact: "Protected site offering deep historical insights into regional craftsmanship and community culture.",
    },
    Hindi: {
      title: placeName,
      summary: `${placeName} एक प्रमुख सांस्कृतिक और ऐतिहासिक धरोहर स्थल है जो भारतीय वास्तुकला की उत्कृष्ट परंपराओं का प्रतिनिधित्व करता है।`,
      keyFact: "क्षेत्रीय शिल्प कौशल और सामुदायिक संस्कृति की ऐतिहासिक अंतर्दृष्टि प्रदान करने वाला संरक्षित स्थल।",
    },
  };
}
