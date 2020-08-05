import { schema } from 'nexus'
import { intArg } from 'nexus/components/schema'

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
