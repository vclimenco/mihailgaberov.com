module.exports = {
  plugins: [
    'postcss-custom-media',
    'postcss-easings',
    ['postcss-preset-env',
      {
        stage: 0,
        'logical-properties-and-values': false,
        'prefers-color-scheme-query': false,
        'gap-properties': false,
        'custom-properties': false,
        'dir-pseudo-class': false,
        'focus-within-pseudo-class': false,
        'focus-visible-pseudo-class': false,
        'color-functional-notation': false,
      }
    ]
  ]
};