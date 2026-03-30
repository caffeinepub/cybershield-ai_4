import type { WordCategory } from "./detection";

export interface ActivityItem {
  id: string;
  text: string;
  isBullying: boolean;
  category?: WordCategory;
  timestamp: string;
  flaggedWords: string[];
}

export const INITIAL_STATS = {
  totalAnalyzed: 1247,
  bullyingDetected: 318,
  safeMessages: 929,
  accuracy: 94.2,
};

export const ACTIVITY_FEED: ActivityItem[] = [
  {
    id: "1",
    text: "You are so stupid and ugly, nobody wants you here.",
    isBullying: true,
    category: "insult",
    timestamp: "2m ago",
    flaggedWords: ["stupid", "ugly"],
  },
  {
    id: "2",
    text: "Great job on the project today! You did amazing.",
    isBullying: false,
    timestamp: "4m ago",
    flaggedWords: [],
  },
  {
    id: "3",
    text: "You are such a slut, everyone knows it.",
    isBullying: true,
    category: "sexual",
    timestamp: "6m ago",
    flaggedWords: ["slut"],
  },
  {
    id: "4",
    text: "Shut up you freak, get lost already.",
    isBullying: true,
    category: "aggressive",
    timestamp: "7m ago",
    flaggedWords: ["shut up", "freak", "get lost"],
  },
  {
    id: "5",
    text: "Thanks for your help today, really appreciate it!",
    isBullying: false,
    timestamp: "11m ago",
    flaggedWords: [],
  },
  {
    id: "6",
    text: "You are so fat and disgusting, lose some weight.",
    isBullying: true,
    category: "bodyshaming",
    timestamp: "13m ago",
    flaggedWords: ["fat", "lose weight"],
  },
  {
    id: "7",
    text: "You are such an idiot and a total loser.",
    isBullying: true,
    category: "insult",
    timestamp: "15m ago",
    flaggedWords: ["idiot", "loser"],
  },
  {
    id: "8",
    text: "Go back to your country, you don't belong here.",
    isBullying: true,
    category: "discrimination",
    timestamp: "17m ago",
    flaggedWords: ["go back to your country"],
  },
  {
    id: "9",
    text: "Happy to work with you on this — let me know if you need anything.",
    isBullying: false,
    timestamp: "19m ago",
    flaggedWords: [],
  },
  {
    id: "10",
    text: "Stop being so weird and embarrassing yourself.",
    isBullying: true,
    category: "bullying",
    timestamp: "23m ago",
    flaggedWords: ["weird", "embarrassing"],
  },
  {
    id: "11",
    text: "Your presentation was brilliant. Well done!",
    isBullying: false,
    timestamp: "28m ago",
    flaggedWords: [],
  },
  {
    id: "12",
    text: "I hate everything about you, you are useless.",
    isBullying: true,
    category: "aggressive",
    timestamp: "33m ago",
    flaggedWords: ["hate", "useless"],
  },
  {
    id: "13",
    text: "See you tomorrow. Have a great evening!",
    isBullying: false,
    timestamp: "40m ago",
    flaggedWords: [],
  },
];

export const WEEKLY_DATA = [
  {
    day: "Mon",
    inappropriate: 4,
    insult: 8,
    aggressive: 5,
    bullying: 6,
    sexual: 3,
    discrimination: 2,
    bodyshaming: 4,
    safe: 40,
  },
  {
    day: "Tue",
    inappropriate: 6,
    insult: 12,
    aggressive: 7,
    bullying: 9,
    sexual: 5,
    discrimination: 4,
    bodyshaming: 6,
    safe: 45,
  },
  {
    day: "Wed",
    inappropriate: 5,
    insult: 10,
    aggressive: 9,
    bullying: 8,
    sexual: 4,
    discrimination: 3,
    bodyshaming: 5,
    safe: 38,
  },
  {
    day: "Thu",
    inappropriate: 3,
    insult: 7,
    aggressive: 6,
    bullying: 5,
    sexual: 2,
    discrimination: 2,
    bodyshaming: 3,
    safe: 52,
  },
  {
    day: "Fri",
    inappropriate: 8,
    insult: 14,
    aggressive: 11,
    bullying: 10,
    sexual: 7,
    discrimination: 5,
    bodyshaming: 8,
    safe: 35,
  },
  {
    day: "Sat",
    inappropriate: 2,
    insult: 5,
    aggressive: 3,
    bullying: 4,
    sexual: 3,
    discrimination: 1,
    bodyshaming: 2,
    safe: 28,
  },
  {
    day: "Sun",
    inappropriate: 4,
    insult: 9,
    aggressive: 6,
    bullying: 7,
    sexual: 4,
    discrimination: 3,
    bodyshaming: 5,
    safe: 41,
  },
];

export const MONTHLY_DATA = [
  {
    week: "Week 1",
    inappropriate: 18,
    insult: 34,
    aggressive: 22,
    bullying: 28,
    sexual: 14,
    discrimination: 10,
    bodyshaming: 16,
    safe: 120,
  },
  {
    week: "Week 2",
    inappropriate: 24,
    insult: 45,
    aggressive: 31,
    bullying: 35,
    sexual: 19,
    discrimination: 14,
    bodyshaming: 22,
    safe: 98,
  },
  {
    week: "Week 3",
    inappropriate: 31,
    insult: 52,
    aggressive: 38,
    bullying: 42,
    sexual: 25,
    discrimination: 18,
    bodyshaming: 28,
    safe: 145,
  },
  {
    week: "Week 4",
    inappropriate: 20,
    insult: 38,
    aggressive: 27,
    bullying: 31,
    sexual: 17,
    discrimination: 12,
    bodyshaming: 19,
    safe: 132,
  },
];

export const TOP_BULLY_WORDS: {
  word: string;
  count: number;
  category: WordCategory;
}[] = [
  { word: "stupid", count: 47, category: "insult" },
  { word: "hate", count: 38, category: "aggressive" },
  { word: "slut", count: 35, category: "sexual" },
  { word: "fat", count: 31, category: "bodyshaming" },
  { word: "racist", count: 29, category: "discrimination" },
  { word: "loser", count: 28, category: "insult" },
  { word: "idiot", count: 24, category: "insult" },
  { word: "murder", count: 22, category: "aggressive" },
  { word: "pervert", count: 20, category: "sexual" },
  { word: "caste", count: 18, category: "discrimination" },
  { word: "shut up", count: 17, category: "aggressive" },
  { word: "freak", count: 15, category: "bullying" },
  { word: "whore", count: 14, category: "sexual" },
  { word: "shameless", count: 13, category: "inappropriate" },
  { word: "fatso", count: 12, category: "bodyshaming" },
];

export const OCR_TEXTS = [
  "You are so stupid and ugly. Nobody likes you. You are a worthless loser and should just disappear.",
  "I hate you so much. You are such an idiot and a freak. Everyone thinks you are disgusting.",
  "Hey! Just wanted to say you did an amazing job today. Really proud of your hard work!",
  "Good morning! Hope you have a wonderful day. You are awesome and we appreciate you.",
  "You are so fat and pathetic. You are a racist slut and nobody wants you here. Shameless loser.",
];
