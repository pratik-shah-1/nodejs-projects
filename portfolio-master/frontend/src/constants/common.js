export const ROUTES = {
	HOME: '/',
	CONTACT: '/contact',
	PORTFOLIO: {
		INDEX: '/portfolio',
		VIEW: '/portfolio/:slug'
	},
	ADMIN: {
		AUTH: {
			LOGIN: '/admin/login',
			LOGOUT: '/admin/logout',
			FORGOT_PASSWORD: '/admin/forgot-password',
			VERIFY_OTP: '/admin/verify-otp',
			SET_NEW_PASSWORD: '/admin/set-new-password',
			CHANGE_PASSWORD: '/admin/change-password',
		},
		PORTFOLIO: {
			ADD: '/admin/portfolio/add',
			VIEW: '/admin/portfolio/view/:id',
			EDIT: '/admin/portfolio/edit/:id',
			ARRANGE: '/admin/portfolio/arrange'
		},
		RESUME_UPLOADER: '/admin/resume/upload',
	}
}