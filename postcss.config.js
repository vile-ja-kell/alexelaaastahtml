// Keskkonna muutuja, mis määrab, kas minimeerida CSS-i või mitte
// Vaikimisi on minimiseerimine välja lülitatud (arenduskeskkonna jaoks)
const MINIFY_CSS = process.env.MINIFY_CSS === 'true';

module.exports = {
    plugins: [
      // Põhilised töötlemise pluginad
      require('postcss-import'),      // Käsitleb @import reegleid
      require('postcss-nested'),      // Võimaldab CSS reeglite pesastamist
      require('autoprefixer'),        // Lisab tarnija eesliited
      
      // Vormindamine ja organiseerimine
      require('postcss-sorting')({
        'order': [
          'custom-properties',        // :root { --color: red; }
          'dollar-variables',         // $color: red;
          'declarations',             // color: red;
          'at-rules',                 // @media, @supports
          'rules'                     // .foo { ... }
        ],
        // Kasutame SMACSS järjestust omaduste jaoks
        'properties-order': 'smacss',
        // Säilitame tühikud reeglite vahel
        'preserve-empty-lines-between-children-rules': true
      }),
      
      // Optimeerimine (tingimuslik)
      ...(MINIFY_CSS ? [require('cssnano')] : []),
      
      // Funktsioonid
      require('postcss-custom-media')  // Käsitleb kohandatud meediapäringuid
    ],
    map: {
      inline: false,
      annotation: true,
      sourcesContent: true
    }
  };