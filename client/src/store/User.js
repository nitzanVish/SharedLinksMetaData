import { makeAutoObservable } from "mobx";

class UserStore {
    urlsMetaData = []
    deleteUrl = ''
    token = ''

    constructor() {
        makeAutoObservable(this);
    }

    setData = (obj) => {
        this[obj.key] = obj.value
    }
}

export default UserStore;