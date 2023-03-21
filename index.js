// const OPENAI_API_KEY = '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'
const OPENAI_API_KEY = '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'
const express = require('express')
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({ apiKey: OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 5000
app.post('/', async (req, res) => {
  try {
    const m = await openai.listModels()
    console.log(m.data.data)
    const { prompt } = req.body
    const response = await openai.createChatCompletion({
      // model: 'text-davinci-002',
      // model: 'text-davinci-003',
      model: 'gpt-3.5-turbo',
      messages: prompt,
      stream: true,
      // max_tokens: 4000,
      temperature: 0.6,
    })
    return res.json({ message: response.data.choices[0].text })
  } catch (error) {
    return res.json({ message: error })
  }
})
app.listen(port, () => {
  console.log('work', port)
})
