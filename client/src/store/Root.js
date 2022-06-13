import UserStore from "./User";
import React from 'react';

class RootStore {
    constructor() {
      this.UserStore = new UserStore(this)
    }
  }
  const StoresContext = React.createContext(new RootStore());
  
  export const useStores = () => React.useContext(StoresContext);