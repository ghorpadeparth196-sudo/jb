function playSong(title, artist = "Justin Bieber") {
    const query = encodeURIComponent(title + " " + artist);
    window.open(
        "https://open.spotify.com/search/" + query,
        "_blank"
    );
}

function openAlbum(albumName) {
    const album = albums.find(a => a.name === albumName);
    if (!album) return;

    const albumDetails = document.getElementById("albumDetails");

    albumDetails.innerHTML = `
        <div class="album-detail-header">
            <button class="back-btn" onclick="closeAlbum()">← Back</button>
            <h2>${album.name}</h2>
            <p>${album.artist || "Justin Bieber"}</p>
        </div>
        <div class="album-song-list">
            ${album.songs.map((song, index) => {
                const title =
                    typeof song === "string"
                        ? song
                        : song.title;

                const artist =
                    typeof song === "string"
                        ? "Justin Bieber"
                        : (song.artist || "Justin Bieber");

                const time =
                    typeof song === "string"
                        ? ""
                        : (song.time || "");

                return `
                    <div class="album-song">
                        <span class="song-number">
                            ${String(index + 1).padStart(2, "0")}
                        </span>
                        <div class="song-info">
                            <strong>${title}</strong>
                            <span>${artist}</span>
                        </div>
                        <span class="song-time">
                            ${time}
                        </span>
                        <button
                            class="play-btn"
                            onclick="playSong('${escapeJS(title)}', '${escapeJS(artist)}')"
                            title="Open on Spotify"
                        >
                            ▶
                        </button>
                        <button
                            class="like-btn"
                            onclick="toggleLike('${escapeJS(title)}', '${escapeJS(artist)}', '${escapeJS(album.name)}', '${escapeJS(time)}')"
                            title="Like"
                        >
                            ♡
                        </button>
                    </div>
                `;
            }).join("")}
        </div>
    `;

    document.getElementById("albums").style.display = "none";
    albumDetails.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function closeAlbum() {
    document.getElementById("albumDetails").style.display = "none";
    document.getElementById("albums").style.display = "block";
}

function escapeJS(text) {
    return String(text || "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\\n")
        .replace(/\r/g, "\\\r");
}

function toggleLike(title, artist, album, time) {
    let likedSongs =
        JSON.parse(localStorage.getItem("likedJustinSongs")) || [];

    const index = likedSongs.findIndex(
        song =>
            song.title === title &&
            song.artist === artist
    );

    if (index !== -1) {
        likedSongs.splice(index, 1);
    } else {
        likedSongs.push({
            title: title,
            artist: artist,
            album: album,
            time: time
        });
    }

    localStorage.setItem(
        "likedJustinSongs",
        JSON.stringify(likedSongs)
    );

    renderLiked();
}

function renderLiked() {
    const likedList = document.getElementById("likedList");
    if (!likedList) return;

    const likedSongs =
        JSON.parse(localStorage.getItem("likedJustinSongs")) || [];

    if (likedSongs.length === 0) {
        likedList.innerHTML = `
            <div class="empty-liked">
                <h2>No liked songs yet</h2>
                <p>Click ♡ on any song to add it here.</p>
            </div>
        `;
        return;
    }

    likedList.innerHTML = likedSongs.map((song, index) => {
        return `
            <div class="liked-song-row">
                <span class="song-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>
                <div class="song-info">
                    <strong>${song.title}</strong>
                    <span>${song.artist}</span>
                </div>
                <span class="song-album">
                    ${song.album}
                </span>
                <span class="song-time">
                    ${song.time || ""}
                </span>
                <button
                    class="play-btn"
                    onclick="playSong('${escapeJS(song.title)}', '${escapeJS(song.artist)}')"
                >
                    ▶
                </button>
                <button
                    class="like-btn liked"
                    onclick="toggleLike('${escapeJS(song.title)}', '${escapeJS(song.artist)}', '${escapeJS(song.album)}', '${escapeJS(song.time)}')"
                >
                    ♥
                </button>
            </div>
        `;
    }).join("");
}

function showLikedPage() {
    document.getElementById("mainPage").classList.add("hidden");
    document.getElementById("likedPage").classList.remove("hidden");

    renderLiked();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function showMainPage() {
    document.getElementById("likedPage").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const albums = [
    {
        name: "My World 2.0",
        artist: "Justin Bieber",
        songs: [
            {
                title: "Baby",
                artist: "Justin Bieber",
                time: "3:40"
            },
            {
                title: "Somebody to Love",
                artist: "Justin Bieber",
                time: "3:40"
            },
            {
                title: "Stuck in the Moment",
                artist: "Justin Bieber",
                time: "3:42"
            },
            {
                title: "U Smile",
                artist: "Justin Bieber",
                time: "3:17"
            },
            {
                title: "Never Let You Go",
                artist: "Justin Bieber",
                time: "4:24"
            }
        ]
    },
    {
        name: "Believe",
        artist: "Justin Bieber",
        songs: [
            {
                title: "Boyfriend",
                artist: "Justin Bieber",
                time: "2:52"
            },
            {
                title: "As Long as You Love Me",
                artist: "Justin Bieber",
                time: "3:49"
            },
            {
                title: "Beauty and a Beat",
                artist: "Justin Bieber feat. Nicki Minaj",
                time: "3:48"
            },
            {
                title: "All Around the World",
                artist: "Justin Bieber feat. Ludacris",
                time: "4:03"
            },
            {
                title: "Die in Your Arms",
                artist: "Justin Bieber",
                time: "3:57"
            }
        ]
    },
    {
        name: "Journals",
        artist: "Justin Bieber",
        songs: [
            {
                title: "Heartbreaker",
                artist: "Justin Bieber",
                time: "4:28"
            },
            {
                title: "All That Matters",
                artist: "Justin Bieber",
                time: "3:11"
            },
            {
                title: "Hold Tight",
                artist: "Justin Bieber",
                time: "4:15"
            },
            {
                title: "Recovery",
                artist: "Justin Bieber",
                time: "3:01"
            },
            {
                title: "Confident",
                artist: "Justin Bieber feat. Chance the Rapper",
                time: "4:08"
            }
        ]
    },
    {
        name: "Purpose",
        artist: "Justin Bieber",
        songs: [
            {
                title: "Mark My Words",
                artist: "Justin Bieber",
                time: "2:14"
            },
            {
                title: "I'll Show You",
                artist: "Justin Bieber",
                time: "3:19"
            },
            {
                title: "What Do You Mean?",
                artist: "Justin Bieber",
                time: "3:25"
            },
            {
                title: "Sorry",
                artist: "Justin Bieber",
                time: "3:20"
            },
            {
                title: "Love Yourself",
                artist: "Justin Bieber",
                time: "3:53"
            },
            {
                title: "Company",
                artist: "Justin Bieber",
                time: "3:28"
            }
        ]
    },
    {
        name: "Changes",
        artist: "Justin Bieber",
        songs: [
            {
                title: "All Around Me",
                artist: "Justin Bieber",
                time: "2:16"
            },
            {
                title: "Habitual",
                artist: "Justin Bieber",
                time: "2:48"
            },
            {
                title: "Intentions",
                artist: "Justin Bieber feat. Quavo",
                time: "3:32"
            },
            {
                title: "Yummy",
                artist: "Justin Bieber",
                time: "3:30"
            },
            {
                title: "Changes",
                artist: "Justin Bieber",
                time: "2:15"
            }
        ]
    },
    {
        name: "Justice",
        artist: "Justin Bieber",
        songs: [
            {
                title: "2 Much",
                artist: "Justin Bieber",
                time: "2:32"
            },
            {
                title: "Deserve You",
                artist: "Justin Bieber",
                time: "3:07"
            },
            {
                title: "Hold On",
                artist: "Justin Bieber",
                time: "2:50"
            },
            {
                title: "Anyone",
                artist: "Justin Bieber",
                time: "3:10"
            },
            {
                title: "Peaches",
                artist: "Justin Bieber feat. Daniel Caesar & Giveon",
                time: "3:18"
            },
            {
                title: "Ghost",
                artist: "Justin Bieber",
                time: "2:33"
            }
        ]
    },
    {
        name: "Freedom.",
        artist: "Justin Bieber",
        songs: [
            {
                title: "Freedom",
                artist: "Justin Bieber",
                time: "2:58"
            },
            {
                title: "All She Wrote",
                artist: "Justin Bieber",
                time: "2:55"
            },
            {
                title: "We're In This Together",
                artist: "Justin Bieber",
                time: "3:15"
            }
        ]
    },
    {
        name: "SWAG",
        artist: "Justin Bieber",
        songs: [
            {
                title: "Daisies",
                artist: "Justin Bieber",
                time: "2:35"
            },
            {
                title: "Yukon",
                artist: "Justin Bieber",
                time: "2:36"
            },
            {
                title: "Go Baby",
                artist: "Justin Bieber",
                time: "2:52"
            }
        ]
    }
];

function renderAlbums() {
    const albumGrid = document.getElementById("albumGrid");
    if (!albumGrid) return;

    albumGrid.innerHTML = albums.map(album => {
        return `
            <div
                class="album-card"
                onclick="openAlbum('${escapeJS(album.name)}')"
            >
                <div class="album-cover">
                    <span>${album.name}</span>
                </div>
                <h3>${album.name}</h3>
                <p>${album.artist}</p>
            </div>
        `;
    }).join("");
}

document.addEventListener("DOMContentLoaded", function () {
    renderAlbums();
    renderLiked();
});
