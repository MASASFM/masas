import {
	playSong,
	pausePlayer,
	playRandomSong,
	toggleSongLike,
	playPreviousSongInDiscover,
	lastSongInDiscoverHistory
} from "../../../reducers/actions/Player.js"

import {
	toogleIsFooterOpened,
} from "../../../reducers/actions/Footer.js"

var ArtworkLine = {}

// Which part of the Redux global state does our component want to receive as props?
ArtworkLine.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		discoverNumber: state.discoverReducer.discoverNumber,
		history: state.discoverReducer.history,
		songPlaying: state.playerReducer.songPlaying,
		isPlayerPaused: state.playerReducer.isPaused,
		isSongPlayingLiked: state.playerReducer.isSongPlayingLiked,
		userToken: state.appReducer.MASASuser,
		isFooterOpened: state.footerReducer.isOpened,
		isModalOpened: state.appReducer.isModalOpened,
		modalType: state.appReducer.modalType,
		songPlayingArtistInfo: state.playerReducer.artistInfo,
	}
}

// Which action creators does it want to receive by props?
ArtworkLine.mapDispatchToProps = function(dispatch) {
	return {
		toggleSongLike: (userToken, songId) => dispatch(toggleSongLike(songId)),
		playAndSaveHistory: (songToPlay) => dispatch(playSong(songToPlay)),
		playRandomSong: (timeInterval) => dispatch(playRandomSong(timeInterval)),
		pause: () => dispatch(pausePlayer()),
		toggleIsFooterOpened: () => dispatch(toogleIsFooterOpened()),
		playPreviousSongInDiscover: discoverNum => dispatch(playPreviousSongInDiscover(discoverNum)),

		// not dispatch functions
		lastSongInDiscoverHistory: (history, discoverNum) => lastSongInDiscoverHistory(history, discoverNum)
	}
}

module.exports = ArtworkLine
