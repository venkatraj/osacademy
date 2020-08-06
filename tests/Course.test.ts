import { createTestContext } from './__helpers'

const ctx = createTestContext()

it('ensures that a course can be created', async () => {
  const newCourse = await ctx.client.send(`
    mutation {
      createCourse(data: {
        title: "Testing with Jest",
        description: "Making testing easier with automatic tests",
      }) {
        title
        description
      }
    }
  `)

  expect(newCourse).toMatchInlineSnapshot(`
    Object {
      "createCourse": Object {
        "description": "Making testing easier with automatic tests",
        "title": "Testing with Jest",
      },
    }
  `)
})
