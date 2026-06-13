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
    "Choo-Beng": "https://upload.wikimedia.org/wikipedia/commons/c/c6/Herpestes_ichneumon_%D0%95%D0%B3%D0%B8%D0%BF%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B9_%D0%BC%D0%B0%D0%BD%D0%B3%D1%83%D1%81%D1%82%2C_%D0%B8%D0%BB%D0%B8_%D1%84%D0%B0%D1%80%D0%B0%D0%BE%D0%BD%D0%BE%D0%B2%D0%B0_%D0%BA%D1%80%D1%8B%D1%81%D0%B0%2C_%D0%B8%D0%BB%D0%B8_%D0%B8%D1%85%D0%BD%D0%B5%D0%B2%D0%BC%D0%BE%CC%81%D0%BD.jpg",
    "Laura C": "https://upload.wikimedia.org/wikipedia/en/d/dc/White_witch_in_battle_for_naria.jpg",
    "Mommy I": "https://upload.wikimedia.org/wikipedia/commons/3/38/Asymmetrical_bob_%2851210139996%29.jpg",
    "Bart S": "https://upload.wikimedia.org/wikipedia/commons/c/cd/James_Clerk_Maxwell_Statue_Equations.jpg",
    "Anna S": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Kate_Gosselin.jpg",
    "Gene S": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Henry_Winkler_Fonzie_1977.JPG",
    "Mike L": "https://upload.wikimedia.org/wikipedia/commons/5/59/Evb-my_hog.jpg",
    "AB": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Henry_Cejudo_%26_Antonio_Brown_%2854235293159%29.jpg",
    "Gary Plauche": "https://upload.wikimedia.org/wikipedia/en/3/30/Gary_Plauche_shoots_Jeffery_Doucet.jpeg", // Note: If he has a Wiki page, you can move him to the dictionary below!
    "Stephanie C": "https://upload.wikimedia.org/wikipedia/en/5/53/Jabba_the_Hutt_in_Return_of_the_Jedi_%281983%29.png",
    "Nicole L": "https://media.licdn.com/dms/image/v2/D5603AQGQ9UERTnfP1w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1678227230913?e=1782950400&v=beta&t=bNelaXWuZuMwxYsysnLJSOEmwagN2K44TbyB6emM2ec",
    "The Painter?": "https://upload.wikimedia.org/wikipedia/commons/6/69/Adolf_Hitler_-_06.jpg",
    "Chuck M": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Zahn_McClarnon_by_Gage_Skidmore.jpg",
    "Rusty M": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Agriculture_in_Britain-_Life_on_George_Casely%27s_Farm%2C_Devon%2C_England%2C_1942_D9817.jpg",
    "Gopal": "https://media.licdn.com/dms/image/v2/C5103AQE55H9UREcddQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516266785068?e=1782950400&v=beta&t=4Ucd4OelWfaGKsC_QoHCH_ntK3g5Y5CC4ChL3bDKAJU",
    "Bubba": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Bill_Clinton_saxophone_8a9e10f958efc78651fa4c9fb6228e2e_%28cropped%29.jpg",
    "Joe U": "https://upload.wikimedia.org/wikipedia/commons/d/df/Julian_Richings_by_Gage_Skidmore.jpg",
    "Jason W": "https://upload.wikimedia.org/wikipedia/en/5/53/Abraham-Whistler-Kris-Kristofferson-2004.jpg",
    "McKenzie Maher": "https://upload.wikimedia.org/wikipedia/commons/7/76/Logo_of_Rohde_%26_Schwarz_%282009%29.svg",
    "Erica Kirk": "https://unherd.com/wp-content/uploads/2026/03/Screenshot-2026-03-27-at-19.04.36.jpeg",
    "JC Yang": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Social_Network_Analysis_Visualization.png",
    "Burger King Guy": "https://i.pinimg.com/736x/49/02/64/49026489e6730781e1c007385c25b5bc.jpg",
    "Luigi Mangione": "https://pbs.twimg.com/media/GeZ9WsLbMAAwjAT.jpg"
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
    "El Chapo": "El Chapo",
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
  for(let i=0; i<67; i++) matches.push({ id: i, t1: "TBD", t2: "TBD", winner: null });

  for(let i=0; i<32; i++) { matches[i+4].nextMatch = 36 + Math.floor(i/2); matches[i+4].nextSlot = (i%2 === 0) ? 't1' : 't2'; }
  for(let i=0; i<16; i++) { matches[i+36].nextMatch = 52 + Math.floor(i/2); matches[i+36].nextSlot = (i%2 === 0) ? 't1' : 't2'; }
  for(let i=0; i<8; i++) { matches[i+52].nextMatch = 60 + Math.floor(i/2); matches[i+52].nextSlot = (i%2 === 0) ? 't1' : 't2'; }
  for(let i=0; i<4; i++) { matches[i+60].nextMatch = 64 + Math.floor(i/2); matches[i+60].nextSlot = (i%2 === 0) ? 't1' : 't2'; }
  for(let i=0; i<2; i++) { matches[i+64].nextMatch = 66; matches[i+64].nextSlot = (i%2 === 0) ? 't1' : 't2'; }

  for(let i=0; i<4; i++) { matches[i].t1 = randomized[i*2]; matches[i].t2 = randomized[i*2 + 1]; matches[i].nextMatch = [4, 12, 20, 28][i]; matches[i].nextSlot = 't2'; }

  let teamIdx = 0; let rem = randomized.slice(8);
  for(let i=4; i<36; i++) {
      if ([4, 12, 20, 28].includes(i)) { matches[i].t1 = rem[teamIdx++]; matches[i].t2 = "Waiting on First Four..."; } 
      else { matches[i].t1 = rem[teamIdx++]; matches[i].t2 = rem[teamIdx++]; }
  }

  db.ref('tournament').set({
    phase: "REGISTRATION", 
    currentMatchId: 0,
    matches: matches,
    votes: null,
    users: null
  });
}