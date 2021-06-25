import Node from "./node";
import Cloud from "./cloud";

const NodesFilePath = "static/cloud/nodes.json";

export default class NodesLoader {
  constructor(cloudRadius) {
    this.nodes = [];
    this.colors;
    this.cloudRadius = cloudRadius;
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

    const points = Cloud.calcFibonacciSpherePoints(
      data.nodes.length,
      this.cloudRadius
    );

    let id = 0;
    for (const rawNode of data.nodes) {
      const point = points.pop();
      const color = this.colors[rawNode.category]
        ? this.colors[rawNode.category]
        : 0;

      const node = new Node(point[0], point[1], point[2], {
        id: id++,
        title: rawNode.title,
        description: rawNode.description,
        category: rawNode.category,
        tags: rawNode.tags,
        color: color,
        iconSrc: "static/icons/" + rawNode.iconSrc,
        articleSrc: "static/cloud/" + rawNode.articleSrc,
      });
      this.nodes.push(node);
    }
  }
}
