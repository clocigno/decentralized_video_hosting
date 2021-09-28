import { Drizzle, generateStore } from "@drizzle/store";
import CommentFactory from "../artifacts/CommentFactory.json";
import UserFactory from "../artifacts/UserFactory.json";
import VideoFactory from "../artifacts/VideoFactory.json";
import drawerReducer from "./slices/drawer";

const appReducers = { drawer: drawerReducer };

const options = {
  contracts: [UserFactory,
              CommentFactory,
              VideoFactory],
  polls:  { blocks: 3000,
            accounts: 1000
          }
};

const drizzleStore = generateStore({ options, appReducers });
const drizzle = new Drizzle(options, drizzleStore);

export default drizzle
export {drizzleStore}
