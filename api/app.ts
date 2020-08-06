import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from 'nexus-plugin-jwt-auth'
import { permissions } from './permissions'
import { APP_SECRET } from './utils'

use(prisma())

use(
  auth({
    appSecret: APP_SECRET,
  }),
)

use(permissions)
