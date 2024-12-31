App.List = (() => {

    const Boot = () => {
        App.Router.Register(App.List.Controller, '/list');
        App.Keybind.Register(App.List.Controller)
            .Combo('a', GoToAdd, true)
            .Combo('s', FocusSeach, true)
            .Combo('t', GoToTodo)
            .Combo('ArrowUp', Up, true)
            .Combo('ArrowDown', Down, true)
            .Combo('Enter', Enter)
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

    const Enter = () => {
        const selected = Selected();
        if (!selected) {
            return;
        }
        App.Router.Navigate(App.Detail.Controller, {id: selected.attr('app-list-task-id')});
    }

    const Up = () => {
        NextPrev('prev');
    }

    const Down = () => {
        NextPrev('next');
    }

    const Selected = () => {
        return App.Window.Content().one('[app-list-task-selected]');
    }

    const NextPrev = (dir) => {
        Select(
            App.Window.Content().all('[app-list-task]'),
            Selected(),
            (el) => {
                el.attr('app-list-task-selected', '');
                el.style.backgroundColor = '#e5e7eb';
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            },
            (el) => {
                el.attr('app-list-task-selected', null);
                el.style.backgroundColor = '';
            },
            dir
        )
    }

    const Select = (items, selected, select, unselect, dir) => {
        if (!items.length) {
            return;
        }
        let index = items.indexOf(selected);
        if (selected) {
            unselect(selected);
        }
        if (dir === 'next') {
            if (index < items.length - 1) {
                index += 1;
            }
        } else if (dir === 'prev') {
            if (index > 0) {
                index -= 1;
            }
        }
        const next = items[index];
        select(next);
    };


    return {
        Boot,
        Controller,
        GoToAdd,
        ItemClick,
        SearchKeydown,
    };

})();
