App.Window = (() => {

    const Boot = () => {
        App.Task.Todo.Subscribe(UpdateTopbarVal);
        App.Router.OnBeforeNavigete(CleanToolbar);
    };

    const UpdateTopbarVal = (todo) => {
        Topbar().val({todo});
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
