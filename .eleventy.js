const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});

  // Add posts collection
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  // HTML minification
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if(outputPath && outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
      });
    }
    return content;
  });

  return {
    dir: {
      input: "src",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk"
  };
};