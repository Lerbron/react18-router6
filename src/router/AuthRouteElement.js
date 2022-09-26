import React from "react";

import {Navigate} from "react-router-dom";
import { checkIsLogin, login, handleLoginRedirectUrl } from "@/utils/userManager";
// import { AxiosCanceler } from "@/api/helper/axiosCancel";
// import { searchRoute } from "@/utils/util";
// import { rootRouter } from "@/routers/index";
// import { HOME_URL } from "@/config/config";
// import { store } from "@/redux/index";

// const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由守卫组件
 * */
const AuthRouteElement = (props) => {
	let { route }= props
	let { element: Element, path }= route

	// * 判断是否有Token
	if (!checkIsLogin()) {
		handleLoginRedirectUrl()
		return <Navigate to="/login" replace />
	}

	return <Element />

};

export default AuthRouteElement;