import { schema } from 'nexus'

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
      }
    })
  }
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('courses', {
      nullable: false,
      type: 'Course',
      list: true,
      resolve(root, args, ctx) {
        return [{ id: 1, title: 'Learning GraphQL', description: 'lots of stuff'}]
      }
    })
  }
})