App.List = (() => {

    const Boot = () => {
        App.Router.Register(App.List.Controller, '/list');
        App.Shortcut.Register(App.List.Controller)
            .Shortcut('a', GoToAdd, true)
            .Shortcut('s', FocusSeach, true)
            .Shortcut('t', GoToTodo)
        ;
    };

    const Controller = (args) => {
        const tasks = App.Task.FindAll(null, args.search);
        App.Window.Title('Todo');
        App.Window.Toolbar().render('[app-list-tpl-toolbar]', {
            search: args.search,
        });
        App.Window.Content().render('[app-list-tpl]', {
            tasks: tasks,
            search: args.search,
            count: tasks.length,
            nodata_standard: tasks.length === 0 && !args.search,
            nodata_search: tasks.length === 0 && args.search && args.search.length > 0,
        });
    };

    const ItemClick = (el) => {
        App.Router.Navigate(App.Detail.Controller, {id: el.attr('app-list-task-id')});
    };

    const GoToAdd = () => {
        App.Router.Navigate(App.Add.Controller);
    };

    const GoToTodo = () => {
        App.Router.Navigate(App.List.Controller);
    }

    const FocusSeach = () => {
        App.Window.Toolbar().one('[app-list-search]').focus();
    }

    const SearchKeydown = (n, e) => {
        if (e.key === 'Escape') {
            n.blur();
        }
        if (e.key === 'Enter') {
            App.Router.Navigate(App.List.Controller, {search: n.value});
        }
    }

    return {
        Boot,
        Controller,
        GoToAdd,
        ItemClick,
        SearchKeydown,
    };

})();
