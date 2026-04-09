import { pgTable, serial, varchar, text, timestamp, smallint, bigint, integer, boolean, uniqueIndex } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 48 }).unique().notNull(),
  phone: varchar('phone', { length: 48 }).default(''),
  name: varchar('name', { length: 36 }).notNull(),
  pwd: text('pwd').notNull(),
  avatar: text('avatar').default(''),
  bio: text('bio').default(''),
  createdAt: timestamp('createdat').defaultNow().notNull(),
  updatedAt: timestamp('updatedat').defaultNow().notNull(),
  role: integer('role').default(90),
  appleId: varchar('appleid', { length: 512 }).default(''),
})

export const cells = pgTable('cells', {
  id: serial('id').primaryKey(),
  img: varchar('img').unique().notNull(),
  text: varchar('text').default(''),
  cate: integer('cate'),
  createdBy: integer('createdby'),
  createdAt: timestamp('createdat').defaultNow().notNull(),
  updatedAt: timestamp('updatedat').defaultNow().notNull(),
  permission: smallint('premission').default(2),
  fromUrl: varchar('from_url').default(''),
  fromId: varchar('from_id').default(''),
  content: text('content').default(''),
  md5: varchar('md5').default(''),
  venusId: integer('venus_id').default(-1),
  likes: bigint('likes', { mode: 'number' }).default(0),
})

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 36 }).unique().notNull(),
  src: integer('src'),
  createdAt: timestamp('createdat').defaultNow().notNull(),
  updatedAt: timestamp('updatedat').defaultNow().notNull(),
})

export const collections = pgTable('collections', {
  id: serial('id').primaryKey(),
  cell: integer('cell').notNull(),
  owner: integer('owner').notNull(),
  isDislike: boolean('is_dislike').default(false),
})

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name').default(''),
  description: varchar('description').default(''),
  createdAt: timestamp('createdat').defaultNow().notNull(),
  updatedAt: timestamp('updatedat').defaultNow().notNull(),
})

export const tagsGirls = pgTable('tags_girls', {
  id: serial('id').primaryKey(),
  tagId: integer('tag_id'),
  cellId: integer('cell_id'),
  createdAt: timestamp('createdat').defaultNow(),
  updatedAt: timestamp('updatedat').defaultNow(),
})

export const purchases = pgTable('purchases', {
  id: serial('id').primaryKey(),
  channel: varchar('channel'),
  skuId: varchar('sku_id'),
  level: varchar('level'),
  userId: integer('user_id').notNull(),
  notes: varchar('notes').default(''),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const venus = pgTable('venus', {
  id: serial('id').primaryKey(),
  uid: varchar('uid').notNull(),
  source: integer('source').default(0),
  name: varchar('name').default(''),
  avatar: varchar('avatar').default(''),
  bio: text('bio').default(''),
  rawData: text('rawdata').default(''),
  initLoad: boolean('initload').default(false),
  remarks: text('remarks').default(''),
  priority: integer('priority').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('venus_uid_source_key').on(table.uid, table.source),
])
