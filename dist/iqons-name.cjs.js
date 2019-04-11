"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = name;
exports.wordsByEntropy = wordsByEntropy;
exports.makeLetterHash = makeLetterHash;
exports.makeHash = makeHash;
exports.hashToRGB = hashToRGB;
exports.hashToIndices = hashToIndices;
exports.getBackgroundColorName = getBackgroundColorName;
exports.WordDimensions = exports.WordCatalog = exports.backgroundColors = exports.colors = exports.colorNames = void 0;

function name(o) {
  const t = makeHash(o),
        e = makeHash(t);
  return wordsByEntropy(t[3] + t[4], t[5] + t[6], t[7] + t[8], t[9] + t[10], e[0] + t[0], e[1] + e[2], t[0], t[2]);
}

;

function wordsByEntropy(o, t, e, r, s, n, a, u) {
  s = Number(s), n = Number(n);
  const i = hashToIndices(a, u, 0).main;
  let l;

  for (l = 0; l < 100; l++) {
    const a = _wordRound(o, t, e, r, s + l, n, i);

    if (a) return a;
  }

  return "Rare Shiny Bug";
}

;

function makeLetterHash(o) {
  return makeHash(o).substring(0, 6).split("").map(o => "ABCDEFGHIJ"[o]).join("");
}

;

function _wordRound(o, t, e, r, s, n, a) {
  const u = [WordCatalog.face[o % 21], WordCatalog.top[t % 21], WordCatalog.side[e % 21], WordCatalog.bottom[r % 21]],
        i = s % 2,
        l = (s / 2 | 0) % 3,
        c = (s / 6 | 0) % 5,
        h = [],
        p = 4 == c;
  p ? h.push(WordCatalog.color[a]) : (h.push((o => o.slice(0, 3))(u[c])), u.splice(c, 1)), h.push((o => o.slice(3, 6))(u[l])), u.splice(l, 1), h.push((o => o.slice(6, 9))(u[i]));
  const d = [];

  for (let o = 0; o < 3; o++) for (let t = 0; t < 3; t++) if (p) d.push([h[0], h[1][t], h[2][o]]);else for (let e = 0; e < 3; e++) d.push([h[0][e], h[1][t], h[2][o]]);

  const m = WordDimensions,
        f = [];

  for (const o of d) {
    const t = makeLetterHash(o[0]),
          e = makeLetterHash(o[1]),
          r = makeLetterHash(o[2]),
          s = m[t] + 2 + m[e],
          n = m[e] + 2 + m[r];
    s > 74 && n > 74 || m[t] + 2 + m[e] + 2 + m[r] > 124 || f.push(o);
  }

  return 0 === f.length ? null : f[n %= f.length].join(" ");
}

function makeHash(t) {
  const r = ("" + t.split("").map(t => Number(t.charCodeAt(0)) + 3).reduce((t, r) => t * (1 - t) * __chaosHash(r), .5)).split("").reduce((t, r) => r + t, "");
  return _padEnd(r.replace(".", r[5]).substr(4, 17), 13, r[5]);
}

;

function __chaosHash(t) {
  let r = 1 / t;

  for (let t = 0; t < 100; t++) r = (1 - r) * r * 3.569956786876;

  return r;
}

function _padEnd(t, r, e) {
  if (String.prototype.padEnd) return t.padEnd(r, e);

  for (; t.length < r;) t += e;

  return t.substring(0, Math.max(t.length, r));
}

const colorNames = ["Orange", "Red", "Yellow", "Blue", "Light Blue", "Purple", "Green", "Pink", "Light Green", "Brown"];
exports.colorNames = colorNames;

function hashToRGB(o, n, r) {
  return indicesToRGB(hashToIndices(o, n, r));
}

;

function hashToIndices(o, n, r) {
  for (o = parseInt(o, 10), n = parseInt(n, 10), r = parseInt(r, 10), o === n && ++o > 9 && (o = 0); r === o || r === n;) ++r > 9 && (r = 0);

  return {
    main: o,
    background: n,
    accent: r
  };
}

;

function indicesToRGB(o) {
  return {
    main: colors[o.main],
    background: backgroundColors[o.background],
    accent: colors[o.accent]
  };
}

function getBackgroundColorName(o) {
  const n = makeHash(o),
        r = parseInt(n[2], 10);
  return colorNames[r];
}

;
const colors = ["#FC8702", "#D94432", "#E9B213", "#1A5493", "#0582CA", "#5961A8", "#21BCA5", "#FA7268", "#88B04B", "#795548"];
exports.colors = colors;
const backgroundColors = ["#FC8702", "#D94432", "#E9B213", "#1F2348", "#0582CA", "#5F4B8B", "#21BCA5", "#FA7268", "#88B04B", "#795548"];
exports.backgroundColors = backgroundColors;
const WordCatalog = {
  color: colorNames,
  face: [["Cute", "Whiskered", "Proud", "Purring", "Straying", "Meowing", "Cat", "Kitten", "Tomcat"], ["Red-Nosed", "Comical", "Clownish", "Entertaining", "Amusing", "Hoaxing", "Bubble-Nose", "Rudolph", "Clown"], ["Shocked", "Sad", "Unhappy", "Whining", "Crying", "Weeping", "Crybaby", "Whiner", "Whimperer"], ["Ironic", "Weird", "Jokey", "Winking", "Blinking", "Squinting", "Eye-Cramp", "Emoji", "Smiley"], ["Thrifty", "Frugal", "Self-Made", "Money-Loving", "Moneymaking", "Investing", "Banker", "Moneymaker", "Entrepreneur"], ["Bloodthirsty", "Bloody", "Undead", "Bloodsucking", "Biting", "Killing", "Vampire", "Dracula", "Bloodsucker"], ["Duckfaced", "Short-Billed", "Bird-like", "Chattering", "Cackling", "Quacking", "Drake", "Duck", "Goose"], ["Evil", "Sly", "Vicious", "Cursing", "Cunning", "Intriguing", "Villain", "Baddie", "Bully"], ["Romantic", "Admiring", "Infatuated", "Loving", "Admiring", "Desiring", "Lover", "Romantic", "Romeo"], ["Surprised", "Dead", "Lifeless", "Decaying", "Dying", "Fading", "Ghoul", "Zombie", "Corpse"], ["Mustached", "Bearded", "Prickly", "Grooming", "Shaving", "Trimming", "Mustache", "Barber", "Shakers"], ["Bad-Eyed", "Four-Eyed", "Nerdy", "Squinting", "Reading", "Educating", "Nerd", "Geek", "Wonk"], ["One-Eyed", "Monocular", "Monstrous", "Eyeballing", "Staring", "Gaping", "Mutant", "Cyclops", "Freak"], ["Cute", "Tame", "Fluffy", "Snuggling", "Cuddling", "Romping", "Panda", "Bear", "Animal"], ["Tropical", "Noisy", "Exotic", "Parroting", "Chirping", "Tweeting", "Parrot", "Budgie", "Birdie"], ["Pig-Nosed", "Piggy", "Pig-Headed", "Oinking", "Wallowing", "Sniffling", "Sow", "Boar", "Swine"], ["Eye-Patched", "Gruff", "Wounded", "Eye-Catching", "Scowling", "Frowning", "Rover", "McEyepatch", "Buccaneer"], ["Happy", "Amused", "Jolly", "Loling", "Giggling", "Laughing", "Laugher", "Giggler", "Troll"], ["Amazed", "Curious", "Avid", "Sparkling", "Staring", "Gaming", "Starface", "Fan", "Wonderkid"], ["Swaggy", "Funky", "Cool", "Sunbathing", "Chilling", "Holding", "Styler", "Fashionista", "Celebrity"], ["Funny", "Goofy", "Absurd", "Joking", "Window-Licking", "Bold", "Joker", "Clown", "Tongue"]],
  side: [["Astronomical", "Artificial", "Metallic", "Transmitting", "Orbiting", "Connecting", "Satellite", "Cyborg", "Drone"], ["Shot", "Hit", "Pierced", "Shooting", "Suffering", "Enduring", "Amateur-Archer", "Arrow", "Shooter"], ["Drunk", "Sober", "Wasted", "Brewing", "Sipping", "Partying", "Bavarian", "Beer-Fan", "Inebriate"], ["Protective", "Punchy", "Gloved", "Boxing", "Fighting", "Slamming", "Boxer", "Streetfighter", "Fighter"], ["Horned", "Spiky", "Deadly", "Stabbing", "Sticking", "Pricking", "Viking", "Savage", "Barbarian"], ["Pointy-Eared", "Elfish", "Puckish", "Ear-Cocking", "Listening", "Eavesdropping", "Elf", "Trekkie", "Vulcan"], ["Pincerlike", "Protective", "Scuttling", "Pinching", "Snatching", "Squeezing", "Crab", "Lobster", "Crawfish"], ["Magic", "Occult", "Eerie", "Conjuring", "Spell-Casting", "Jinxing", "Wizard", "Warlock", "Sorcerer"], ["Two-Petaled", "Sustainable", "Organic", "Flowering", "Flourishing", "Blooming", "Flower", "Plant", "Sprout"], ["Sporty", "Fit", "Macho", "Touch-Downing", "Scoring", "Tackling", "Quarterback", "Coach", "Team-Captain"], ["Hungry", "Empty-Bellied", "Craving", "Munching", "Snacking", "Eating", "Foodie", "Big Eater", "Gourmet"], ["Big-Eared", "Bat-Eared", "Keen-Eared", "Ear-Lending", "Overhearing", "Ear-Wiggling", "Listener", "Monster-Ear", "Hearer"], ["Pumped", "Ripped", "Muscly", "Weight-Lifting", "Training", "Exercising", "Bodybuilder", "Iron-Pumper", "Muscle Man"], ["Talky", "Chatty", "Talkative", "Mom-Calling", "Dialing", "Ringing", "Caller", "Phone-Addict", "Telephoner"], ["Triumphant", "Peaceful", "Victorious", "Selfie-Making", "Posing", "Celebrating", "Poser-Kid", "Winner", "Peace-Actvist"], ["Athletic", "Olympic", "Competitive", "Serving", "Defeating", "Sporting", "Player", "Tennis-Pro", "Athlete"], ["Twiggy", "Biological", "Leafy", "Sprouting", "Blossoming", "Budding", "Ent", "Tree", "Bush"], ["Heavenly", "Feathered", "Graceful", "Flapping", "Winging", "Flailing", "Angel", "Bird", "Aviator"], ["Busy", "Efficient", "Productive", "Multitasking", "High-Performing", "Consulting", "Manager", "Multitasker", "Headset-Guy"], ["Fishy", "Maritime", "Aquatic", "Swimming", "Fin-Waving", "Bathing", "Blowfish", "Fish", "Whale"], ["Hot", "Warm", "Steamy", "Whistling", "Boiling", "Piping", "Teapot", "Kettle", "Pot"]],
  top: [["Bewigged", "Uncombable", "Curly", "Hair-Dyeing", "Blow-Drying", "Shampooing", "Granny", "Perm", "Wig"], ["Antenna-Headed", "Connected", "Extrinsic", "Receiving", "Signalling", "Scouting", "Alien", "Martian", "Visitor"], ["Juicy", "Fresh", "Ripe", "Nourishing", "Filling", "Refreshing", "Pear", "Apple", "Fruit"], ["Sun-Protected", "Shadowed", "Oriental", "Sun-Fearing", "Working", "Harvesting", "Tourist", "Fisherman", "Farmer"], ["Primitive", "Bony", "Wild", "Bone-Collecting", "Meat-Eating", "Scoring", "Galoot", "Savage", "Caveman"], ["Gastronomic", "Culinary", "Flavorful", "Cooking", "Baking", "Frying", "Chef", "Cook", "Foodie"], ["Free", "Outdoor", "Country", "Cattle-Driving", "Lassoing", "Riding", "Rancher", "Texan", "Herder"], ["Oldfashioned", "Sophisticated", "Traditional", "Hat-Wearing", "Gun-Slinging", "Intimidating", "Mafioso", "Mobster", "Gangster"], ["Medical", "Caring", "Analytical", "Examining", "Healing", "Curing", "Doctor", "Dentist", "Medic"], ["Drippy", "Sweaty", "Wet", "Splashing", "Leaking", "Dripping", "Splash", "Droplet", "Raindrop"], ["Allegedly-Dead", "Iconic", "Reborn", "Rock'n'Rolling", "Singing", "Dancing", "Elvis", "Rockabilly", "Imitator"], ["Holy", "Worshipped", "Divine", "Blessing", "Gleaming", "Redeeming", "Saint", "Angel", "Halo"], ["Native", "Indigenous", "Aboriginal", "Defending", "Feather-Wearing", "Smoke-signaling", "Hippie", "Chief", "Warrior"], ["Crowned", "Godlike", "Monarchical", "Ruling", "Reigning", "Commanding", "King", "Monarch", "Prince"], ["Wise", "Powerful", "Loyal", "King-Serving", "Fighting", "Advising", "Musketeer", "Sorcerer", "Magus"], ["Psychedelic", "Edible", "Poisonous", "Mesmerizing", "Intoxicating", "Befuddling", "Mushroom", "Agaric", "Fungus"], ["Uniformed", "Official", "Dutiful", "Serving", "Patroling", "Arresting", "Officer", "Sarge", "Deputee"], ["Noble", "Fairy", "Royal", "Charming", "Dreaming", "Inspiring", "Princess", "Madam", "Queen"], ["Edgy", "Rowdy", "Crazy", "Revolting", "Rioting", "Provoking", "Punk", "Outlaw", "Anarchist "], ["Fabulous", "Mythical", "Imaginary", "Amazing", "Fascinating", "Enchanting", "Unicorn", "Chimera", "Narwhal"], ["Cold", "Chilly", "Winterly", "Freezing", "Quivering", "Shivering", "Scandinavian", "Bobble", "McBobbleHat"]],
  bottom: [["Light", "Fun", "Helium", "Floating", "Flying", "Swelling", "Balloon", "Ball", "Aerostat"], ["Four-Toed", "Shoeless", "Barefoot", "Wandering", "Hiking", "Lumbering", "Hobbit", "Wanderer", "Hiker"], ["Clawed", "Birdlike", "Aerial", "Waddling", "Clawing", "Toddling", "Birdman", "Birdie", "Harpy"], ["Elegant", "Overdressed", "Classy", "Impressive", "Posing", "Imposing", "Nobleman", "Suit", "Gentleman"], ["Scary", "Uncanny", "Monstrous", "Crawling", "Scuttling", "Creeping", "Spider", "Spiderman", "Tarantula"], ["Fishtailed", "Finned", "Overfished", "Mermaiding", "Diving", "Splashing", "Mermaid", "Ariel", "Sea-Cow"], ["Homegrown", "Leafy", "Lush", "Growing", "Gardening", "Grass-rooting", "Flower", "Seed", "Spirit"], ["Rhythmic", "Musical", "Tuneful", "Rocking", "Jamming", "Shredding", "Musician", "Guitarist", "Rocker"], ["Graceful", "High-Heeled", "Sexy", "Balancing", "Seducing", "Sashaying", "Lady", "Drag", "Signora"], ["Weightless", "Zero-G", "Light", "Levitating", "Floating", "Hovering", "Ghost", "Levitator", "Hover-Ball"], ["Tentacled", "Eight-Limbed", "Slimy", "Slithering", "Sliding", "Skidding", "Octopus", "Tentacles", "Alien"], ["Bulb-Shaped", "Bright", "Shiny", "Idea-Giving", "Glowing", "Illuminating", "Bulb", "Socket", "Luminary"], ["Peg-Legged", "Wooden", "Tripling", "Limping", "Hobbling", "Stumbling", "Pirate", "Hobble", "Veteran"], ["Hyperactive", "Active", "Energetic", "Jumping", "Hopping", "Skipping", "Bouncy-Ball", "Doer", "Motivator"], ["Teenage", "Fly", "Skillful", "Riding", "Skateboarding", "Kickflipping", "Amateur", "Pro-Skater", "Skateboarder"], ["Old-school", "Childish", "Weird", "Skating", "Rolling", "Spinning", "Fly", "Skater", "80s-Kid"], ["Fast", "Downhill", "Alpine", "Skiing", "Gliding", "Speeding", "Skier", "Ski-Instructor", "Snow-Slider"], ["Skillful", "Quick", "Vigorous", "Kicking", "Dribbling", "Scoring", "Striker", "Goalkeeper", "Kicker"], ["Outboxed", "Jumpy", "Bouncy", "Surprising", "Flip-Flopping", "Trolling", "Surprise", "Jester", "Joker"], ["Jaunty", "Light-Footed", "Agile", "Wandering", "Strolling", "Running", "Rambler", "Flaneur", "Pedestrian"], ["Wheeled", "Fast", "Mobile", "Driving", "Cruising", "Drifting", "Wheelie", "Ride", "Car"]]
};
exports.WordCatalog = WordCatalog;
WordCatalog.ADJECTIVE0 = 0, WordCatalog.ADJECTIVE1 = 1, WordCatalog.ADJECTIVE2 = 2, WordCatalog.VERB0 = 3, WordCatalog.VERB1 = 4, WordCatalog.VERB2 = 5, WordCatalog.NOUN0 = 6, WordCatalog.NOUN1 = 7, WordCatalog.NOUN2 = 8;
const WordDimensions = {
  FFEIAI: 19,
  BHGEIB: 14,
  BJFEGA: 27,
  CJEGBH: 31,
  FJDAHA: 23,
  EIEHCF: 32,
  EJCGGF: 29,
  JBDGCB: 15,
  GGCCGD: 33,
  BAAFIE: 39,
  EIAAHE: 34,
  CEFJBI: 33,
  IDJJCI: 42,
  HBBHGB: 24,
  DFBBIB: 40,
  CHECJH: 26,
  ABHDIA: 38,
  JAIIDE: 20,
  BAHFAI: 29,
  FFICAE: 28,
  FBDEBE: 23,
  ADGFJE: 37,
  FIJEAC: 31,
  EFDEGC: 33,
  BIFCFJ: 32,
  HGJFGB: 22,
  AJCCBB: 24,
  BEAADH: 29,
  JEHGDJ: 48,
  JDHEHD: 25,
  CDEGJC: 40,
  FGDGIC: 26,
  CACBFI: 35,
  IGBJAJ: 39,
  CABGEB: 15,
  BEBADA: 41,
  JEEAHD: 22,
  CGJCJB: 34,
  BAJBHC: 40,
  BIBCAI: 34,
  IEECCJ: 34,
  JAGDDE: 34,
  HIEJHA: 25,
  BFBIDA: 41,
  JAGJJI: 36,
  CIJCDH: 37,
  IIHEAI: 26,
  GDIHCA: 41,
  AFIBIG: 45,
  FCDHCI: 24,
  CCDFHE: 38,
  BHHJBD: 33,
  JEIDEJ: 18,
  BADECF: 35,
  DAEDGE: 47,
  EEBFBF: 21,
  DFGGEF: 18,
  BEACEE: 32,
  GJEGHJ: 40,
  FDEHCF: 52,
  HFEGBA: 26,
  IECDCE: 19,
  BHBFBC: 20,
  EHBEJG: 36,
  HBJHEF: 29,
  GHGBEG: 28,
  CFDEDH: 30,
  AEGBDJ: 34,
  AGEBCJ: 39,
  ECJGED: 33,
  CDJECF: 33,
  FFEEBD: 26,
  IDAJGD: 32,
  JDFEHA: 48,
  BDBCBB: 18,
  EHDDIB: 38,
  JDAEDE: 35,
  CDJFCA: 40,
  IBAHGG: 19,
  HEJCAC: 19,
  GEHDIC: 30,
  BJAHEA: 42,
  GEADIB: 27,
  IGIGJA: 38,
  AEHCHF: 34,
  EGGCGD: 22,
  HCCFGA: 34,
  IHJEII: 40,
  HEBABG: 37,
  HFDGED: 51,
  EJCEJH: 21,
  DEBJGH: 36,
  IDBJCC: 26,
  JDIJEG: 33,
  HFCFJB: 32,
  AFHIDD: 36,
  CBEJFD: 19,
  AJHAFD: 50,
  JHGIJC: 23,
  BJHECC: 21,
  IDCHDF: 44,
  BAFEDC: 31,
  IIBBCH: 44,
  GIFCJI: 17,
  EFIFFH: 25,
  DIHEAA: 36,
  FFFIID: 46,
  IEHCGC: 32,
  FIHJCG: 28,
  HJAEBH: 30,
  IBAEGF: 35,
  IGFJBD: 39,
  BIABDB: 23,
  FBAGCD: 27,
  EBAIFB: 30,
  ICAHHI: 45,
  BICDDA: 24,
  HICHHD: 35,
  BDIJCI: 31,
  BGEDED: 33,
  EJCHEC: 33,
  CDBDII: 46,
  HDDABH: 18,
  DEBDBG: 36,
  JFDBJA: 32,
  FFAHEB: 11,
  AGCJFD: 25,
  AFCJBC: 24,
  FICJAI: 56,
  FGJIDG: 44,
  JEGGJB: 33,
  HGICHF: 41,
  GBAAEA: 51,
  FEAAFI: 41,
  AHECDG: 30,
  CHBAHG: 23,
  IBIJAJ: 29,
  BIICIJ: 26,
  HJEICA: 33,
  CHEIAC: 25,
  FDHCDF: 29,
  ECIIIJ: 17,
  DBHIFJ: 33,
  HDHACE: 24,
  EBBJEH: 23,
  JJCACD: 27,
  GGAEIB: 36,
  GJGBIA: 19,
  IDAFCI: 51,
  DAEHDE: 46,
  GDIFHE: 22,
  GHDDAE: 34,
  EHHJFG: 27,
  EJBIDD: 35,
  DCGFCB: 29,
  EGBHBG: 25,
  IDDGEH: 43,
  DJHEDJ: 23,
  JGADIG: 37,
  IDCHCB: 24,
  EBFCGB: 28,
  GAIAJI: 39,
  ABEEAE: 50,
  IDFFDA: 28,
  JDGCFE: 31,
  GEDIIJ: 22,
  BAJEHD: 19,
  EEBEHI: 25,
  AAABGF: 49,
  FHHHEF: 20,
  HIJEEA: 31,
  EAEIJA: 32,
  EIICHA: 32,
  ACDCHD: 29,
  GBJIAH: 41,
  HIFJCJ: 34,
  FGAFFC: 25,
  HDADIG: 27,
  GGIBEB: 31,
  ADAJGF: 29,
  EFDEAH: 31,
  IIGIEC: 17,
  IGCFBC: 14,
  JGEAJF: 18,
  GCDIGB: 41,
  JEBJCB: 23,
  AFFCCI: 28,
  AJEHHI: 32,
  FIGFEJ: 35,
  AGIBGD: 14,
  IEAHJB: 22,
  DJFEHJ: 28,
  EIFFID: 43,
  AEAJIA: 30,
  IAHGGI: 35,
  DBGCCD: 47,
  BHIAII: 34,
  JDGGGF: 32,
  DIBFEB: 49,
  FEBJGJ: 32,
  BGCDJB: 24,
  DHDHAA: 32,
  BFAGAH: 15,
  GEIFHI: 35,
  EIDDJG: 32,
  GIABDJ: 25,
  AIHBIC: 34,
  BCACIA: 32,
  IDJGAE: 28,
  AJIEAF: 43,
  DDIEAC: 21,
  BCAGAJ: 21,
  GIEFIB: 32,
  CIHIJI: 30,
  JGHJGD: 36,
  IFIGHH: 43,
  GFCAIF: 21,
  ECIJGA: 25,
  AACBFJ: 25,
  DDHAEG: 24,
  GFCFFG: 39,
  HDBHFD: 53,
  FCAECC: 53,
  AHJBDI: 34,
  BABFHI: 27,
  GHFAGC: 49,
  DEBGIB: 49,
  JABBBF: 46,
  CHFJDA: 26,
  FJADBC: 30,
  HGCHAG: 51,
  BJDHFA: 22,
  EBHAJB: 23,
  BFBBFJ: 32,
  JGBDAJ: 30,
  IHAABA: 46,
  EIJEBH: 40,
  DGCDCC: 45,
  JIIJHG: 32,
  JFAEJE: 40,
  FEGAGG: 32,
  HDEDHF: 36,
  AJADGD: 23,
  CADHDC: 19,
  GCIAAB: 24,
  CBIAJI: 13,
  GBCIHA: 12,
  DAFBBF: 27,
  JHGHAA: 29,
  AGJFCG: 32,
  GGAGIJ: 36,
  GBACGF: 24,
  EBHAHD: 27,
  CDGBAG: 19,
  AAHHFH: 36,
  DGHFFJ: 35,
  HJHCBF: 40,
  AJJAAB: 25,
  AICBJD: 31,
  DFGBAB: 21,
  JAHGHJ: 27,
  EECGCH: 36,
  HJGEEC: 21,
  CECBGD: 28,
  ADIACI: 36,
  IAHCGE: 22,
  IEIFBD: 26,
  HDAHCE: 22,
  FDFFDB: 28,
  EBBACJ: 27,
  CEADFG: 42,
  GIAIHG: 32,
  JCFGDC: 25,
  DHECHD: 37,
  DGJAGB: 31,
  GEICBG: 35,
  JFBGBE: 37,
  ICGCGH: 26,
  ACEDAA: 31,
  CIDBFC: 37,
  IIBAGF: 39,
  BAHJBB: 23,
  CCHAJA: 32,
  JIBBGF: 38,
  CGJFCG: 19,
  AACIBG: 19,
  EECAEG: 22,
  HCBJBF: 37,
  BEIJJD: 40,
  GDDBJD: 39,
  BCDDFA: 28,
  AEBIJE: 28,
  FDCCBA: 27,
  CABAGE: 29,
  CJDFFA: 21,
  IAGACH: 21,
  ECDIGB: 22,
  HHHACE: 38,
  AJFBIA: 34,
  IGBGBC: 34,
  CEJDED: 25,
  GBAIEC: 18,
  GEGGIF: 27,
  AGIICH: 30,
  IFJAHC: 21,
  IACAID: 23,
  EHBABH: 35,
  AIFICJ: 32,
  EAGHHA: 35,
  BFGCDI: 24,
  FJDBFD: 27,
  FICBBG: 40,
  HHHABB: 22,
  AEGBFH: 46,
  HBGGGF: 29,
  CDIAFE: 41,
  CIFBAE: 31,
  JHDFEI: 17,
  AIGFBA: 18,
  EEHFFJ: 23,
  ADBAJJ: 48,
  JBIEGH: 20,
  HCHCID: 37,
  JEBJJE: 51,
  FCIBAJ: 35,
  ABHFHI: 36,
  DHIJIH: 22,
  IFHFII: 46,
  JBJBAB: 40,
  FAHGAH: 25,
  BFJADJ: 31,
  ECDJFC: 16,
  GHFCJJ: 23,
  BCABJE: 32,
  BAGDGC: 36,
  GIBDHD: 31,
  ADGEEG: 27,
  CHGBJD: 16,
  CEIDCH: 32,
  DCHABD: 29,
  DEFHFH: 17,
  GGACFI: 36,
  BAGADI: 30,
  EBCJJA: 33,
  CGCJDC: 14,
  ABIBJE: 42,
  CEEBDC: 31,
  DHDFAG: 23,
  FEFAJE: 17,
  EGGEJH: 44,
  IAJCII: 28,
  EIJCIA: 30,
  CIIADG: 22,
  FFAFHE: 44,
  ACEFBD: 34,
  DFFBDF: 23,
  JCGAEI: 23,
  DEJECI: 28,
  FDBCAH: 24,
  HCFDJG: 62,
  IFDDHA: 17,
  EFEGGF: 28,
  FCGFEA: 50,
  BCEHHB: 32,
  JBAFGA: 29,
  EGGDBA: 48,
  HHGHCH: 31,
  HEAGJG: 43,
  HJFBBC: 31,
  GIJEAC: 27,
  ABIIJJ: 23,
  JJHAHF: 18,
  IJGDAG: 11,
  GFIDFI: 28,
  CBDJDD: 34,
  EAFEHB: 35,
  BDGBFD: 34,
  GBAHDD: 62,
  HADDDE: 24,
  JJIHIE: 30,
  BGBGJA: 23,
  JAFJEH: 22,
  CGFDHH: 30,
  FEAFHG: 32,
  AFCFBF: 29,
  DEGJFA: 33,
  IECHII: 34,
  DBHFHG: 35,
  JIEGEI: 34,
  IFACCE: 38,
  AEBHGD: 28,
  GAGBAB: 26,
  ACDDBI: 26,
  CCHGHG: 31,
  HGADIG: 38,
  EDBCBB: 22,
  AEEDHH: 48,
  CECECH: 27,
  AAGJAF: 28,
  CDIBGB: 21,
  JGBCDE: 27,
  BEGBGH: 35,
  EDGCEI: 30,
  EAIACJ: 30,
  JEGHCC: 24,
  BGDEIH: 29,
  JJIGJH: 38,
  DBGACA: 49,
  GDHCHB: 21,
  HGDHBE: 29,
  JFGFGG: 46,
  CDBIII: 34,
  GGBEIJ: 56,
  DEIFEG: 10,
  GHHFEB: 27,
  FCEHBG: 26,
  HGBBIF: 36,
  AHAGHB: 33,
  DFGBGH: 38,
  JJHDIG: 39,
  DJJADI: 19,
  BAAFAA: 29,
  HJACAD: 34,
  DBIEEC: 23,
  AFFBJI: 24,
  CIFCEB: 19,
  ACCCII: 36,
  HIABAC: 51,
  DBIDDE: 26,
  CCIEIF: 28,
  JEFIFI: 32,
  GIEJFA: 32,
  EFGGAI: 48,
  ACCFFC: 45,
  GFAIFF: 30,
  BGBBHE: 37,
  ICBBIB: 42,
  IDAIIG: 36,
  GFGIAC: 20,
  CGDGFH: 25,
  GCJAHB: 26,
  IGBHHJ: 10,
  EAHGHC: 25,
  CHCCGJ: 60,
  DJHBBH: 31,
  HECHGA: 48,
  AIDICE: 24,
  JIHFAH: 54,
  JJDHAA: 28,
  IGIJDC: 53,
  EJFDIH: 30,
  JBGEHD: 37,
  IBFIJH: 35,
  JEGIGD: 25,
  DHHBCG: 25,
  BGGDBD: 35,
  HCBCJA: 33,
  AHEGEJ: 38,
  GAFGED: 39,
  ICGBCD: 44,
  EBIEAF: 46,
  DBFFGA: 47,
  HJDAJG: 51,
  FFEFDB: 30,
  EEGHFE: 47,
  AIJICB: 26,
  IICHFD: 31,
  FFDHHB: 27,
  FIFEBB: 26,
  AGDDHA: 55,
  EJAAEF: 31,
  ADADEB: 38,
  JJIFCH: 45,
  HHAJDJ: 48,
  AIDFII: 45,
  FHFHFH: 20,
  JJDAFE: 26,
  FGDCGG: 34,
  HJHCGA: 48,
  CECHCB: 27,
  AHDJED: 29,
  HJIECJ: 22,
  AGBDHF: 52,
  CFIFJJ: 42,
  IJJAJB: 44,
  BCCHDD: 33,
  BGHCJI: 38,
  ECFGFH: 52,
  EHGAGD: 44,
  AFEEBD: 37,
  BEBDCF: 28,
  AEHAJD: 53,
  IICIIJ: 29,
  BHFCCG: 31,
  JFFCDB: 45,
  FCGGJD: 29,
  IHCBJH: 37,
  CHIIDA: 33,
  GGHCAD: 24,
  GJABIH: 41,
  AEBJDG: 27,
  GBCDFC: 28,
  JDADAJ: 37,
  HGIDEB: 37,
  EEJIFB: 44,
  EFGHHG: 32,
  HHBFIB: 13,
  ICJHGI: 16,
  AIAFAJ: 19,
  FDGGFI: 35,
  FICBFB: 38,
  EFBFJF: 33,
  CAHJJE: 33,
  HHGBJH: 27,
  EHADGA: 22,
  HJBCAJ: 16,
  JECBEE: 28,
  JJGGEJ: 19,
  EDHCCE: 31,
  DIGJHF: 40,
  GHFIEJ: 46,
  IHCGJI: 64,
  HHFJGH: 40,
  JBIAFG: 34,
  FIJBJA: 42,
  HBEBIG: 50,
  JGJCDI: 20,
  BGGFIB: 33,
  BBIBGD: 30,
  JJDCJC: 40,
  HDHFFB: 44,
  EIBJBE: 30,
  BDIHJG: 33,
  FEAJGI: 16,
  HDDBEI: 25,
  FJJACB: 14,
  GABFJA: 24,
  CBFIJB: 29,
  HGCFCF: 36,
  FBGFCF: 26,
  DGHDAB: 24,
  CJCJIC: 26,
  ACDGHC: 22,
  JEFIEE: 13,
  BDGIGB: 38,
  JJGDHB: 48,
  FBAHIB: 20,
  CGHJAD: 46,
  CBEIED: 48,
  CCFJHE: 48,
  CIJHDH: 28,
  GFJHED: 20,
  IDIIHF: 16,
  EGGHEI: 66,
  JFIJJG: 40,
  CJAFIG: 32,
  ADCAII: 37,
  IICECA: 38,
  CJFIIA: 33,
  HIDAEE: 30,
  BFCHHH: 25,
  BFBJIF: 18,
  GGDDGC: 21,
  CJBJAF: 17,
  FCDGEG: 41,
  DJBCJE: 22,
  HCCCCI: 41,
  IHBEDB: 18,
  IEDDFD: 22,
  GBHCBH: 17,
  DAGHIG: 55,
  DCGJGI: 41,
  FJGIHF: 30,
  JFJHEE: 47,
  IBDIBG: 32,
  DBCCGD: 42,
  ICBCIC: 26,
  EFHDAC: 40,
  DAABJA: 27,
  DAGFEG: 33,
  DEBAIC: 20,
  CDBFDF: 18,
  ADCFJF: 60,
  IBBGAB: 47,
  AJHDDG: 25,
  DAGJCJ: 36,
  HIGDAJ: 48,
  AAFFJI: 32,
  BAEGGG: 33,
  DJJGEF: 31,
  AGICAG: 27,
  BHDGCF: 24,
  EJIBFH: 18,
  IFEGBG: 19,
  DCIACB: 16,
  EECGGE: 31,
  GBCDBB: 30,
  GJDGFI: 53,
  GFAHEH: 34,
  IJCHIG: 32,
  DIBGFA: 23,
  GGJJBD: 26,
  IABCGF: 50,
  IIAFFC: 52,
  FAHHEH: 40,
  CJJHIA: 50,
  HIFIBB: 49,
  AHAJCE: 46,
  ICHEGE: 30,
  HEJJCH: 31,
  JIGIAA: 35,
  GJGCEJ: 29,
  AJBHHD: 25,
  CJFAHC: 38,
  FJDFEA: 40,
  IGHHAC: 29,
  HFFFCD: 25,
  HEIAGF: 26,
  FBIEFE: 27,
  EFDHAI: 22,
  JDEEHI: 25,
  FJJDDB: 29,
  CJJFDI: 16,
  EJIABJ: 30,
  IIJHEJ: 33,
  FJJDIC: 26,
  FIEDIC: 28,
  GGBCEA: 35,
  DBDJID: 59,
  EDHDIB: 22,
  FGHHJE: 28,
  EIBBGI: 53,
  HBHJBB: 29,
  HGBFJH: 32,
  JCICDA: 17,
  DEJDHD: 39,
  JJDDIH: 30,
  DEHAJC: 17,
  DGABIE: 46,
  EEFJFF: 24,
  IGBDAH: 32,
  IJJFJA: 36,
  BGCJJD: 43,
  JCBDFG: 20,
  HJHBGG: 18,
  CBDHJA: 25,
  AAIAIC: 41,
  GJJIBD: 39,
  EFFAFA: 39,
  BFGDBC: 65,
  IAFAGD: 63,
  IFABDC: 25,
  BCJGIH: 20,
  IHCGED: 29,
  DJHBIG: 34,
  EAFBBE: 28,
  HIBJFA: 46,
  JIDECG: 24,
  HHIAIJ: 34,
  GFGEHA: 51,
  FABCGH: 17,
  EBGAGG: 33,
  BDGCDJ: 24,
  JDGGBB: 20,
  CAFHEG: 34,
  CDBJCI: 20,
  FACEED: 49,
  EGHABB: 33,
  GIACGF: 39,
  GFHBGD: 26,
  DDFFJH: 44,
  JHBAHG: 23,
  FDICDA: 39,
  BBACJC: 48,
  GDHJGA: 44,
  DEFHCC: 41,
  DCDCEH: 40,
  BJCHJE: 25,
  HHDJGE: 28,
  AFDFDF: 40,
  JFFDBC: 27,
  BDIHBJ: 25,
  FEIJGF: 34,
  ABBHGI: 35,
  JICFEB: 26,
  FFDBDA: 23,
  GEIHGF: 32,
  HFFHAG: 22,
  AGBDCB: 19,
  IHADDH: 22,
  GIFHIE: 37,
  GFDJFC: 37,
  FEACFC: 33,
  DIBHDD: 32,
  FBJAHJ: 29,
  BAFCDG: 25,
  JDFGAJ: 19,
  BBIACA: 27,
  BFHJIF: 22,
  HJFEDE: 36,
  EAEABE: 27,
  AJFJDB: 38,
  CBDDFG: 19,
  CDFBDH: 28,
  BCHBFJ: 39,
  JFAEAD: 35,
  FDGFHD: 32,
  HIGBID: 39,
  GBDHBH: 34,
  IABHEF: 44,
  BJJCBG: 43,
  CICCGG: 29,
  JFJIJH: 32,
  DCJGEF: 33,
  HHGBBI: 17,
  CBEEBE: 21,
  EEFBHJ: 33,
  IEGDGC: 32,
  ACDAIC: 37,
  ICCCCJ: 35,
  DIIFFI: 51,
  JAGACI: 27,
  EBIEAI: 51
};
exports.WordDimensions = WordDimensions;