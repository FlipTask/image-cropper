import {
    matchRoutes
} from "react-router-config";
import Renderer from "./Renderer";
import Routes from "../../client/Routes";
import CreateStore from "./CreateStore";

export default (req, res) => {
    const store = CreateStore(req);
    const promises = matchRoutes(Routes, req.path).map(({
        route
    }) => (route.loadData ? route.loadData(store, route, req.path, req.query, req.params) : null)).map((promise) => {
        if (promise) {
            return new Promise((resolve) => {
                Promise.all(promise).then((value) => {
                    resolve(value);
                });
            });
        }
        return false;
    });
    Promise.all(promises).then(() => {
        const context = {};
        Renderer(req, store, context).then((content) => {
            if (context.url) {
                return res.redirect(301, context.url);
            }

            if (context.notFound) {
                res.status(404);
            }
            // console.log(content);
            return res.send(content);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
};
