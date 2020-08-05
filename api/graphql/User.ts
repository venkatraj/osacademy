import { schema } from 'nexus'

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
      }
    })
  }
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('users', {
      nullable: false,
      type: 'User',
      list: true,
      resolve(root, args, ctx) {
        return [{ id: 1, email: 'hello@example.com', name: 'hello'}]        
      }
    })
  }
})