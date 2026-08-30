import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import {
  CalendarCheck,
  Clock,
  MessageCircle,
  Video,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Book a Consultation | Designs by Jeninne",
  description:
    "Book a complimentary 30-minute consultation with Designs by Jeninne. Talk through your brand, event, or content project and leave with a clear plan and quote.",
  alternates: { canonical: "/consultation" },
};

const steps = [
  {
    icon: CalendarCheck,
    title: "Pick a time",
    body: "Choose the date, time, and format that suit you. We'll confirm your slot by email within one business day.",
  },
  {
    icon: MessageCircle,
    title: "Talk it through",
    body: "A relaxed 30 minutes to unpack your goals, timeline, and references — no pressure, no obligation.",
  },
  {
    icon: Sparkles,
    title: "Get a clear plan",
    body: "You leave with a recommended direction, a realistic timeline, and a quote tailored to your scope.",
  },
];

const covered = [
  "Your brand, business, or event — where it stands today",
  "The look, tone, and audience you want to reach",
  "Which service and package actually fits your goals",
  "Realistic timelines, deliverables, and turnaround",
  "Budget guidance and where it's best spent",
  "Next steps, deposit, and how we'd start",
];

const formats = [
  {
    icon: Video,
    title: "Video Call",
    body: "Zoom or Google Meet — best for walking through references and moodboards together.",
  },
  {
    icon: Phone,
    title: "Phone or WhatsApp",
    body: "Quick, simple, and easy to fit into a busy day. Ideal for a first conversation.",
  },
  {
    icon: MapPin,
    title: "In Person",
    body: "Available across Trinidad for events, weddings, and larger brand projects.",
  },
];

const prepPoints = [
  {
    q: "How long is the consultation?",
    a: "About 30 minutes. If your project needs more time, we'll say so and schedule a longer follow-up.",
  },
  {
    q: "Is there a fee?",
    a: "No. The initial consultation is complimentary and comes with no obligation to book.",
  },
  {
    q: "What should I bring?",
    a: "Anything that helps us picture it: examples you love, your logo or existing brand files, dates, venue details, and a rough budget in mind.",
  },
  {
    q: "What if I'm not ready to book yet?",
    a: "That's perfectly fine. Plenty of clients consult months ahead. You'll still leave with a plan you can act on when the timing is right.",
  },
];

export default function ConsultationPage() {
  return (
    <>
      <Nav />
      <main className="w-full bg-ink">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-12 pt-32 pb-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
              Complimentary &middot; 30 Minutes
            </div>
            <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight text-ivory mb-6">
              Book a Consultation
            </h1>
            <p className="font-sans text-lg md:text-xl text-warmgray max-w-2xl mx-auto leading-relaxed">
              Before anything is designed or filmed, we talk. Bring your idea —
              however rough — and leave with a clear direction, a realistic
              timeline, and a quote built around your scope.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-sans text-sm text-warmgray">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500" />
                30 minutes
              </span>
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4 text-gold-500" />
                Video, phone, WhatsApp, or in person
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                No obligation
              </span>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 md:py-28 px-6 md:px-12 border-t border-gold-500/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-ivory text-center mb-16">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {steps.map((step, index) => (
                <div key={step.title} className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-5">
                    <step.icon className="w-6 h-6 text-gold-500" />
                    <span className="font-serif text-2xl text-gold-700">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-ivory mb-3">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-warmgray leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What we'll cover */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-charcoal/30 border-t border-gold-500/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
                The Conversation
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-ivory mb-6">
                What We&apos;ll Cover
              </h2>
              <p className="font-sans text-warmgray leading-relaxed">
                This is a working session, not a sales call. We ask questions,
                you talk us through your vision, and together we shape it into
                something we can actually price and schedule.
              </p>
            </div>
            <ul className="space-y-4">
              {covered.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-sans text-warmgray leading-relaxed"
                >
                  <span className="text-gold-500 mt-0.5">&#10003;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Formats */}
        <section className="py-20 md:py-28 px-6 md:px-12 border-t border-gold-500/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-ivory text-center mb-16">
              Meet the Way You Prefer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {formats.map((format) => (
                <div
                  key={format.title}
                  className="p-8 bg-charcoal/40 backdrop-blur-sm border border-gold-500/20 rounded-lg"
                >
                  <format.icon className="w-6 h-6 text-gold-500 mb-5" />
                  <h3 className="font-serif text-2xl font-light text-ivory mb-3">
                    {format.title}
                  </h3>
                  <p className="font-sans text-sm text-warmgray leading-relaxed">
                    {format.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking form */}
        <section
          id="book"
          className="py-24 md:py-32 px-6 md:px-12 bg-charcoal/30 border-t border-gold-500/10 scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="text-xs font-sans font-medium tracking-[0.3em] text-gold-500 uppercase mb-6">
                  Request Your Slot
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-ivory mb-10">
                  Reserve a Time
                </h2>
                <ConsultationForm />
              </div>

              {/* Good to know */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-gold-500" />
                    <h3 className="font-serif text-lg font-light text-ivory">
                      Availability
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-warmgray leading-relaxed">
                    Monday to Saturday, 9:00 AM &ndash; 6:00 PM (AST). Times
                    outside these hours can often be arranged on request.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <MessageCircle className="w-5 h-5 text-gold-500" />
                    <h3 className="font-serif text-lg font-light text-ivory">
                      Prefer to Message First?
                    </h3>
                  </div>
                  <a
                    href="https://wa.me/18683445101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-warmgray hover:text-gold-500 transition-colors"
                  >
                    WhatsApp +1 (868) 344-5101
                  </a>
                  <p className="font-sans text-sm text-warmgray mt-2">
                    <a
                      href="mailto:info@designsbyjeninne.com"
                      className="hover:text-gold-500 transition-colors"
                    >
                      info@designsbyjeninne.com
                    </a>
                  </p>
                </div>

                <div className="pt-8 border-t border-gold-500/20">
                  <h4 className="font-sans text-xs font-medium text-gold-500 uppercase tracking-wider mb-3">
                    Good to Know
                  </h4>
                  <ul className="space-y-2 font-sans text-sm text-warmgray">
                    <li>&#10003; Requesting a time doesn&apos;t commit you</li>
                    <li>&#10003; We confirm within one business day</li>
                    <li>&#10003; Reschedule any time &mdash; just let us know</li>
                    <li>&#10003; Already know what you need? Skip ahead and{" "}
                      <a
                        href="/contact"
                        className="text-gold-500 hover:text-gold-300 transition-colors"
                      >
                        submit a project inquiry
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before your call */}
        <section className="py-20 md:py-28 px-6 md:px-12 border-t border-gold-500/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-ivory text-center mb-16">
              Before Your Call
            </h2>
            <div className="space-y-10">
              {prepPoints.map((point) => (
                <div key={point.q}>
                  <h3 className="font-serif text-xl font-light text-ivory mb-3">
                    {point.q}
                  </h3>
                  <p className="font-sans text-warmgray leading-relaxed">
                    {point.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
