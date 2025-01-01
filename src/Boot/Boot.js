App.Boot = (() => {

    const Boot = () => {
        Data();
        Component();
        Router();
    }

    const Data = () => {
        App.Task.Boot();
    }

    const Component = () => {
        App.Add.Boot();
        App.Detail.Boot();
        App.Edit.Boot();
        App.Index.Boot();
        App.List.Boot();
        App.Keybind.Boot();
        App.Window.Boot();
    }

    const Router = () => {
        App.Router.Boot();
    }

    return Boot;

})();