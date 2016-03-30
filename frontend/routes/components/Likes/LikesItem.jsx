var React = require("react")
var ReactDOM = require("react-dom")

var LikesItem = React.createClass({
	propTypes: {
		MASASinfo: React.PropTypes.object,			// song info from MASAS database
		SCinfo: React.PropTypes.object,			// related song info from SC
	},

	componentWillMount: function() {
		// this.props.updateTitle('Template', '0')		// 0 = menu icon; 1 = arrow back
	},

	playTrack: function() {
		this.props.playNewSong(this.props.MASASinfo.url)
	},

	renderRadioTime: function() {
		var switchVar = this.props.MASASinfo.timeInterval.substr(this.props.MASASinfo.timeInterval.length - 2, 1)
		
		switch(switchVar) {
			case "1":
				return "#EarlyMorning"
			case "2":
				return "#LateMorning"
			case "3":
				return "#EarlyAfternoon"
			case "4":
				return "#LateAfternoon"
			case "5":
				return "#EarlyEvening"
			case "6":
				return "#LateEvening"
			default:
				return 
		}
	},

	renderPlayerControlButton: function() {
		if(this.props.MASASinfo)	// prevent accessing MASAS_songInfo.url before props.MASAS_songInfo is loaded
		{
			if(this.props.isFetchingSong)
				return <img src="/static/img/puff_loader.svg" alt="loading" className="artwork" />
			
			if (this.props.MASASinfo.url === this.props.songPlaying && this.props.isPaused === false)
				return <img src="/static/img/MASAS_player_pause.svg" alt="pause" className="artwork" onClick={this.props.pause }/>

			return <img src="/static/img/MASAS_player_play.svg" alt="play" className="artwork" onClick={this.playTrack }/>
		}
	},

	render: function() {
		var SCinfo = this.props.SCinfo

		var artworkURL = SCinfo.artwork_url
		 if(SCinfo.artwork_url !== null) {
		 	artworkURL = SCinfo.artwork_url.substring(0,SCinfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
		 }

		return (
			<div className="likes-item--wrapper">
				
				<div className="artwork--wrapper">
					<div className="artwork-div" style={ !this.props.SCinfo.artwork_url ? {backgroundColor: 'black'} : {} }>
						{ this.props.SCinfo.artwork_url ? <img src={ artworkURL } alt="artwork" className="artwork" onClick={this.playTrack } /> : "" }
					</div>
					<div className="artwork-overlay">
						{ this.renderPlayerControlButton() }
					</div>
				</div>
				<div className="text--wrapper">
					<div className="song-name--wrapper">
						<div className="title">
							{ SCinfo.title }
						</div>
						<div className="dash"> - </div>
						<div className="artist">
							{ SCinfo.user.username }
						</div>
					</div>
					<div className="song-stats--wrapper">
						<div className="time">
							{ this.renderRadioTime() }
						</div>
						<div className="plays">
							{ this.props.MASASinfo.play_count } <img src="/static/img/MASAS_icon_play_count.svg" alt="play count" className="play-count-icon" />
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = LikesItem