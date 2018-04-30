module.exports = {
    title: 'Hello VuePress',
    description: 'Just playinh around',
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': 'static/img'
            }
        }
    }
}