import { schema } from 'nexus'
import { intArg, inputObjectType } from 'nexus/components/schema'

schema.objectType({
  name: 'Course',
  definition(t) {
    t.id('id')
    t.string('title')
    t.string('description')
    t.list.field('users', {
      type: 'User',
      resolve(root, args, ctx) {
        return []
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
          return ctx.db.course
            .findOne({
              where: {
                id: args.id,
              },
            })
            .users()
        },
      })
  },
})

const CourseInput = schema.inputObjectType({
  name: 'CourseInput',
  definition(t) {
    t.string('title')
    t.string('description')
  },
})

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createCourse', {
      type: 'Course',
      nullable: false,
      args: {
        data: CourseInput,
      },
      resolve(_root, args, ctx) {
        const newCourse = ctx.db.course.create({
          data: {
            ...args.data,
          },
        })
        return newCourse
      },
    })
    t.field('editCourse', {
      type: 'Course',
      nullable: false,
      args: {
        id: intArg({ required: true }),
        data: CourseInput,
      },
      resolve(_root, args, ctx) {
        const course = ctx.db.course.update({
          where: {
            id: args.id,
          },
          data: {
            ...args.data,
          },
        })
        return course
      },
    })
    t.field('deleteCourse', {
      type: 'Course',
      nullable: false,
      args: {
        id: intArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        return ctx.db.course.delete({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})
