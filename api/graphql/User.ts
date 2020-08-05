import { schema } from 'nexus'
import { intArg, stringArg } from 'nexus/components/schema'

schema.objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('email')
    t.string('name')
    t.list.field('courses', {
      type: 'Course',
      resolve(root, args, ctx) {
        return ctx
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      nullable: false,
      type: 'User',
      resolve(root, args, ctx) {
        return ctx.db.user.findMany()
      },
    })
    t.field('user', {
      type: 'User',
      args: {
        id: intArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.db.user.findOne({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})

const UserInput = schema.inputObjectType({
  name: 'UserInput',
  definition(t) {
    t.string('name')
    t.string('email')
    t.string('password')
    t.string('role', { nullable: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      nullable: false,
      args: {
        data: UserInput,
      },
      resolve(_root, args, ctx) {
        const newUser = ctx.db.user.create({
          data: {
            ...args.data,
          },
        })
        return newUser
      },
    })
  },
})
