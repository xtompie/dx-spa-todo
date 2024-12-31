App.Shortcut = (() => {

    const shortcuts = new Map();

    const Register = (controller) => {
        if (!shortcuts.has(controller)) {
            shortcuts.set(controller, new Map());
        }
        const api = {
            Shortcut: (shortcut, callback, strong = false) => {
                const actions = shortcuts.get(controller);
                if (!actions.has(shortcut)) {
                    actions.set(shortcut, []);
                }
                if (strong) {
                    actions.get(shortcut).push((e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        callback(e);
                    });
                } else {
                    actions.get(shortcut).push(callback);
                }
                return api;
            }
        };
        return api;
    };

    const HandleKeydown = (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) || document.activeElement.isContentEditable) {
            return;
        }
        const controller = App.Router.CurrentController();
        if (!controller || !shortcuts.has(controller)) {
            return;
        }
        const actions = shortcuts.get(controller);
        if (!actions) {
            return;
        }
        for (const [shortcut, callbacks] of actions.entries()) {
            if (e.shortcut && e.shortcut(shortcut)) {
                callbacks.forEach(callback => callback(e));
            }
        }
    };

    const Boot = () => {
        window.addEventListener('keydown', HandleKeydown);
    };

    return {
        Register,
        Boot,
        shortcuts,
    };

})();
