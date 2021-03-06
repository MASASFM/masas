var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ArtworkLineItem.jsx")

var { Marquee } = require("../UI/UI.jsx")


var ArtworkLineItem = React.createClass({
	propTypes: {
		isModalOpened: React.PropTypes.bool,
		modalType: React.PropTypes.number,

		key_ID: React.PropTypes.number,
		artworkURL: React.PropTypes.string,
		SC_songInfo: React.PropTypes.object,
		MASAS_songInfo: React.PropTypes.object,
		isItemPlaying: React.PropTypes.bool,
		pause: React.PropTypes.func,
		playAndSaveHistory: React.PropTypes.func,
		resumePlayer: React.PropTypes.func,

		songPlaying: React.PropTypes.string,
		toggleSongLike: React.PropTypes.func,
		isSongPlayingLiked: React.PropTypes.bool,
		userToken: React.PropTypes.string,
		artistInfo: React.PropTypes.object,				// artist info 

		isArtworkLarge: React.PropTypes.bool,			// larger ArtworkLineItem
		updateMiniProfileContent: React.PropTypes.func,
	},

	getDefaultProps: function() {
		return {
			isArtworkLarge: false,
		}
	},

	componentWillMount: function() {
	},
	
	componentDidMount: function() {
	},
	
	componentWillUnmount: function() {
	},

	toggleShowProfile: function() {
		this.props.updateMiniProfileContent(this.props.MASAS_songInfo.trackArtist)
	},

	onArtworkClick: function() {
		if(this.props.isItemPlaying)
			this.props.pause()
		else if(this.props.songPlaying === this.props.MASAS_songInfo.url)
			this.props.resumePlayer()
		else
			this.props.playAndSaveHistory(this.props.MASAS_songInfo.url)
	},

	render: function() {
		let { 
			isModalOpened, 
			modalType, 
			key_ID, 
			artworkURL, 
			MASAS_songInfo,
			isItemPlaying,
			SC_songInfo,
			isArtworkLarge
		} = this.props

		return (
			<div 
				className={ "artwork--wrapper " + (isArtworkLarge ? "artwork-playing" : "") }
				key={ key_ID }
				style={{
					visibility: isModalOpened && modalType === 2 ? 'hidden' : 'visible'
				}}>
				<div className="artwork--wrapper2">
					{ artworkURL ?
							<img src={ artworkURL } alt="artwork" className="artwork"/>
						:
							<div className="artwork"></div>
					}
					<div 
						className={ "player-button" }
						onClick={ this.onArtworkClick }>
						{
							isItemPlaying ?
								<img 
									src="/static/img/MASAS_player_pause.svg" 
									alt="pause" />
							:
								<img 
									src="/static/img/MASAS_player_play.svg" 
									
									alt="play" />
						}
					</div>
				</div>

				{
					!isArtworkLarge ?
						<div 
							onClick={ this.toggleShowProfile }
							className="song-info--wrapper">
							<Marquee className="title">{ SC_songInfo.title }</Marquee>
							<Marquee className="artist">{ SC_songInfo.user.username }</Marquee>
						</div>
					:
						<div 
							className="song-info--wrapper"
							onClick={ this.toggleShowProfile }>
							<div
								className="like-icon" 
								style={{ display: (this.props.songPlaying === MASAS_songInfo.url ? 'flex' : 'none') }}
								onClick={ this.props.toggleSongLike.bind(this, this.props.userToken, this.props.songPlaying) }>
								{
									this.props.isSongPlayingLiked ?
										<img src="/static/img/MASAS_liked.svg" alt="like" />
									:
										<img src="/static/img/MASAS_like_shadow.svg" alt="like" />
								}
							</div>
							<div 
								className="song-info">
								<div className="title"><Marquee>{ SC_songInfo.title }</Marquee></div>
								<div className="artist"><Marquee>{ SC_songInfo.user.username }</Marquee></div>
							</div>
						</div>
				}
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ArtworkLineItem)
