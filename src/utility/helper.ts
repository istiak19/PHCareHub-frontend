import { RouteConfig, UserRole } from "@/types";

export const authRoutes = ["/login", "/register", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/reset-password"],
    patterns: [], // [/password/change-password, /password/reset-password => /password/*]
};

export const doctorProtectedRoutes: RouteConfig = {
    patterns: [/^\/doctor/], // Routes starting with "/doctor/*" , "/assistants", "/appointments/*"
    exact: [], // "/assistants"
};

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], // Routes starting with /admin/*
    exact: [], // "/admins"
};

export const patientProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/], // Routes starting with /dashboard/*
    exact: [], // "/dashboard"
};

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    };
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
    // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
};

export const getRouteOwner = (pathname: string): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    } else if (isRouteMatches(pathname, doctorProtectedRoutes)) {
        return "DOCTOR";
    } else if (isRouteMatches(pathname, patientProtectedRoutes)) {
        return "PATIENT";
    } else if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    } else {
        return null;
    };
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    } else if (role === "DOCTOR") {
        return "/doctor/dashboard";
    } else if (role === "PATIENT") {
        return "/dashboard";
    } else {
        return "/";
    };
};

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);
    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    };
    if (routeOwner === role) {
        return true;
    };
    return false;
};