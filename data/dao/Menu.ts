/**
 * Created by 熊超超 on 2018/5/24.
 */
import {BaseDao} from './BaseDao'
import Menu from '../entity/Menu'

class UserDao extends BaseDao<Menu> {
  constructor() {
    super(Menu)
  }
  public findTrees() {
    const manager = this.getManager()
    return manager.getTreeRepository(Menu).findTrees()
  }
  public saveMenu(menu: any) {
    const manager = this.getManager()
    if (menu.parentId) {
      const parentMenu = new Menu(menu.parentId)
      menu.parent = parentMenu
      menu._parentId = menu.parentId
    } else {
      menu.parent = null
    }
    return manager.save(this.entityClass, menu)
  }
}

export default new UserDao()
