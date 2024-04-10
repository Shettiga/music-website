const firebaseConfig = {
    apiKey: "AIzaSyCRDHxxkCXyNZ9BdJhDlZKpOkLu2FZHmh8",
    authDomain: "auth-form-2eb89.firebaseapp.com",
    databaseURL: "https://auth-form-2eb89-default-rtdb.firebaseio.com",
    projectId: "auth-form-2eb89",
    storageBucket: "auth-form-2eb89.appspot.com",
    messagingSenderId: "532774111499",
    appId: "1:532774111499:web:de3f1759a2fbf70c27ba0e"
  };
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const db = firebaseApp.database();

let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


// Initialize Firebase



const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Event listener for play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Display songs from Firebase
let songs = [];  // Define an array to store song data


function playSongByIndex(index) {
    makeAllPlays();
    songIndex = index;
    console.log('Song index:', songIndex); // Log the song index
    initializeAudioElement(songIndex);

    const bottomPlayer = document.getElementById('bottomPlayer');
    bottomPlayer.querySelector('img').src = songs[songIndex].imageUrl;
    bottomPlayer.querySelector('span').innerText = songs[songIndex].title;
}

function displaySongs() {
    const songsRef = db.ref('music');

    songsRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const songData = childSnapshot.val();
            songs.push(songData);

            const songItem = document.createElement('div');
            songItem.classList.add('songItem');
            songItem.innerHTML = `
                <img src="${songData.imageUrl}" alt="${songData.title}">
                <span class="songName">${songData.title}</span>
                <span class="songlistplay">
                    <span class="timestamp">${songData.category} <i id="${childSnapshot.key}" class="far songItemPlay fa-play-circle"></i></span>
                </span>
            `;

            songItem.addEventListener('click', () => {
                playSongByIndex(parseInt(childSnapshot.key));
            });

            const playButton = songItem.querySelector('.songItemPlay');
            playButton.addEventListener('click', () => {
                playSongByIndex(parseInt(childSnapshot.key));
            });

            songItems.push(songItem);
            document.getElementById('songItemContainer').appendChild(songItem);
        });
    });
}




// Call the function to display songs when the page loads
displaySongs();

// Function to initialize the audio element with the first song
function initializeAudioElement(songIndex) {
    console.log('Initializing audio for index:', songIndex);
    // Check if the songs array contains the desired index
    if (songIndex >= 0 && songIndex < songs.length) {
        const song = songs[songIndex];
        if (song && song.musicUrl) {
            audioElement.src = song.musicUrl;
            // Rest of your initialization code...
        } else {
            console.error('Missing musicUrl for index:', songIndex);
        }
    } else {
        console.error('Invalid song index:', songIndex);
    }


    audioElement.src = songs[songIndex].musicUrl;
    masterSongName.innerText = songs[songIndex].title;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // Set details in the "bottom" div
    const bottomSongInfo = document.querySelector('.bottom .songInfo');
    bottomSongInfo.querySelector('img').src = songs[songIndex].imageUrl;
    bottomSongInfo.querySelector('span').innerText = songs[songIndex].title;
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        audioElement.addEventListener('error', function(e) {
            console.error('Error occurred while loading the audio:', e);
        });
        
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

function changeImg(){
    const carou = document.querySelector(".bottom");
    if (carou) {
        const firstImg = carou.firstElementChild;
        if (firstImg) {
            carou.removeChild(firstImg);
            carou.appendChild(firstImg);
        } else {
            console.error("No first child element found in '.wrapper'");
        }
    } else {
        console.error("Element with class '.wrapper' not found");
    }
}

setInterval(changeImg, 2000);

