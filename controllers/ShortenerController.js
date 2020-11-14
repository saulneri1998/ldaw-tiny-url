const { nanoid } = require('nanoid');
const urlsModel = require('../models/urls')
const appConfig = require('../configs/app');

exports.index = (req, res) => {
    res.render('homepage/index');
}

exports.newUrl = (req, res) => {
    const original = req.body.original;
    const tiny = nanoid(5);
    urlsModel.create(original, tiny)
        .then(_ => {
            const mini = `http://localhost:${appConfig.expressPort}/${tiny}`
            res.render('homepage/created', { mini });
        })
        .catch(err => console.log(err))
}

exports.redirectTiny = (req, res) => {
    const tiny = req.params.id;
    urlsModel.findOriginal(tiny)
        .then(url => {
            console.log(url)
            const newUrl = {...url, times_visited: url.times_visited + 1 };
            urlsModel.increment(tiny, newUrl)
                .then(url2 => {
                    return res.redirect(url.original);
                }).catch(err => console.log(err))
        }).catch(err => console.log(err))
}

exports.statsTiny = (req, res) => {
    const tiny = req.params.id.slice(0, 5);
    urlsModel.findOriginal(tiny)
        .then(url => {
            const tiny = `http://localhost:${appConfig.expressPort}/${url.tiny}`
            const original = url.original;
            const timesVisited = url.times_visited;
            res.render('homepage/stats', { original, tiny, timesVisited });
        }).catch(err => console.log(err))
}