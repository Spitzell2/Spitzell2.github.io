function anisongdbDataSearch(seasonItem, ano) {
    let query = seasonItem + " " + ano;
    const ops = state.settings.op;
    const eds = state.settings.ed;
    const ins = state.settings.in;
    
    if (query) {
        return getAnisongdbData(query, ops, eds, ins);
    }

    return Promise.resolve();
}

function getAnisongdbData(query, ops, eds, ins) {
    let url = `https://anisongdb.com/api/filter_season?${new URLSearchParams({ season: query })}`;
    query = query.trim();
    query = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
    let data = {
        method: "GET",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
    }

    return fetch(url, data)
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .then((json) => {
            handleData(json);
            songList = songList.filter((song) => songTypeFilter(song, ops, eds, ins));
            state.lista2 = state.lista2.concat(songList);
        })
        .catch(console.error);
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

function songTypeFilter(song, ops, eds, ins) {
    let type = song.songType;
    if (ops && type === 1) return true;
    if (eds && type === 2) return true;
    if (ins && type === 3) return true;
    return false;
}