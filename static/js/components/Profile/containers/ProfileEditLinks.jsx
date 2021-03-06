import {
	updateEditProfileTextboxValues,
} from "../../../reducers/actions/Profile.js"

var ProfileEditLinks = {}

// Which part of the Redux global state does our component want to receive as props?
ProfileEditLinks.mapStateToProps = function(state) {
	return {
		textboxValues: state.profileReducer.textboxValues,
		userData: state.appReducer.userData,
	}
}

// Which action creators does it want to receive by props?
ProfileEditLinks.mapDispatchToProps = function(dispatch) {
	return {
		updateTextboxValues: textboxValues => dispatch(updateEditProfileTextboxValues(textboxValues))
	}
}

module.exports = ProfileEditLinks
