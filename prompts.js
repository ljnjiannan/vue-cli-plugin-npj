module.exports = api => {

  api.injectPrompt({
    name: 'projectMode',
    message: 'Choose project mode',
    value: 'my-feature',
    type: 'list',
    choices: [
      'signle project',
      'multi project'
    ]
  })

}