App.Router = (() => {

    const routes = [];
    let currentRoute = null;
    const onBeforeNavigateListeners = [];

    const Register = (handler, path) => {
        routes.push({ handler, path, regex: PathToRegex(path) });
    };

    const PathToRegex = (path) =>
        new RegExp("^" + path.replace(/\{([a-zA-Z]+)\?\}/g, "([^/]*)").replace(/\{([a-zA-Z]+)\}/g, "([^/]+)") + "$"
    );

    const FindRouteByPath = (path) =>
        routes.find(route => route.regex.test(path));

    const ExtractParams = (route, path) => {
        const values = path.match(route.regex).slice(1);
        const keys = Array.from(route.path.matchAll(/\{([a-zA-Z]+)\??\}/g)).map(result => result[1]);
        const routeParams = Object.fromEntries(keys.map((key, i) => [key, values[i] !== undefined && values[i] !== "" ? values[i] : null]));
        const queryParams = Object.fromEntries(new URLSearchParams(window.location.search).entries());
        return { ...queryParams, ...routeParams };
    };

    const HandleRoute = () => {
        const path = window.location.pathname;
        const route = FindRouteByPath(path);
        if (route) {
            currentRoute = route;
            route.handler(ExtractParams(route, path));
        } else {
            currentRoute = null;
            App.Error.NotFound();
        }
    };

    const Navigate = (handler, params = {}) => {
        onBeforeNavigateListeners.forEach(listener => listener());

        const route = routes.find(r => r.handler === handler);
        if (!route) {
            currentRoute = null;
            App.Error.NotFound();
            return;
        }

        let path = route.path;
        const pathKeys = Array.from(path.matchAll(/\{([a-zA-Z]+)\??\}/g)).map(match => match[1]);
        const queryParams = {};

        for (const [key, value] of Object.entries(params)) {
            if (pathKeys.includes(key)) {
                path = path.replace(`{${key}}`, value);
                path = path.replace(`{${key}?}`, value || "");
            } else {
                queryParams[key] = value;
            }
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const fullPath = queryString ? `${path}?${queryString}` : path;

        currentRoute = route;
        window.history.pushState({}, "", fullPath);
        HandleRoute();
    };

    const CurrentController = () => {
        return currentRoute ? currentRoute.handler : null;
    };

    const Boot = () => {
        window.addEventListener("popstate", HandleRoute);
        HandleRoute();
    };

    const OnBeforeNavigete = (listener) => {
        onBeforeNavigateListeners.push(listener);
    };

    const Refresh = () => {
        HandleRoute();
    };

    return {
        Boot,
        CurrentController,
        Navigate,
        OnBeforeNavigete,
        Register,
        Refresh,
    };

})();
