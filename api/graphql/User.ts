import { schema } from 'nexus'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { APP_SECRET, getUserId } from '../utils'

schema.objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('email')
    t.string('name')
    t.string('password')
    t.string('role')
    t.list.field('courses', {
      type: 'Course',
      resolve(root, args, ctx) {
        return []
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
    t.field('me', {
      type: 'User',
      resolve(_root, args, ctx) {
        const userId = getUserId(ctx.token)
        if (!userId) {
          throw new Error('Not Authorized User')
        }

        return ctx.db.user.findOne({
          where: {
            id: parseInt(userId),
          },
        })
      },
    })
  },
})

const UserInput = schema.inputObjectType({
  name: 'UserInput',
  definition(t) {
    t.string('name', { required: true })
    t.string('email', { required: true })
    t.string('password', { required: true })
    t.string('role', { nullable: true })
  },
})

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        data: UserInput,
      },
      resolve: async (_root, { data }, ctx) => {
        // const { name, email, password, role } = data
        const hashedPassword = await hash(data.password, 10)
        const user = await ctx.db.user.create({
          data: {
            ...data,
            password: hashedPassword,
          },
        })

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })
    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: schema.stringArg({ required: true }),
        password: schema.stringArg({ required: true }),
      },
      resolve: async (_root, args, ctx) => {
        const user = await ctx.db.user.findOne({
          where: {
            email: args.email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${args.email}`)
        }

        const isValidPassword = await compare(args.password, user.password)
        if (!isValidPassword) {
          throw new Error('Invalid Password')
        }

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })
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
    t.field('editUser', {
      type: 'User',
      nullable: false,
      args: {
        id: schema.intArg({ required: true }),
        data: UserInput,
      },
      resolve(_root, args, ctx) {
        const user = ctx.db.user.update({
          where: {
            id: args.id,
          },
          data: {
            ...args.data,
          },
        })
        return user
      },
    })
    t.field('deleteUser', {
      type: 'User',
      nullable: false,
      args: {
        id: schema.intArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        const user = ctx.db.user.delete({
          where: {
            id: args.id,
          },
        })
        return user
      },
    })
  },
})
