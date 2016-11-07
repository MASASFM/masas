export const INCREMENT_LOGGED_OUT_USER_STEP = 'INCREMENT_LOGGED_OUT_USER_STEP'
export const RESET_LOGGED_OUT_USER_STEP = 'RESET_LOGGED_OUT_USER_STEP'
export const CHANGE_MODAL_CONTENT = 'CHANGE_MODAL_CONTENT'
export const UPDATE_MODAL_TYPE = 'UPDATE_MODAL_TYPE'
export const CLOSE_AND_EMPTY_MAIN_MODAL = 'CLOSE_AND_EMPTY_MAIN_MODAL'
export const TOOGLE_IS_MODAL_OPENED = 'TOOGLE_IS_MODAL_OPENED'
export const UPDATE_PAGE_TITLE = 'UPDATE_PAGE_TITLE'
export const BLUR_BG = 'BLUR_BG'
export const SATURATE_BG = 'SATURATE_BG'
export const BLUR_BG_MOBILE = 'BLUR_BG_MOBILE'
export const SATURATE_BG_MOBILE = 'SATURATE_BG_MOBILE'
export const MODAL_SATURATE_BG = 'MODAL_SATURATE_BG'
export const MODAL_BLUR_BG = 'MODAL_BLUR_BG'
export const DONE_PROCESSING_AUTH_COOKIE = 'DONE_PROCESSING_AUTH_COOKIE'
export const SET_APP_FETCHING_STATE_FALSE = 'SET_APP_FETCHING_STATE_FALSE'
export const SET_APP_FETCHING_STATE_TRUE = 'SET_APP_FETCHING_STATE_TRUE'
export const CHANGE_SLASH_SCREEN_PAGE = 'CHANGE_SLASH_SCREEN_PAGE'

export function changeSplashScreenPage(splashScreenPage) {
	return {
		type: CHANGE_SLASH_SCREEN_PAGE,
		splashScreenPage
	}
}

export function setAppFetchingStateTrue() {
	return {
		type: SET_APP_FETCHING_STATE_TRUE
	}
}


export function setAppFetchingStateFalse() {
	return {
		type: SET_APP_FETCHING_STATE_FALSE
	}
}

export function doneProcessingAuthCookie() {
	return {
		type: DONE_PROCESSING_AUTH_COOKIE
	}
}

export function incrementLoggedOutUserStep() {
	return {
		type: INCREMENT_LOGGED_OUT_USER_STEP
	}
}

export function resetLoggedOutUserStep() {
	return {
		type: RESET_LOGGED_OUT_USER_STEP
	}
}

export function changeModalContent(modalContent, modalType = 1, closeModalFunc = () => {} ) {
	if(closeModalFunc === undefined)
		closeModalFunc = () => {}
	
	return { 
		type: CHANGE_MODAL_CONTENT, 
		modalContent, 
		modalType,
		closeModalFunc
	}
}

export function updateModalType(modalType) {
	return {
		type: UPDATE_MODAL_TYPE,
		modalType,
	}
}

export function closeAndEmptyMainModal() {
	return {
		type: CLOSE_AND_EMPTY_MAIN_MODAL
	}
}

export function toogleIsModalOpened() {
	return {
		type: TOOGLE_IS_MODAL_OPENED,
	}
}

export function updatePageTitle(title, pageType) {
	return {
		type: UPDATE_PAGE_TITLE,
		title,
		pageType
	}
}

export var changeBgState = {}
// blur = bool
changeBgState.blur = function(blur) {
	var isBlurred = true
	if(!blur)
		isBlurred = blur
	return {
		type: BLUR_BG,
		isBlurred
	}
}

// sat = bool
changeBgState.saturate = function(sat) {
	var isSaturated = true
	if(!sat)
		isSaturated = sat
	return {
		type: SATURATE_BG,
		isSaturated,
	}
}

// blur = bool
changeBgState.modalBlur = function(blur) {
	var isBlurred = true
	if(!blur)
		isBlurred = blur
	return {
		type: MODAL_BLUR_BG,
		isBlurred
	}
}

// sat = bool
changeBgState.modalSaturate = function(sat) {
	var isSaturated = true
	if(!sat)
		isSaturated = sat
	return {
		type: MODAL_SATURATE_BG,
		isSaturated,
	}
}

// blur = bool
changeBgState.blurMobile = function(blur) {
	var isBlurred = true
	if(!blur)
		isBlurred = blur
	return {
		type: BLUR_BG_MOBILE,
		isBlurred
	}
}

// sat = bool
changeBgState.saturateMobile = function(sat) {
	var isSaturated = true
	if(!sat)
		isSaturated = sat
	return {
		type: SATURATE_BG_MOBILE,
		isSaturated,
	}
}

// export default changeBgState
