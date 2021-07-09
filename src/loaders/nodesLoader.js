import Node from "../node";
import Cloud from "../cloud";
import CloudScaffolding from "../cloudScaffolding";

const NodesFilePath = "static/cloud/nodes.json";

export default class NodesLoader {
  constructor(cloudScaffolding) {
    this.nodes = [];
    this.colors;
    this.cloudScaffolding = cloudScaffolding;
  }

  async fetch() {
    return fetch(NodesFilePath)
      .then((response) => response.json())
      .then((data) => this.processData(data))
      .catch(function (error) {
        console.error(error);
      });
  }

  processData(data) {
    this.colors = data.colors;

    this.cloudScaffolding.create(data.nodes.length);

    let id = 0;
    for (const rawNode of data.nodes) {
      const placement = this.cloudScaffolding.placements[id];
      const color = this.colors[rawNode.category]
        ? this.colors[rawNode.category]
        : 0;

      const node = new Node(placement, {
        id: id++,
        title: rawNode.title,
        description: rawNode.description,
        category: rawNode.category,
        tags: rawNode.tags,
        color: color,
        iconSrc: "static/icons/" + rawNode.iconSrc,
        articleName: rawNode.articleSrc,
      });
      this.nodes.push(node);
    }
  }
}
