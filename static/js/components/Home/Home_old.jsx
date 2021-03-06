var React = require("react")
var ReactDOM = require("react-dom")
import $ from "jquery"

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/Home.jsx")

var { goToURL } = require("../../MASAS_functions.jsx")
var LoginForm = require("../Login/LoginForm.jsx")
var { Button, Link } = require("../UI/UI.jsx")
var UnsplashControls = require("./UnsplashControls.jsx")

var HomeCountdown = require("./HomeCountdown.jsx")


const FounderInfoBox = (props) => {
	return (
			<div className="founder-info--wrapper">
				<img src={ props.url } alt="founder picture" />
				<div className="text--wrapper">
					<div className="founder-name--wrapper">
						<span className="name1">{ props.name1 }</span>
						<span className="name2">{ props.name2 }</span>
					</div>
					<hr />
					<span className="job">{ props.job }</span>
				</div>
			</div>
		)
}


var Home = React.createClass({
	getInitialState: function() {
		return {
			pageNumber: 1, 		// page number
		}
	},

	componentWillMount: function() {

		this.props.updateTitle('', '0')		// 0 = menu icon; 1 = arrow back
	},

	componentWillUnmount: function () {
		$("#body--background").removeClass("artist-page-bg musicLover-page-bg dev-page-bg blurred saturated")
		this.props.goToPage(1, 4)
	},

	// <div className="login-container" style={{ display: (this.props.user ? 'none' : 'flex') }}>
	// 						<LoginForm fullForm={false} buttonTitle="Request an Invitation" />
	// 						<div>via Facebook</div>
	// 					</div>

	render: function() {
		const currentPage = this.props.currentPage
		const pageCount = 4

		// update page backgound (fixed positioning are slow)
		$("#body--background").removeClass("artist-page-bg musicLover-page-bg dev-page-bg blurred saturated")
		switch(currentPage) {
			case 1:
				// app background
				break
			case 2:
				$("#body--background").addClass("artist-page-bg")
				break
			case 3:
				$("#body--background").addClass("musicLover-page-bg")
				break
			case 4:
				$("#body--background").addClass("dev-page-bg blurred saturated")
				break
			default:
				break
		}

		return (
			<div className="home--wrapper">

				{ 
					currentPage !== 1 ? 
						<div className="page-up--wrapper">
							<img onClick={this.props.goToPage.bind(null, currentPage - 1, pageCount)} src="/static/img/MASAS_arrow_down.svg" alt="down arrow" className="page-up-icon"/>
						</div>
					:
						""
				}

				<div className="multiPage--wrapper">

					<div className={ "page" + (currentPage === 1 ? "1" : "2") + "--wrapper" } id="homepage-login">
						<UnsplashControls />
						<div className="logo">
							<HomeCountdown user={this.props.user} />
						</div>
						
						<div style={{ visibility: ( this.props.user ? 'hidden' : 'visible') }}>
							<LoginForm 
								fullForm={false} 
								buttonTitle="Request an Invitation" 
								subtitle="via Facebook"/>
						</div>
						
						<img onClick={this.props.goToPage.bind(null, 2, pageCount)} src="/static/img/puff_loader_slow.svg" alt="down arrow" className="arrow-icon"/>
					</div>

					<div className={ "homepage-description page" + (currentPage === 2 ? "1" : "2") + "--wrapper" } id="homepage-description--artist">
						<div className="text--wrapper">
							<div className="image--wrapper">
								<img src="/static/img/MASAS_icon_Mixer.svg" alt="stars" />
							</div>
							<div className="side-content">
								<div className="title">
									<h1 onClick={this.goToPage1}>i'm an artist</h1>
								</div>
								<p>
									Music transcends the boundaries of language and culture, it is a beautiful outburst of the soul that brings joy and happiness; and this is exactly why you should share yours. Plus, you know, music lovers from all over the world will listen to you music.
								</p>
								<div className="button" style={{width: '70%'}}>
									{ this.props.user ?
										<Button onClick={goToURL.bind('null', '/sc-sync')}>Start Uploading</Button>
									:
										<LoginForm 
											fullForm={false} 
											buttonTitle="Start Uploading" 
											subtitle="via Soundcloud"/>
									}
								</div>
							</div>
						</div>
					</div>

					<div className={ "homepage-description page" + (currentPage === 3 ? "1" : "2") + "--wrapper" } id="homepage-description--musicLover">
						<div className="text--wrapper">
							<div style={{position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0)', zIndex: -1 }}>
							</div>
							<div className="image--wrapper">
								<img src="/static/img/MASAS_icon_vinyl.svg" alt="stars" />
							</div>
							<div className="side-content">
								<div className="title">
									<h1 onClick={this.goToPage1}>i'm a music lover</h1>
								</div>
								<p>
									Music has a universal capacity to positively influence our moods in the midst of our daily routine. Music is incredible, but it is even better when we share it together. On MASAS, everyone collaborates together to Discover new tunes and create a better Radio.
								</p>
								<div className="button" style={{width: '70%'}}>
									{ this.props.user ?
										<Button onClick={goToURL.bind('null', '/profile')}>My Profile</Button>
									:
										<LoginForm 
											fullForm={false} 
											buttonTitle="Request and Invitation" 
											subtitle="via Facebook" />
									}
								</div>
							</div>
						</div>
					</div>

					<div className={ "page" + (currentPage === 4 ? "1" : "2") + "--wrapper" } id="homepage-description--developpers">
						<div className="scroll--wrapper">
							<h1>founders</h1>
							<div className="founders-info--wrapper">
								<FounderInfoBox
									url="/static/img/founders.png"
									name1="Victor"
									name2="Binétruy-Pic"
									job="Front-end Developper" />
								<FounderInfoBox
									url="/static/img/founders.png"
									name1="Thomas"
									name2="Binétruy-Pic"
									job="Front-end Developper" />
								<FounderInfoBox
									url="/static/img/founders.png"
									name1="Micka"
									name2= "Touillaud"
									job="Product Designer " />
								<FounderInfoBox
									url="/static/img/founders.png"
									name1="James"
									name2= "Pic"
									job="Back-end Engineer" />
							</div>
							<div className="description">
								With MASAS, we hope to nurture the true essence of an ever-expanding grassroots movement. Be part of the evolution by simply… sharing.
							</div>
							<div className="social-buttons">
								<div className="facebook">
									Invite a friend
								</div>
								<div className="twitter">
									Invite a friend
								</div>
							</div>	
						</div>
					</div>

				</div>
						<div className="page-down--wrapper" style={{ display: currentPage !== pageCount && currentPage !== 1 ? 'flex' : 'none' }}>
							<img onClick={this.props.goToPage.bind(null, currentPage + 1, pageCount)} src="/static/img/MASAS_arrow_down.svg" alt="down icon" className="page-down-icon"/>
						</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
