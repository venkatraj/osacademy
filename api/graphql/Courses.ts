import { schema } from 'nexus'
import { intArg } from 'nexus/components/schema'

schema.objectType({
  name: 'Course',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('description')
    t.list.field('users', {
      type: 'User',
      resolve(root, args, ctx) {
        return ctx
      },
    })
  },
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.list.field('courses', {
      nullable: false,
      type: 'Course',
      resolve(root, args, ctx) {
        return ctx.db.course.findMany()
      },
    }),
      t.field('course', {
        type: 'Course',
        args: {
          id: intArg({ required: true }),
        },
        resolve(_root, args, ctx) {
          return ctx.db.course.findMany({
            where: {
              id: args.id,
            },
          })
        },
      })
  },
})
