import {
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Object3D,
  TextureLoader,
  Vector3,
} from "three";
import type { Section } from "../models/data/DataWrapper";
import SVGEntity from "../models/data/SVGEntity";
import Text from "../models/data/Text";
import Entity from "../models/world/entity";

const textLength = 50;

export class Wall extends Object3D {
  private section: Section;
  constructor(section: Section) {
    super();
    this.section = section;
  }

  async load() {
    this.makeWall();
    await this.makeDescription();
    await this.makeImage();
    await this.makeTitle();
    await this.makeConnections();
  }

  private makeWall() {
    const geometry = new BoxGeometry(10, 6, 0.1);
    const material = new MeshPhongMaterial({ color: 0x232c3b });
    const cube = new Mesh(geometry, material);
    this.add(cube);
  }

  private async makeDescription() {
    const description = new Entity();

    const descriptionContent: string[] = [""];
    const text = this.section.description.split(" ");
    for (let i = 0, j = 0; i < text.length; i++) {
      if (descriptionContent[j].length + text[i].length <= textLength) {
        descriptionContent[j] += text[i] + " ";
      } else if (i !== text.length - 1) {
        j++;
        descriptionContent.push(text[i] + " ");
      }
    }

    for (let i = 0; i < descriptionContent.length; i++) {
      const text = await new Text(descriptionContent[i], 0x33c1de).load();
      text.scale.multiplyScalar(0.2);
      text.position.y = -i * 0.3;

      description.add(text);
    }

    description.position.set(-2.2, 1.7, 0);

    this.add(description);
  }

  private async makeTitle() {
    const text = await new Text(this.section.name, 0x33c1de).load();
    text.position.set(-2.2, 2.15, 0);
    text.scale.multiplyScalar(0.3);
    this.add(text);
  }

  private async makeImage() {
    if (!this.section.image) return;

    const texture = new TextureLoader().load(`/images/${this.section.image}`);
    const material = new MeshBasicMaterial({ map: texture });

    const mesh = new Mesh(new BoxGeometry(2.5, 2.5, 0.2), [
      new MeshLambertMaterial({ color: "lightgray" }),
      new MeshLambertMaterial({ color: "lightgray" }),
      new MeshLambertMaterial({ color: "lightgray" }),
      new MeshLambertMaterial({ color: "lightgray" }),
      material,
      material,
      new MeshLambertMaterial({ color: "lightgray" }),
    ]);
    mesh.position.set(-4, 2, 0);

    this.add(mesh);
  }

  private async makeConnections() {
    const connections = new Entity();
    console.log(this.section);

    for (let i = 0; i < this.section.connections.length; i++) {
      const svgGroup = new Group();
      const svg = new SVGEntity();
      connections.add(svgGroup);

      await svg.load(this.section.connections[i].image!);
      svg.scale.multiplyScalar(0.1);
      svg.rotateX(Math.PI / 2);
      if (!this.section.image) {
        if (i < 6) {
          svg.position.set(i % 2, ((i % 2 ? 1 : 0) - i) / 1.5, 0.1);
        } else {
          svg.position.set(13.9 - i, -4, 0.1);
        }
        svg.position.add(new Vector3(-4.5, 2.5, 0));
      } else {
        svg.position.set(i % 2, ((i % 2 ? 1 : 0) - i) / 1.5, 0.1);
        svg.position.add(new Vector3(-5, 0.5, 0));
      }
      const text = await new Text(this.section.connections[i].value).load();
      text.position.set(
        svg.position.x,
        svg.position.y - 1.2,
        svg.position.z - 0.075
      );
      text.scale.setScalar(0.1);
      svgGroup.add(text);
      svgGroup.add(svg);
    }
    this.add(connections);
  }
}
