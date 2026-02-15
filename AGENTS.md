# AGENTS.md - AI Coding Assistant Context

This file provides context and rules for AI assistants working on the **09Market (공구마켓)** project.

## 1. Project Overview
- **Name:** 공구마켓 (09Market)
- **Description:** 인스타그램 공구 통합 정보 플랫폼 (MVP)
- **Core Value:** 파편화된 공구 정보를 제품 중심으로 모아 검색 및 비교 가능하게 함.
- **Target User:** 2030 여성 (모바일 환경 중심)

## 2. Tech Stack & Architecture

### Current Phase (MVP - No Code)
- **Frontend:** Softr (Web Builder)
- **Database:** Airtable
- **Deployment:** Softr Cloud

### Future Phase (Custom Development - Optional)
*If transitioning to full-code development in the future:*
- **Frontend:** Next.js (React) + Tailwind CSS
- **Backend:** Supabase (Auth, DB, Realtime)
- **Hosting:** Vercel

## 3. Core Features (MVP Scope)
1. **Search:** Search by Item Name & Brand
2. **Calendar/List:** View sales by "Ending Soon" (D-Day)
3. **Filter:** Category-based filtering (Beauty, Fashion, Food, etc.)
4. **Detail View:** Product info, Price, Dates, Purchase Link

## 4. Design Guidelines
- **Vibe:** Instagrammable, Trendy, Simple, Clean
- **Mobile First:** All designs must be verified on mobile screens first.
- **Typography:** Pretendard or Inter (Sans-serif)
- **Color Palette:**
  - Primary: Hot Pink (#E1306C) or Trusted Blue
  - Background: White (#FFFFFF)
  - Text: Dark Grey (#333333)

## 5. Development Rules (Anti-Vibe Rules)
1. **Simplicity:** Do not implement user login or payments in MVP. Keep it open.
2. **Mock Data:** When testing search, use realistic data (e.g., "Manyo Factory", "Ohora Gel") instead of "Test1", "Test2".
3. **Error Handling:** If a link is dead, show a friendly "Closed Sale" message, not a 404.
4. **Performance:** Images must be optimized/compressed for fast loading on mobile data.

## 6. Project Documents
- **PRD:** `./PRD-09Market_PC-MVP.md`
- **Tech Design:** `./TechDesign-09Market_PC-MVP.md`
- **Research:** `./research-09Market_PC.txt`

---
*Generated for 09Market Project*
