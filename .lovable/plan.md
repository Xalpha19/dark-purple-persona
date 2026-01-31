

## Merge NatWest Group Roles into Single Combined Section

### Summary
Restructure the Experience component to display both NatWest Group roles under a single company card with two distinct positions inside, while keeping the IT Security Engineer at Dar Al-Handasah as a separate entry.

---

### Data Structure Changes

#### Current Structure
Three separate experience entries, each with their own card:
1. Security Analyst (Detection Engineer) - NatWest Group
2. Cybersecurity Analyst - NatWest Group  
3. IT Security Engineer - Dar Al-Handasah

#### New Structure
Two experience entries with the NatWest entry containing multiple positions:

```text
experiences = [
  {
    id: 1,
    company: "NatWest Group",
    location: "Edinburgh, UK",
    period: "January 2024 - Present",
    positions: [
      {
        title: "Security Analyst (Detection Engineer)",
        description: "...",
        technologies: [...],
        achievements: [...]
      },
      {
        title: "Cybersecurity Analyst", 
        description: "...",
        technologies: [...],
        achievements: [...]
      }
    ]
  },
  {
    id: 2,
    company: "Dar Al-Handasah",
    // Single position structure (legacy format)
    ...
  }
]
```

---

### Technical Implementation

#### 1. Update Data Structure (lines 13-68)

Create a new data structure that supports both:
- **Multi-position entries** (NatWest Group with nested positions array)
- **Single-position entries** (Dar Al-Handasah with inline title/description)

**NatWest Group Entry:**
- Company: "NatWest Group"
- Location: "Edinburgh, UK"
- Period: "January 2024 - Present"
- Two positions with exact text preserved

**Dar Al-Handasah Entry:**
- Remains unchanged, converted to match the new structure

#### 2. Update Rendering Logic (lines 107-174)

Modify the card rendering to:
1. Display company header with period and location at the card level
2. Loop through `positions` array (if present) to render each role
3. Each position shows: title, description, technologies badges, achievements list
4. Add visual separator between positions within the same company card
5. Fall back to single-position rendering for entries without `positions` array

#### 3. Visual Layout for Combined Section

```text
+--------------------------------------------------+
| NatWest Group                                     |
| January 2024 - Present | Edinburgh, UK           |
|                                                  |
| --- Position 1 ---                               |
| Security Analyst (Detection Engineer)            |
| [description paragraph]                          |
| Technologies: [badges...]                        |
| Key Achievements: [bullet list...]               |
|                                                  |
| ─────────────── separator ───────────────        |
|                                                  |
| --- Position 2 ---                               |
| Cybersecurity Analyst                            |
| [description paragraph]                          |
| Technologies: [badges...]                        |
| Key Achievements: [bullet list...]               |
+--------------------------------------------------+
```

---

### Content Preservation (Exact Text)

**Position 1: Security Analyst (Detection Engineer)**

Description:
> "Focused on developing and optimizing high-fidelity threat detection rules and SOAR playbooks within enterprise SIEM environments. Daily work spans threat hunting, rule testing/CI/CD deployment, playbook automation, system integrations, and cross-team tuning to ensure scalable MDR operations."

Technologies:
> SIEM, SOAR, CI/CD, Detection Engineering, Threat Hunting, MDR, Splunk, SPL, KQL, Python

Achievements (8 items preserved exactly)

**Position 2: Cybersecurity Analyst**

Description:
> "Performing SOC analyst responsibilities conducting comprehensive alert investigations and forensic analysis across AWS, Azure, and GCP cloud environments. Executing proactive threat hunting using SIEM log correlation and developing custom detection rules."

Technologies:
> Microsoft Defender XDR, Splunk, KQL, Python, PowerShell, AWS, Azure, GCP, Akamai, Cofense

Achievements (7 items preserved exactly)

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/Experience.tsx` | Update data structure and rendering logic |

---

### Styling Consistency

- Same card background (`bg-gradient-card`)
- Same border and glow effects (`border-border/50 glow-purple`)
- Same badge styling for technologies
- Same bullet point styling for achievements
- Add a subtle divider (using Separator component or border) between positions
- Position titles styled as subheadings within the card

