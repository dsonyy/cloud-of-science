const ArticlesPath = "static/cloud/articles";

export default class ArticlesLoader {
  constructor() {
    this.articles = {};
    this.setArticleElement();

    const articleClose = document.getElementById("article-close"); // TODO: more cleaner way to access this button
    articleClose.onclick = () => this.hideArticle();
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

  hideArticle() {
    this.element.style.display = "none";
  }

  showArticle(side = "right") {
    this.element.classList.remove("left");
    this.element.classList.remove("right");
    this.element.classList.add(side);

    this.element.style.display = "initial";
    this.element.scrollTo({ top: 0, behavior: "smooth" });
  }

  reloadArticle(name) {
    const content = this.element.getElementsByClassName("content")[0];
    content.innerHTML = "";
    if (this.articles[name]) {
      content.innerHTML = this.articles[name];
    } else {
      this.fetch(name).then(() => {
        content.innerHTML = this.articles[name];
      });
    }
  }

  setArticleElement(id = "article") {
    this.element = document.getElementById(id);
  }
}
