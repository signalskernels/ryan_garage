/* Service-area cities. Each entry carries genuinely local detail (county,
   landmarks, nearby towns) so the programmatic /service-area/{slug} pages
   read as real local content, not city-swapped boilerplate.
   NOTE (content pass): expand each to 500+ unique words + a local review
   before the SEO push — see research/implementation-plan.md §10. */

export interface Location {
  name: string;
  slug: string;
  county: string;
  primary?: boolean;
  blurb: string;          // distinctive 1–2 sentence local intro
  spots: string[];        // local landmarks / neighborhoods
  nearby: string[];       // slugs of nearby towns we also serve
}

export const locations: Location[] = [
  {
    name: 'Huntley', slug: 'huntley', county: 'McHenry County', primary: true,
    blurb: 'Our home base. We’re minutes from anywhere in Huntley and respond fastest here — from Sun City and Del Webb to the neighborhoods around Huntley Outlet Shops.',
    spots: ['Sun City / Del Webb', 'Talamore', 'Wing Pointe', 'Georgian Hills', 'Huntley Outlet Shops'],
    nearby: ['cary', 'mchenry', 'woodstock', 'south-elgin'],
  },
  {
    name: 'Antioch', slug: 'antioch', county: 'Lake County',
    blurb: 'We serve Antioch homeowners across the Chain O’Lakes region, right up to the Wisconsin border.',
    spots: ['Chain O’Lakes', 'Downtown Antioch', 'Lake Marie'],
    nearby: ['lindenhurst', 'wauconda', 'grayslake'],
  },
  {
    name: 'Barrington', slug: 'barrington', county: 'Lake & Cook County',
    blurb: 'From the village center to Barrington Hills horse country, we bring full-service garage door repair to one of the area’s most established communities.',
    spots: ['Barrington Hills', 'Downtown Barrington', 'Cuba Marsh'],
    nearby: ['wauconda', 'cary', 'bloomingdale'],
  },
  {
    name: 'Batavia', slug: 'batavia', county: 'Kane County',
    blurb: 'The “City of Energy” along the Fox River — we cover Batavia’s historic neighborhoods and newer subdivisions alike.',
    spots: ['Fox River Riverwalk', 'Downtown Batavia', 'Fermilab area'],
    nearby: ['geneva', 'north-aurora', 'warrenville'],
  },
  {
    name: 'Belvidere', slug: 'belvidere', county: 'Boone County',
    blurb: 'On the western edge of our service area near Rockford, we keep Belvidere garage doors running through tough Illinois winters.',
    spots: ['Downtown Belvidere', 'Kishwaukee River', 'Spencer Park'],
    nearby: ['sycamore', 'woodstock'],
  },
  {
    name: 'Bloomingdale', slug: 'bloomingdale', county: 'DuPage County',
    blurb: 'We serve Bloomingdale homeowners from Stratford Square to the Old Town district with fast, reliable garage door service.',
    spots: ['Stratford Square', 'Old Town Bloomingdale', 'Springfield Park'],
    nearby: ['warrenville', 'west-chicago', 'barrington'],
  },
  {
    name: 'Cary', slug: 'cary', county: 'McHenry County',
    blurb: 'Just down the road from Huntley along the Fox River, Cary gets some of our fastest response times.',
    spots: ['Downtown Cary', 'Fox River', 'Hoffman Park'],
    nearby: ['huntley', 'mchenry', 'wauconda'],
  },
  {
    name: 'Geneva', slug: 'geneva', county: 'Kane County',
    blurb: 'Historic Geneva, with its beautiful Fox River downtown, trusts us for everything from spring repairs to full door replacements.',
    spots: ['Third Street downtown', 'Fox River', 'Geneva Commons'],
    nearby: ['batavia', 'north-aurora', 'west-chicago'],
  },
  {
    name: 'Grayslake', slug: 'grayslake', county: 'Lake County',
    blurb: 'From the College of Lake County to the historic downtown, we keep Grayslake garage doors safe and quiet.',
    spots: ['Downtown Grayslake', 'College of Lake County', 'Central Park'],
    nearby: ['lindenhurst', 'wauconda', 'vernon-hills'],
  },
  {
    name: 'Lindenhurst', slug: 'lindenhurst', county: 'Lake County',
    blurb: 'We provide mobile garage door service throughout Lindenhurst and the Lake Villa area.',
    spots: ['McDonald Woods', 'Sand Lake', 'Lindenhurst Park District'],
    nearby: ['antioch', 'grayslake', 'wauconda'],
  },
  {
    name: 'McHenry', slug: 'mchenry', county: 'McHenry County',
    blurb: 'Along the Fox River and the McHenry Riverwalk, we’re a quick drive away and ready for same-day calls.',
    spots: ['McHenry Riverwalk', 'Fox River', 'Downtown McHenry'],
    nearby: ['huntley', 'woodstock', 'cary'],
  },
  {
    name: 'North Aurora', slug: 'north-aurora', county: 'Kane County',
    blurb: 'We serve North Aurora homeowners along the Fox River with prompt, professional garage door repair.',
    spots: ['Fox River', 'Riverfront', 'North Aurora Towne Centre'],
    nearby: ['batavia', 'geneva', 'warrenville'],
  },
  {
    name: 'South Elgin', slug: 'south-elgin', county: 'Kane County',
    blurb: 'From the Fox River Trolley Museum to the newer subdivisions, South Elgin counts on us for reliable garage door service.',
    spots: ['Fox River Trolley Museum', 'Downtown South Elgin', 'Fox River'],
    nearby: ['huntley', 'geneva', 'west-chicago'],
  },
  {
    name: 'Sycamore', slug: 'sycamore', county: 'DeKalb County',
    blurb: 'Home of the famous Pumpkin Festival, Sycamore is within our 50-mile mobile range for repairs and installs.',
    spots: ['Historic downtown Sycamore', 'Pumpkin Festival', 'Sycamore Park District'],
    nearby: ['belvidere', 'woodstock'],
  },
  {
    name: 'Vernon Hills', slug: 'vernon-hills', county: 'Lake County',
    blurb: 'We serve Vernon Hills from Hawthorn Mall to the surrounding neighborhoods with fast, friendly garage door service.',
    spots: ['Hawthorn Mall', 'Century Park', 'Cuneo Mansion'],
    nearby: ['grayslake', 'wauconda', 'barrington'],
  },
  {
    name: 'Warrenville', slug: 'warrenville', county: 'DuPage County',
    blurb: 'Along the West Branch of the DuPage River, Warrenville homeowners rely on us for honest, quality garage door work.',
    spots: ['West Branch DuPage River', 'Cerny Park', 'Downtown Warrenville'],
    nearby: ['west-chicago', 'batavia', 'bloomingdale'],
  },
  {
    name: 'Wauconda', slug: 'wauconda', county: 'Lake County',
    blurb: 'On the shores of Bangs Lake, Wauconda gets reliable, same-day-capable garage door service from our team.',
    spots: ['Bangs Lake', 'Downtown Wauconda', 'Lakefront Park'],
    nearby: ['cary', 'grayslake', 'barrington'],
  },
  {
    name: 'West Chicago', slug: 'west-chicago', county: 'DuPage County',
    blurb: 'The “Railroad Capital” of the area — we keep West Chicago garage doors moving smoothly year-round.',
    spots: ['Downtown West Chicago', 'Reed-Keppler Park', 'DuPage Airport area'],
    nearby: ['geneva', 'warrenville', 'bloomingdale'],
  },
  {
    name: 'Woodstock', slug: 'woodstock', county: 'McHenry County',
    blurb: 'Famous for its historic Square (and Groundhog Day), Woodstock is right in our backyard for fast service.',
    spots: ['Woodstock Square', 'Opera House', 'Emricson Park'],
    nearby: ['huntley', 'mchenry', 'belvidere'],
  },
];

export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);
