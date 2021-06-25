const ArticlesPath = "static/cloud/articles";

export default class ArticlesLoader {
  constructor() {
    this.articles = {};
  }

  async fetch(name) {
    return fetch(ArticlesPath + "/" + name + ".html")
      .then((response) => response.text())
      .then((data) => this.processData(name, data))
      .catch(function (error) {
        console.error(error);
      });
  }

  processData(name, data) {
    this.articles[name] = data;
  }
}
