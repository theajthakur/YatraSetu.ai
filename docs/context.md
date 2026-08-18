# YatraSetu — App Context & Design System Reference

## Overview
**YatraSetu** is an AI-powered travel companion application developed for the SIH 2026 prototype. It simplifies complex travel across India by providing intelligent route planning, cultural insights, and context-aware transit suggestions.

---

## Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (with custom CSS variable mapping)
- **Icons**: `lucide-react` (Strict rule: no AI-cliché icons like sparkles, stars, or magic wands)
- **Fonts**: `Poppins` (Display / Headings) & `Plus Jakarta Sans` (Body) via `next/font/google`

---

## Design System Guidelines
1. **Palette**: Inspired by Indian heritage and earthy tones (Terracotta Ochre & Regal Peacock Teal).
   - Primary: `primary-100` to `primary-900` (`#FFF8F3` -> `#5D2314`)
   - Secondary: `secondary-100` to `secondary-900` (`#F0F7F7` -> `#12373F`)
2. **Strict Design Rules**:
   - No raw hex values in components — use Tailwind utility classes mapped to CSS custom variables (`bg-primary-600`, `text-secondary-900`, etc.).
   - No pill-shaped tags or badges anywhere in the UI.
   - Low text density and high readability.
3. **Hero Layout Standard**:
   - Full viewport height (`min-h-screen`).
   - Block-centered layout (stacked vertical flex container, content centered horizontally and vertically).
   - Hero illustration source: `/assets/hero.png` (displayed straight, without card borders or background wrappers).

---

## Key Components Structure
- `components/common/Card.tsx`: Reusable card wrapper with primary border and background styles.
- `components/common/Navbar.tsx`: Heritage-themed, minimal site header with brand logo & navigation.
- `components/common/Footer.tsx`: Clean, compact footer with quick links and copyright info.
- `components/landing/HeroHeadline.tsx`: Headline & subtext component.
- `components/landing/HeroActions.tsx`: Action button component ("Plan My Trip" -> routes to `/planner`).
- `components/landing/HeroIllustration.tsx`: High-resolution hero image component.
- `components/landing/Hero.tsx`: Full-screen block-centered hero section wrapper.
- `components/planner/PlannerHeader.tsx`: One-line header ("Tell us about your trip").
- `components/planner/DestinationInput.tsx`: Destination text input with quick preset cities.
- `components/planner/DurationStepper.tsx`: Days counter stepper.
- `components/planner/InterestsSelect.tsx`: Checkboxes with Lucide scanability icons (Heritage, Food, Adventure, Spiritual).
- `components/planner/LanguageToggle.tsx`: English / Hindi toggle segment.
- `components/safety/SOSButton.tsx`: Persistent safety SOS button with 1-second mock dispatch loader before displaying the calm "Alert Sent" confirmation Dialog.
- `components/planner/PlannerForm.tsx`: Unified single-screen trip planner card with 1-second mock generation loader upon form submission.
- `components/itinerary/DayTabs.tsx`: Day selector tabs with 500ms mock transit fetch loader during day switching.
- `components/itinerary/HeritageModal.tsx`: Comprehensive QR/Heritage info modal with QR scanning loader, language translation loader, and audio guide buffering simulation.

---

## Routes
- `/`: Landing page + Hero section.
- `/planner`: Single-screen Trip Planner form.
- `/itinerary`: Itinerary results screen target.
