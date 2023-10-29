class songInfoConstructor {
    constructor( id, songName, artist, difficulty, year, linkmp3, linkmp4) {
        this.id = id
        this.songName = songName
        this.artist = artist
        this.difficulty = difficulty
        this.year = year
        this.linkmp3 = linkmp3
        this.linkmp4 = linkmp4
    }
}

let songInfoList
let actualSong
let timerData = 10000
let randomStartTime
let songBoolean = false
let artistBoolean = false
let puntuacionTotal = 0