App.Task = (() => {

    const storageKey = 'App.Task';
    const onUpdateListeners = [];

    const Status = {
        TODO: 'todo',
        DONE: 'done',
        Cases: ['todo', 'done'],
        Label: {
            'todo': 'Todo',
            'done': 'Done',
        },
    }

    const load = () => {
        const rawData = localStorage.getItem(storageKey);
        return rawData ? JSON.parse(rawData) : [];
    };

    const save = (tasks) => {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
        onUpdateListeners.forEach(listener => listener(tasks));
    };

    const Add = (task) => {
        const tasks = load();
        tasks.push(task);
        save(tasks);
    };

    const FindById = (id) => {
        const tasks = load();
        return tasks.find(task => task.id === id) || null;
    };

    const FindAll = (status = null, search = null) => {
        let tasks = load();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task => task.content.toLowerCase().includes(search.toLowerCase()));
        }
        return tasks;
    };

    const Count = (status = null, search = null) => {
        return FindAll(status, search).length;
    };

    const Update = (task) => {
        const tasks = load();
        const index = tasks.findIndex(i => i.id === task.id);
        if (index === -1) {
            return;
        }
        tasks[index] = task;
        save(tasks);
    };

    const OnUpdate = (listener) => {
        onUpdateListeners.push(listener);
    }

    const Validate = (task) => {
        let errors = {};
        if (!task.content || task.content.length < 3) {
            errors.content = 'Content must be at least 3 characters';
        }
        return Object.keys(errors).length > 0 ? errors : null;
    }

    const Delete = (id) => {
        const tasks = load();
        const index = tasks.findIndex(i => i.id === id);
        if (index === -1) {
            return;
        }
        tasks.splice(index, 1);
        save(tasks);
    }

    return {
        Add,
        Count,
        Delete,
        FindAll,
        FindById,
        OnUpdate,
        Status,
        Update,
        Validate,
    };

})();
