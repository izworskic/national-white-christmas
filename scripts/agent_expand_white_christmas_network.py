from pathlib import Path
import json

root=Path(".")
new_cities=json.loads(r'''[
  {
    "slug": "rochester-ny",
    "city": "Rochester",
    "state": "NY",
    "regionSlug": "great-lakes-ohio-valley",
    "region": "Great Lakes & Ohio Valley",
    "summary": "Rochester sits south of Lake Ontario in a corridor where lake-effect snow, synoptic storms and frequent December temperature swings all shape whether snow cover survives to Christmas.",
    "factors": [
      [
        "Lake Ontario influence",
        "Cold west or northwest flow can add lake-effect snow, but band placement often favors areas east or southeast of the lake rather than the entire metro."
      ],
      [
        "Inland cold",
        "Rochester is less marine-moderated than coastal Northeast cities, so established snow can persist through ordinary December cold."
      ],
      [
        "Thaw timing",
        "Warm southwest flow and rain can sharply reduce a shallow pack, making the final pre-Christmas thaw window important."
      ]
    ],
    "thisYear": "Watch whether Rochester enters mid-December with a real base. Once snow is established, the live estimate should respond more to pack survival and the final-week temperature pattern than to broad seasonal signals.",
    "nearby": [
      [
        "Syracuse, NY",
        "Syracuse, NY",
        "Farther east with stronger Lake Ontario snow exposure."
      ],
      [
        "Buffalo, NY",
        "Buffalo, NY",
        "Lake Erie snow belts create a different but often snowier setup."
      ],
      [
        "Bristol Mountain, NY",
        "Bristol Mountain, NY",
        "Higher terrain south of Rochester can hold snow more reliably."
      ]
    ]
  },
  {
    "slug": "erie-pa",
    "city": "Erie",
    "state": "PA",
    "regionSlug": "great-lakes-ohio-valley",
    "region": "Great Lakes & Ohio Valley",
    "summary": "Erie sits directly in the Lake Erie snow belt, giving it frequent early-winter snow but also exposure to lake-modified temperatures and fast-changing band placement.",
    "factors": [
      [
        "Lake-effect snow",
        "West and northwest flow over Lake Erie can produce intense local snow, especially east and southeast of the city."
      ],
      [
        "Lake temperature",
        "An open, relatively warm lake can fuel snow early in winter while also moderating immediate shoreline temperatures."
      ],
      [
        "Warm-sector risk",
        "Strong southwest flow ahead of storms can bring rain and rapid settlement or melting before Christmas."
      ]
    ],
    "thisYear": "For Erie, the important December question is not simply whether lake-effect snow occurs, but whether enough snow reaches the city and remains through any warm intrusions before December 25.",
    "nearby": [
      [
        "Buffalo, NY",
        "Buffalo, NY",
        "Another Lake Erie city with strong but differently placed snow bands."
      ],
      [
        "Chautauqua, NY",
        "Chautauqua, NY",
        "Higher terrain east of Lake Erie often retains more snow."
      ],
      [
        "Cleveland, OH",
        "Cleveland, OH",
        "Farther west on Lake Erie with a different snow-belt geometry."
      ]
    ]
  },
  {
    "slug": "cleveland-oh",
    "city": "Cleveland",
    "state": "OH",
    "regionSlug": "great-lakes-ohio-valley",
    "region": "Great Lakes & Ohio Valley",
    "summary": "Cleveland lies on the southern shore of Lake Erie, where Christmas snow odds can differ sharply between the city, eastern suburbs and higher terrain in the primary snow belt.",
    "factors": [
      [
        "Primary snow belt",
        "East and southeast suburbs can receive much more lake-effect snow than downtown Cleveland under favorable northwest flow."
      ],
      [
        "Lake moderation",
        "Immediate shoreline areas can run milder during marginal events, reducing accumulation or speeding melt."
      ],
      [
        "December thaws",
        "Cleveland is far enough south for warm spells and rain to erase a shallow pack before Christmas."
      ]
    ],
    "thisYear": "A metro-level answer matters in Cleveland because downtown snow depth can diverge from the eastern snow belt. The live estimate should be checked for the exact city or ZIP rather than inferred from regional snowfall headlines.",
    "nearby": [
      [
        "Chardon, OH",
        "Chardon, OH",
        "Higher eastern snow-belt terrain is typically more snow-favorable."
      ],
      [
        "Erie, PA",
        "Erie, PA",
        "Farther east along Lake Erie with stronger lake-effect exposure."
      ],
      [
        "Youngstown, OH",
        "Youngstown, OH",
        "Farther inland and less directly lake-moderated."
      ]
    ]
  },
  {
    "slug": "milwaukee-wi",
    "city": "Milwaukee",
    "state": "WI",
    "regionSlug": "great-lakes-ohio-valley",
    "region": "Great Lakes & Ohio Valley",
    "summary": "Milwaukee has a cold Upper Midwest setting but sits beside Lake Michigan, so shoreline moderation, storm track and lake-enhanced snow can all affect Christmas snow cover.",
    "factors": [
      [
        "Lake Michigan moderation",
        "Near-shore temperatures can be milder than locations farther inland during marginal winter events."
      ],
      [
        "Lake enhancement",
        "Certain wind and storm setups can enhance snowfall near the western shore even though classic lake-effect is less persistent than on the eastern shore."
      ],
      [
        "Cold after snow",
        "Once a storm is followed by sustained cold, snow cover can persist efficiently into Christmas."
      ]
    ],
    "thisYear": "Milwaukee's best signal is the combination of an established December base and the temperature trend that follows it. A shallow pack remains vulnerable to one lake-moderated warm spell.",
    "nearby": [
      [
        "Madison, WI",
        "Madison, WI",
        "Farther inland and less lake-moderated."
      ],
      [
        "Green Bay, WI",
        "Green Bay, WI",
        "Farther north with colder average December conditions."
      ],
      [
        "Chicago, IL",
        "Chicago, IL",
        "Farther south with a more volatile Christmas snow climate."
      ]
    ]
  },
  {
    "slug": "madison-wi",
    "city": "Madison",
    "state": "WI",
    "regionSlug": "great-lakes-ohio-valley",
    "region": "Great Lakes & Ohio Valley",
    "summary": "Madison's inland Upper Midwest climate supports persistent December snow when storms establish a base, without the immediate shoreline moderation found in Milwaukee or Chicago.",
    "factors": [
      [
        "Continental cold",
        "Extended subfreezing stretches can preserve even a modest snowpack."
      ],
      [
        "Storm frequency",
        "A cold month can still be bare if organized Midwest systems repeatedly miss southern Wisconsin."
      ],
      [
        "Midwinter thaws",
        "Southerly flow can produce short but consequential warm periods that reduce shallow snow."
      ]
    ],
    "thisYear": "For Madison, monitor whether early- and mid-December storms leave a base before the final ten days. If the ground is covered and cold persists, the path to a White Christmas becomes much stronger.",
    "nearby": [
      [
        "Milwaukee, WI",
        "Milwaukee, WI",
        "Lake Michigan changes the temperature and snowfall profile."
      ],
      [
        "Green Bay, WI",
        "Green Bay, WI",
        "Farther north and generally colder."
      ],
      [
        "Rockford, IL",
        "Rockford, IL",
        "Farther south with somewhat higher thaw risk."
      ]
    ]
  },
  {
    "slug": "green-bay-wi",
    "city": "Green Bay",
    "state": "WI",
    "regionSlug": "great-lakes-ohio-valley",
    "region": "Great Lakes & Ohio Valley",
    "summary": "Green Bay is far enough north for durable December cold, while Green Bay and Lake Michigan still shape local snowfall and temperature differences across northeast Wisconsin.",
    "factors": [
      [
        "Northern latitude",
        "Long cold stretches favor snow retention once a December base develops."
      ],
      [
        "Bay and lake influence",
        "Water temperatures and wind direction can alter local snowfall and near-shore temperatures."
      ],
      [
        "Pack depth",
        "A deeper mid-December base is much more resistant to brief thaws than a marginal early-season cover."
      ]
    ],
    "thisYear": "The strongest December evidence will be actual snow depth and the persistence of cold across northeast Wisconsin. A healthy base by mid-month usually matters more than any single long-range signal.",
    "nearby": [
      [
        "Appleton, WI",
        "Appleton, WI",
        "Slightly farther inland with a similar northeast Wisconsin climate."
      ],
      [
        "Milwaukee, WI",
        "Milwaukee, WI",
        "Farther south and more directly exposed to Lake Michigan moderation."
      ],
      [
        "Marquette, MI",
        "Marquette, MI",
        "Much farther north with stronger Lake Superior snow."
      ]
    ]
  },
  {
    "slug": "albany-ny",
    "city": "Albany",
    "state": "NY",
    "regionSlug": "northeast-new-england",
    "region": "Northeast & New England",
    "summary": "Albany sits inland in the Hudson Valley, cold enough for regular December snow but vulnerable to mixed precipitation and thaws when storms track west of New England.",
    "factors": [
      [
        "Inland cold",
        "Distance from the Atlantic reduces marine moderation compared with New York City and coastal New England."
      ],
      [
        "Storm track",
        "Coastal and interior lows can bring snow, mix or rain depending on track and temperature structure."
      ],
      [
        "Nearby elevation",
        "The Berkshires, Catskills and southern Adirondacks often keep snow more reliably than the lower Hudson Valley."
      ]
    ],
    "thisYear": "For Albany, the final answer often depends on whether valley snow survives the last warm-sector storm before Christmas. Nearby mountains can be white while the city itself is not.",
    "nearby": [
      [
        "Lake Placid, NY",
        "Lake Placid, NY",
        "Adirondack elevation and cold strongly improve snow retention."
      ],
      [
        "Pittsfield, MA",
        "Pittsfield, MA",
        "Berkshire elevation creates a snowier nearby alternative."
      ],
      [
        "Syracuse, NY",
        "Syracuse, NY",
        "Farther west with Lake Ontario snow influence."
      ]
    ]
  },
  {
    "slug": "worcester-ma",
    "city": "Worcester",
    "state": "MA",
    "regionSlug": "northeast-new-england",
    "region": "Northeast & New England",
    "summary": "Worcester's elevation and inland position make it notably colder and snowier than Boston, giving central Massachusetts a better chance of holding December snow.",
    "factors": [
      [
        "Elevation",
        "Worcester sits several hundred feet above Boston and often remains colder during marginal winter storms."
      ],
      [
        "Inland position",
        "Less direct Atlantic moderation improves snow-to-rain odds and snowpack durability."
      ],
      [
        "Nor'easter track",
        "A favorable coastal track can deliver substantial snow, while an inland track can bring mixing or rain."
      ]
    ],
    "thisYear": "Worcester can keep snow when Boston loses it, so the city should be treated as its own climate rather than a Boston proxy. Snow depth and the final-week temperature profile become decisive late in December.",
    "nearby": [
      [
        "Boston, MA",
        "Boston, MA",
        "Lower and more marine-moderated."
      ],
      [
        "Concord, NH",
        "Concord, NH",
        "Farther north with colder interior conditions."
      ],
      [
        "Pittsfield, MA",
        "Pittsfield, MA",
        "Higher Berkshire terrain can retain snow even better."
      ]
    ]
  },
  {
    "slug": "bangor-me",
    "city": "Bangor",
    "state": "ME",
    "regionSlug": "northeast-new-england",
    "region": "Northeast & New England",
    "summary": "Bangor's inland-eastern Maine location gives it a colder December climate than the immediate coast, with frequent snow and comparatively good snowpack persistence.",
    "factors": [
      [
        "Interior cold",
        "Bangor is less exposed to direct Atlantic moderation than Portland and coastal Downeast communities."
      ],
      [
        "Storm track",
        "Gulf of Maine and interior New England storms can both produce meaningful snow, but track still controls mix and rain risk."
      ],
      [
        "Snowpack persistence",
        "Long cold stretches can preserve snow between storms and carry a base toward Christmas."
      ]
    ],
    "thisYear": "For Bangor, watch whether December establishes a continuous pack and whether any warm rain event reaches this far inland. A stable base can survive ordinary weather better than in coastal southern Maine.",
    "nearby": [
      [
        "Portland, ME",
        "Portland, ME",
        "Farther south and much more coastal."
      ],
      [
        "Greenville, ME",
        "Greenville, ME",
        "Farther inland and higher, with stronger snow retention."
      ],
      [
        "Bar Harbor, ME",
        "Bar Harbor, ME",
        "Coastal Maine is more exposed to marine warmth and mixing."
      ]
    ]
  },
  {
    "slug": "concord-nh",
    "city": "Concord",
    "state": "NH",
    "regionSlug": "northeast-new-england",
    "region": "Northeast & New England",
    "summary": "Concord sits inland in southern New Hampshire, offering colder and more durable December snow conditions than the Boston coast while remaining south of the snowiest northern mountains.",
    "factors": [
      [
        "Interior location",
        "Distance from the Atlantic helps temperatures stay colder during many winter events."
      ],
      [
        "Storm track",
        "Nor'easters and inland systems can both bring snow, but warm air aloft can still introduce sleet or rain."
      ],
      [
        "Northern gradient",
        "Snow retention generally improves northward and with elevation toward the White Mountains."
      ]
    ],
    "thisYear": "Concord is often a useful dividing line between coastal volatility and northern New England persistence. The late-December temperature profile will show whether an existing pack can hold.",
    "nearby": [
      [
        "Worcester, MA",
        "Worcester, MA",
        "Another elevated inland New England city."
      ],
      [
        "North Conway, NH",
        "North Conway, NH",
        "Mountain setting with substantially stronger snow retention."
      ],
      [
        "Burlington, VT",
        "Burlington, VT",
        "Farther north with a colder overall December climate."
      ]
    ]
  },
  {
    "slug": "lake-placid-ny",
    "city": "Lake Placid",
    "state": "NY",
    "regionSlug": "northeast-new-england",
    "region": "Northeast & New England",
    "summary": "Lake Placid's Adirondack elevation and cold make it one of the more snow-reliable Christmas destinations in the eastern United States, though valley inversions and storm timing still matter.",
    "factors": [
      [
        "Adirondack elevation",
        "Higher terrain supports colder temperatures and slower snow loss."
      ],
      [
        "Persistent cold",
        "December temperatures often favor keeping a base once snow is established."
      ],
      [
        "Mountain variability",
        "Snow depth can change quickly with elevation and exposure even within the broader High Peaks region."
      ]
    ],
    "thisYear": "For a Christmas trip, actual snow depth in Lake Placid matters more than snowfall reports from higher peaks. The local estimator should be checked as the travel date approaches.",
    "nearby": [
      [
        "Burlington, VT",
        "Burlington, VT",
        "Lower Champlain Valley conditions can be milder."
      ],
      [
        "Albany, NY",
        "Albany, NY",
        "Farther south and lower in the Hudson Valley."
      ],
      [
        "Saranac Lake, NY",
        "Saranac Lake, NY",
        "Nearby Adirondack community with similarly cold winter conditions."
      ]
    ]
  },
  {
    "slug": "bismarck-nd",
    "city": "Bismarck",
    "state": "ND",
    "regionSlug": "upper-midwest-northern-plains",
    "region": "Upper Midwest & Northern Plains",
    "summary": "Bismarck has a strongly continental northern Plains climate where cold is usually sufficient for snow retention, but total snow cover depends heavily on whether storms actually cross central North Dakota.",
    "factors": [
      [
        "Continental cold",
        "Long subfreezing stretches make significant midwinter melt uncommon once snow is established."
      ],
      [
        "Dry Plains climate",
        "Cold does not guarantee a deep snowpack; storm tracks can leave central North Dakota relatively dry."
      ],
      [
        "Wind redistribution",
        "Open terrain can scour exposed areas and build drifts, making measured snow depth more useful than snowfall totals alone."
      ]
    ],
    "thisYear": "The key question for Bismarck is often snow supply, not temperature. If a base exists by mid-December, persistent cold can make it durable through Christmas.",
    "nearby": [
      [
        "Fargo, ND",
        "Fargo, ND",
        "Farther east with a somewhat different storm track."
      ],
      [
        "Minot, ND",
        "Minot, ND",
        "Farther north and often colder."
      ],
      [
        "Rapid City, SD",
        "Rapid City, SD",
        "Farther south and influenced by Black Hills terrain."
      ]
    ]
  },
  {
    "slug": "sioux-falls-sd",
    "city": "Sioux Falls",
    "state": "SD",
    "regionSlug": "upper-midwest-northern-plains",
    "region": "Upper Midwest & Northern Plains",
    "summary": "Sioux Falls lies near the southern edge of the reliably cold northern Plains, where Christmas snow cover can persist well after storms but is more vulnerable to warm spells than farther north.",
    "factors": [
      [
        "Cold-air access",
        "Arctic air can lock in quickly and preserve snow for long stretches."
      ],
      [
        "Southern exposure",
        "Warm southerly flow can produce meaningful December thaws that are less common in North Dakota."
      ],
      [
        "Open terrain",
        "Wind can compact and redistribute shallow snow, changing actual ground cover after a storm."
      ]
    ],
    "thisYear": "For Sioux Falls, the live estimate should react strongly to whether late-December cold follows a storm. A fresh shallow snow can disappear quickly if a Plains warm-up arrives.",
    "nearby": [
      [
        "Fargo, ND",
        "Fargo, ND",
        "Farther north with more persistent cold."
      ],
      [
        "Omaha, NE",
        "Omaha, NE",
        "Farther south with greater thaw risk."
      ],
      [
        "Bismarck, ND",
        "Bismarck, ND",
        "Colder and drier central northern Plains climate."
      ]
    ]
  },
  {
    "slug": "rapid-city-sd",
    "city": "Rapid City",
    "state": "SD",
    "regionSlug": "upper-midwest-northern-plains",
    "region": "Upper Midwest & Northern Plains",
    "summary": "Rapid City's Black Hills setting creates one of the more volatile winter climates in the northern Plains, with sharp elevation gradients and frequent warm downslope episodes.",
    "factors": [
      [
        "Black Hills elevation",
        "Nearby higher terrain can be deeply snowy while Rapid City itself is comparatively bare."
      ],
      [
        "Chinook warming",
        "Downslope west winds can produce rapid winter warm-ups and fast snow loss."
      ],
      [
        "Upslope snow",
        "East or northeast flow can focus heavy snow against the Black Hills and rapidly change local conditions."
      ]
    ],
    "thisYear": "Rapid City is a place where a regional snow map can mislead. Check the city itself because Black Hills snow and city snow cover can diverge dramatically before Christmas.",
    "nearby": [
      [
        "Lead, SD",
        "Lead, SD",
        "High Black Hills elevation holds snow far more reliably."
      ],
      [
        "Deadwood, SD",
        "Deadwood, SD",
        "Higher terrain and mountain exposure improve snow cover."
      ],
      [
        "Bismarck, ND",
        "Bismarck, ND",
        "Colder Plains climate without Black Hills Chinook effects."
      ]
    ]
  },
  {
    "slug": "st-cloud-mn",
    "city": "St. Cloud",
    "state": "MN",
    "regionSlug": "upper-midwest-northern-plains",
    "region": "Upper Midwest & Northern Plains",
    "summary": "St. Cloud sits in central Minnesota, colder and less urban than Minneapolis while still close enough to major storm tracks to build and retain a December snowpack.",
    "factors": [
      [
        "Central Minnesota cold",
        "Persistent subfreezing weather supports long snowpack retention."
      ],
      [
        "Storm track",
        "Snow depth still depends on whether organized systems cross central Minnesota."
      ],
      [
        "Urban difference",
        "Less urban heat than the Twin Cities can help shallow snow survive marginal warm periods."
      ]
    ],
    "thisYear": "If St. Cloud develops a base in early or mid-December, the cold background climate often favors keeping it. The main threat is a significant warm spell rather than routine daytime melting.",
    "nearby": [
      [
        "Minneapolis, MN",
        "Minneapolis, MN",
        "Farther south and more urban."
      ],
      [
        "Duluth, MN",
        "Duluth, MN",
        "Farther north with Lake Superior influence."
      ],
      [
        "Brainerd, MN",
        "Brainerd, MN",
        "Farther north in Minnesota lake country."
      ]
    ]
  },
  {
    "slug": "missoula-mt",
    "city": "Missoula",
    "state": "MT",
    "regionSlug": "rockies-mountain-west",
    "region": "Rockies & Mountain West",
    "summary": "Missoula sits in a mountain valley where cold-air pooling can preserve snow, but elevation differences and periodic Pacific air intrusions make city conditions distinct from surrounding peaks.",
    "factors": [
      [
        "Valley inversions",
        "Cold air can settle into the valley and preserve snow even when nearby ridges are warmer."
      ],
      [
        "Pacific influence",
        "Milder western air can occasionally raise snow levels or produce valley rain."
      ],
      [
        "Elevation gradient",
        "Surrounding mountains may be deeply snowy while the city floor has much less cover."
      ]
    ],
    "thisYear": "For Missoula, check the valley itself rather than assuming mountain snow means a White Christmas downtown. Inversions and snow level are the two signals most likely to separate the city from nearby terrain.",
    "nearby": [
      [
        "Bozeman, MT",
        "Bozeman, MT",
        "Higher and more continental on the east side of the Divide."
      ],
      [
        "Whitefish, MT",
        "Whitefish, MT",
        "Farther north with strong mountain snow access."
      ],
      [
        "Helena, MT",
        "Helena, MT",
        "Continental interior valley with different downslope exposure."
      ]
    ]
  },
  {
    "slug": "billings-mt",
    "city": "Billings",
    "state": "MT",
    "regionSlug": "rockies-mountain-west",
    "region": "Rockies & Mountain West",
    "summary": "Billings is cold enough for December snow but sits east of the Rockies where Chinook winds can rapidly warm the city and remove a shallow snowpack.",
    "factors": [
      [
        "Chinook warming",
        "Downslope winds can drive temperatures well above freezing even in midwinter."
      ],
      [
        "Continental cold",
        "Arctic air can also arrive abruptly and preserve snow efficiently after storms."
      ],
      [
        "Storm placement",
        "Billings is less snow-reliable than nearby mountains, so a White Christmas depends on actual Plains and foothill storm coverage."
      ]
    ],
    "thisYear": "The strongest late-December signal for Billings is whether any established snowpack survives the next downslope warm-up. Snowfall alone is not enough without cold persistence.",
    "nearby": [
      [
        "Bozeman, MT",
        "Bozeman, MT",
        "Higher mountain valley with better snow retention."
      ],
      [
        "Red Lodge, MT",
        "Red Lodge, MT",
        "Higher foothill elevation and more reliable mountain snow."
      ],
      [
        "Bismarck, ND",
        "Bismarck, ND",
        "Farther east with fewer Chinook effects."
      ]
    ]
  },
  {
    "slug": "jackson-wy",
    "city": "Jackson",
    "state": "WY",
    "regionSlug": "rockies-mountain-west",
    "region": "Rockies & Mountain West",
    "summary": "Jackson's high-elevation valley and surrounding Teton snow climate make it a strong White Christmas destination, though valley-floor conditions should still be separated from deep mountain snow.",
    "factors": [
      [
        "High elevation",
        "Jackson sits above 6,000 feet, supporting cold temperatures and durable December snow."
      ],
      [
        "Mountain snowfall",
        "Pacific storms crossing the Tetons can repeatedly refresh the regional snowpack."
      ],
      [
        "Valley inversions",
        "Cold air pooling can keep the town colder than nearby slopes during quiet weather."
      ]
    ],
    "thisYear": "For travelers, the question is not whether the Tetons have snow but what is on the ground in Jackson itself. The city estimate should be checked separately from ski-area totals.",
    "nearby": [
      [
        "Teton Village, WY",
        "Teton Village, WY",
        "Closer to the Tetons and usually snowier than town."
      ],
      [
        "West Yellowstone, MT",
        "West Yellowstone, MT",
        "High cold plateau with very persistent snow."
      ],
      [
        "Bozeman, MT",
        "Bozeman, MT",
        "Larger Montana valley with a somewhat milder snow regime."
      ]
    ]
  },
  {
    "slug": "colorado-springs-co",
    "city": "Colorado Springs",
    "state": "CO",
    "regionSlug": "rockies-mountain-west",
    "region": "Rockies & Mountain West",
    "summary": "Colorado Springs sits at high elevation along the Front Range, but abundant winter sunshine and downslope warming make persistent city snow much less certain than nearby mountain snow.",
    "factors": [
      [
        "High elevation",
        "Elevation supports cold nights and snow when storms arrive."
      ],
      [
        "Downslope warming",
        "West winds descending from the Rockies can quickly warm and dry the city."
      ],
      [
        "Strong sun",
        "High-elevation sunshine can melt shallow snow efficiently even when air temperatures are cool."
      ]
    ],
    "thisYear": "A pre-Christmas storm helps only if it is followed by limited downslope warming. The live estimate should emphasize actual ground cover rather than nearby mountain snowfall.",
    "nearby": [
      [
        "Denver, CO",
        "Denver, CO",
        "Similar Front Range volatility farther north."
      ],
      [
        "Woodland Park, CO",
        "Woodland Park, CO",
        "Higher terrain west of the city holds snow more reliably."
      ],
      [
        "Breckenridge, CO",
        "Breckenridge, CO",
        "High mountain setting with far more persistent winter snow."
      ]
    ]
  },
  {
    "slug": "steamboat-springs-co",
    "city": "Steamboat Springs",
    "state": "CO",
    "regionSlug": "rockies-mountain-west",
    "region": "Rockies & Mountain West",
    "summary": "Steamboat Springs combines high elevation, a cold interior Colorado valley and frequent northern Colorado mountain snow, making Christmas snow cover much more reliable than along the Front Range.",
    "factors": [
      [
        "High valley elevation",
        "Cold nights and limited midwinter melting help preserve snow."
      ],
      [
        "Orographic snowfall",
        "Moist northwest flow can produce repeated snow in the Park Range."
      ],
      [
        "Valley versus ski area",
        "The mountain commonly carries deeper snow than the town, so local ground cover still matters."
      ]
    ],
    "thisYear": "For a Christmas visit, the town's actual snow depth is the relevant answer. Ski-area base depth is useful context but should not substitute for conditions where people are staying and walking.",
    "nearby": [
      [
        "Denver, CO",
        "Denver, CO",
        "Lower Front Range city with much less persistent snow."
      ],
      [
        "Vail, CO",
        "Vail, CO",
        "High mountain corridor with strong snow retention."
      ],
      [
        "Jackson, WY",
        "Jackson, WY",
        "Another high western mountain valley with reliable winter snow."
      ]
    ]
  },
  {
    "slug": "leavenworth-wa",
    "city": "Leavenworth",
    "state": "WA",
    "regionSlug": "pacific-northwest-sierra",
    "region": "Pacific Northwest & Sierra",
    "summary": "Leavenworth's Cascades setting makes it a major Christmas destination with real winter snow potential, but Pacific storm warmth and snow-level swings can still change valley conditions quickly.",
    "factors": [
      [
        "Cascade snow",
        "Storms crossing the Cascades can deliver frequent winter precipitation and substantial nearby mountain snow."
      ],
      [
        "Snow level",
        "Small temperature changes can shift precipitation between valley snow, wet snow and rain."
      ],
      [
        "Cold east-side air",
        "Cold air banked east of the Cascades can keep the valley snowy even when western Washington is mild."
      ]
    ],
    "thisYear": "For a Christmas trip, check Leavenworth itself rather than relying on pass or ski-area snow. The valley can remain cold and snowy under east-side cold air, but warm Pacific systems can change conditions rapidly.",
    "nearby": [
      [
        "Wenatchee, WA",
        "Wenatchee, WA",
        "Lower and drier east of the Cascades."
      ],
      [
        "Stevens Pass, WA",
        "Stevens Pass, WA",
        "Much higher and substantially snowier than town."
      ],
      [
        "Spokane, WA",
        "Spokane, WA",
        "More continental inland Northwest climate."
      ]
    ]
  },
  {
    "slug": "mammoth-lakes-ca",
    "city": "Mammoth Lakes",
    "state": "CA",
    "regionSlug": "pacific-northwest-sierra",
    "region": "Pacific Northwest & Sierra",
    "summary": "Mammoth Lakes sits high in the eastern Sierra, where elevation and powerful Pacific storms can build deep December snow, though warm atmospheric rivers can raise snow levels.",
    "factors": [
      [
        "High elevation",
        "The town sits near 8,000 feet, strongly favoring snow and long retention once winter is established."
      ],
      [
        "Sierra storm intensity",
        "Pacific systems can rapidly add large amounts of mountain snow."
      ],
      [
        "Snow-level swings",
        "Warm storms can bring dense wet snow or rain at lower elevations even while upper mountain terrain stays snowy."
      ]
    ],
    "thisYear": "Mammoth is usually a strong Christmas snow candidate, but travelers should still distinguish town conditions from upper-mountain base depth. The live local check keeps that distinction explicit.",
    "nearby": [
      [
        "South Lake Tahoe, CA",
        "South Lake Tahoe, CA",
        "Another high Sierra community with strong but variable snow."
      ],
      [
        "Reno, NV",
        "Reno, NV",
        "Much lower and drier in the Sierra rain shadow."
      ],
      [
        "June Lake, CA",
        "June Lake, CA",
        "Nearby high-elevation eastern Sierra community."
      ]
    ]
  }
]''')

data_path=root/"data/white-christmas-cities.json"
data=json.loads(data_path.read_text())
existing={c["slug"] for c in data["cities"]}
for c in new_cities:
    if c["slug"] not in existing:
        data["cities"].append(c)
        existing.add(c["slug"])
if len(data["cities"]) != 50:
    raise SystemExit(f"expected 50 cities after selective expansion, got {len(data['cities'])}")
data["version"]="1.1.0"
data["updated"]="2026-09-25"
data["purpose"]="Selective White Christmas city/metro network focused on proven snow regions, major metros and winter destinations. Each city page must contain materially distinct local climate context and route into the live estimator."
data_path.write_text(json.dumps(data,indent=2,ensure_ascii=False)+"\n")

package_path=root/"package.json"
package=package_path.read_text()
old='node scripts/generate-white-christmas-city-pages.mjs'
new='node scripts/generate-white-christmas-city-pages.mjs && node scripts/enhance-white-christmas-network.mjs'
package=package.replace(old,new)
package_path.write_text(package)

(root/"scripts/enhance-white-christmas-network.mjs").write_text('#!/usr/bin/env node\nimport { readFile, writeFile } from "node:fs/promises";\nimport path from "node:path";\n\nconst root=path.resolve(import.meta.dirname,"..");\nconst dataPath=path.join(root,"data/white-christmas-cities.json");\nconst manifestPath=path.join(root,"public/white-christmas-route-manifest.json");\nconst data=JSON.parse(await readFile(dataPath,"utf8"));\nconst esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll(\'"\',"&quot;");\nconst q=s=>encodeURIComponent(s);\nconst key=s=>String(s).trim().toLowerCase();\nconst byQuery=new Map(data.cities.map(c=>[key(`${c.city}, ${c.state}`),c]));\nconst regionOrder=[\n  "Great Lakes & Ohio Valley",\n  "Northeast & New England",\n  "Upper Midwest & Northern Plains",\n  "Rockies & Mountain West",\n  "Pacific Northwest & Sierra",\n  "Southwest High Country",\n  "Mid-Atlantic & Appalachians",\n  "Alaska",\n  "Southern Plains & Rare-Snow South"\n];\nconst seasonAsset=`<script src="/assets/white-christmas-season.js?v=20260925-growth1"></script>`;\n\nfor(const c of data.cities){\n  const file=path.join(root,"public/national-tools/white-christmas/cities",c.slug,"index.html");\n  let html=await readFile(file,"utf8");\n\n  for(const [,query] of c.nearby){\n    const match=byQuery.get(key(query));\n    if(!match)continue;\n    const live=`/national-tools/white-christmas/?q=${q(query)}`;\n    const direct=`/national-tools/white-christmas/cities/${match.slug}/`;\n    html=html.replaceAll(`href="${live}"`,`href="${direct}"`);\n  }\n\n  const current=`<div class="wc-support-callout wc-season-now" data-wc-season-copy data-wc-place="${esc(c.city)}"><strong>Current phase:</strong> loading the Christmas 2026 signal hierarchy…</div>`;\n  html=html.replace(`<h2>What drives Christmas snow in ${esc(c.city)}?</h2>`,`${current}<h2>What drives Christmas snow in ${esc(c.city)}?</h2>`);\n\n  const siblings=data.cities.filter(x=>x.regionSlug===c.regionSlug&&x.slug!==c.slug).slice(0,4);\n  if(siblings.length){\n    const siblingCards=siblings.map(x=>`<article class="wc-support-panel"><h3><a href="/national-tools/white-christmas/cities/${x.slug}/">${esc(x.city)}, ${esc(x.state)}</a></h3><p>${esc(x.summary)}</p></article>`).join("");\n    const siblingSection=`<section class="wc-city-neighbors"><h2>More White Christmas guides in ${esc(c.region)}</h2><div class="wc-support-grid">${siblingCards}</div></section>`;\n    html=html.replace(`<section class="wc-faq">`,`${siblingSection}<section class="wc-faq">`);\n  }\n\n  html=html.replace(`</body></html>`,`${seasonAsset}</body></html>`);\n  await writeFile(file,html);\n}\n\nconst groups=regionOrder.map(region=>[region,data.cities.filter(c=>c.region===region)]).filter(([,cities])=>cities.length);\nconst hubCards=groups.map(([region,cities])=>{\n  const regionSlug=cities[0].regionSlug;\n  return `<section class="wc-city-group"><div class="wc-heading-split"><h2>${esc(region)}</h2><a href="/national-tools/white-christmas/regions/${regionSlug}/">Explore this region →</a></div><div class="wc-city-index">${cities.map(c=>`<a class="wc-city-card" href="/national-tools/white-christmas/cities/${c.slug}/"><span>${esc(c.state)}</span><h3>${esc(c.city)}</h3><p>${esc(c.summary)}</p></a>`).join("")}</div></section>`;\n}).join("");\n\nconst hub=`<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n<title>White Christmas City Guides 2026 | Chris Izworski</title><meta name="description" content="Explore 50 White Christmas city guides across the U.S., then check live 2026 snow odds for any city or ZIP.">\n<link rel="canonical" href="https://chrisizworski.com/national-tools/white-christmas/cities/"><meta name="robots" content="index,follow,max-image-preview:large">\n<meta property="og:type" content="website"><meta property="og:title" content="White Christmas City Guides 2026"><meta property="og:description" content="Local Christmas snow context across 50 U.S. cities and destinations, linked to the live 2026 estimator."><meta property="og:url" content="https://chrisizworski.com/national-tools/white-christmas/cities/"><meta property="og:image" content="https://chrisizworski.com/assets/white-christmas-hero-final.webp">\n<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="https://chrisizworski.com/assets/white-christmas-hero-final.webp">\n<link rel="preload" as="image" href="/assets/white-christmas-hero-final.webp" type="image/webp"><link rel="stylesheet" href="/assets/national-tools.css?v=20260902-placebar1"><link rel="stylesheet" href="/assets/white-christmas.css?v=20260903-city11">\n<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Person","@id":"https://chrisizworski.com/#person","name":"Chris Izworski","url":"https://chrisizworski.com/"},{"@type":"CollectionPage","url":"https://chrisizworski.com/national-tools/white-christmas/cities/","name":"White Christmas City Guides 2026","dateModified":"2026-09-25","author":{"@id":"https://chrisizworski.com/#person"}}]}).replaceAll("<","\\u003c")}</script>\n</head><body class="white-christmas-page wc-support-page"><header class="site-head wc-masthead"><div class="wrap head-in"><a class="wc-tool-mark" href="/national-tools/white-christmas/"><span class="wc-tool-mark-icon" aria-hidden="true"></span><strong>White Christmas</strong></a><nav class="nav" aria-label="Primary"><a href="/national-tools/white-christmas/regions/">U.S. regions</a><a href="/national-tools/white-christmas/forecast/">2026 forecast</a><a href="/national-tools/white-christmas/">Check my odds</a></nav></div></header>\n<main><section class="wc-support-hero"><picture class="wc-hero-media" aria-hidden="true"><img src="/assets/white-christmas-hero-final.webp" alt="" fetchpriority="high" decoding="async"></picture><div class="wrap"><div class="eyebrow">50 local guides · Christmas 2026</div><h1>White Christmas city guides</h1><p>Start with the city or winter destination people actually search for, understand its local snow regime, then jump into the live 2026 estimate. The network stays selective: strong snow markets, major metros and Christmas destinations rather than thin pages for every U.S. city.</p></div></section>\n<section class="wc-support-main"><div class="wrap">\n<div class="wc-support-callout wc-season-now" data-wc-season-copy><strong>Current phase:</strong> loading the Christmas 2026 signal hierarchy…</div>\n<div class="wc-locator" aria-labelledby="city-hub-search"><h2 id="city-hub-search">Check any U.S. city or ZIP</h2><form action="/national-tools/white-christmas/" method="get"><label class="wc-sr-only" for="city-hub-location">U.S. city, state or ZIP</label><div class="wc-input-wrap"><span class="wc-location-icon" aria-hidden="true"></span><input id="city-hub-location" name="q" autocomplete="postal-code" inputmode="search" placeholder="Enter city, state or ZIP code" required></div><button class="btn" type="submit">See my local odds <span class="wc-arrow-icon" aria-hidden="true"></span></button></form><div class="wc-locator-meta"><p>The 50 guides below add local context. The live estimator still works for any supported U.S. city or ZIP.</p></div></div>\n${hubCards}\n<div class="wc-support-grid"><article class="wc-support-panel"><h3>Browse by snow region</h3><p><a href="/national-tools/white-christmas/regions/">Explore White Christmas across America →</a></p></article><article class="wc-support-panel"><h3>Understand the 2026 forecast</h3><p><a href="/national-tools/white-christmas/forecast/">See what we can know now and what changes as Christmas approaches →</a></p></article><article class="wc-support-panel"><h3>See the national map</h3><p><a href="/white-christmas-probability-map/">Historical White Christmas probability map →</a></p></article></div>\n</div></section></main><footer class="footer"><div class="wrap">© 2026 <a href="/">Chris Izworski</a> · National White Christmas city guides and weather intelligence.</div></footer>${seasonAsset}</body></html>`;\nawait writeFile(path.join(root,"public/national-tools/white-christmas/cities/index.html"),hub);\n\nfor(const [,cities] of groups){\n  const regionSlug=cities[0].regionSlug;\n  const file=path.join(root,"public/national-tools/white-christmas/regions",regionSlug,"index.html");\n  let html=await readFile(file,"utf8");\n  html=html.replace(/<section data-wc-region-city-guides>[\\s\\S]*?<\\/section>/g,"");\n  html=html.replace(/<div class="wc-support-callout wc-season-now"[\\s\\S]*?<\\/div>/g,"");\n  html=html.replaceAll(seasonAsset,"");\n  for(const c of cities){\n    const live=`/national-tools/white-christmas/?q=${q(`${c.city}, ${c.state}`)}`;\n    const direct=`/national-tools/white-christmas/cities/${c.slug}/`;\n    html=html.replaceAll(`href="${live}"`,`href="${direct}"`);\n  }\n  const regionGuides=`<section data-wc-region-city-guides><h2>Local White Christmas guides</h2><div class="wc-city-links">${cities.map(c=>`<a href="/national-tools/white-christmas/cities/${c.slug}/">${esc(c.city)}, ${esc(c.state)}</a>`).join("")}</div></section>`;\n  const season=`<div class="wc-support-callout wc-season-now" data-wc-season-copy data-wc-place="${esc(cities[0].region)}"><strong>Current phase:</strong> loading the Christmas 2026 signal hierarchy…</div>`;\n  html=html.replace(`<h2>What drives Christmas snow here?</h2>`,`${season}<h2>What drives Christmas snow here?</h2>`);\n  html=html.replace(`<div class="wc-support-grid">`,`${regionGuides}<div class="wc-support-grid">`);\n  html=html.replace(`</body></html>`,`${seasonAsset}</body></html>`);\n  html=html.replaceAll(\'"dateModified":"2026-09-03"\',\'"dateModified":"2026-09-25"\');\n  await writeFile(file,html);\n}\n\nconst manifest=JSON.parse(await readFile(manifestPath,"utf8"));\nconst cityRoutes=data.cities.map(c=>({\n  route:`/national-tools/white-christmas/cities/${c.slug}/`,\n  file:`public/national-tools/white-christmas/cities/${c.slug}/index.html`,\n  kind:"city"\n}));\nconst routesWithoutCities=manifest.routes.filter(r=>r.kind!=="city");\nconst insertAt=routesWithoutCities.findIndex(r=>r.route==="/white-christmas-probability-map/");\nmanifest.routes=insertAt<0?[...routesWithoutCities,...cityRoutes]:[\n  ...routesWithoutCities.slice(0,insertAt),\n  ...cityRoutes,\n  ...routesWithoutCities.slice(insertAt)\n];\nmanifest.version="1.1.0";\nmanifest.updated="2026-09-25";\nawait writeFile(manifestPath,JSON.stringify(manifest,null,2)+"\\n");\n\nconsole.log(JSON.stringify({enhanced:data.cities.length,regions:groups.length,manifestRoutes:manifest.routes.length}));\n')
(root/"public/assets/white-christmas-season.js").write_text('(function(){\n  const nodes=document.querySelectorAll("[data-wc-season-copy]");\n  if(!nodes.length)return;\n  const now=new Date(),year=2026,target=new Date(year,11,25,12,0,0);\n  const nov1=new Date(year,10,1),dec10=new Date(year,11,10),dec19=new Date(year,11,19),dec25=new Date(year,11,25);\n  const days=Math.max(0,Math.ceil((target-now)/86400000));\n  let label,copy;\n  if(now<nov1){\n    label="Early outlook";\n    copy="Historical Christmas snow odds are the useful signal now. A specific December 25 forecast would be false precision.";\n  }else if(now<dec10){\n    label="Seasonal setup";\n    copy="Broad temperature patterns and the first durable snowpack now add context, but Christmas Day is still outside a dependable short-range forecast.";\n  }else if(now<dec19){\n    label="Snowpack watch";\n    copy="Actual snow on the ground now matters much more. Watch whether cold preserves the pack or rain and warmth cut into it.";\n  }else if(now<dec25){\n    label="Forecast window";\n    copy="Christmas is close enough for the short-range forecast to drive the answer. Snowfall, rain, highs, lows and existing snow depth matter most now.";\n  }else if(now.getFullYear()===year&&now.getMonth()===11&&now.getDate()===25){\n    label="Christmas Day";\n    copy="Use the latest observed snow depth and local forecast conditions for the final answer.";\n  }else{\n    label="Season complete";\n    copy="Christmas 2026 has passed. The live estimator will roll into the next Christmas cycle.";\n  }\n  nodes.forEach(node=>{\n    const place=node.getAttribute("data-wc-place");\n    const prefix=place?place+": ":"";\n    node.innerHTML="<strong>"+prefix+label+(now<dec25?" · "+days+" days to Christmas":"")+":</strong> "+copy;\n  });\n})();\n')
(root/"tests/white-christmas-network-growth-v12.test.js").write_text('const test=require("node:test");\nconst assert=require("node:assert/strict");\nconst fs=require("node:fs");\nconst path=require("node:path");\nconst root=path.join(__dirname,"..");\nconst data=JSON.parse(fs.readFileSync(path.join(root,"data/white-christmas-cities.json"),"utf8"));\nconst hub=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/cities/index.html"),"utf8");\nconst forecast=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/forecast/index.html"),"utf8");\nconst season=fs.readFileSync(path.join(root,"public/assets/white-christmas-season.js"),"utf8");\nconst manifest=JSON.parse(fs.readFileSync(path.join(root,"public/white-christmas-route-manifest.json"),"utf8"));\n\ntest("selective city expansion reaches 50 without turning into a doorway-page spray",()=>{\n  assert.equal(data.cities.length,50);\n  assert.ok(data.cities.length<=60);\n  const slugs=new Set(data.cities.map(c=>c.slug));\n  assert.equal(slugs.size,50);\n  for(const c of data.cities){\n    assert.ok(c.summary.length>120,c.slug);\n    assert.equal(c.factors.length,3,c.slug);\n    assert.ok(c.factors.every(x=>x[1].length>50),c.slug);\n    assert.ok(c.thisYear.length>100,c.slug);\n    assert.equal(c.nearby.length,3,c.slug);\n  }\n});\n\ntest("growth pass concentrates on proven snow regions and destination searches",()=>{\n  for(const slug of ["rochester-ny","erie-pa","cleveland-oh","milwaukee-wi","madison-wi","green-bay-wi","albany-ny","worcester-ma","bangor-me","concord-nh","lake-placid-ny","bismarck-nd","sioux-falls-sd","rapid-city-sd","st-cloud-mn","missoula-mt","billings-mt","jackson-wy","colorado-springs-co","steamboat-springs-co","leavenworth-wa","mammoth-lakes-ca"]){\n    assert.ok(data.cities.some(c=>c.slug===slug),slug);\n  }\n});\n\ntest("city hub exposes the 50-guide network and preserves direct local lookup",()=>{\n  assert.match(hub,/50 local guides/);\n  assert.match(hub,/name="q"/);\n  assert.match(hub,/action="\\/national-tools\\/white-christmas\\/"/);\n  for(const c of data.cities)assert.match(hub,new RegExp("/cities/"+c.slug+"/"));\n});\n\ntest("city pages show the current seasonal phase and cross-link to sibling guides",()=>{\n  const rochester=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/cities/rochester-ny/index.html"),"utf8");\n  assert.match(rochester,/data-wc-season-copy/);\n  assert.match(rochester,/white-christmas-season\\.js/);\n  assert.match(rochester,/\\/cities\\/syracuse-ny\\//);\n  assert.match(rochester,/More White Christmas guides in Great Lakes &amp; Ohio Valley/);\n});\n\ntest("regional pages now feed authority into local city guides",()=>{\n  const greatLakes=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/regions/great-lakes-ohio-valley/index.html"),"utf8");\n  assert.match(greatLakes,/data-wc-region-city-guides/);\n  assert.match(greatLakes,/\\/cities\\/cleveland-oh\\//);\n  assert.match(greatLakes,/\\/cities\\/erie-pa\\//);\n  assert.match(greatLakes,/data-wc-season-copy/);\n});\n\ntest("season logic visibly changes from early outlook to forecast window",()=>{\n  for(const phrase of ["Early outlook","Seasonal setup","Snowpack watch","Forecast window","Christmas Day"])assert.match(season,new RegExp(phrase));\n  assert.match(forecast,/data-wc-season-copy/);\n  assert.match(forecast,/white-christmas-season\\.js/);\n});\n\ntest("every expanded city is registered in the published-route manifest",()=>{\n  const routes=new Set(manifest.routes.filter(r=>r.kind==="city").map(r=>r.route));\n  assert.equal(routes.size,50);\n  for(const c of data.cities)assert.ok(routes.has(`/national-tools/white-christmas/cities/${c.slug}/`),c.slug);\n});\n')

forecast_path=root/"public/national-tools/white-christmas/forecast/index.html"
forecast=forecast_path.read_text()
forecast=forecast.replace(
    '<div class="wc-support-callout" id="forecast-stage" role="status" aria-live="polite"><strong>Right now:</strong> local Christmas snow history is the strongest evidence. A specific December 25 storm forecast would be false precision this far out.</div>',
    '<div class="wc-support-callout wc-season-now" id="forecast-stage" data-wc-season-copy role="status" aria-live="polite"><strong>Current phase:</strong> loading the Christmas 2026 signal hierarchy…</div>'
)
start=forecast.rfind("<script>\n(function(){")
if start < 0:
    raise SystemExit("forecast inline season script not found")
end=forecast.find("</script>",start)
if end < 0:
    raise SystemExit("forecast inline season script end not found")
forecast=forecast[:start]+'<script src="/assets/white-christmas-season.js?v=20260925-growth1"></script>'+forecast[end+9:]
forecast_path.write_text(forecast)

for rel in [
    "tests/white-christmas-city-network-v11.test.js",
    "tests/white-christmas-published-routes-v11.test.js",
]:
    p=root/rel
    s=p.read_text()
    s=s.replace("assert.equal(data.cities.length,28);","assert.equal(data.cities.length,50);")
    s=s.replace("assert.equal(seen.size,28);","assert.equal(seen.size,50);")
    p.write_text(s)
