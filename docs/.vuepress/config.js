module.exports = {
    title: '0Day',
    description: 'Post since Java until Machine Learning',
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'static/img'
            }
        }
    },
    themeConfig: {
        nav: [
            { text: 'Blog', link: '/blog/' },
            {
                text: 'GitHub',
                link: 'https://github.com/daltondiaz'
            }
        ],
        sidebar: [
            {
                title: 'Blog',
                collapsable: false,
                children: [
                    '/blog'
                ]
            },
            
        ]
    }
}