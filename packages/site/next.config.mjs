import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@leafac/rehype-shiki';
import * as shiki from 'shiki';

const analyticsProxy = 'https://api2.amplitude.com/2/httpapi';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        turbo: {},
    },
    // Add wasm support
    webpack(config) {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true,
        };

        config.module.rules.push({
            test: /\.wasm$/,
            type: 'javascript/auto',
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'static/wasm/[name].[hash].[ext]',
                        publicPath: '/_next/',
                    },
                },
            ],
        });

        // Remove all other WASM-related config
        return config;
    },
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
    async rewrites() {
        return {
            beforeFiles: [],
            fallback: [
                // {
                //     source: '/mp/:path*',
                //     destination: `${analyticsProxy}/:path*`,
                // },
            ],
        };
    },
    skipTrailingSlashRedirect: true,
};

async function getConfig() {
    return nextConfig;
    // const highlighter = await shiki.getHighlighter({
    //     theme: 'light-plus',
    // });

    // const withMDX = createMDX({
    //     extension: /\.mdx?$/,
    //     // Add markdown plugins here, as desired
    //     options: {
    //         remarkPlugins: [remarkGfm],
    //         rehypePlugins: [
    //             [
    //                 rehypeShiki,
    //                 {
    //                     highlighter,
    //                     theme: 'light-plus', // You can choose from Shiki's supported themes
    //                     langs: [
    //                         'javascript',
    //                         'typescript',
    //                         'python',
    //                         'css',
    //                         'html',
    //                     ],
    //                 },
    //             ],
    //         ],
    //     },
    // });

    // // Merge MDX config with Next.js config
    // return withMDX(nextConfig);
}

export default await getConfig();
