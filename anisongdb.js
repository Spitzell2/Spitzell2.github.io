function anisongdbDataSearch(seasonItem, ano) {
    let mode = "season";
    let query = seasonItem + " " + ano;
    let ops = state.settings.op;
    let eds = state.settings.ed;
    let ins = state.settings.in;
    let rebroadcast = state.settings.rebroadcast;

    let difficultyMin = parseInt(state.settings.difficultyMin || 0);
    let difficultyMax = parseInt(state.settings.difficultyMax || 100);

    if (query) {
        return getData(seasonItem, ano, ops, eds, ins, rebroadcast, difficultyMin, difficultyMax);
    }

    return Promise.resolve();
}

// fetch JSON desde GitHub
function getData(seasonItem, ano, ops, eds, ins, rebroadcast, difficultyMin, difficultyMax) {
    const fileName = `${ano}${capitalizeFirstLetter(seasonItem)}`;
    const url = `https://raw.githubusercontent.com/Spitzell2/Spitzell2.github.io/main/Listas/${fileName}.json`;

    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`No se pudo obtener el archivo JSON desde GitHub: ${res.status}`);
            }
            return res.json();
        })
        .then((json) => {
            handleData(json);
            songList = songList.filter((song) =>
                songTypeFilter(song, ops, eds, ins, rebroadcast) &&
                difficultyFilter(song, difficultyMin, difficultyMax)
            );
            state.lista2 = state.lista2.concat(songList);
        })
        .catch((err) => {
            console.error('Error al cargar JSON de GitHub:', err);
            songList = [];
        });
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function handleData(data) {
    songList = [];
    if (!data) return;
    if (Array.isArray(data) && data.length && data[0].animeJPName) {
        data = data.filter((song) => song.audio || song.MQ || song.HQ);
        for (let song of data) {
            songList.push({
                animeRomajiName: song.animeJPName,
                animeEnglishName: song.animeENName,
                altAnimeNames: [].concat(song.animeJPName, song.animeENName, song.animeAltName || []),
                altAnimeNamesAnswers: [],
                songArtist: song.songArtist,
                songName: song.songName,
                songType: Object({ O: 1, E: 2, I: 3 })[song.songType[0]],
                songTypeNumber: song.songType[0] === "I" ? '' : parseInt(song.songType.split(" ")[1]),
                songDifficulty: song.songDifficulty,
                animeType: song.animeType,
                animeVintage: song.animeVintage,
                malId: song.linked_ids?.myanimelist,
                aniListId: song.linked_ids?.anilist,
                rebroadcast: song.isRebroadcast,
                dub: song.isDub,
                audio: song.audio,
                video480: song.MQ,
                video720: song.HQ,
            });
        }
        for (let song of songList) {
            let otherAnswers = new Set();
            for (let s of songList) {
                if (s.songName === song.songName && s.songArtist === song.songArtist) {
                    s.altAnimeNames.forEach((x) => otherAnswers.add(x));
                }
            }
            song.altAnimeNamesAnswers = Array.from(otherAnswers).filter((x) => !song.altAnimeNames.includes(x));
        }
    }
    songList = songList.filter((song) => song.audio || song.video480 || song.video720);
}

function songTypeFilter(song, ops, eds, ins, rebroadcast) {
    let type = song.songType;

    if (!rebroadcast && song.rebroadcast) {
        return false;
    }
    if (ops && type === 1) return true;
    if (eds && type === 2) return true;
    if (ins && type === 3) return true;
    return false;
}

function difficultyFilter(song, min, max) {
    if (!song.songDifficulty || isNaN(song.songDifficulty)) return false;
    return song.songDifficulty >= min && song.songDifficulty <= max;
}
