import tinyReact from "../assets/imgs/tiny-react.png";
import tinyAngular from "../assets/imgs/tiny-angular.png";
import tinyVue from "../assets/imgs/tiny-vue.png";
import { Filter } from "../interfaces/filters";

//Array of filters

export const FILTERS: Filter[] = [
  {
    name: "Select your news",
    value: ""
  },
  {
    name: "Angular",
    value: "angular",
    logo: tinyAngular
  },
  {
    name: "Vue",
    value: "vuejs",
    logo: tinyVue
  },
  {
    name: "React",
    value: "reactjs",
    logo: tinyReact
  }
];
