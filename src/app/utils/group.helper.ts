import { GroupModel } from '../models/group.model';

export class GroupHelper {
  groupList: GroupModel[];

  constructor() {}

  setGroupList(groupList: GroupModel[]) {
    this.groupList = groupList;
  }

  findGroup(groupList: GroupModel[], groupId: number): GroupModel {
    this.setGroupList(groupList);
    const selected: GroupModel[] = this.groupList.filter((item) => {
      return item.id === groupId;
    });
    return selected.length > 0 ? selected[0] : null;
  }

}
