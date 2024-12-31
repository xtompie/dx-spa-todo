App.Window = (() => {

    const Boot = () => {
        App.Task.OnUpdate(UpdateTopbarVal);
        App.Router.OnBeforeNavigete(CleanToolbar);
        UpdateTopbarVal();
    };

    const UpdateTopbarVal = () => {
        Topbar().val({
            todo: App.Task.Count(App.Task.Status.TODO),
        });
    }

    const Title = (title) => {
        return document.title = title;
    };

    const Content = () => {
        return document.one('[app-window-content]');
    };

    const Topbar = () => {
        return document.one('[app-window-topbar]');
    };

    const Toolbar = () => {
        return document.one('[app-window-toolbar]');
    };

    const CleanToolbar = () => {
        Toolbar().innerHTML = '';
    };

    const GoToTodo = () => {
        App.Router.Navigate(App.List.Controller);
    };

    return {
        Boot,
        Content,
        GoToTodo,
        Toolbar,
        Title,
    };

})();
