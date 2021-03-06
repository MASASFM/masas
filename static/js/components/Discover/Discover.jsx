var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Discover.jsx")

var { 
	getTimeIntervalFromURL,
	updateProfileInfo,
	isObjectNotEmpty,
	getDiscoverNumberFromCurrentTime,
	discoverHashtagNames
} = require("../../MASAS_functions.jsx")

var ArtworkLine = require("./ArtworkLine.jsx")
var { TimePicker } = require("../UI/UI.jsx")
var { TeachDiscoverModal2 } = require("./../TipModals/TeachDiscoverModals.jsx")
var TeachSliderModals = require("./../TipModals/TeachSliderModals.jsx")
// var TeachSliderModal1 = TeachSliderModals.TeachSliderModal1

var Discover = React.createClass({
	showArtwork: false,
	showSlider: false,

	propTypes: {
		userToken: React.PropTypes.string,
		userData: React.PropTypes.object,
		modalType: React.PropTypes.number,
		isModalOpened: React.PropTypes.bool,
		discoverNumber: React.PropTypes.number,
		songPlaying: React.PropTypes.string,
		MASAS_songInfo: React.PropTypes.object,
		loggedOutUserStep: React.PropTypes.number,

		updateTitle: React.PropTypes.func,
		toogleModal: React.PropTypes.func,
		updateModalType: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		closeModal: React.PropTypes.func,
		handleTimePickerChange: React.PropTypes.func,
		incrementLoggedOutUserStep: React.PropTypes.func,
	},

	getInitialState: function() {
		return {
			sliderValue: -1,
		}
	},

	componentWillMount: function() {
		this.props.updateTitle('Discover', '0')		// 0 = menu icon; 1 = arrow back

		// check what discover is playing
		if(this.props.MASAS_songInfo)
			this.props.handleTimePickerChange(getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval))

	},

	componentWillUnmount: function() {
		this.props.closeModal()

		// prevent tip modal from showing if user switches page after setTimout starts in render but before the callback is called
		if(this.modalTimeout)
			window.clearTimeout(this.modalTimeout)
	},

	componentDidMount: function() {
	},

	updateUserStep: function(step) {
		var header = "Bearer " + this.props.userToken

		$.ajax({
			type: 'POST',
			url: '/api/usersteps/',
			headers: {
				"Authorization": header,
			},
			data: {
				user: this.props.userData.url,
				step: step,
			},
			success: () => {
				updateProfileInfo(this.props.closeModal)
			},
			error: () => {},
		})
	},

	checkUserStep: function() {
		// if user data is available
		if(isObjectNotEmpty(this.props.userData) && !this.props.isModalOpened && window.location.pathname === "/discover") {
			// if user has not dismissed tips yet
			let usersteps = [ ...this.props.userData.usersteps ]
			const didUserDismissTips = usersteps.filter(({ step }) => step === 4).length ? true : false
			const didUserSeeSecondTip = usersteps.filter(({ step }) => step === 6).length ? true : false

			// const didUserSeeFirstTip = usersteps.filter(({ step }) => step === 5).length ? true : false
			// if(!didUserDismissTips && !didUserSeeFirstTip) {
			// 	this.props.updateModalContent(
			// 		<TeachSliderModal1 
			// 			title=""
			// 			paragraph={ (<span>all the music shared on MASAS starts out in one of the discover <strong>moods</strong></span>) } />
			// 	, 2, () => this.updateUserStep(5) )
			// 	this.props.toogleModal()
			// } else 
			if(!didUserDismissTips && !didUserSeeSecondTip) {
				this.props.updateModalContent(<TeachDiscoverModal2 />, 2, () => this.updateUserStep(6))
				this.props.toogleModal()
			}
		} 
		// else if(isObjectEmpty(this.props.userData) && this.props.loggedOutUserStep === 0 && !this.props.isModalOpened){		// user is not logged in, show slider tip if session anonymous user hasn't seen it yet
		// 	this.props.updateModalContent(
		// 		<TeachSliderModal1 
		// 			title=""
		// 			paragraph={ (<span>all the music shared on MASAS starts out in one of the discover <strong>moods</strong></span>) } />
		// 	, 2, () => this.props.incrementLoggedOutUserStep() )
		// 	this.props.toogleModal()
		// }
	},

	componentWillReceiveProps: function() {
	},

	renderForUITip: function() {

		if(isObjectNotEmpty(this.props.userData) && !this.props.isModalOpened) {
			// if user has not dismissed tips yet
			let usersteps = [ ...this.props.userData.usersteps ]
			const didUserDismissTips = usersteps.filter(({ step }) => step === 4).length ? true : false
			const didUserSeeFirstTip = usersteps.filter(({ step }) => step === 5).length ? true : false
			const didUserSeeSecondTip = usersteps.filter(({ step }) => step === 6).length ? true : false

			if(!didUserDismissTips && !didUserSeeFirstTip && this.props.modalType === 2)
				this.showSlider = true
			else if(!didUserDismissTips && didUserSeeFirstTip && !didUserSeeSecondTip && this.props.modalType === 2) {
				this.showSlider = false
				this.showArtwork = true
			} else {
				this.showSlider = false
				this.showArtwork = false
			}
		}
	},

	render: function() {
		var sliderInitDiscover = null
		if(this.props.MASAS_songInfo && this.props.songPlaying)
			sliderInitDiscover = getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval)
		else
			sliderInitDiscover = getDiscoverNumberFromCurrentTime()

		const { showArtwork } = this
		const { showSlider } = this

		// changing state in this.checkUserStep, delaying it until after this.render()
		if(this.props.songPlaying)
			this.modalTimeout = window.setTimeout(() => this.checkUserStep(), 3000)

		return (
			<div className="discover--wrapper">
				<h1 
					style={{ 
						visibility: (this.props.modalType === 2 && this.props.isModalOpened) ? 'hidden' : 'visible'
					}}>
					{ discoverHashtagNames()[this.props.discoverNumber - 1] }
				</h1>

				<div 
					className="multi-page--wrapper" 
					style={{ 
						visibility: (this.props.modalType === 2 && this.props.isModalOpened) ? 'hidden' : 'visible'
					}}>
					<div className={ this.props.discoverNumber === 1 ? "page1" : "page2" }>
						
						<ArtworkLine 
							renderForUITip={ showArtwork }
							discoverNumber={1} />
					</div>
					<div className={ this.props.discoverNumber === 2 ? "page1" : "page2" }>
					
						<ArtworkLine 
							renderForUITip={ showArtwork }
							discoverNumber={2} />
					</div>
					<div className={ this.props.discoverNumber === 3 ? "page1" : "page2" }>
						
						<ArtworkLine
							renderForUITip={ showArtwork }
							discoverNumber={3} />
					</div>
					<div className={ this.props.discoverNumber === 4 ? "page1" : "page2" }>
					
						<ArtworkLine
							renderForUITip={ showArtwork }
							discoverNumber={4} />
					</div>
					<div className={ this.props.discoverNumber === 5 ? "page1" : "page2" }>
					
						<ArtworkLine 
							renderForUITip={ showArtwork }
							discoverNumber={5} />
					</div>
					<div className={ this.props.discoverNumber === 6 ? "page1" : "page2" }>
						
						<ArtworkLine 
							renderForUITip={ showArtwork }
							discoverNumber={6} />
					</div>
				</div>
				<div 
					className="time-picker--wrapper"
					style={{
						visibility: !showSlider && this.props.isModalOpened && this.props.modalType === 2 ? 'hidden' : 'visible'
					}}>
					<TimePicker 
						canvasId="timePicker--canvas" 
						wrapperClassName="timePicker--wrapper" 
						onSliderChange={ (this.props.modalType === 2 && this.props.isModalOpened) ? () => {} : this.props.handleTimePickerChange } 
						initialDiscover={ sliderInitDiscover ? sliderInitDiscover : 1 }
						currentDiscover={ this.props.discoverNumber }
						showHashtag={ true } 
						sliderValue={ this.state.sliderValue }
						initText="Drag the sun around!"
						/>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Discover)
