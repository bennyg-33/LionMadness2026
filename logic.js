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
// Now using just the Wikipedia File names to fetch via the imageinfo API!
const contestantImages = {
    "Bernie Madoff": "File:Bernard_Madoff.jpg",
    "Ye": "File:Kanye_West_at_the_2009_Tribeca_Film_Festival-2_(cropped).jpg",
    "Diddy": "File:Sean_Combs_2010.jpg",
    "Bibi": "File:Benjamin_Netanyahu_2020.jpg",
    "Jordan Belfort": "File:Jordan_Belfort_2014.jpg",
    "Bill Cosby": "File:Bill_Cosby_2010.jpg",
    "Joseph Stalin": "File:Joseph_Stalin_1945.jpg",
    "Saddam Hussein": "File:Saddam_Hussein_1979.jpg",
    "Osama Bin Laden": "File:Osama_bin_Laden_portrait.jpg",
    "R Kelly": "File:R._Kelly_in_2009.jpg",
    "Malcom X": "File:Malcolm_X_NYWTS_2a.jpg",
    "Jeffrey Epstein": "File:Jeffrey_Epstein.jpg",
    "OJ Simpson": "File:O.J._Simpson_1990.jpg",
    "Henry Ford": "File:Henry_Ford_1919.jpg",
    "Ted Kaszyncki": "File:Ted_Kaczynski.jpg",
    "Jon Jones": "File:Jon_Jones_2015.jpg",
    "John D Rockefeller": "File:John_D._Rockefeller_1885.jpg",
    "Alex Jones": "File:Alex_Jones_2018.jpg",
    "Joseph Smith": "File:Joseph_Smith_Painting.jpg",
    "Deshaun Watson": "File:Deshaun_Watson_2019.jpg",
    "Genghis Khan": "File:Genghis_Khan_painting.jpg",
    "John Daly": "File:John_Daly_2008.jpg",
    "Ted Bundy": "File:Theodore_Robert_Bundy.jpg",
    "Harvey Weinstein": "File:Harvey_Weinstein_2011_Shankbone.jpg",
    "Ronald Reagan": "File:Reagan_official_portrait.jpg",
    "L Ron Hubbard": "File:L._Ron_Hubbard_1950.jpg",
    "Dale Earnhardt": "File:Dale_Earnhardt_1998.jpg",
    "Henry VIII": "File:Hans_Holbein_the_Younger_-_Portrait_of_Henry_VIII.jpg",
    "Pablo Escobar": "File:Pablo_Escobar_Mugshot.jpg",
    "Tom Cruise": "File:Tom_Cruise_by_Gage_Skidmore_2.jpg",
    "El Chapo": "File:Joaquin_Guzman_Loera.jpg",
    "Mel Gibson": "File:Mel_Gibson_Cannes_2016.jpg",
    "George Washington": "File:Gilbert_Stuart_Washington.jpg",
    "Ghislane Maxwell": "File:Ghislaine_Maxwell.jpg",
    "Karl Malone": "File:Karl_Malone_1992.jpg",
    "King Leopold": "File:Leopold_II_of_Belgium.jpg",
    "Peter Thiel": "File:Peter_Thiel_by_Gage_Skidmore.jpg",
    "Magic Johnson": "File:Magic_Johnson_2012.jpg",
    "Dick Cheney": "File:Richard_Cheney_official_photo.jpg",
    "Ozzy Osborne": "File:Ozzy_Osbourne_2010.jpg",
    "Robert E Lee": "File:Robert_Edward_Lee.jpg",
    "Charles Manson": "File:Charles_Manson_1969.jpg",
    "50 Cent": "File:50_Cent_2018.jpg",
    "Andrew Jackson": "File:Andrew_Jackson_painter_unknown.jpg",
    "Luigi Mangione": "File:Luigi_Mangione.jpg",
    "Burger King Guy": "File:The_Burger_King.jpg",
    "The Rock.Ai": "File:Dwayne_Johnson_2,_2013.jpg"
};

// Global cache for the active URLs provided by the API
const resolvedImages = {};

// Background API Fetcher
function fetchWikipediaImages() {
    // Wikipedia API allows fetching up to 50 titles per query. We have 47, which is perfect!
    const titles = Object.values(contestantImages).join('|');
    // Removed thumbnail sizing - fetching the original full-sized URLs
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url&format=json&origin=*`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(!data || !data.query || !data.query.pages) return;
            
            const pages = data.query.pages;
            
            // Map the API URLs back to the competitor names
            Object.values(pages).forEach(page => {
                if (page.imageinfo && page.imageinfo.length > 0) {
                    // Grab the original full resolution URL instead of the thumbnail
                    const fullUrl = page.imageinfo[0].url; 
                    const title = page.title; // e.g. "File:Bernard Madoff.jpg"
                    
                    Object.keys(contestantImages).forEach(name => {
                        // Match titles while ignoring spaces vs underscores
                        if (contestantImages[name].replace(/_/g, ' ') === title.replace(/_/g, ' ')) {
                            resolvedImages[name] = fullUrl;
                        }
                    });
                }
            });

            // The API has finished! Immediately update any images on the screen.
            for(let i=0; i<67; i++) {
                ['t1', 't2'].forEach(team => {
                    let nameSpan = document.getElementById(`m${i}-${team}-name`);
                    let imgEl = document.getElementById(`m${i}-${team}-img`);
                    if(nameSpan && imgEl && nameSpan.innerText && nameSpan.innerText !== "TBD") {
                        imgEl.src = getImageUrl(nameSpan.innerText);
                    }
                });
            }
            
            // Also update the active matchup view
            let activeT1Name = document.getElementById('name-active-t1');
            let activeT1Img = document.getElementById('img-active-t1');
            if(activeT1Name && activeT1Img && activeT1Name.innerText !== "TBD") {
                 activeT1Img.src = getImageUrl(activeT1Name.innerText);
            }
            let activeT2Name = document.getElementById('name-active-t2');
            let activeT2Img = document.getElementById('img-active-t2');
            if(activeT2Name && activeT2Img && activeT2Name.innerText !== "TBD") {
                 activeT2Img.src = getImageUrl(activeT2Name.innerText);
            }
        })
        .catch(err => console.error("Wikipedia API Error:", err));
}

// Kick off the API fetch immediately on load
fetchWikipediaImages();

// Dynamic Image Resolver
function getImageUrl(name) {
    if (!name) return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    
    let cleanName = name.trim();
    
    // 1. If the Wikipedia API has provided the live URL, use it immediately!
    if (resolvedImages[cleanName]) return resolvedImages[cleanName];
    
    // 2. Hide waiting/TBD images
    if (cleanName.includes("Waiting") || cleanName.includes("TBD")) {
         return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }
    
    // 3. Temporary fallback (SVGs) while the API finishes fetching, 
    // or permanent fallback for internal names (like "Mike L")
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