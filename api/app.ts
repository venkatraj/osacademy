import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from 'nexus-plugin-jwt-auth'
import protectedPaths from './permissions'
import { APP_SECRET } from './utils'
import { UserRole } from '../prisma/Studio/-osacademy'

use(prisma())

use(
  auth({
    appSecret: APP_SECRET,
    protectedPaths,
  }),
)
