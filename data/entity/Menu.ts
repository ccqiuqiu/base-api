/**
 * Created by 熊超超 on 2018/5/24.
 */

import {Entity, Column, Tree, TreeChildren, TreeParent} from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity()
@Tree('materialized-path')
export default class Menu extends BaseEntity {

  @Column({length: 32})
  public name: string

  @Column({length: 64})
  public url: string

  @Column({length: 32, nullable: true})
  public icon: string

  @Column()
  public sort: number

  @TreeChildren()
  children: Menu[]

  @TreeParent()
  parent: Menu

  @Column({length: 255, nullable: true})
  public _parentId?: string
}
