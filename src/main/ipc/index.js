import { windowHandler } from "./windowHandler";
import {storeHandler} from "./storeHandler";

export function registerIpcHandler() {
  windowHandler();
  storeHandler();
}
