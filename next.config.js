module.exports = {
  webpack: (config) => {
    // Remove or comment out custom CSS rules
    // config.module.rules.push(
    //   {
    //     test: /\.css$/,
    //     use: [
    //       'style-loader',
    //       'css-loader'
    //     ],
    //   },
    //   {
    //     test: /\.scss$/,
    //     use: [
    //       'style-loader',
    //       'css-loader',
    //       'sass-loader'
    //     ],
    //   }
    // );

    return config;
  },
};
