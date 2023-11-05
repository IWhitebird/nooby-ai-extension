import Browser from 'webextension-polyfill'

export function getPossibleElementByQuerySelector<T extends Element>(
  queryArray: string[],
): T | undefined {
  for (const query of queryArray) {
    const element = document.querySelector(query)
    if (element) {
      return element as T
    }
  }
}

export function endsWithQuestionMark(question: string) {
  return (
    question.endsWith('?') || // ASCII
    question.endsWith('？') || // Chinese/Japanese
    question.endsWith('؟') || // Arabic
    question.endsWith('⸮') // Arabic
  )
}

export function isBraveBrowser() {
  return (navigator as any).brave?.isBrave()
}

export async function shouldShowRatingTip() {
  const { ratingTipShowTimes = 0 } = await Browser.storage.local.get('ratingTipShowTimes')
  if (ratingTipShowTimes >= 5) {
    return false
  }
  await Browser.storage.local.set({ ratingTipShowTimes: ratingTipShowTimes + 1 })
  return ratingTipShowTimes >= 2
}



export async function getGoogleSearchResult(question : any ) {
  try {
    const response = await fetch(`https://www.google.com/search?q=${question}`);
    const html = await response.text();

    // Create a DOMParser and parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Initialize arrays to store the scraped data
    const titles : any = [];
    const links : any = [];
    const snippets : any = [];
    const displayedLinks: any  = [];

    // Select elements representing search results
    const resultElements = doc.querySelectorAll('.g');

    // Loop through each search result and extract data
    resultElements.forEach((resultElement : any ) => {
      const titleElement = resultElement.querySelector('.yuRUbf h3');
      const linkElement = resultElement.querySelector('.yuRUbf a');
      const snippetElement = resultElement.querySelector('.VwiC3b');
      const displayedLinkElement = resultElement.querySelector('.yuRUbf .NJjxre .tjvcx');
      const timeElement = resultElement.querySelector('.sL6Rbf');

      if (titleElement) {
        titles.push(titleElement.innerText);
      }

      if (linkElement) {
        links.push(linkElement.getAttribute('href'));
      }

      if (snippetElement) {
        snippets.push(snippetElement.innerText);
      }

      if (displayedLinkElement) {
        displayedLinks.push(displayedLinkElement.innerText);
      }

      if (timeElement) {
        console.log(timeElement.innerText);
      }

    });

    // Format the scraped data as a single string
    const formattedResult = `
      Titles: ${titles.join('\n')}
      Links: ${links.join('\n')}
      Snippets: ${snippets.join('\n')}
      Displayed Links: ${displayedLinks.join('\n')}
    `;

    return formattedResult;
  } catch (error) {
    console.error(error);
    return '';
  }
}
