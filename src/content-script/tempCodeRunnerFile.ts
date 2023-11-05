export async function getGoogleSearchResult(question : string) {
  let searchWithGoogle = ''
  const googleUrl = `https://www.google.com/search?q=${question}`

  try {
    const response = await fetch(googleUrl)
    const html = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const resultDivs = doc.querySelectorAll('div.kvH3mc.BToiNc.UK95Uc')
    const turndownService = new TurndownService()
    const results = Array.from(resultDivs).map((resultDiv) =>
      turndownService.turndown(resultDiv.innerHTML),
    )
    console.log(results)
    searchWithGoogle = `
      Use your knowledge and Web search to answer the question.
      Web search results:
      ${results.join('\n')}
    `
  } catch (error) {
    console.debug(error)
  }

  return searchWithGoogle
}
