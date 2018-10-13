
const { join, basename, relative } = require('path');
const moment = require('moment');
const glob = require('glob');
const { readFileSync } = require('fs');

const readTitleFromMd = path => {
    const lines = readFileSync(path, 'utf8').split('\n').map(l => l.trim());
    const headerLine = lines.find(l => /^#[^#].*$/.test(l));
    const match = headerLine.match(/^#(.*)/);
    if (!match) return;
    return match[1].trim();
};

const generateBlogSideBar = dir => {
    const structure = {};
    const files = glob.sync('**/*.md', { cwd: join(__dirname, '..', dir) })
    .filter(p => basename(p) !== 'README.md')
    .map(p => {
        const [year, month, filename] = p.split('/');
        const day = basename(filename, '.md');
        return [year, month, day];
    }).forEach(([year, month, day]) => {
        structure[year] = { ...structure[year] };
        structure[year][month] = {
            ...structure[year][month],
            [day]: join(dir, year, month, day),
        };
    });
    
    const years = Object.keys(structure).sort().reverse();
    const recentYear = (year => {
        const months = Object.keys(structure[year]).sort().reverse();
        return months.map(month => {
            const days = Object.keys(structure[year][month]).sort().reverse();
            return {
                title: moment(`${year}-${month}`).format('YYYY MMM'),
                collapsable: false,
                children: days.map(day => {
                    const url = join(dir, year, month, day);
                    const date = moment(`${year}-${month}-${day}`).format('DD MMMM YYYY');
                    return [url, date + ' - ' + readTitleFromMd(join(__dirname, '..', url + '.md'))]
                }),
            };
        });
    })(years[0]);
    
    return [...recentYear, ...years.slice(1).map(year => {
        const months = Object.keys(structure[year]).sort().reverse();
        return {
            title: year,
            collapsable: true,
            children: [].concat(...months.map(month => {
                const days = Object.keys(structure[year][month]).sort().reverse();
                return days.map(day => {
                    const url = join(dir, year, month, day);
                    const date = moment(`${year}-${month}-${day}`).format('DD MMMM YYYY');
                    return [url, date + ' - ' + readTitleFromMd(join(__dirname, '..', url + '.md'))]
                });
            }))
        };
})];
};


module.exports = {
    title: '0Day',
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'static/img'
            }
        }
    },
    locales: {
        // The key is the path for the locale to be nested under.
        // As a special case, the default locale can use '/' as its path.
        '/': {
            lang: 'en-US', // this will be set as the lang attribute on <html>
            title: '0day',
            description: 'Post since Java until Machine Learning',
        },
        '/pt/': {
            lang: 'pt-BR',
            title: '0day',
            description: 'Desde Java até Machine Learning',
        }
    },
    sidebarDepth: 0,
    themeConfig: {
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                nav: [
                    { text: 'Blog', link: '/blog/' },
                    { text: 'Who am I?', link: '/who/'},
                    {
                        text: 'GitHub',
                        link: 'https://github.com/daltondiaz'
                    }
                ],
                sidebar:{
                    '/blog/': [
                        '',
                        ...generateBlogSideBar('/blog'),
                    ],
                    '/who/': [
                       '', 
                    ]
                },
            },
            '/pt/': {
                selectText: 'Idioma',
                label: 'Português',
                nav: [
                    { text: 'Blog', link: '/pt/blog/' },
                    { text: 'Quem sou?', link: '/pt/quem/'},
                    {
                        text: 'GitHub',
                        link: 'https://github.com/daltondiaz'
                    }
                ],
                sidebar:{
                    '/pt/blog/': [
                        '',
                        ...generateBlogSideBar('/pt/blog'),
                    ],
                    '/pt/quem/': [
                       '', 
                    ]
                },
            }
        },
    },
    markdown: {
      config: md => {
          md.use(require('markdown-it-deflist')),
          md.use(require('markdown-it-katex'))
      } 
    },
    head :[
        ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css'}],
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css'}]
    ]
}