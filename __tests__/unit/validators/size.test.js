jest.mock('node-fetch')

let mockedFetch = require('node-fetch')
    let validation = await size.processValidate(createMockContext(FILES), settings)
    let validation = await size.processValidate(createMockContext(FILES), settings)
      do: 'size'
    let validation = await size.processValidate(createMockContext(FILES), settings)
    let validation = await size.processValidate(createMockContext(FILES), settings)
    let validation = await size.processValidate(createMockContext(FILES), settings)
    let validation = await size.processValidate(createMockContext(FILES), settings)
    let validation = await size.processValidate(createMockContext(FILES), settings)
    let validation = await size.processValidate(createMockContext(files), settings)
    validation = await size.processValidate(createMockContext(files), settings)
    expect(validation.status).toBe('pass')
    expect(validation.validations[0].description).toBe('PR size for additions is OK!')
    expect(validation.validations[0].status).toBe('pass')
    expect(validation.validations[1].description).toBe('PR size for deletions is OK!')
    expect(validation.validations[1].status).toBe('pass')
    expect(validation.validations[2].description).toBe('PR size for total additions + deletions is OK!')
    expect(validation.validations[2].status).toBe('pass')

    // Explicitly setting ignore to blank so
    // that we can test for matches.
    settings.match = ['not_*.js']
    settings.ignore = []

    let validation = await size.processValidate(createMockContext(FILES), settings)
    validation = await size.processValidate(createMockContext(FILES), settings)
describe('Size Ignore comment functionality', () => {
  const FILES = [
    {
      filename: 'thing.js',
      status: 'modified',
      additions: 10,
      deletions: 5,
      changes: 15
    },
    {
      filename: 'another.js',
      status: 'added',
      additions: 3,
      deletions: 2,
      changes: 5
    },
    {
      filename: 'removed_file_should_be_ignored.js',
      status: 'removed',
      additions: 0,
      deletions: 500,
      changes: 500
    }
  ]

  test('both single line comments and block comments are ignored', async () => {
    const size = new Size()
    const settings = {
      do: 'size',
      lines: {
        total: {
          count: 1,
          message: 'Too big!'
        },
        ignore_comments: true
      }
    }

    mockedFetch.mockReturnValueOnce({
      text: () => {
        return 'diff --git a/commentTestFiles.js b/commentTestFiles.js\n' +
          'new file mode 100644\n' +
          'index 0000000..983b141\n' +
          '--- /dev/null\n' +
          '+++ b/commentTestFiles.js\n' +
          '@@ -0,0 +1,5 @@\n' +
          '+// this is a comment\n' +
          '+ // second comment\n' +
          '+ non comment\n' +
          '+\n' +
          '+/*\n' +
          '+    Comment block\n' +
          '+ */\n'
      }
    })

    let validation = await size.processValidate(createMockContext(FILES), settings)
    expect(validation.status).toBe('fail')

    mockedFetch.mockReturnValueOnce({
      text: () => {
        return 'diff --git a/commentTestFiles.js b/commentTestFiles.js\n' +
          'new file mode 100644\n' +
          'index 0000000..983b141\n' +
          '--- /dev/null\n' +
          '+++ b/commentTestFiles.js\n' +
          '@@ -0,0 +1,5 @@\n' +
          '+// this is a comment\n' +
          '+/*\n' +
          '+    Comment block\n' +
          '+ */\n'
      }
    })

    validation = await size.processValidate(createMockContext(FILES), settings)
    expect(validation.status).toBe('pass')
    expect(validation.validations[0].description).toBe('PR size for total additions + deletions is OK!')
  })

  test('non supported file extension are ignored', async () => {
    const size = new Size()
    const settings = {
      do: 'size',
      lines: {
        total: {
          count: 1,
          message: 'Too big!'
        },
        ignore_comments: true
      }
    }

    mockedFetch.mockReturnValueOnce({
      text: () => {
        return 'diff --git a/commentTestFiles.notsupportedExtension b/commentTestFiles.notsupportedExtension\n' +
          'new file mode 100644\n' +
          'index 0000000..983b141\n' +
          '--- /dev/null\n' +
          '+++ b/commentTestFiles.notsupportedExtension\n' +
          '@@ -0,0 +1,5 @@\n' +
          '+// this is a comment\n' +
          '+/*\n' +
          '+    Comment block\n' +
          '+ */\n'
      }
    })

    let validation = await size.processValidate(createMockContext(FILES), settings)
    expect(validation.status).toBe('fail')
  })

  test('.js file extension works properly', async () => {
    const size = new Size()
    const settings = {
      do: 'size',
      lines: {
        total: {
          count: 1,
          message: 'Too big!'
        },
        ignore_comments: true
      }
    }

    mockedFetch.mockReturnValueOnce({
      text: () => {
        return 'diff --git a/commentTestFiles.js b/commentTestFiles.js\n' +
          'new file mode 100644\n' +
          'index 0000000..983b141\n' +
          '--- /dev/null\n' +
          '+++ b/commentTestFiles.js\n' +
          '@@ -0,0 +1,5 @@\n' +
          '+// this is a comment\n' +
          '+ // second comment\n'
      }
    })

    let validation = await size.processValidate(createMockContext(FILES), settings)
    expect(validation.status).toBe('pass')

    mockedFetch.mockReturnValueOnce({
      text: () => {
        return 'diff --git a/commentTestFiles.js b/commentTestFiles.js\n' +
          'new file mode 100644\n' +
          'index 0000000..983b141\n' +
          '--- /dev/null\n' +
          '+++ b/commentTestFiles.js\n' +
          '@@ -0,0 +1,5 @@\n' +
          '+/*\n' +
          '+    Comment block\n' +
          '+ */\n'
      }
    })

    validation = await size.processValidate(createMockContext(FILES), settings)
    expect(validation.status).toBe('pass')
  })

  test('.py file extension works properly', async () => {
    const size = new Size()
    const settings = {
      do: 'size',
      lines: {
        total: {
          count: 0,
          message: 'Too big!'
        },
        ignore_comments: true
      }
    }

    mockedFetch.mockReturnValueOnce({
      text: () => {
        return 'diff --git a/commentTestFiles.py b/commentTestFiles.py\n' +
          'new file mode 100644\n' +
          'index 0000000..983b141\n' +
          '--- /dev/null\n' +
          '+++ b/commentTestFiles.js\n' +
          '@@ -0,0 +1,5 @@\n' +
          '+# this is a comment\n' +
          '+ # second comment\n' +
          '+ non comment\n'
      }
    })

    let validation = await size.processValidate(createMockContext(FILES), settings)
    expect(validation.status).toBe('fail')

    mockedFetch.mockReturnValueOnce({
      text: () => {
        return 'diff --git a/commentTestFiles.py b/commentTestFiles.py\n' +
          'new file mode 100644\n' +
          'index 0000000..983b141\n' +
          '--- /dev/null\n' +
          '+++ b/commentTestFiles.py\n' +
          '@@ -0,0 +1,5 @@\n' +
          '+# this is a comment\n' +
          '+ # second comment\n'
      }
    })

    validation = await size.processValidate(createMockContext(FILES), settings)
    expect(validation.status).toBe('pass')
  })
})
