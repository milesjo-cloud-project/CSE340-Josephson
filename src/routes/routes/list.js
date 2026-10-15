import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const region = typeof req.query.region === 'string' ? req.query.region.toLowerCase() : 'all';
    const season = typeof req.query.season === 'string' ? req.query.season.toLowerCase() : 'all';
    const routes = (await getAllRoutes()).filter(route =>
        (region === 'all' || route.region.toLowerCase() === region) &&
        (season === 'all' || route.bestSeason.toLowerCase() === season)
    );
    const seasons = await getListOfSeasons();

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: { region, season }
    });
};
