import { fetchLikes } from "../../../reducers/actions/Likes.js"

var Likes = {}

// Which part of the Redux global state does our component want to receive as props?
Likes.mapStateToProps = function(state) {
	return {
		// userLikes: state.likesReducer.userLikes,
		userData: state.appReducer.userData,
		SCinfo: state.likesReducer.SCinfo,
		userPk: state.appReducer.MASASuserPk,
		reFetch: state.likesReducer.reFetch,
		searchInput: state.likesReducer.searchInput,
		hashtagFilter: state.likesReducer.hashtagFilter,
		userLikes: state.likesReducer.userLikes,
	}
}

// Which action creators does it want to receive by props?
Likes.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		getLikes: () => dispatch(fetchLikes()),
		updateLikes: (SCinfo) => dispatch({ type: 'UPDATE_LIKES', SCinfo, userLikes: null }),
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		updateModalContent: (modalContent) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent }),
		toogleHashtag: (hashtagNumber) => dispatch({ type: "TOOGLE_HASHTAG_FILTER", hashtagNumber }),
		updateSearchInput: (input) => dispatch({ type: "UPDATE_LIKES_SEARCH_INPUT", input })
	}
}

module.exports = Likes
