import {
  AlertCircle,
  ExternalLink,
  Globe,
  Heart,
  MessageCircle,
  Phone,
  Shield,
} from "lucide-react";

interface Hotline {
  name: string;
  contact: string;
  contactType: "phone" | "text" | "web";
  description: string;
  available: string;
  color: string;
  icon: React.ReactNode;
}

const HOTLINES: Hotline[] = [
  {
    name: "National Suicide Prevention Lifeline",
    contact: "988",
    contactType: "phone",
    description:
      "Free and confidential support for people in distress, 24/7 crisis support and prevention resources.",
    available: "24/7",
    color: "#EF4444",
    icon: <Heart size={20} />,
  },
  {
    name: "Crisis Text Line",
    contact: "Text HOME to 741741",
    contactType: "text",
    description:
      "Free, 24/7 text-based mental health support. Text-based crisis support for anyone in crisis.",
    available: "24/7",
    color: "#8B5CF6",
    icon: <MessageCircle size={20} />,
  },
  {
    name: "Childhelp National Child Abuse Hotline",
    contact: "1-800-422-4453",
    contactType: "phone",
    description:
      "Professional crisis counselors available for abuse victims, parents, and witnesses.",
    available: "24/7",
    color: "#F97316",
    icon: <Shield size={20} />,
  },
  {
    name: "STOMP Out Bullying Helpline",
    contact: "1-800-786-6738",
    contactType: "phone",
    description:
      "Dedicated anti-bullying hotline providing support and resources specifically for youth bullying victims.",
    available: "Mon-Fri 9AM-5PM",
    color: "#F43F5E",
    icon: <AlertCircle size={20} />,
  },
  {
    name: "National Bullying Prevention Hotline",
    contact: "1-800-273-8255",
    contactType: "phone",
    description:
      "National support line for bullying victims and parents seeking help and advice.",
    available: "24/7",
    color: "#22C55E",
    icon: <Phone size={20} />,
  },
  {
    name: "Teen Line",
    contact: "1-800-852-8336",
    contactType: "phone",
    description:
      "Teen-to-teen peer support for youth experiencing bullying, depression, or crisis situations.",
    available: "6PM-10PM PST",
    color: "#2DD4BF",
    icon: <MessageCircle size={20} />,
  },
  {
    name: "Cyberbullying Research Center",
    contact: "cyberbullying.org",
    contactType: "web",
    description:
      "Research-based resources, guides, and tools for understanding and preventing cyberbullying.",
    available: "Online 24/7",
    color: "#60A5FA",
    icon: <Globe size={20} />,
  },
  {
    name: "StopBullying.gov",
    contact: "stopbullying.gov",
    contactType: "web",
    description:
      "Federal government resources for reporting cyberbullying and understanding legal protections.",
    available: "Online 24/7",
    color: "#A78BFA",
    icon: <Globe size={20} />,
  },
];

const ONLINE_RESOURCES = [
  {
    name: "Common Sense Media",
    url: "commonsensemedia.org",
    desc: "Digital citizenship resources for families",
  },
  {
    name: "ConnectSafely",
    url: "connectsafely.org",
    desc: "Research-based safety tips for social media",
  },
  {
    name: "National Center for Missing & Exploited Children",
    url: "missingkids.org",
    desc: "Online safety and reporting tools",
  },
  {
    name: "Internet Safety 101",
    url: "internetsafety101.org",
    desc: "Educational guides for parents and children",
  },
];

const EMERGENCY_TIPS = [
  {
    step: "1",
    title: "Document Everything",
    desc: "Screenshot and save all bullying messages, posts, and content as evidence.",
    color: "#8B5CF6",
  },
  {
    step: "2",
    title: "Tell a Trusted Adult",
    desc: "Immediately inform a parent, teacher, or counselor you trust about the situation.",
    color: "#F97316",
  },
  {
    step: "3",
    title: "Block & Report",
    desc: "Block the bully on all platforms and use reporting tools to flag their account.",
    color: "#EF4444",
  },
  {
    step: "4",
    title: "Protect Your Accounts",
    desc: "Change passwords and review privacy settings on all social media accounts.",
    color: "#F43F5E",
  },
  {
    step: "5",
    title: "Seek Professional Help",
    desc: "If you feel unsafe or distressed, contact a helpline or mental health professional immediately.",
    color: "#22C55E",
  },
];

export default function Helplines() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div
        className="rounded-2xl p-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(139,92,246,0.15))",
          border: "1px solid rgba(239,68,68,0.3)",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-xl shrink-0"
            style={{ background: "rgba(239,68,68,0.2)" }}
          >
            <Phone size={24} className="text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              Crisis Helplines & Resources
            </h2>
            <p className="text-sm" style={{ color: "#9AAAC0" }}>
              If you or someone you know is experiencing cyberbullying, reach
              out immediately. You are not alone. These resources provide free,
              confidential support.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
          <Phone size={16} className="text-red-400" />
          Emergency Hotlines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HOTLINES.map((h) => (
            <div
              key={h.name}
              className="rounded-2xl p-5 hover:scale-[1.01] transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #111C2C, #0F1A29)",
                border: `1px solid ${h.color}25`,
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="p-2.5 rounded-xl shrink-0"
                  style={{ background: `${h.color}20` }}
                >
                  <span style={{ color: h.color }}>{h.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm leading-snug">
                    {h.name}
                  </h4>
                  <span
                    className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${h.color}15`, color: h.color }}
                  >
                    {h.available}
                  </span>
                </div>
              </div>
              <p
                className="text-xs mb-4"
                style={{ color: "#9AAAC0", lineHeight: 1.6 }}
              >
                {h.description}
              </p>
              <a
                href={
                  h.contactType === "phone"
                    ? `tel:${h.contact.replace(/[^0-9]/g, "")}`
                    : h.contactType === "web"
                      ? `https://${h.contact}`
                      : "#"
                }
                target={h.contactType === "web" ? "_blank" : undefined}
                rel={
                  h.contactType === "web" ? "noopener noreferrer" : undefined
                }
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                style={{
                  background: `${h.color}20`,
                  color: h.color,
                  border: `1px solid ${h.color}30`,
                }}
              >
                {h.contactType === "phone" && (
                  <>
                    <Phone size={14} /> {h.contact}
                  </>
                )}
                {h.contactType === "text" && (
                  <>
                    <MessageCircle size={14} /> {h.contact}
                  </>
                )}
                {h.contactType === "web" && (
                  <>
                    <Globe size={14} /> {h.contact} <ExternalLink size={12} />
                  </>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
          <Globe size={16} className="text-blue-400" />
          Online Resources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ONLINE_RESOURCES.map((r) => (
            <a
              key={r.name}
              href={`https://${r.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all"
              style={{
                background: "rgba(17,28,44,0.8)",
                border: "1px solid rgba(33,50,71,0.8)",
              }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ background: "rgba(96,165,250,0.15)" }}
              >
                <Globe size={16} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="text-xs truncate" style={{ color: "#9AAAC0" }}>
                  {r.desc}
                </div>
              </div>
              <ExternalLink size={14} className="text-gray-500 shrink-0" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
          <AlertCircle size={16} className="text-yellow-400" />
          If You Are Being Bullied — What To Do
        </h3>
        <div className="space-y-3">
          {EMERGENCY_TIPS.map((tip) => (
            <div
              key={tip.step}
              className="flex items-start gap-4 p-4 rounded-xl"
              style={{
                background: `${tip.color}08`,
                border: `1px solid ${tip.color}20`,
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: `${tip.color}20`, color: tip.color }}
              >
                {tip.step}
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-0.5">
                  {tip.title}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "#9AAAC0", lineHeight: 1.6 }}
                >
                  {tip.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
