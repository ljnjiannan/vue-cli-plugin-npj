module.exports = pkg => {
  const prompts = [
    {
      name: 'projectMode',
      message: 'Choose project mode',
      value: 'my-feature',
      type: 'list',
      choices: [
        'signle project',
        'multi project'
      ]
    }
  ]

  return prompts
  

}