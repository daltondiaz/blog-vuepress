module.exports = {
    title: 'Hello VuePress',
    description: 'Just playinh around',
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'static/img'
            }
        }
    },
    themeConfig: {
        nav: [
            { text: 'Counter', link: '/counter/' },
            { text: 'Guide', link: '/guide/'},
        ],
        sidebar: [
            {
                title: 'Counter',
                collapsable: false,
                children: [
                    '/counter/counter-app'
                ]
            },
            {
                title: 'API Guide',
                collapsable: false,
                children: [
                    '/guide/guide',
                    '/guide/api'
                ]
            }
        ]
    }
}