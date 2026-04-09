import { createSchema } from 'graphql-yoga'
import { authResolvers } from './resolvers/auth'
import { userResolvers } from './resolvers/user'
import { cellResolvers } from './resolvers/cell'
import { categoryResolvers } from './resolvers/category'
import { collectionResolvers } from './resolvers/collection'
import { infoResolvers } from './resolvers/info'
import { venusResolvers } from './resolvers/venus'
import { payResolvers } from './resolvers/pay'
import { verifyResolvers } from './resolvers/verify'

const typeDefs = /* GraphQL */ `
  type Category {
    id: ID!
    name: String!
    src: Int!
    count: Int!
  }

  type Info {
    userCount: Int!
    cellCount: Int!
    fee: String!
    email: String!
    copyright: String!
  }

  type ReturnOK {
    isOk: Boolean!
  }

  input Pagination {
    lastID: Int!
    limit: Int!
  }

  type Collection {
    id: Int!
    cell: Girl!
  }

  type Collections {
    count: Int!
    edges: [Collection!]!
  }

  input WithCaptcha {
    cid: String!
    code: String!
  }

  input SignupWithEmail {
    email: String!
    password: String!
  }

  input appleVerifyPayload {
    code: String!
    idToken: String!
    state: String!
    platform: String!
  }

  type AuthResponse {
    token: String!
    refreshToken: String!
    id: ID!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    pwd: String!
    avatar: String!
    bio: String!
    role: Int!
    collections: String!
  }

  input Device {
    os: String!
    version: String!
    appVersion: String!
    id: String!
    lang: String!
  }

  input CellInput {
    img: String!
    text: String!
    cate: Int!
    permission: Int!
    fromID: String!
    fromURL: String!
  }

  type Girl {
    id: ID!
    img: String!
    text: String!
    cate: Int!
    permission: Int!
    createdAt: Int!
    fromID: String!
    fromURL: String!
    content: String!
    venus: Venus!
    isCollected: Boolean!
  }

  enum venusSource {
    unknown
    weibo
    red
    jike
    zhihu
    douban
    instgream
  }

  type Venus {
    id: Int!
    uid: String!
    source: venusSource!
    name: String!
    avatar: String!
    bio: String!
    initLoaded: Boolean!
    rawData: String!
    createdAt: String!
    updatedAt: String!
    remarks: String!
    priority: Int!
  }

  type VenusList {
    count: Int!
    edges: [Venus!]!
  }

  enum SkuLevel {
    tiny
    medium
  }

  type Query {
    auth(email: String!, password: String!, device: Device!): AuthResponse!
    loginByApple(payload: appleVerifyPayload!): AuthResponse!
    users(id: ID): User!
    categories: [Category!]!
    girls(take: Int!, from: Int, hideOnly: Boolean!, last: ID, venusId: Int): [Girl!]!
    cell(id: Int!): Girl!
    dislikes(from: Int!, size: Int!): [Girl!]!
    collections(from: Int!, size: Int!, cursor: Int!): Collections!
    info: Info!
    publicCells(category: Int!, take: Int!, last: Int!): [Girl!]!
    venusList(pagination: Pagination!, source: venusSource, loaded: Boolean, hasRemarks: Boolean, priority: Int): VenusList!
  }

  type Mutation {
    addGirls(cells: [CellInput!]!): [Girl!]!
    addCollection(cells: [ID!]!): ReturnOK!
    removeGirl(cells: [ID!]!, toRemove: Boolean!): ReturnOK!
    sendVerifyCode(email: String!, captcha: WithCaptcha!): Boolean!
    applePurchase(skuId: String!, receipt: String!, level: SkuLevel!): Boolean!
    addVenus(uid: String!, source: venusSource!, name: String, avatar: String, bio: String, rawData: String): Venus!
    removeVenus(id: Int, weiboUid: [String!]): Boolean!
    signup(name: String!, email: SignupWithEmail!, code: String!): AuthResponse!
    updateUserInfo(username: String, avatar: String, bio: String): User!
    refreshUserToken(refreshToken: String!, device: Device!): AuthResponse!
    updateVenus(id: Int!, name: String, avatar: String, bio: String, initLoaded: Boolean, rawData: String, remarks: String): Venus!
  }
`

export const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...authResolvers.Query,
      ...userResolvers.Query,
      ...cellResolvers.Query,
      ...categoryResolvers.Query,
      ...collectionResolvers.Query,
      ...infoResolvers.Query,
      ...venusResolvers.Query,
    },
    Mutation: {
      ...authResolvers.Mutation,
      ...userResolvers.Mutation,
      ...cellResolvers.Mutation,
      ...collectionResolvers.Mutation,
      ...payResolvers.Mutation,
      ...venusResolvers.Mutation,
      ...verifyResolvers.Mutation,
    },
  },
})
