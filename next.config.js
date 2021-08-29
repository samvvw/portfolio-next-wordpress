module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'www.demosbysam.com'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: {
                            plugins: {
                                removeViewBox: false,
                                convertShapeToPath: false,
                                mergePaths: false,
                            },
                        },
                        ref: true,
                    },
                },
            ],
        });

        return config;
    },
};
