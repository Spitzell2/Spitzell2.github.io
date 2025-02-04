function anisongdbDataSearch(seasonItem, ano) {
    let mode = "season";
    let query = seasonItem + " " + ano;
    let ops = state.settings.op;
    let eds = state.settings.ed;
    let ins = state.settings.in;
    let partial = true;
    let ignoreDuplicates = false;
    let arrangement = false;
    let maxOtherPeople = 5;
    let minGroupMembers = 1;
    
    if (query && !isNaN(maxOtherPeople) && !isNaN(minGroupMembers)) {
        // Retornar la promesa que devuelve `getAnisongdbData`
        return getAnisongdbData(mode, query, ops, eds, ins, partial, ignoreDuplicates, arrangement, maxOtherPeople, minGroupMembers);
    }

    return Promise.resolve();
}


// send anisongdb request
function getAnisongdbData(mode, query, ops, eds, ins, partial, ignoreDuplicates, arrangement, maxOtherPeople, minGroupMembers) {
    let url, data;
    let json = {
        and_logic: false,
        ignore_duplicate: ignoreDuplicates,
        opening_filter: ops,
        ending_filter: eds,
        insert_filter: ins,
    };

    if (mode === "season") {
        query = query.trim();
        query = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
        url = `https://anisongdb.com/api/filter_season?${new URLSearchParams({ season: query })}`;
        data = {
            method: "GET",
            headers: { Accept: "application/json", "Content-Type": "application/json" },
        };
    }

    // Retorna la promesa de fetch
    return fetch(url, data)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((json) => {
            handleData(json);
            songList = songList.filter((song) => songTypeFilter(song, ops, eds, ins));
            state.lista2 = state.lista2.concat(songList);
            //console.log('Filtered song list:', state.lista2);
        })
        .catch((err) => {
            console.error('Error caught:', err);
            songList = [];
        });
}


function handleData(data) {
    songList = [];
    if (!data) return;
    // anisongdb structure
    if (Array.isArray(data) && data.length && data[0].animeJPName) {
        data = data.filter((song) => song.audio || song.MQ || song.HQ);
        for (let song of data) {
            //console.log(song)
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
                startPoint: null,
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
    // Filter out ignored songs
    songList = songList.filter((song) => song.audio || song.video480 || song.video720);
}


// return true if song type is allowed
function songTypeFilter(song, ops, eds, ins) {
    let type = song.songType;
    if (ops && type === 1) return true;
    if (eds && type === 2) return true;
    if (ins && type === 3) return true;
    return false;
}