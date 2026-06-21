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

  // ── Expanded coverage: the Rockford ↔ Orland Park corridor (programmatic local SEO).
  // Counties/landmarks web-verified. NOTE: mass templated city pages read as
  // "doorway pages" to Google if thin — add real unique copy + a local review per
  // town before the SEO push (see site/README.md + implementation-plan §10).
  { name: 'Rockford', slug: 'rockford', county: 'Winnebago County', blurb: 'The third-largest city in Illinois, set in the Rock River Valley and known for the Anderson Japanese Gardens and the restored Coronado Theatre.', spots: ['Anderson Japanese Gardens', 'the Rock River', 'Coronado Theatre', 'Klehm Arboretum'], nearby: ['loves-park', 'machesney-park', 'belvidere'] },
  { name: 'Loves Park', slug: 'loves-park', county: 'Winnebago County', blurb: 'A Rock River city just north of Rockford, long a hub for boating and recreation along the water.', spots: ['the Rock River', 'Rock Cut State Park', 'Pierce Lake'], nearby: ['rockford', 'machesney-park', 'belvidere'] },
  { name: 'Machesney Park', slug: 'machesney-park', county: 'Winnebago County', blurb: 'A village on the Rock River north of Rockford, crossed by the Frank E. Bauer Bridge.', spots: ['the Rock River', 'Frank E. Bauer Bridge', 'Machesney Park Mall'], nearby: ['loves-park', 'rockford', 'belvidere'] },
  { name: 'DeKalb', slug: 'dekalb', county: 'DeKalb County', blurb: 'Home to Northern Illinois University and its castle-like Altgeld Hall, in the heart of Illinois farm country.', spots: ['Northern Illinois University', 'Altgeld Hall', 'the East Lagoon'], nearby: ['sycamore', 'genoa', 'cortland'] },
  { name: 'Genoa', slug: 'genoa', county: 'DeKalb County', blurb: 'A small DeKalb County city northeast of Sycamore with a historic downtown along Main Street.', spots: ['Downtown Genoa', 'Russell Woods Forest Preserve'], nearby: ['sycamore', 'dekalb', 'belvidere'] },
  { name: 'Cortland', slug: 'cortland', county: 'DeKalb County', blurb: 'A growing town just east of DeKalb along the old Lincoln Highway corridor.', spots: ['Downtown Cortland', 'the Lincoln Highway'], nearby: ['dekalb', 'sycamore', 'genoa'] },
  { name: 'Hampshire', slug: 'hampshire', county: 'Kane County', blurb: 'A northwest Kane County suburb at the rural edge of the Chicago metro, known for its annual Coon Creek Country Days festival.', spots: ['Downtown Hampshire', 'Coon Creek'], nearby: ['pingree-grove', 'huntley', 'gilberts'] },
  { name: 'Pingree Grove', slug: 'pingree-grove', county: 'Kane County', blurb: 'One of Kane County’s fastest-growing villages, bordered by Hampshire, Gilberts, and Elgin.', spots: ['Cambridge Lakes', 'Downtown Pingree Grove'], nearby: ['hampshire', 'gilberts', 'elgin'] },
  { name: 'Gilberts', slug: 'gilberts', county: 'Kane County', blurb: 'A village in northern Kane County bordered by West Dundee and Elgin, mostly within Rutland Township.', spots: ['Tyler Creek', 'Downtown Gilberts'], nearby: ['pingree-grove', 'west-dundee', 'sleepy-hollow'] },
  { name: 'Sleepy Hollow', slug: 'sleepy-hollow', county: 'Kane County', blurb: 'A quiet residential village in the Fox River valley a few miles east of Gilberts.', spots: ['Sleepy Hollow Park', 'the Fox River'], nearby: ['gilberts', 'west-dundee', 'elgin'] },
  { name: 'Elgin', slug: 'elgin', county: 'Kane County', blurb: 'A historic Fox River city founded in 1835 and once home to the Elgin National Watch Company.', spots: ['the Fox River', 'Fox River Trail', 'Downtown Elgin', 'Grand Victoria Casino'], nearby: ['south-elgin', 'west-dundee', 'carpentersville'] },
  { name: 'West Dundee', slug: 'west-dundee', county: 'Kane County', blurb: 'A Fox River village with a historic downtown of 19th-century architecture tied to detective Allan Pinkerton.', spots: ['the Fox River', 'Historic Downtown West Dundee', 'Fox River Trail'], nearby: ['east-dundee', 'carpentersville', 'sleepy-hollow'] },
  { name: 'East Dundee', slug: 'east-dundee', county: 'Kane County', blurb: 'A picturesque Fox River village with direct access to the Fox River Trail and the nearby Santa’s Village amusement park.', spots: ['the Fox River', 'Fox River Trail', 'Santa’s Village'], nearby: ['west-dundee', 'carpentersville', 'elgin'] },
  { name: 'Carpentersville', slug: 'carpentersville', county: 'Kane County', blurb: 'A Fox River village dating to 1837 whose Carpentersville Dam is a legendary local fishing spot for walleye and smallmouth bass.', spots: ['the Fox River', 'Carpentersville Dam', 'Fox River Trail'], nearby: ['east-dundee', 'west-dundee', 'cary'] },
  { name: 'Crystal Lake', slug: 'crystal-lake', county: 'McHenry County', blurb: 'A McHenry County city named for its namesake lake, with the popular Three Oaks Recreation Area built on former quarry lakes.', spots: ['Three Oaks Recreation Area', 'Downtown Crystal Lake', 'Main Beach'], nearby: ['cary', 'algonquin', 'lake-in-the-hills'] },
  { name: 'Algonquin', slug: 'algonquin', county: 'McHenry County', blurb: 'A Fox River village straddling the McHenry–Kane line, nicknamed the “Gem of the Fox River Valley.”', spots: ['the Fox River', 'Downtown Algonquin', 'Fox River Trail'], nearby: ['lake-in-the-hills', 'crystal-lake', 'cary'] },
  { name: 'Lake in the Hills', slug: 'lake-in-the-hills', county: 'McHenry County', blurb: 'A McHenry County village west of the Fox River, sharing the former Vulcan quarry lakes with Crystal Lake and Algonquin.', spots: ['Woods Creek Lake', 'Lake in the Hills Fen', 'Sunset Park'], nearby: ['algonquin', 'crystal-lake', 'huntley'] },
  { name: 'Schaumburg', slug: 'schaumburg', county: 'Cook County', blurb: 'A northwest Cook County village home to Woodfield Mall, the largest shopping mall in Illinois.', spots: ['Woodfield Mall', 'Spring Valley Nature Center', 'Schaumburg Boomers Stadium'], nearby: ['hoffman-estates', 'streamwood', 'rolling-meadows'] },
  { name: 'Hoffman Estates', slug: 'hoffman-estates', county: 'Cook County', blurb: 'A northwest suburb that hosts the Now Arena and the former Sears headquarters in the Prairie Stone Business Park.', spots: ['Now Arena', 'Prairie Stone Business Park', 'Poplar Creek'], nearby: ['schaumburg', 'streamwood', 'palatine'] },
  { name: 'Streamwood', slug: 'streamwood', county: 'Cook County', blurb: 'A residential village in northwest Cook County west of Schaumburg, near the headwaters of Poplar Creek.', spots: ['Poplar Creek', 'Streamwood Oaks Golf Club'], nearby: ['hoffman-estates', 'bartlett', 'schaumburg'] },
  { name: 'Palatine', slug: 'palatine', county: 'Cook County', blurb: 'A northwest Cook County village with a lively downtown around its Metra station and the Deer Grove Forest Preserve nearby.', spots: ['Downtown Palatine', 'Deer Grove Forest Preserve', 'Harper College'], nearby: ['arlington-heights', 'rolling-meadows', 'hoffman-estates'] },
  { name: 'Arlington Heights', slug: 'arlington-heights', county: 'Cook County', blurb: 'A large northwest suburb best known as the home of Arlington International Racecourse and a thriving downtown arts district.', spots: ['Arlington Park', 'Downtown Arlington Heights', 'Metropolis Performing Arts Centre'], nearby: ['palatine', 'mount-prospect', 'rolling-meadows'] },
  { name: 'Rolling Meadows', slug: 'rolling-meadows', county: 'Cook County', blurb: 'A Cook County city between Schaumburg and Arlington Heights, crossed by Salt Creek and Interstate 90.', spots: ['Salt Creek', 'Rolling Meadows Park District', 'Plum Grove Reservoir'], nearby: ['palatine', 'schaumburg', 'arlington-heights'] },
  { name: 'Mount Prospect', slug: 'mount-prospect', county: 'Cook County', blurb: 'A northwest suburb just north of O’Hare, known for Randhurst Village and its historic downtown.', spots: ['Randhurst Village', 'Downtown Mount Prospect', 'Melas Park'], nearby: ['arlington-heights', 'des-plaines', 'palatine'] },
  { name: 'Des Plaines', slug: 'des-plaines', county: 'Cook County', blurb: 'A Des Plaines River city next to O’Hare, home to Rivers Casino and the site of the first McDonald’s franchise.', spots: ['Des Plaines River', 'Rivers Casino', 'Maine Park'], nearby: ['mount-prospect', 'park-ridge', 'arlington-heights'] },
  { name: 'Park Ridge', slug: 'park-ridge', county: 'Cook County', blurb: 'An established suburb bordering O’Hare, known for the restored Pickwick Theatre and the Uptown shopping district.', spots: ['Pickwick Theatre', 'Uptown Park Ridge', 'Hinkley Park'], nearby: ['des-plaines', 'mount-prospect'] },
  { name: 'Bartlett', slug: 'bartlett', county: 'Cook County', blurb: 'A village spanning Cook, DuPage, and Kane counties, home to the large James “Pate” Philip State Park.', spots: ['James “Pate” Philip State Park', 'Downtown Bartlett', 'Bartlett Hills Golf Club'], nearby: ['streamwood', 'hanover-park', 'south-elgin'] },
  { name: 'Hanover Park', slug: 'hanover-park', county: 'Cook County', blurb: 'A village straddling the Cook–DuPage line northwest of Chicago, bordered by the Elgin–O’Hare Expressway.', spots: ['Mallard Lake Forest Preserve', 'Downtown Hanover Park'], nearby: ['bartlett', 'streamwood', 'carol-stream'] },
  { name: 'Roselle', slug: 'roselle', county: 'DuPage County', blurb: 'A DuPage County village founded along the railroad in the 1870s, named for Colonel Rosell Hough.', spots: ['Downtown Roselle', 'Lynfred Winery', 'Clauss Recreation Center'], nearby: ['hanover-park', 'bloomingdale', 'carol-stream'] },
  { name: 'Carol Stream', slug: 'carol-stream', county: 'DuPage County', blurb: 'A planned DuPage County village west of Chicago, named after the developer’s daughter Carol.', spots: ['Downtown Carol Stream', 'Volunteer Park', 'Klein Creek'], nearby: ['bloomingdale', 'wheaton', 'glendale-heights'] },
  { name: 'Glendale Heights', slug: 'glendale-heights', county: 'DuPage County', blurb: 'A central DuPage County village known for its Camera Park and the East Branch DuPage River Trail.', spots: ['East Branch DuPage River', 'Camera Park', 'Glendale Lakes Golf Club'], nearby: ['carol-stream', 'glen-ellyn', 'bloomingdale'] },
  { name: 'Wheaton', slug: 'wheaton', county: 'DuPage County', blurb: 'The DuPage County seat, home to Wheaton College, the Cosley Zoo, and Cantigny Park.', spots: ['Cantigny Park', 'Wheaton College', 'Cosley Zoo', 'the Prairie Path'], nearby: ['glen-ellyn', 'carol-stream', 'warrenville'] },
  { name: 'Glen Ellyn', slug: 'glen-ellyn', county: 'DuPage County', blurb: 'A DuPage County village built around Lake Ellyn and home to the College of DuPage.', spots: ['Lake Ellyn', 'College of DuPage', 'Downtown Glen Ellyn'], nearby: ['wheaton', 'lombard', 'glendale-heights'] },
  { name: 'Lombard', slug: 'lombard', county: 'DuPage County', blurb: 'A DuPage County village nicknamed the “Lilac Village” for Lilacia Park and its annual Lilac Festival.', spots: ['Lilacia Park', 'Downtown Lombard', 'Yorktown Center'], nearby: ['glen-ellyn', 'villa-park', 'glendale-heights'] },
  { name: 'Villa Park', slug: 'villa-park', county: 'DuPage County', blurb: 'A DuPage County village along the Illinois Prairie Path, once home to the Ovaltine factory.', spots: ['Illinois Prairie Path', 'Ovaltine Court', 'Downtown Villa Park'], nearby: ['lombard', 'addison', 'glen-ellyn'] },
  { name: 'Addison', slug: 'addison', county: 'DuPage County', blurb: 'A DuPage County village northwest of Chicago known for its industrial parks and Salt Creek greenway.', spots: ['Salt Creek', 'Army Trail Nature Center', 'Centennial Park'], nearby: ['villa-park', 'bloomingdale', 'lombard'] },
  { name: 'Naperville', slug: 'naperville', county: 'DuPage County', blurb: 'One of the largest cities in Illinois, famous for its scenic Riverwalk along the DuPage River and historic Naper Settlement.', spots: ['Naperville Riverwalk', 'Naper Settlement', 'the DuPage River', 'Centennial Beach'], nearby: ['aurora', 'wheaton', 'bolingbrook'] },
  { name: 'Aurora', slug: 'aurora', county: 'Kane County', blurb: 'The second-largest city in Illinois, the “City of Lights,” set on the Fox River with the historic Paramount Theatre downtown.', spots: ['the Fox River', 'Paramount Theatre', 'Phillips Park', 'RiverEdge Park'], nearby: ['north-aurora', 'montgomery', 'naperville'] },
  { name: 'Montgomery', slug: 'montgomery', county: 'Kendall County', blurb: 'A Fox River village south of Aurora founded in 1835 as a water-powered mill town.', spots: ['the Fox River', 'Montgomery Park', 'Settlers Cottage Museum'], nearby: ['oswego', 'aurora', 'yorkville'] },
  { name: 'Oswego', slug: 'oswego', county: 'Kendall County', blurb: 'The largest municipality in Kendall County, set on the Fox River with the riverside Hudson Crossing Park.', spots: ['the Fox River', 'Hudson Crossing Park', 'Downtown Oswego'], nearby: ['montgomery', 'yorkville', 'aurora'] },
  { name: 'Yorkville', slug: 'yorkville', county: 'Kendall County', blurb: 'The Kendall County seat on the Fox River, home to Raging Waves waterpark and a scenic dam and riverfront.', spots: ['the Fox River', 'Raging Waves Waterpark', 'Downtown Yorkville'], nearby: ['oswego', 'montgomery', 'plano'] },
  { name: 'Plano', slug: 'plano', county: 'Kendall County', blurb: 'A small Kendall County city on the Fox River, used as the filming location for the movie “The Express.”', spots: ['the Fox River', 'Downtown Plano', 'Farnsworth House'], nearby: ['yorkville', 'oswego'] },
  { name: 'Sugar Grove', slug: 'sugar-grove', county: 'Kane County', blurb: 'A village in southern Kane County home to Waubonsee Community College and rolling prairie farmland.', spots: ['Waubonsee Community College', 'Bliss Woods Forest Preserve', 'Downtown Sugar Grove'], nearby: ['aurora', 'north-aurora', 'yorkville'] },
  { name: 'St. Charles', slug: 'st-charles', county: 'Kane County', blurb: 'A Fox River city known as the “Pride of the Fox,” with a historic downtown and the long-running Kane County Flea Market.', spots: ['the Fox River', 'Downtown St. Charles', 'Pottawatomie Park', 'Kane County Flea Market'], nearby: ['geneva', 'south-elgin', 'batavia'] },
  { name: 'Plainfield', slug: 'plainfield', county: 'Will County', blurb: 'A historic Route 66 village on the DuPage River, home to the Lake Renwick Preserve birdwatching area.', spots: ['the DuPage River', 'Lake Renwick Preserve', 'Settlers’ Park', 'Historic Route 66'], nearby: ['bolingbrook', 'romeoville', 'naperville'] },
  { name: 'Bolingbrook', slug: 'bolingbrook', county: 'Will County', blurb: 'A southwest suburb on I-55 and Historic Route 66, home to the Promenade Bolingbrook open-air mall.', spots: ['Promenade Bolingbrook', 'Hidden Lakes Trout Farm', 'Historic Route 66'], nearby: ['romeoville', 'plainfield', 'naperville'] },
  { name: 'Romeoville', slug: 'romeoville', county: 'Will County', blurb: 'A Will County village once called “Stone City” for the limestone quarries that built the Illinois State Capitol.', spots: ['Isle a la Cache Museum', 'the Des Plaines River', 'Lewis University'], nearby: ['bolingbrook', 'lockport', 'joliet'] },
  { name: 'Lockport', slug: 'lockport', county: 'Will County', blurb: 'A historic canal city that served as headquarters of the Illinois and Michigan Canal, with the Gaylord Building museum downtown.', spots: ['Illinois and Michigan Canal', 'Gaylord Building', 'Dellwood Park'], nearby: ['romeoville', 'joliet', 'lemont'] },
  { name: 'Joliet', slug: 'joliet', county: 'Will County', blurb: 'The Will County seat on the Des Plaines River, known for the historic Old Joliet Prison and the Rialto Square Theatre.', spots: ['Old Joliet Prison', 'Rialto Square Theatre', 'the Des Plaines River', 'Route 66'], nearby: ['shorewood', 'lockport', 'romeoville'] },
  { name: 'Shorewood', slug: 'shorewood', county: 'Will County', blurb: 'A village on the DuPage River just west of Joliet, known for its riverfront Hammel Woods Forest Preserve.', spots: ['the DuPage River', 'Hammel Woods Forest Preserve', 'Towne Center'], nearby: ['joliet', 'plainfield'] },
  { name: 'New Lenox', slug: 'new-lenox', county: 'Will County', blurb: 'A growing Will County village southeast of Joliet served by an extensive community park district and the Old Plank Road Trail.', spots: ['Old Plank Road Trail', 'Commissioners Park', 'Downtown New Lenox'], nearby: ['joliet', 'mokena', 'frankfort'] },
  { name: 'Mokena', slug: 'mokena', county: 'Will County', blurb: 'A Will County village along the Old Plank Road Trail between New Lenox and Tinley Park.', spots: ['Old Plank Road Trail', 'Downtown Mokena', 'Yunker Farm'], nearby: ['new-lenox', 'tinley-park', 'frankfort'] },
  { name: 'Frankfort', slug: 'frankfort', county: 'Will County', blurb: 'A Will County village with a historic downtown along the Old Plank Road Trail, known for its summer Fall Festival.', spots: ['Old Plank Road Trail', 'Historic Downtown Frankfort', 'Commissioners Park'], nearby: ['mokena', 'new-lenox', 'tinley-park'] },
  { name: 'Tinley Park', slug: 'tinley-park', county: 'Cook County', blurb: 'A southwest Cook County village home to the Credit Union 1 Amphitheatre and a historic 1890s downtown district.', spots: ['Credit Union 1 Amphitheatre', 'Historic Downtown Tinley Park', 'Tinley Park Convention Center'], nearby: ['orland-park', 'mokena', 'frankfort'] },
  { name: 'Orland Park', slug: 'orland-park', county: 'Cook County', blurb: 'A large southwest Cook County village built around Orland Square Mall and the Centennial Park lake and aquatic center.', spots: ['Orland Square Mall', 'Centennial Park', 'Lake Sedgewick'], nearby: ['tinley-park'] },
];

export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);
