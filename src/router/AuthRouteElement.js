import React from "react";

import {Navigate} from "react-router-dom";
import { checkIsLogin, handleLoginRedirectUrl } from "@/utils/userManager";

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