import axios from 'axios'

// export async function setAnswer(messages) {
//   console.log(prompt)
//   const res = await axios.post('https://api.openai.com/v1/chat/completions', {
//     // headers: {
//     //   'Content-Type': 'application/json',
//     //   Authorization: `Bearer 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`,
//     // },

//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages,
//       temperature: 0.6,
//       stream: true,
//     }),
//   })
//   console.log(res)
//   return res
// }

export async function setAnswer(messages) {
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      JSON.stringify({
        messages,
        model: 'gpt-3.5-turbo',
        // temperature: 0.7,
        // max_tokens: 150,
        // n: 1,
        // stop: '\n',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
      }
    )
    console.log(res.data.choices[0].message.content)
    return res.data.choices[0].message.content
  } catch (error) {
    console.log(error.response.data.error)
  }
}
