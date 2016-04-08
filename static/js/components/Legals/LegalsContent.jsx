var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/LegalsContent.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
var { Body } = require("../UI/UI.jsx")

// var Template = (props) => {

// }

var LegalsContent = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.props.updateTitle('Legals', this.props.goToHome )		// 0 = menu icon; 1 = arrow back
	},

	render: function() {
		return (
			<Body>
				{ this.props.children }
				<div onClick={ this.props.goToHome }>BACK</div>
			</Body>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(LegalsContent)