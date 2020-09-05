module.exports = function (eleventyConfig) {
    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("img");

    // Copy `css/` to `_site/css`
    eleventyConfig.addPassthroughCopy("css");

    eleventyConfig.addPassthroughCopy('admin');

    // eleventyConfig.addPassthroughCopy({'posts': "blog/posts"});

    const {
        DateTime
    } = require("luxon");

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
        }).toFormat('yy-MM-dd');
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'utc'
        }).toFormat("MMM dd").toUpperCase();
    });

    eleventyConfig.addFilter("displayYearOnly", dateObj => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'utc'
        }).toFormat("yyyy");
    });

    eleventyConfig.addFilter('postsByYear', (arr, yr) => {
        const favs = p => (p.data.date).toString().includes(yr);
        return arr.filter(favs);
    });
  };