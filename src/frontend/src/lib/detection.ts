export type WordCategory =
  | "inappropriate"
  | "insult"
  | "aggressive"
  | "bullying"
  | "sexual"
  | "discrimination"
  | "bodyshaming";

export interface CategoryWord {
  word: string;
  category: WordCategory;
  weight: number;
}

export const CATEGORY_CONFIG: Record<
  WordCategory,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    textColor: string;
  }
> = {
  inappropriate: {
    label: "Inappropriate/Suggestive",
    color: "#F97316",
    bg: "bg-orange-500/20",
    border: "border-orange-500/40",
    textColor: "text-orange-400",
  },
  insult: {
    label: "Negative/Insult",
    color: "#A78BFA",
    bg: "bg-violet-400/20",
    border: "border-violet-400/40",
    textColor: "text-violet-400",
  },
  aggressive: {
    label: "Aggressive/Violence",
    color: "#FB923C",
    bg: "bg-orange-400/20",
    border: "border-orange-400/40",
    textColor: "text-orange-300",
  },
  bullying: {
    label: "Bullying Context",
    color: "#8B5CF6",
    bg: "bg-violet-500/20",
    border: "border-violet-500/40",
    textColor: "text-violet-500",
  },
  sexual: {
    label: "Sexual Harassment",
    color: "#EC4899",
    bg: "bg-pink-500/20",
    border: "border-pink-500/40",
    textColor: "text-pink-400",
  },
  discrimination: {
    label: "Discrimination/Hate",
    color: "#F59E0B",
    bg: "bg-amber-500/20",
    border: "border-amber-500/40",
    textColor: "text-amber-400",
  },
  bodyshaming: {
    label: "Body Shaming",
    color: "#06B6D4",
    bg: "bg-cyan-500/20",
    border: "border-cyan-500/40",
    textColor: "text-cyan-400",
  },
};

const CATEGORY_WORDS: CategoryWord[] = [
  // Inappropriate / Suggestive
  { word: "sexy", category: "inappropriate", weight: 3 },
  { word: "hot", category: "inappropriate", weight: 2 },
  { word: "babe", category: "inappropriate", weight: 2 },
  { word: "flirt", category: "inappropriate", weight: 2 },
  { word: "seduce", category: "inappropriate", weight: 3 },
  { word: "naughty", category: "inappropriate", weight: 3 },
  { word: "shameless", category: "inappropriate", weight: 3 },
  { word: "rascal", category: "inappropriate", weight: 3 },

  // Negative / Insult
  { word: "stupid", category: "insult", weight: 3 },
  { word: "dumb", category: "insult", weight: 3 },
  { word: "idiot", category: "insult", weight: 3 },
  { word: "loser", category: "insult", weight: 3 },
  { word: "annoying", category: "insult", weight: 2 },
  { word: "moron", category: "insult", weight: 3 },
  { word: "pathetic", category: "insult", weight: 3 },
  { word: "worthless", category: "insult", weight: 4 },
  { word: "failure", category: "insult", weight: 3 },
  { word: "rude", category: "insult", weight: 2 },
  { word: "fool", category: "insult", weight: 2 },
  { word: "jerk", category: "insult", weight: 2 },
  { word: "stupid idiot", category: "insult", weight: 5 },

  // Aggressive / Violence
  { word: "hate", category: "aggressive", weight: 4 },
  { word: "shut up", category: "aggressive", weight: 3 },
  { word: "get lost", category: "aggressive", weight: 3 },
  { word: "nonsense", category: "aggressive", weight: 2 },
  { word: "trash", category: "aggressive", weight: 3 },
  { word: "kill", category: "aggressive", weight: 5 },
  { word: "murder", category: "aggressive", weight: 5 },
  { word: "destroy", category: "aggressive", weight: 4 },
  { word: "die", category: "aggressive", weight: 5 },
  { word: "hurt", category: "aggressive", weight: 3 },
  { word: "threat", category: "aggressive", weight: 4 },
  { word: "stab", category: "aggressive", weight: 5 },
  { word: "beat you up", category: "aggressive", weight: 5 },
  { word: "i will kill", category: "aggressive", weight: 5 },
  { word: "want you dead", category: "aggressive", weight: 5 },

  // Bullying Context
  { word: "ugly", category: "bullying", weight: 3 },
  { word: "weird", category: "bullying", weight: 2 },
  { word: "freak", category: "bullying", weight: 3 },
  { word: "useless", category: "bullying", weight: 3 },
  { word: "embarrassing", category: "bullying", weight: 3 },
  { word: "nobody likes you", category: "bullying", weight: 5 },
  { word: "go away", category: "bullying", weight: 3 },
  { word: "gross", category: "bullying", weight: 2 },
  { word: "coward", category: "bullying", weight: 3 },
  { word: "crybaby", category: "bullying", weight: 3 },
  { word: "no one wants you", category: "bullying", weight: 5 },
  { word: "get out of here", category: "bullying", weight: 4 },

  // Sexual Harassment
  { word: "slut", category: "sexual", weight: 5 },
  { word: "whore", category: "sexual", weight: 5 },
  { word: "pervert", category: "sexual", weight: 4 },
  { word: "send nudes", category: "sexual", weight: 5 },
  { word: "sexual", category: "sexual", weight: 3 },
  { word: "molest", category: "sexual", weight: 5 },
  { word: "rape", category: "sexual", weight: 5 },
  { word: "harass", category: "sexual", weight: 4 },
  { word: "creep", category: "sexual", weight: 3 },
  { word: "romance", category: "sexual", weight: 2 },
  { word: "grope", category: "sexual", weight: 5 },
  { word: "dirty girl", category: "sexual", weight: 5 },
  { word: "easy girl", category: "sexual", weight: 4 },

  // Discrimination / Hate
  { word: "racist", category: "discrimination", weight: 5 },
  { word: "racism", category: "discrimination", weight: 5 },
  { word: "caste", category: "discrimination", weight: 4 },
  { word: "dalit", category: "discrimination", weight: 3 },
  { word: "untouchable", category: "discrimination", weight: 4 },
  { word: "low caste", category: "discrimination", weight: 5 },
  { word: "high caste", category: "discrimination", weight: 3 },
  { word: "your kind", category: "discrimination", weight: 4 },
  { word: "go back to your country", category: "discrimination", weight: 5 },
  { word: "inferior", category: "discrimination", weight: 4 },
  { word: "poor people", category: "discrimination", weight: 3 },
  { word: "poor trash", category: "discrimination", weight: 5 },
  { word: "class discrimination", category: "discrimination", weight: 5 },
  { word: "you are poor", category: "discrimination", weight: 4 },
  { word: "beggar", category: "discrimination", weight: 4 },

  // Body Shaming
  { word: "fat", category: "bodyshaming", weight: 3 },
  { word: "too thin", category: "bodyshaming", weight: 3 },
  { word: "too short", category: "bodyshaming", weight: 3 },
  { word: "too tall", category: "bodyshaming", weight: 2 },
  { word: "skinny", category: "bodyshaming", weight: 2 },
  { word: "obese", category: "bodyshaming", weight: 3 },
  { word: "fatso", category: "bodyshaming", weight: 4 },
  { word: "shorty", category: "bodyshaming", weight: 3 },
  { word: "midget", category: "bodyshaming", weight: 4 },
  { word: "chubby", category: "bodyshaming", weight: 2 },
  { word: "you are fat", category: "bodyshaming", weight: 4 },
  { word: "lose weight", category: "bodyshaming", weight: 3 },
  { word: "so skinny", category: "bodyshaming", weight: 3 },
  { word: "beanpole", category: "bodyshaming", weight: 3 },
  { word: "lardass", category: "bodyshaming", weight: 5 },
];

const POSITIVE_WORDS = [
  "good",
  "great",
  "awesome",
  "amazing",
  "love",
  "happy",
  "kind",
  "nice",
  "wonderful",
  "fantastic",
  "excellent",
  "brilliant",
  "proud",
  "joy",
  "blessed",
  "thanks",
  "thankful",
  "beautiful",
  "appreciate",
];

export interface FlaggedWord {
  word: string;
  category: WordCategory;
  weight: number;
}

export interface AnalysisResult {
  isBullying: boolean;
  flaggedWords: FlaggedWord[];
  categoryCounts: Record<WordCategory, number>;
  sentiment: "Positive" | "Negative" | "Neutral";
  sentimentScore: number;
  confidence: number;
  explanation: string;
  highlightedSegments: {
    text: string;
    flagged: boolean;
    category?: WordCategory;
  }[];
}

export function analyzeText(text: string): AnalysisResult {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  const wordCount = words.length;

  const flaggedWords: FlaggedWord[] = [];
  const categoryCounts: Record<WordCategory, number> = {
    inappropriate: 0,
    insult: 0,
    aggressive: 0,
    bullying: 0,
    sexual: 0,
    discrimination: 0,
    bodyshaming: 0,
  };

  // Check multi-word phrases first, then single words
  const sortedByLength = [...CATEGORY_WORDS].sort(
    (a, b) => b.word.split(" ").length - a.word.split(" ").length,
  );

  const alreadyFlagged = new Set<string>();

  for (const cw of sortedByLength) {
    if (lower.includes(cw.word) && !alreadyFlagged.has(cw.word)) {
      flaggedWords.push({
        word: cw.word,
        category: cw.category,
        weight: cw.weight,
      });
      categoryCounts[cw.category]++;
      alreadyFlagged.add(cw.word);
    }
  }

  const totalWeight = flaggedWords.reduce((sum, w) => sum + w.weight, 0);
  const isBullying = flaggedWords.length > 0;

  // Sentiment scoring
  const positiveCount = POSITIVE_WORDS.filter((pw) =>
    lower.includes(pw),
  ).length;
  const negativeCount = flaggedWords.length;
  let sentiment: "Positive" | "Negative" | "Neutral";
  let sentimentScore: number;

  if (negativeCount > positiveCount) {
    sentiment = "Negative";
    sentimentScore = Math.min(
      95,
      50 + (negativeCount / wordCount) * 200 + totalWeight * 3,
    );
  } else if (positiveCount > negativeCount) {
    sentiment = "Positive";
    sentimentScore = Math.min(95, 50 + (positiveCount / wordCount) * 200);
  } else {
    sentiment = "Neutral";
    sentimentScore = 50;
  }

  // Confidence
  const confidence = isBullying
    ? Math.min(98, 60 + flaggedWords.length * 8 + totalWeight * 2)
    : Math.min(96, 70 + positiveCount * 5);

  // Explanation
  let explanation = "";
  if (isBullying) {
    const cats = [
      ...new Set(flaggedWords.map((f) => CATEGORY_CONFIG[f.category].label)),
    ];
    explanation = `This message contains ${flaggedWords.length} flagged word${flaggedWords.length > 1 ? "s" : ""} across ${cats.length} categor${cats.length > 1 ? "ies" : "y"}: ${cats.join(", ")}. The content may be harmful and constitutes cyberbullying.`;
  } else {
    explanation =
      "No harmful language detected. This message appears safe and does not contain cyberbullying content.";
  }

  // Build highlighted segments
  const highlightedSegments = buildHighlightedSegments(text, flaggedWords);

  return {
    isBullying,
    flaggedWords,
    categoryCounts,
    sentiment,
    sentimentScore,
    confidence,
    explanation,
    highlightedSegments,
  };
}

function buildHighlightedSegments(
  text: string,
  flaggedWords: FlaggedWord[],
): { text: string; flagged: boolean; category?: WordCategory }[] {
  if (flaggedWords.length === 0) return [{ text, flagged: false }];

  type Range = { start: number; end: number; category: WordCategory };
  const ranges: Range[] = [];

  const lower = text.toLowerCase();
  for (const fw of flaggedWords) {
    let idx = 0;
    while (true) {
      const pos = lower.indexOf(fw.word, idx);
      if (pos === -1) break;
      ranges.push({
        start: pos,
        end: pos + fw.word.length,
        category: fw.category,
      });
      idx = pos + 1;
    }
  }

  // Sort and merge overlapping
  ranges.sort((a, b) => a.start - b.start);
  const merged: Range[] = [];
  for (const r of ranges) {
    if (merged.length && r.start < merged[merged.length - 1].end) {
      merged[merged.length - 1].end = Math.max(
        merged[merged.length - 1].end,
        r.end,
      );
    } else {
      merged.push({ ...r });
    }
  }

  const segments: {
    text: string;
    flagged: boolean;
    category?: WordCategory;
  }[] = [];
  let cursor = 0;
  for (const r of merged) {
    if (cursor < r.start)
      segments.push({ text: text.slice(cursor, r.start), flagged: false });
    segments.push({
      text: text.slice(r.start, r.end),
      flagged: true,
      category: r.category,
    });
    cursor = r.end;
  }
  if (cursor < text.length)
    segments.push({ text: text.slice(cursor), flagged: false });

  return segments;
}
