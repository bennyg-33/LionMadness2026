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

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

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
  
  const firstFour = randomized.slice(0, 8);
  const mainTeams = randomized.slice(8); 

  // Build the 64 team bracket, injecting First Four placeholders at the 16-seed spots
  let bracket64 = [];
  let mainIdx = 0;
  for(let i = 0; i < 64; i++) {
     if(i === 15 || i === 31 || i === 47 || i === 63) {
         bracket64.push(`[Winner of FF ${(i+1)/16}]`);
     } else {
         bracket64.push(mainTeams[mainIdx++]);
     }
  }

  db.ref('tournament').set({
    status: "FIRST_FOUR", 
    view: "BRACKET", // Starts on the bracket view
    firstFour: firstFour,
    mainBracket: bracket64,
    currentMatchIndex: 0,
    winners: []
  });
  alert("ALPHA TOURNAMENT INITIALIZED! GRINDSET ACTIVE.");
}