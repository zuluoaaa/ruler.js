import scss from 'rollup-plugin-scss';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/ruler.js',
        format: 'umd',
        name:"Ruler"
    },
    plugins: [ scss() ]
};