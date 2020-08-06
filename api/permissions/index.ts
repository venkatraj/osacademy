import { rule, shield, or, deny, not, allow } from 'nexus-plugin-shield'
import { getUserId } from '../utils'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_root, _args, ctx) => {
    const userId = getUserId(ctx.token)
    return Boolean(userId)
  },
)

const isAdmin = rule({ cache: 'contextual' })(async (_root, _args, ctx) => {
  const userId = getUserId(ctx.token)
  const user = await ctx.db.user.findOne({
    where: {
      id: userId,
    },
  })
  return user.role === 'Admin'
})

const isInstructor = rule({ cache: 'contextual' })(
  async (_root, _args, ctx) => {
    const userId = getUserId(ctx.token)
    const user = await ctx.db.user.findOne({
      where: {
        id: userId,
      },
    })
    return user.role === 'Instructor'
  },
)

const permissions = shield({
  rules: {
    Query: {
      me: isAuthenticated,
      users: isAdmin,
    },
    Mutation: {
      '*': isAuthenticated,
      login: allow,
      signup: allow,
      createCourse: or(isAdmin, isInstructor),
      editCourse: or(isAdmin, isInstructor),
      deleteCourse: or(isAdmin, isInstructor),
      createUser: isAdmin,
      editUser: or(isAuthenticated, isAdmin),
      deleteUser: isAdmin,
    },
  },
})

export { permissions }
