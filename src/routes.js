import ShareImg72 from './resources/img/icon-72x72.png';
import ShareImg96 from './resources/img/icon-96x96.png';
import ShareImg128 from './resources/img/icon-128x128.png';
import ShareImg144 from './resources/img/icon-144x144.png';
import ShareImg152 from './resources/img/icon-152x152.png';
import ShareImg192 from './resources/img/icon-192x192.png';
import ShareImg384 from './resources/img/icon-384x384.png';
import ShareImg512 from './resources/img/icon-512x512.png';
import SocialShareImg from './resources/img/backup/Social-Share-Image.png';

export default class Routes {
    apply(router) {
        const routes = [
            {
                path: '/',
                abstract: true,
                component: import('./app/views/Home'),
                routes: [
                    {
                        path: '/dashboard',
                        exact: true,
                        component: import('./app/views/Dashboard'),
                    },
                    // {
                    //     path: '/anmelden',
                    //     exact: true,
                    //     component: import('./app/views/Anmelden'),
                    // },
                    {
                        path: '/daten',
                        exact: true,
                        component: import('./app/views/Daten'),
                    },
                    {
                        path: '/report',
                        exact: true,
                        component: import('./app/views/Report'),
                    },
                ]
            },
        ];

        router.setPwaSchema({
            name: 'Health App',
            short_name: 'HealthApp',
            dir: 'ltr',
            lang: 'de-DE',
            orientation: 'any',
            start_url: '/daten',
            background_color: '#111',
            theme_color: '#111',
            display: 'standalone',
            description: 'Gesundheitsdatenerfassung',
            icons: [
                {
                    src: ShareImg72,
                    sizes: '72x72',
                },
                {
                    src: ShareImg96,
                    sizes: '96x96',
                },
                {
                    src: ShareImg128,
                    sizes: '128x128',
                },
                {
                    src: ShareImg144,
                    sizes: '144x144',
                },
                {
                    src: ShareImg152,
                    sizes: '152x152',
                },
                {
                    src: ShareImg192,
                    sizes: '192x192',
                },
                {
                    src: ShareImg384,
                    sizes: '384x384',
                },
                {
                    src: ShareImg512,
                    sizes: '512x512',
                },
            ],
        });

        router.hooks.initRoutes.tapPromise('AppRoutes', async () => {
            router.addRoutes(routes);
            // eslint-disable-next-line
            router.getDefaultSeoSchema = () => ({
                title: 'Health App',
                name: 'Health App',
                description: 'Gesundheitsdatenerfassung',
                type: 'website',
                url: 'https://health.moritzellmers.de',
                site_name: 'Health App',
                image: SocialShareImg,
                meta: [
                    {
                        name: 'author',
                        content: 'Moritz Ellmers',
                    },
                    {
                        name: 'description',
                        content: 'Gesundheitsdatenerfassung',
                    },
                    {
                        name: 'theme-color',
                        content: '#111',
                    },
                    {
                        name: 'apple-mobile-web-app-status-bar-style',
                        content: '#111',
                    },
                    {
                        name: 'msapplication-TileColor',
                        content: '#111',
                    },
                    {
                        name: 'application-name',
                        content: 'Health App',
                    },
                    {
                        name: 'generator',
                        content: 'Gesundheit',
                    },
                    {
                        name: 'apple-mobile-web-app-title',
                        content: 'Health App',
                    },
                    {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1, maximum-scale=5.0',
                    },
                ],
            });
        });
    }
}
