// Paste your Firebase Config here:
const firebaseConfig = {
  apiKey: "AIzaSyCh0MTTeMAqRTPcEQcxO1PGWSsJZ_MO-7A",
  authDomain: "lion-madness-2026.firebaseapp.com",
  databaseURL: "https://lion-madness-2026-default-rtdb.firebaseio.com",
  projectId: "lion-madness-2026",
  storageBucket: "lion-madness-2026.firebasestorage.app",
  messagingSenderId: "450899428164",
  appId: "1:450899428164:web:c00fa6c94e764cf85ccd11",
  measurementId: "G-8R2NYZ40MD"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// --- IMAGE DICTIONARY ---
const contestantImages = {
    "Bernie Madoff": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bernard_Madoff.jpg/640px-Bernard_Madoff.jpg",
    "Ye": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Kanye_West_at_the_2009_Tribeca_Film_Festival-2_%28cropped%29.jpg/640px-Kanye_West_at_the_2009_Tribeca_Film_Festival-2_%28cropped%29.jpg",
    "Diddy": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Sean_Combs_2010.jpg/640px-Sean_Combs_2010.jpg",
    "Bibi": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Benjamin_Netanyahu_2020.jpg/640px-Benjamin_Netanyahu_2020.jpg",
    "Jordan Belfort": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Jordan_Belfort_2014.jpg/640px-Jordan_Belfort_2014.jpg",
    "Bill Cosby": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Bill_Cosby_2010.jpg/640px-Bill_Cosby_2010.jpg",
    "Joseph Stalin": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Stalin_lg_zps033fac24.jpg/640px-Stalin_lg_zps033fac24.jpg",
    "Saddam Hussein": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Saddam_Hussein_1979.jpg/640px-Saddam_Hussein_1979.jpg",
    "Osama Bin Laden": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Osama_bin_Laden_portrait.jpg/640px-Osama_bin_Laden_portrait.jpg",
    "R Kelly": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/R._Kelly_in_2009.jpg/640px-R._Kelly_in_2009.jpg",
    "Malcom X": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Malcolm_X_NYWTS_2a.jpg/640px-Malcolm_X_NYWTS_2a.jpg",
    "Jeffrey Epstein": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Jeffrey_Epstein.jpg/640px-Jeffrey_Epstein.jpg",
    "OJ Simpson": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/O.J._Simpson_1990.jpg/640px-O.J._Simpson_1990.jpg",
    "Henry Ford": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Henry_Ford_1919.jpg/640px-Henry_Ford_1919.jpg",
    "Ted Kaszyncki": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Ted_Kaczynski.jpg/640px-Ted_Kaczynski.jpg",
    "Jon Jones": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Jon_Jones_2015.jpg/640px-Jon_Jones_2015.jpg",
    "John D Rockefeller": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/John_D._Rockefeller_1885.jpg/640px-John_D._Rockefeller_1885.jpg",
    "Alex Jones": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Alex_Jones_2018.jpg/640px-Alex_Jones_2018.jpg",
    "Joseph Smith": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Joseph_Smith_Painting.jpg/640px-Joseph_Smith_Painting.jpg",
    "Deshaun Watson": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Deshaun_Watson_2019.jpg/640px-Deshaun_Watson_2019.jpg",
    "Genghis Khan": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/YuanEmperorAlbumGenghisPortrait.jpg/640px-YuanEmperorAlbumGenghisPortrait.jpg",
    "John Daly": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/John_Daly_2008.jpg/640px-John_Daly_2008.jpg",
    "Ted Bundy": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Theodore_Robert_Bundy.jpg/640px-Theodore_Robert_Bundy.jpg",
    "Harvey Weinstein": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Harvey_Weinstein_2011_Shankbone.jpg/640px-Harvey_Weinstein_2011_Shankbone.jpg",
    "Ronald Reagan": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Official_Portrait_of_President_Reagan_1981.jpg/640px-Official_Portrait_of_President_Reagan_1981.jpg",
    "L Ron Hubbard": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/L_Ron_Hubbard_1950.jpg/640px-L_Ron_Hubbard_1950.jpg",
    "Dale Earnhardt": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Dale_Earnhardt.jpg/640px-Dale_Earnhardt.jpg",
    "Henry VIII": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg/640px-Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII_-_Google_Art_Project.jpg",
    "Pablo Escobar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Pablo_Escobar_Mug.jpg/640px-Pablo_Escobar_Mug.jpg",
    "Tom Cruise": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg/640px-Tom_Cruise_by_Gage_Skidmore_2.jpg",
    "El Chapo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Joaqu%C3%ADn_Guzm%C3%A1n_Loera_2016.jpg/640px-Joaqu%C3%ADn_Guzm%C3%A1n_Loera_2016.jpg",
    "Mel Gibson": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mel_Gibson_Cannes_2016_2.jpg/640px-Mel_Gibson_Cannes_2016_2.jpg",
    "George Washington": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/640px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
    "Ghislane Maxwell": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Ghislaine_Maxwell.jpg/640px-Ghislaine_Maxwell.jpg",
    "Karl Malone": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Karl_Malone_1992.jpg/640px-Karl_Malone_1992.jpg",
    "King Leopold": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Leopold_II_of_Belgium.jpg/640px-Leopold_II_of_Belgium.jpg",
    "Peter Thiel": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Peter_Thiel_by_Gage_Skidmore.jpg/640px-Peter_Thiel_by_Gage_Skidmore.jpg",
    "Magic Johnson": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Magic_Johnson_2012.jpg/640px-Magic_Johnson_2012.jpg",
    "Dick Cheney": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Richard_Cheney_official_photo.jpg/640px-Richard_Cheney_official_photo.jpg",
    "Ozzy Osborne": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Ozzy_Osbourne_2010.jpg/640px-Ozzy_Osbourne_2010.jpg",
    "Robert E Lee": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Robert_Edward_Lee.jpg/640px-Robert_Edward_Lee.jpg",
    "Charles Manson": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Charles_Manson_1969.jpg/640px-Charles_Manson_1969.jpg",
    "50 Cent": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/50_Cent_2018.jpg/640px-50_Cent_2018.jpg",
    "Andrew Jackson": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Andrew_Jackson_painter_unknown.jpg/640px-Andrew_Jackson_painter_unknown.jpg",
    "Luigi Mangione": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Luigi_Mangione.jpg/640px-Luigi_Mangione.jpg",
    "Burger King Guy": "https://upload.wikimedia.org/wikipedia/en/thumb/4/49/The_Burger_King.jpg/220px-The_Burger_King.jpg",
    "The Rock.Ai": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Dwayne_Johnson_2%2C_2013.jpg/640px-Dwayne_Johnson_2%2C_2013.jpg"
};

// 100% unbreakable local SVG fallback generator
function getImageUrl(name) {
    if (!name) return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    
    let cleanName = name.trim();
    if (contestantImages[cleanName]) return contestantImages[cleanName];
    if (cleanName.includes("Waiting") || cleanName.includes("TBD")) {
         return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }
    
    // Generates a beautiful customized avatar directly in the browser - no external links!
    let initial = cleanName.charAt(0).toUpperCase();
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <rect width="100" height="100" fill="#111111" stroke="#D4AF37" stroke-width="2"/>
        <text x="50" y="50" dominant-baseline="central" text-anchor="middle" font-family="Arial, sans-serif" font-size="50" font-weight="bold" fill="#D4AF37">${initial}</text>
    </svg>`;
    
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const rawCompetitors = [
  "Bernie Madoff", "Choo-Beng", "Diddy", "Bibi", "Jordan Belfort", "Laura C", "Bill Cosby", "Joseph Stalin", 
  "Luigi Mangione", "Mommy I", "Ye", "Saddam Hussein", "Osama Bin Laden", "Bart S", "R Kelly", "Malcom X", 
  "Jeffrey Epstein", "Anna S", "OJ Simpson", "Henry Ford", "Ted Kaszyncki", "Gene S", "Jon Jones", "John D Rockefeller", 
  "Alex Jones", "Mike L", "AB", "Joseph Smith", "Gary Plauche", "Stephanie C", "Deshaun Watson", "Genghis Khan", 
  "Burger King Guy", "Nicole L", "John Daly", "The Painter?", "Ted Bundy", "Chuck M", "Harvey Weinstein", "Ronald Reagan", 
  "L Ron Hubbard", "Rusty M", "Dale Earnhardt", "Henry VIII", "Pablo Escobar", "Gopal", "Tom Cruise", "Bubba", 
  "El Chapo", "Joe U", "Mel Gibson", "George Washington", "Ghislane Maxwell", "Jason W", "Karl Malone", "King Leopold", 
  "Peter Thiel", "McKenzie Maher", "Magic Johnson", "Dick Cheney", "Erica Kirk", "JC Yang", "Ozzy Osborne", "Robert E Lee", 
  "Charles Manson", "The Rock.Ai", "50 Cent", "Andrew Jackson"
].map(name => name.trim());

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initializeTournament() {
  const randomized = shuffle([...rawCompetitors]);
  let matches = [];
  
  for(let i=0; i<67; i++) {
      matches.push({ id: i, t1: "TBD", t2: "TBD", winner: null });
  }

  // Route winners through the bracket
  for(let i=0; i<32; i++) { matches[i+4].nextMatch = 36 + Math.floor(i/2); matches[i+4].nextSlot = (i%2 === 0) ? 't1' : 't2'; }
  for(let i=0; i<16; i++) { matches[i+36].nextMatch = 52 + Math.floor(i/2); matches[i+36].nextSlot = (i%2 === 0) ? 't1' : 't2'; }
  for(let i=0; i<8; i++) { matches[i+52].nextMatch = 60 + Math.floor(i/2); matches[i+52].nextSlot = (i%2 === 0) ? 't1' : 't2'; }
  for(let i=0; i<4; i++) { matches[i+60].nextMatch = 64 + Math.floor(i/2); matches[i+60].nextSlot = (i%2 === 0) ? 't1' : 't2'; }
  for(let i=0; i<2; i++) { matches[i+64].nextMatch = 66; matches[i+64].nextSlot = (i%2 === 0) ? 't1' : 't2'; }

  // Initial Seedings for First Four
  for(let i=0; i<4; i++) {
      matches[i].t1 = randomized[i*2];
      matches[i].t2 = randomized[i*2 + 1];
      matches[i].nextMatch = [4, 12, 20, 28][i];
      matches[i].nextSlot = 't2';
  }

  // Seed Main Bracket
  let remainingTeams = randomized.slice(8);
  let teamIdx = 0;
  for(let i=4; i<36; i++) {
      if ([4, 12, 20, 28].includes(i)) {
          matches[i].t1 = remainingTeams[teamIdx++];
          matches[i].t2 = "Waiting on First Four..."; 
      } else {
          matches[i].t1 = remainingTeams[teamIdx++];
          matches[i].t2 = remainingTeams[teamIdx++];
      }
  }

  db.ref('tournament').set({
    phase: "BRACKET", 
    currentMatchId: 0,
    matches: matches,
    votes: null
  }).then(() => {
    alert("ALPHA BRACKET GENERATED AND SYNCED.");
  }).catch((error) => {
    console.error("Error generating bracket: ", error);
  });
}