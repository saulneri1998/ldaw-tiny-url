const knex = require('../database/connection');

exports.create = (original, tiny) => {
    return knex('urls')
        .insert({
            original,
            tiny,
            times_visited: 0,
        })
}

exports.increment = (tiny, newUrl) => {
    return knex('urls')
        .update(newUrl)
        .where('tiny', tiny);
}

exports.findOriginal = (tiny) => {
    return knex
        .select('*')
        .from('urls')
        .where('tiny', tiny)
        .first();
}