import {
	
	UPDATE_LIKES,
	TOGGLE_MINI_PROFILE,
	UPDATE_MINI_PROFILE,
	TOOGLE_HASHTAG_FILTER,
	UPDATE_NUMBER_OF_LIKES_SHOWN,
	UPDATE_SHOW_MORE_LIKES_BUTTON
} from "./actions/Likes.js"

let exportVar = {}

exportVar.defaultState = {
	userLikes: [],								// user likes from MASAS API
	SCinfo: [],								// song info corresponding to these likes from SCinfo (depreciating)
	likesInfo: null, 								// (array[object]) object contains SCinfo and artistInfo for each entry
	reFetch: 0,								// rerender when new likes come in
	searchInput: "", 							// (string) search textbox input
	hashtagFilter: [false,false,false,false,false,false],				// (array) 1 = include in search. 1st entry = #EarlyMorning
	loadMoreLikes: true, 							// (bool) need more likes to load in infinite scrool ?
	numRowLikesShown: 1,						// (int) how many rows of like artworks are shown max
	showMoreLikesButton: false,						// (bool) should button to get more likes be shown
}

const { defaultState } = exportVar

exportVar.likesReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case UPDATE_SHOW_MORE_LIKES_BUTTON:
			return {
				...state,
				showMoreLikesButton: action.showMoreLikesButton
			}
		case UPDATE_NUMBER_OF_LIKES_SHOWN:
			var { numRowLikesShown } = action

			if(numRowLikesShown < exportVar.defaultState)
				numRowLikesShown = exportVar.defaultState

			return {
				...state,
				numRowLikesShown
			}
		case TOGGLE_MINI_PROFILE:
			var userLikes = state.userLikes.map( like => {
				if(like.MASAS_songInfo.pk === action.songPk)
					return { ...like, showProfile: !like.showProfile }
				else
					return like
			})

			return {
				...state,
				userLikes,
			}

		case UPDATE_MINI_PROFILE:
			var userLikes = state.userLikes.map( like => {
				if(like.MASAS_songInfo.pk === action.songPk)
					return { ...like, artistInfo: action.artistInfo }
				else
					return like
			})

			return {
				...state,
				userLikes,
			}
		case TOOGLE_HASHTAG_FILTER:
			var hashtagFilter = state.hashtagFilter.slice(0)
			hashtagFilter[action.hashtagNumber] = !hashtagFilter[action.hashtagNumber]

			return {
				...state,
				hashtagFilter
			}
		case UPDATE_LIKES:
			var likesInfo = defaultState.likesInfo

			if(action.likesInfo)
				likesInfo = action.likesInfo

			var userLikes = defaultState.userLikes

			if(action.userLikes)
				userLikes = action.userLikes


			return {
				...state,
				likesInfo,
				SCinfo: action.SCinfo,
				userLikes,
			}
		// SCinfo updated from likes page renderLikes() method
		case 'ADD_LIKE':
			return {
				...state,
				userLikes: action.userLikes,
			}
		case 'REFETCH_LIKES': // NOT TESTED
			return {
				...state,
				reFetch: ( state.reFetch > 100 ? 1 : state.reFetch+1 ),
			}
		case 'UPDATE_LIKES_SEARCH_INPUT':
			return { 
				...state,
				searchInput: action.input
			}
		default:
			return state
	}
}


module.exports = exportVar
