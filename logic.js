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
// Add direct image URLs here (e.g., from Imgur, Wikipedia, etc.) 
// Make sure the name exactly matches the name in your CSV.
const contestantImages = {
    "Bernie Madoff": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bernard_Madoff.jpg/640px-Bernard_Madoff.jpg",
    "Ye": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Kanye_West_at_the_2009_Tribeca_Film_Festival-2_%28cropped%29.jpg/640px-Kanye_West_at_the_2009_Tribeca_Film_Festival-2_%28cropped%29.jpg",
    // "Diddy": "https://link-to-diddy-image.jpg",
    // Add as many as you want here!
};

// Fallback image generator if no custom URL is provided
function getImageUrl(name) {
    if (contestantImages[name]) return contestantImages[name];
    if (name.includes("Waiting")) return "https://ui-avatars.com/api/?name=?&background=111&color=fff";
    // Generates a funny, unique robotic/monster avatar based on their name
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}&backgroundColor=D4AF37`;
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
];

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

  // Initial Seedings
  for(let i=0; i<4; i++) {
      matches[i].t1 = randomized[i*2];
      matches[i].t2 = randomized[i*2 + 1];
      matches[i].nextMatch = [4, 12, 20, 28][i];
      matches[i].nextSlot = 't2';
  }

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
    phase: "BRACKET", // Phases: BRACKET, VOTING, REVEAL
    currentMatchId: 0,
    matches: matches,
    votes: null
  });
  alert("ALPHA BRACKET GENERATED AND SYNCED.");
}