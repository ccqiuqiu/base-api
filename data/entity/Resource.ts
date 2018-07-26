/**
 * Created by 熊超超 on 2018/7/11.
 */
import {Entity, Column} from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity()
export default class Resource extends BaseEntity {

  @Column({length: 32})
  public name: string

  @Column({length: 32, unique: true})
  public code: string

  @Column({length: 64})
  public url: string
}