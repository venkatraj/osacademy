import { createTestContext } from './__helpers'

const ctx = createTestContext()

it('ensures that a user can be created', async () => {
  const newUser = await ctx.client.send(`
    mutation {
      createUser(data: {
        email: "test@test.com",
        password: "test",
        name: "Tester"
      }) {
        email
        password
        name
      }
    }
  `)

  expect(newUser).toMatchInlineSnapshot(`
    Object {
      "createUser": Object {
        "email": "test@test.com",
        "name": "Tester",
        "password": "test",
      },
    }
  `)
})
