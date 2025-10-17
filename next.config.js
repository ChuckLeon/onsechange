/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["./styling"],
    prependData: `
      @import "colors.scss";
      @import "spacing.scss";
      @import "helpers.scss";
      @import "functions.scss";
    `,
  },
};

module.exports = nextConfig;
