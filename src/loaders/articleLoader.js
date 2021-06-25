const ArticlesPath = "static/cloud/articles";

export default class ArticlesLoader {
  constructor() {
    this.articles = {};
    this.setArticleElement();
  }

  async fetch(name) {
    return fetch(ArticlesPath + "/" + name)
      .then((response) => response.text())
      .then((data) => this.processData(name, data))
      .catch(function (error) {
        console.error(error);
      });
  }

  processData(name, data) {
    this.articles[name] = data;
  }

  reloadArticle(name) {
    if (this.articles[name]) {
      this.element.innerHTML = this.articles[name];
    } else {
      this.fetch(name).then(() => {
        this.element.innerHTML = this.articles[name];
      });
    }
  }

  setArticleElement(id = "article") {
    this.element = document.getElementById(id);
  }
}
