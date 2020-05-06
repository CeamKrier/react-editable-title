import typescript from '@rollup/plugin-typescript'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const isDev = process.env.DEV === 'true'
const dir = isDev ? 'src/dev/' : 'lib'
const input = isDev ? 'src/dev/showcase.tsx' : 'src/index.tsx'

export default {
    input: input,
    output: {
        format: 'cjs',
        dir: dir,
        sourcemap: true
    },
    external: [
        'react'
    ],
    plugins: [
      typescript({
        sourceMap: true
      }),
      isDev && livereload(),
      isDev && serve({
        open: true,
        contentBase: 'src/dev/',
        port: 2000,
      })
    ]
}; 