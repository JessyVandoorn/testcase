import { observable, action, toJS } from 'mobx';
import { RootStore } from './index';

class UserStore {
    public rootStore: RootStore;

    @observable
    public users = {};

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action setUsers = (users: {}) => {
        this.users = toJS(users);
    }
}

export default UserStore;