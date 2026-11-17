const markdownIt = require("markdown-it");
const md = markdownIt({ html: true, linkify: true });

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("md", (v) => (v ? md.render(String(v)) : ""));
  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/site.css": "site.css" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  eleventyConfig.addCollection("reviews", (c) =>
    c.getFilteredByGlob("src/post/*.md").sort((a, b) => a.data.date - b.data.date)
  );

  eleventyConfig.addTransform("figures", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    return content.replace(
      /<p><img src="([^"]+)" alt="([^"]*)"[^>]*><\/p>/g,
      (_m, src, alt) =>
        `<figure><img src="${src}" alt="${alt}">` +
        (alt ? `<figcaption>${alt}</figcaption>` : "") +
        `</figure>`
    );
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
