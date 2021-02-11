import Aurelia, { RouterConfiguration } from 'aurelia';
import { MyApp } from './app/my-app';
import { Navmenu } from "./navmenu/navmenu";
import { MissingPage } from "./missing/missing-page";
import { Counter } from './counter/counter';
import { Fetchdata } from './fetchdata/fetchdata';
import "bootstrap/dist/css/bootstrap.min.css";

Aurelia
  .register(Navmenu, MissingPage, Counter, Fetchdata)
  .register(RouterConfiguration)
  // To use HTML5 pushState routes, replace previous line with the following
  // customized router config.
  // .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))
  .app(MyApp)
  .start();
