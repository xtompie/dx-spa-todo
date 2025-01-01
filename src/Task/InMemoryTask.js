App.Task = (() => {

    let inMemoryStorage = [];

    const Status = {
        TODO: 'todo',
        DONE: 'done',
        Cases: ['todo', 'done'],
        Label: {
            'todo': 'Todo',
            'done': 'Done',
        },
    }

    const Boot = () => {
        Todo.Set(Count(Status.TODO));
    }

    const load = () => {
        return [...inMemoryStorage];
    };

    const save = (tasks) => {
        inMemoryStorage = [...tasks];
        Todo.Set(Count(Status.TODO));
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

    const Todo = (() => {
        const subscribers = [];
        let value = undefined;
        const Subscribe = (subscriber) => {
            subscribers.push(subscriber);
            subscriber(value);
        }
        const Set = (val) => {
            value = val;
            subscribers.forEach(subscriber => subscriber(val));
        }
        return {
            Subscribe,
            Set,
        }
    })();

    return {
        Add,
        Boot,
        Count,
        Delete,
        FindAll,
        FindById,
        Status,
        Todo,
        Update,
        Validate,
    };
})();
