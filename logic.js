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

// --- CUSTOM IMAGE DICTIONARY ---
// Paste direct image URLs (like Imgur links) inside the quotes for your custom competitors!
// Make sure the link ends in .jpg, .png, etc.
const customImages = {
    "Choo-Beng": "https://en.wikipedia.org/wiki/File:Herpestes_ichneumon_Египетский_мангуст,_или_фараонова_крыса,_или_ихневмо́н.jpg",
    "Laura C": "https://en.wikipedia.org/wiki/File:White_witch_in_battle_for_naria.jpg",
    "Mommy I": "",
    "Bart S": "",
    "Anna S": "",
    "Gene S": "",
    "Mike L": "",
    "AB": "",
    "Gary Plauche": "", // Note: If he has a Wiki page, you can move him to the dictionary below!
    "Stephanie C": "",
    "Nicole L": "",
    "The Painter?": "https://en.wikipedia.org/wiki/File:Adolf_Hitler_-_06.jpg",
    "Chuck M": "",
    "Rusty M": "",
    "Gopal": "",
    "Bubba": "",
    "Joe U": "",
    "Jason W": "",
    "McKenzie Maher": "",
    "Erica Kirk": "",
    "JC Yang": ""
};

// --- WIKIPEDIA ARTICLE DICTIONARY ---
// Instead of fragile image file names, we just provide the Wikipedia Article Title!
// The API will dynamically fetch the official "profile picture" of that article.
const wikiArticles = {
    "Bernie Madoff": "Bernie Madoff",
    "Ye": "Kanye West",
    "Diddy": "Sean Combs",
    "Bibi": "Benjamin Netanyahu",
    "Jordan Belfort": "Jordan Belfort",
    "Bill Cosby": "Bill Cosby",
    "Joseph Stalin": "Joseph Stalin",
    "Saddam Hussein": "Saddam Hussein",
    "Osama Bin Laden": "Osama bin Laden",
    "R Kelly": "R. Kelly",
    "Malcom X": "Malcolm X",
    "Jeffrey Epstein": "Jeffrey Epstein",
    "OJ Simpson": "O. J. Simpson",
    "Henry Ford": "Henry Ford",
    "Ted Kaszyncki": "Ted Kaczynski",
    "Jon Jones": "Jon Jones",
    "John D Rockefeller": "John D. Rockefeller",
    "Alex Jones": "Alex Jones",
    "Joseph Smith": "Joseph Smith",
    "Deshaun Watson": "Deshaun Watson",
    "Genghis Khan": "Genghis Khan",
    "John Daly": "John Daly (golfer)",
    "Ted Bundy": "Ted Bundy",
    "Harvey Weinstein": "Harvey Weinstein",
    "Ronald Reagan": "Ronald Reagan",
    "L Ron Hubbard": "L. Ron Hubbard",
    "Dale Earnhardt": "Dale Earnhardt",
    "Henry VIII": "Henry VIII",
    "Pablo Escobar": "Pablo Escobar",
    "Tom Cruise": "Tom Cruise",
    "El Chapo": "Joaquín Guzmán",
    "Mel Gibson": "Mel Gibson",
    "George Washington": "George Washington",
    "Ghislane Maxwell": "Ghislaine Maxwell",
    "Karl Malone": "Karl Malone",
    "King Leopold": "Leopold II of Belgium",
    "Peter Thiel": "Peter Thiel",
    "Magic Johnson": "Magic Johnson",
    "Dick Cheney": "Dick Cheney",
    "Ozzy Osborne": "Ozzy Osbourne",
    "Robert E Lee": "Robert E. Lee",
    "Charles Manson": "Charles Manson",
    "50 Cent": "50 Cent",
    "Andrew Jackson": "Andrew Jackson",
    "Luigi Mangione": "Luigi Mangione",
    "Burger King Guy": "The Burger King",
    "The Rock.Ai": "Dwayne Johnson"
};

// Global cache for the active URLs provided by the API
const resolvedImages = {};

function fetchWikipediaImages() {
    // Wikipedia API allows fetching up to 50 titles per query. 
    const titles = Object.values(wikiArticles).join('|');
    
    // We use prop=pageimages and piprop=original to safely get the full-sized main image!
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=pageimages&piprop=original&format=json&origin=*`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(!data || !data.query || !data.query.pages) return;
            
            const pages = data.query.pages;
            
            // Map the API URLs back to the competitor names
            Object.values(pages).forEach(page => {
                if (page.original && page.original.source) {
                    const fullUrl = page.original.source; 
                    const articleTitle = page.title; 
                    
                    Object.keys(wikiArticles).forEach(name => {
                        // Match the article title to assign the image URL
                        if (wikiArticles[name].toLowerCase() === articleTitle.toLowerCase()) {
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
            
            // Also update the active matchup view if it's currently open
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
    
    // 1. Check if you provided a custom URL!
    if (customImages[cleanName] && customImages[cleanName] !== "") {
        return customImages[cleanName];
    }

    // 2. If the Wikipedia API has provided the live URL, use it immediately!
    if (resolvedImages[cleanName]) return resolvedImages[cleanName];
    
    // 3. Hide waiting/TBD images
    if (cleanName.includes("Waiting") || cleanName.includes("TBD")) {
         return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }
    
    // 4. Golden SVG Fallback (Used while loading, or for internal names like "Laura C")
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